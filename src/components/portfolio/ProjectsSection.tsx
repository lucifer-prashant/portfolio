"use client"

import { useState, useEffect, useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import projectsData from "@/data/projects.json"

interface Project {
  id: string
  name: string
  tagline: string
  story: string
  status: "LIVE" | "ARCHIVED" | "IN PROGRESS"
  date: string
  tech: string[]
  description: string
  liveUrl?: string
  githubUrl: string
  metrics: Record<string, string>
}

const allProjects: Project[] = projectsData as unknown as Project[]

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observers = slideRefs.current.map((slide, index) => {
      if (!slide) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index)
        },
        { threshold: 0.5, root: container }
      )
      observer.observe(slide)
      return observer
    })

    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  const scrollToSlide = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section id="projects" className="relative h-screen">

      {/* Side dot indicator */}
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
        {allProjects.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to project ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-1 h-6 bg-violet-500"
                : "w-1 h-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {allProjects.map((project, index) => (
          <ProjectSlide
            key={project.id}
            project={project}
            index={index}
            isActive={activeIndex === index}
            onRef={(el) => {
              slideRefs.current[index] = el
            }}
          />
        ))}
      </div>

      {/* View all link */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <Link
          href="/projects"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-700 hover:text-gray-400 transition-colors"
        >
          View all work →
        </Link>
      </div>
    </section>
  )
}

function ProjectSlide({
  project,
  index,
  isActive,
  onRef,
}: {
  project: Project
  index: number
  isActive: boolean
  onRef: (el: HTMLDivElement | null) => void
}) {
  const isInProgress = project.status === "IN PROGRESS"
  const hasLiveUrl =
    project.liveUrl &&
    project.liveUrl !== project.githubUrl &&
    project.liveUrl !== "#"

  return (
    <div
      ref={onRef}
      className="relative h-full snap-start flex items-center px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Giant background number */}
      <div
        className="absolute right-16 lg:right-32 top-1/2 -translate-y-1/2 font-display font-black select-none leading-none pointer-events-none transition-all duration-700"
        style={{
          fontSize: "clamp(8rem, 22vw, 22rem)",
          color: isActive ? "rgba(124,58,237,0.04)" : "rgba(255,255,255,0.015)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Left accent line */}
      <div
        className={`absolute left-0 top-1/4 h-1/2 w-[2px] transition-all duration-700 ${
          isActive
            ? "bg-gradient-to-b from-violet-500/50 to-pink-500/50"
            : "bg-white/5"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl">

        {/* Status + index label */}
        <div
          className={`font-mono text-[10px] uppercase tracking-[0.25em] mb-6 transition-all duration-500 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-gray-700">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-3 text-gray-800">/</span>
          <span
            className={
              project.status === "LIVE"
                ? "text-emerald-700"
                : project.status === "IN PROGRESS"
                ? "text-amber-700"
                : "text-gray-700"
            }
          >
            {project.status}
          </span>
        </div>

        {/* Project name */}
        <h2
          className={`font-display font-black tracking-tighter leading-[0.9] mb-8 text-white transition-all duration-500 ${
            isActive ? "opacity-100 translate-y-0 project-reveal" : "opacity-0 translate-y-4"
          } ${isInProgress ? "opacity-50" : ""}`}
          style={{ fontSize: "clamp(3rem,8vw,7rem)" }}
        >
          {project.name}
        </h2>

        {/* Story quote */}
        <p
          className={`font-body text-base md:text-lg italic leading-relaxed mb-8 max-w-lg transition-all duration-500 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "100ms",
            color: isInProgress
              ? "rgba(167,139,250,0.4)"
              : "rgba(167,139,250,0.85)",
          }}
        >
          &ldquo;{project.story}&rdquo;
        </p>

        {/* Tech + metrics row */}
        <div
          className={`flex flex-wrap items-center gap-6 mb-10 transition-all duration-500 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "180ms" }}
        >
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-gray-600 uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-6">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key}>
                <div className="font-display text-xl text-white font-bold">{value}</div>
                <div className="font-mono text-[9px] text-gray-700 uppercase tracking-wider">
                  {key}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action links */}
        <div
          className={`flex items-center gap-3 transition-all duration-500 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "250ms" }}
        >
          {hasLiveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-wider text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.3)]"
              style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          )}
          {project.githubUrl && project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-wider text-gray-500 border border-white/[0.1] hover:text-white hover:border-white/[0.25] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          {isInProgress && (
            <span className="font-mono text-[10px] text-amber-900 uppercase tracking-wider">
              In progress — coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
