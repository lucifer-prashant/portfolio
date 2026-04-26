"use client"

import { useState, useEffect } from "react"
import { Download, FlaskConical, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavBar() {
  const [visible, setVisible] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const scrollToSection = (id: string) => {
    setMenuOpen(false)
    // slight delay so overlay closes before scroll
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }, 150)
  }

  const handleResumeDownload = () => {
    setIsDownloading(true)
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Prashant_Verma_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setIsDownloading(false), 1000)
  }

  const navLinks = [
    { label: "Projects", id: "projects" },
    { label: "All Work", href: "/projects" },
    { label: "Lab", href: "/playground", icon: <FlaskConical className="w-3 h-3" /> },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ]

  const renderLink = (item: typeof navLinks[number], className: string, underline?: React.ReactNode) => {
    if ("href" in item && item.href) {
      return (
        <Link key={item.label} href={item.href} className={className} onClick={() => setMenuOpen(false)}>
          {"icon" in item && item.icon ? (
            <span className="flex items-center gap-1.5">{item.icon}{item.label}</span>
          ) : item.label}
          {underline}
        </Link>
      )
    }
    if (isHome) {
      return (
        <button key={item.label} onClick={() => scrollToSection(item.id!)} className={className}>
          {item.label}{underline}
        </button>
      )
    }
    return (
      <Link key={item.label} href={`/#${item.id}`} className={className} onClick={() => setMenuOpen(false)}>
        {item.label}{underline}
      </Link>
    )
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-3 flex items-center justify-between border-b border-white/[0.04] bg-[rgba(10,10,10,0.95)] transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-sm font-black tracking-[0.15em] text-white hover:text-gray-300 transition-colors uppercase"
        >
          PV
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const cls = "relative font-mono text-[11px] uppercase tracking-[0.12em] text-gray-600 hover:text-white transition-colors duration-200 group"
            const underline = <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            return renderLink(item, cls, underline)
          })}
        </div>

        {/* Right side: resume + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleResumeDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-gray-500 hover:text-white border border-white/[0.12] hover:border-white/[0.3] px-4 py-2 rounded transition-all duration-200 disabled:opacity-50 shrink-0"
          >
            {isDownloading ? (
              <>
                <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Download className="w-3 h-3" />
                <span className="hidden sm:inline">Resume</span>
              </>
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col px-6 pt-24 pb-12 md:hidden">
          <nav className="flex flex-col gap-1 flex-1">
            {navLinks.map((item) =>
              renderLink(
                item,
                "font-mono text-2xl uppercase tracking-[0.1em] text-gray-600 hover:text-white transition-colors duration-200 py-4 border-b border-white/[0.05] block w-full text-left"
              )
            )}
          </nav>

          <div className="font-mono text-[10px] text-gray-800 tracking-wider">
            // prashant verma
          </div>
        </div>
      )}
    </>
  )
}
