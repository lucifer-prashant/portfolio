"use client"

import { ExternalLink, Github } from "lucide-react"
import playgroundData from "@/data/playground.json"
import { NavBar } from "@/components/portfolio/NavBar"

interface Experiment {
  id: string
  name: string
  description: string
  tech: string[]
  liveUrl?: string
  githubUrl: string
}

const experiments: Experiment[] = playgroundData as Experiment[]

export default function PlaygroundPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <NavBar />

      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 20%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 20%, black 40%, transparent 100%)",
        }}
      />

      <section className="relative z-10 px-6 md:px-12 lg:px-24 pt-32 pb-20">

        {/* Header */}
        <div className="mb-16">
          <span className="inline-block font-mono text-[10px] text-gray-600 uppercase tracking-[0.25em] mb-6">
            Experiments & Curiosities
          </span>
          <h1 className="font-display text-5xl md:text-7xl text-white font-black tracking-tighter leading-[0.9] mb-6">
            Lab.
          </h1>
          <p className="font-body text-gray-600 text-base max-w-md leading-relaxed">
            Things built for the joy of building — simulations, tools, and weekend tangents that never needed a roadmap.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className="group border border-white/[0.07] rounded-lg p-8 flex flex-col gap-6 transition-all duration-300 hover:border-white/[0.18] hover:-translate-y-1 hover:bg-white/[0.02]"
            >
              {/* Name */}
              <div>
                <h3 className="font-display text-xl text-white font-bold tracking-tight mb-2">
                  {exp.name}
                </h3>
                <p className="font-body text-sm text-gray-600 leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-gray-700 uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-2 border-t border-white/[0.06]">
                {exp.liveUrl && (
                  <a
                    href={exp.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-500 hover:text-white transition-colors duration-200"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Live
                  </a>
                )}
                <a
                  href={exp.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-500 hover:text-white transition-colors duration-200"
                >
                  <Github className="w-3 h-3" />
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
