"use client"

import { useState, useEffect } from "react"
import { GlitchText } from "./GlitchText"
import { Download, ArrowDown } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
	const [isDownloading, setIsDownloading] = useState(false)
	const [downloadProgress, setDownloadProgress] = useState(0)
	const [showNav, setShowNav] = useState(false)
	const [showScroll, setShowScroll] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		setMounted(true)
		const navTimer = setTimeout(() => setShowNav(true), 500)
		const scrollTimer = setTimeout(() => setShowScroll(true), 1500)

		const handleScroll = () => {
			setScrolled(window.scrollY > 100)
		}

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}

		window.addEventListener("scroll", handleScroll)
		window.addEventListener("mousemove", handleMouseMove)

		return () => {
			clearTimeout(navTimer)
			clearTimeout(scrollTimer)
			window.removeEventListener("scroll", handleScroll)
			window.removeEventListener("mousemove", handleMouseMove)
		}
	}, [])

	const handleResumeDownload = async () => {
		setIsDownloading(true)
		setDownloadProgress(0)

		for (let i = 0; i <= 100; i += 10) {
			await new Promise((resolve) => setTimeout(resolve, 50))
			setDownloadProgress(i)
		}

		const link = document.createElement("a")
		link.href = "/resume.pdf"
		link.download = "Prashant_Verma_Resume.pdf"
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)

		setTimeout(() => {
			setIsDownloading(false)
			setDownloadProgress(0)
		}, 300)
	}

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id)
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}
	}

	return (
		<section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 overflow-hidden">
			{/* Premium spotlight effect that follows mouse */}
			<div
				className="absolute inset-0 overflow-hidden pointer-events-none opacity-40"
				style={{
					background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
				}}
			/>

			{/* Refined gradient orbs with depth */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-white/[0.025] rounded-full blur-[140px] animate-blob glow-elite" />
				<div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] animate-blob animation-delay-2000 glow-elite" />
				<div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[140px] animate-blob animation-delay-4000 glow-elite" />
			</div>

			{/* Barely-visible grid for depth */}
			<div className="absolute inset-0 opacity-[0.008]">
				<div
					className="w-full h-full"
					style={{
						backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
						backgroundSize: "100px 100px",
					}}
				/>
			</div>

			{/* Premium navigation */}
			<nav
				className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-8 flex justify-between items-center transition-all duration-700 ${
					showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
				} ${scrolled ? "glass py-5 border-b border-white/[0.06]" : ""}`}>
				<div className="flex items-center gap-16">
					<Link
						href="/"
						className={`font-display text-2xl font-bold tracking-tight transition-all duration-500 ${scrolled ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
						<span className="text-white hover:text-gray-300 transition-colors">
							PV
						</span>
					</Link>

					<div className="flex gap-10">
						<button
							onClick={() => scrollToSection("projects")}
							className="font-body text-sm text-gray-600 hover:text-white transition-all duration-300 relative group">
							Projects
							<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
						</button>
						<Link
							href="/projects"
							className="font-body text-sm text-gray-600 hover:text-white transition-all duration-300 relative group">
							Archive
							<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
						</Link>
						<button
							onClick={() => scrollToSection("about")}
							className="font-body text-sm text-gray-600 hover:text-white transition-all duration-300 relative group">
							About
							<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
						</button>
						<button
							onClick={() => scrollToSection("contact")}
							className="font-body text-sm text-gray-600 hover:text-white transition-all duration-300 relative group">
							Contact
							<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
						</button>
					</div>
				</div>

				<button
					onClick={handleResumeDownload}
					disabled={isDownloading}
					className="group relative bg-white text-black px-7 py-3 rounded-full font-body text-sm font-medium transition-all duration-500 hover:bg-gray-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95 disabled:opacity-60">
					{isDownloading ? (
						<span className="flex items-center gap-2.5">
							<span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
							{downloadProgress}%
						</span>
					) : (
						<span className="flex items-center gap-2.5">
							<Download className="w-4 h-4" />
							Resume
						</span>
					)}
				</button>
			</nav>

			{/* Main hero content - maximum impact */}
			<div className="relative z-10 max-w-7xl">
				{/* Name with ultra-refined typography */}
				<h1
					className={`font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[14rem] font-bold leading-[0.85] tracking-tighter mb-16 transition-all duration-1200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
					style={{ transitionDelay: "200ms" }}>
					<GlitchText
						text="Prashant"
						className="block text-white"
						scrambleOnLoad={true}
						delay={300}
					/>
					<span className="block gradient-text">Verma</span>
				</h1>

				{/* Tagline - refined hierarchy */}
				<div
					className={`max-w-3xl transition-all duration-900 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
					style={{ transitionDelay: "600ms" }}>
					<p className="font-body text-2xl md:text-3xl text-gray-400 leading-relaxed font-light tracking-tight">
						Full-stack developer building intelligent systems
						<br />
						that blend user experience with AI.
					</p>

					{/* Tech badges - ultra refined */}
					<div className="flex flex-wrap gap-3 mt-12">
						{["React", "Python", "FastAPI", "Firebase", "Next.js"].map(
							(tech, index) => (
								<span
									key={tech}
									className="font-mono text-xs px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-gray-500 hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-gray-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-500"
									style={{
										opacity: mounted ? 1 : 0,
										transform: mounted ? "translateY(0)" : "translateY(10px)",
										transition: `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${800 + index * 100}ms`,
									}}>
									{tech}
								</span>
							)
						)}
					</div>
				</div>
			</div>

			{/* Refined scroll indicator */}
			<div
				className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-900 ${
					showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
				}`}>
				<button
					onClick={() => scrollToSection("projects")}
					className="flex flex-col items-center gap-4 group">
					<span className="font-mono text-[10px] text-gray-700 uppercase tracking-[0.2em] group-hover:text-gray-500 transition-colors">
						Scroll
					</span>
					<div className="relative w-[2px] h-16 bg-gradient-to-b from-gray-700 via-gray-800 to-transparent group-hover:from-gray-500 transition-colors">
						<div className="absolute top-0 left-0 w-[2px] h-4 bg-white animate-pulse opacity-60" />
					</div>
				</button>
			</div>

			{/* Location indicator - refined */}
			<div className="absolute bottom-12 right-12 font-mono text-[10px] text-gray-800 hidden lg:flex items-center gap-2.5">
				<div className="w-1.5 h-1.5 bg-gray-700 rounded-full pulse-subtle" />
				<span className="tracking-wider">BHUBANESWAR, INDIA</span>
			</div>
		</section>
	)
}
