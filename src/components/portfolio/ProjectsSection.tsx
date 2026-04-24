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
const featuredProjects = allProjects.filter((p) => p.status === "LIVE").slice(0, 3)

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
		const container = containerRef.current
		const slide = slideRefs.current[index]
		if (!container || !slide) return
		container.scrollTo({ left: slide.offsetLeft, behavior: "smooth" })
	}

	return (
		<section id="projects" className="relative h-screen">

			{/* Bottom dot indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
				{featuredProjects.map((_, i) => (
					<button
						type="button"
						key={i}
						onClick={() => scrollToSlide(i)}
						aria-label={`Go to project ${i + 1}`}
						className={`rounded-full transition-all duration-300 ${
							i === activeIndex
								? "w-6 h-1 bg-violet-500"
								: "w-1.5 h-1 bg-white/20 hover:bg-white/40"
						}`}
					/>
				))}
			</div>

			{/* View all link */}
			<div className="absolute bottom-8 right-6 lg:right-24 z-20">
				<Link
					href="/projects"
					className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-gray-300 transition-colors duration-200"
				>
					View all →
				</Link>
			</div>

			{/* Horizontal scroll container */}
			<div
				ref={containerRef}
				className="h-full flex overflow-x-scroll snap-x snap-mandatory scrollbar-none"
			>
				{featuredProjects.map((project, index) => (
					<ProjectSlide
						key={project.id}
						project={project}
						index={index}
						isActive={activeIndex === index}
						onRef={(el) => { slideRefs.current[index] = el }}
					/>
				))}
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
	const hasLiveUrl =
		project.liveUrl &&
		project.liveUrl !== project.githubUrl &&
		project.liveUrl !== "#"

	return (
		<div
			ref={onRef}
			className="relative flex-shrink-0 w-screen h-full snap-start flex items-center px-6 md:px-12 lg:px-24 overflow-hidden"
		>
			{/* Giant background number */}
			<div
				className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 font-display font-black select-none leading-none pointer-events-none transition-all duration-700 hidden sm:block"
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

				{/* Index + status */}
				<div
					className={`font-mono text-[10px] uppercase tracking-[0.25em] mb-6 transition-all duration-500 ${
						isActive ? "opacity-100" : "opacity-0"
					}`}
				>
					<span className="text-gray-700">{String(index + 1).padStart(2, "0")}</span>
					<span className="mx-3 text-gray-800">/</span>
					<span className="text-emerald-700">{project.status}</span>
				</div>

				{/* Project name */}
				<h2
					className={`font-display font-black tracking-tighter leading-[0.9] mb-8 text-white transition-[opacity,transform] duration-500 ${
						isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
					}`}
					style={{ fontSize: "clamp(3rem,8vw,7rem)" }}
				>
					{project.name}
				</h2>

				{/* Story quote */}
				<p
					className={`font-body text-base md:text-lg italic leading-relaxed mb-8 max-w-lg transition-[opacity,transform] duration-500 ${
						isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
					}`}
					style={{
						transitionDelay: "100ms",
						color: "rgba(167,139,250,0.85)",
					}}
				>
					&ldquo;{project.story}&rdquo;
				</p>

				{/* Tech + metrics */}
				<div
					className={`flex flex-wrap items-center gap-6 mb-10 transition-[opacity,transform] duration-500 ${
						isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
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
								<div className="font-mono text-[9px] text-gray-700 uppercase tracking-wider">{key}</div>
							</div>
						))}
					</div>
				</div>

				{/* Action links */}
				<div
					className={`flex items-center gap-3 transition-[opacity,transform] duration-500 ${
						isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
					}`}
					style={{ transitionDelay: "250ms" }}
				>
					{hasLiveUrl && (
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-wider text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(124,58,237,0.3)]"
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
				</div>
			</div>
		</div>
	)
}
