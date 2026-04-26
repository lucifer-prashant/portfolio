"use client"

import { useState, useEffect } from "react"
import { GlitchText } from "./GlitchText"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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


      {/* Main content — left aligned */}
      <div className="relative z-10 max-w-5xl">

        {/* Eyebrow label */}
        <div
          className={`font-mono text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          Full-Stack + ML
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
          <GlitchText
            text="Verma."
            className="block text-white text-[clamp(4rem,12vw,11rem)]"
            scrambleOnLoad={true}
            delay={700}
          />
        </h1>

        {/* Personality copy */}
        <p
          className={`font-body text-gray-500 text-[clamp(1rem,2vw,1.25rem)] leading-relaxed max-w-xl mb-12 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          I build things that feel <span className="text-gray-300">fast</span> and
          look <span className="text-gray-300">intentional</span>— full-stack products to ML pipelines.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-wrap items-center gap-4 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          <button
            type="button"
            onClick={() => scrollToSection("projects")}
            className="group flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-mono text-xs uppercase tracking-widest text-black font-medium transition-all duration-300 btn-lift arrow-nudge hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] bg-white"
          >
            View Projects
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-mono text-xs uppercase tracking-widest text-gray-500 border border-white/[0.1] hover:text-white hover:border-white/[0.25] transition-all duration-300 btn-lift"
          >
            About Me
          </button>
        </div>
      </div>

      {/* Identity tag — bottom right
      <div className="absolute bottom-12 right-8 lg:right-24 font-mono text-[10px] text-gray-500 hidden lg:block tracking-wider">
        // prashant verma
      </div> */}

    </section>
  )
}
