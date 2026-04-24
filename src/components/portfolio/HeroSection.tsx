"use client"

import { useState, useEffect } from "react"
import { GlitchText } from "./GlitchText"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setShowScroll(true), 1800)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-20 overflow-hidden">

      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Faint violet glow bottom-left */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-violet-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main content — left aligned */}
      <div className="relative z-10 max-w-5xl">

        {/* Eyebrow label */}
        <div
          className={`font-mono text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          Bhubaneswar, India &nbsp;·&nbsp; Full-Stack + ML
        </div>

        {/* Name */}
        <h1
          className={`font-display font-black leading-[0.88] tracking-tighter mb-10 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <GlitchText
            text="Prashant"
            className="block text-white text-[clamp(4rem,12vw,11rem)]"
            scrambleOnLoad={true}
            delay={400}
          />
          <span
            className="block text-[clamp(4rem,12vw,11rem)]"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Verma.
          </span>
        </h1>

        {/* Personality copy */}
        <p
          className={`font-body text-gray-500 text-[clamp(1rem,2vw,1.25rem)] leading-relaxed max-w-xl mb-12 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          I build things that feel <span className="text-gray-300">fast</span>,
          look <span className="text-gray-300">intentional</span>, and occasionally
          break convention — full-stack products to ML pipelines.
        </p>

        {/* CTAs */}
        <div
          className={`flex items-center gap-4 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-mono text-xs uppercase tracking-widest text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.35)]"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
            }}
          >
            View Projects
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-mono text-xs uppercase tracking-widest text-gray-500 border border-white/[0.1] hover:text-white hover:border-white/[0.25] transition-all duration-300 hover:-translate-y-0.5"
          >
            About Me
          </button>
        </div>
      </div>

      {/* Identity tag — bottom right */}
      <div className="absolute bottom-12 right-8 lg:right-24 font-mono text-[10px] text-gray-800 hidden lg:block tracking-wider">
        // the anomaly
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 ${
          showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={() => scrollToSection("projects")}
          className="flex flex-col items-center gap-3 group"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gray-800 group-hover:text-gray-600 transition-colors">
            Scroll
          </span>
          <div className="relative w-[1px] h-12 bg-gradient-to-b from-gray-700 to-transparent">
            <div className="absolute top-0 left-0 w-[1px] h-3 bg-white/60 animate-pulse" />
          </div>
        </button>
      </div>
    </section>
  )
}
