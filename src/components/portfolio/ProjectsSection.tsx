"use client"

import { ExternalLink, Github, ArrowRight } from "lucide-react"
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

const allProjects = projectsData as unknown as Project[]
const featuredProjects = allProjects.filter((p) => p.status === "LIVE").slice(0, 3)

export function ProjectsSection() {
	return (
		<section id="projects" className="relative py-24 md:py-32">

			{/* Section header */}
			<div className="px-6 md:px-12 lg:px-24 mb-12">
				<span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-600 block mb-3">
					Selected Work
				</span>
				<h2 className="font-display text-4xl md:text-5xl text-white font-black tracking-tighter leading-[0.9]">
					Projects.
				</h2>
			</div>

			{/* Horizontal scroll */}
			<div className="px-6 md:px-12 lg:px-24 overflow-x-auto scrollbar-none">
				<div className="flex gap-5 snap-x snap-mandatory pb-2" style={{ width: "max-content" }}>
					{featuredProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			</div>

			{/* View all work */}
			<div className="px-6 md:px-12 lg:px-24 mt-10">
				<Link
					href="/projects"
					className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-colors duration-200"
				>
					View all work
					<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
				</Link>
			</div>
		</section>
	)
}

function ProjectCard({ project }: { project: Project }) {
	const hasLiveUrl =
		project.liveUrl &&
		project.liveUrl !== project.githubUrl &&
		project.liveUrl !== "#"

	return (
		<div
			className="snap-start shrink-0 flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
			style={{ width: "min(82vw, 360px)", minHeight: "280px" }}
		>
			<div className="p-7 flex flex-col gap-5 flex-1">

				{/* Top row */}
				<div className="flex items-start justify-between gap-4">
					<h3 className="font-display text-xl text-white font-black tracking-tight leading-tight">
						{project.name}
					</h3>
					<span className="font-mono text-[9px] uppercase tracking-[0.15em] text-emerald-700 shrink-0 mt-0.5">
						{project.status}
					</span>
				</div>

				{/* Story quote */}
				<p className="font-body text-sm text-gray-600 italic leading-relaxed">
					&ldquo;{project.story}&rdquo;
				</p>

				{/* Tech tags */}
				<div className="flex flex-wrap gap-1.5">
					{project.tech.slice(0, 3).map((t) => (
						<span
							key={t}
							className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.05] text-gray-600 uppercase tracking-wider"
						>
							{t}
						</span>
					))}
				</div>

				{/* Metrics */}
				<div className="flex gap-6 pt-3 border-t border-white/[0.05]">
					{Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
						<div key={key}>
							<div className="font-display text-base text-white font-bold">{value}</div>
							<div className="font-mono text-[9px] text-gray-700 uppercase tracking-wider">{key}</div>
						</div>
					))}
				</div>
			</div>

			{/* Action row */}
			<div className="px-7 py-4 border-t border-white/[0.05] flex items-center gap-3">
				{hasLiveUrl && (
					<a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(124,58,237,0.3)]"
						style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}
					>
						<ExternalLink className="w-3 h-3" />
						Live
					</a>
				)}
				{project.githubUrl && project.githubUrl !== "#" && (
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-500 border border-white/[0.08] hover:text-white hover:border-white/[0.2] px-4 py-2 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
					>
						<Github className="w-3 h-3" />
						Code
					</a>
				)}
			</div>
		</div>
	)
}
