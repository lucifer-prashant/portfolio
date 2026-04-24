"use client"

import { useState, useEffect } from "react"
import { Download } from "lucide-react"
import Link from "next/link"

type NavItem =
  | { label: string; href: string; action?: never }
  | { label: string; action: () => void; href?: never }

export function NavBar() {
  const [visible, setVisible] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
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

  return (
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

      {/* Nav links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-8">
        {(
          [
            { label: "Projects", action: () => scrollToSection("projects") },
            { label: "Archive", href: "/projects" },
            { label: "About", action: () => scrollToSection("about") },
            { label: "Contact", action: () => scrollToSection("contact") },
          ] as NavItem[]
        ).map((item) =>
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className="relative font-mono text-[11px] uppercase tracking-[0.12em] text-gray-600 hover:text-white transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ) : (
            <button
              key={item.label}
              onClick={item.action}
              className="relative font-mono text-[11px] uppercase tracking-[0.12em] text-gray-600 hover:text-white transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          )
        )}
      </div>

      {/* Resume button */}
      <button
        onClick={handleResumeDownload}
        disabled={isDownloading}
        className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-gray-500 hover:text-white border border-white/[0.12] hover:border-white/[0.3] px-4 py-2 rounded transition-all duration-200 disabled:opacity-50 shrink-0 btn-lift"
      >
        {isDownloading ? (
          <>
            <span className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Download className="w-3 h-3" />
            <span>Resume</span>
          </>
        )}
      </button>
    </nav>
  )
}
