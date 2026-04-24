"use client"

import { useState } from "react"
import { ExternalLink, Github, X, ArrowUpRight } from "lucide-react"
import projectsData from "@/data/projects.json"
import { NavBar } from "@/components/portfolio/NavBar"

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

const projects: Project[] = projectsData as unknown as Project[]

const statusColors = {
	LIVE: "text-emerald-700",
	ARCHIVED: "text-gray-600",
	"IN PROGRESS": "text-amber-700",
}

export default function AllProjectsPage() {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null)
	const [filter, setFilter] = useState<
		"ALL" | "LIVE" | "IN PROGRESS" | "ARCHIVED"
	>("ALL")

	const filteredProjects =
		filter === "ALL" ? projects : projects.filter((p) => p.status === filter)

	return (
		<main className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
			<NavBar />

			{/* Subtle dot grid */}
			<div
				className="fixed inset-0 pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
					backgroundSize: "40px 40px",
					maskImage: "radial-gradient(ellipse 80% 80% at 50% 20%, black 40%, transparent 100%)",
					WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 20%, black 40%, transparent 100%)",
				}}
			/>

			{/* Page content */}
			<section className="relative z-10 px-6 md:px-12 lg:px-24 pt-32 pb-20">

				{/* Header */}
				<div className="mb-16">
					<span className="inline-block font-mono text-[10px] text-gray-600 uppercase tracking-[0.25em] mb-6">
						Project Archive
					</span>
					<h1 className="font-display text-5xl md:text-7xl text-white font-black tracking-tighter leading-[0.9] mb-6">
						All Work.
					</h1>
					<p className="font-body text-gray-600 text-base max-w-md leading-relaxed">
						Experiments, side projects, and production applications — everything I've shipped.
					</p>
				</div>

				{/* Filters */}
				<div className="flex flex-wrap gap-2 mb-16">
					{(["ALL", "LIVE", "IN PROGRESS", "ARCHIVED"] as const).map((status) => (
						<button
							type="button"
							key={status}
							onClick={() => setFilter(status)}
							className={`font-mono text-[10px] uppercase tracking-[0.12em] px-4 py-2 rounded transition-all duration-200 ${
								filter === status
									? "text-white border border-white/[0.25] bg-white/[0.06]"
									: "text-gray-600 border border-white/[0.08] hover:text-gray-400 hover:border-white/[0.15]"
							}`}
						>
							{status}
							{status !== "ALL" && (
								<span className="ml-2 text-gray-700">
									{projects.filter((p) => p.status === status).length}
								</span>
							)}
						</button>
					))}
				</div>

				{/* Projects list */}
				<div className="flex flex-col divide-y divide-white/[0.04]">
					{filteredProjects.map((project, index) => (
						<button
							type="button"
							key={project.id}
							onClick={() => setSelectedProject(project)}
							className="group text-left py-8 flex items-start gap-8 hover:bg-white/[0.01] transition-colors duration-200 -mx-4 px-4 rounded-lg"
							style={{ animationDelay: `${index * 80}ms` }}
						>
							{/* Index */}
							<span className="font-mono text-[10px] text-gray-700 w-6 shrink-0 mt-1">
								{String(index + 1).padStart(2, "0")}
							</span>

							{/* Main content */}
							<div className="flex-1 min-w-0">
								<div className="flex items-baseline gap-4 mb-2 flex-wrap">
									<h3 className="font-display text-xl md:text-2xl text-white font-bold tracking-tight group-hover:text-gray-200 transition-colors">
										{project.name}
									</h3>
									<span className={`font-mono text-[9px] uppercase tracking-[0.15em] ${statusColors[project.status]}`}>
										{project.status}
									</span>
									<span className="font-mono text-[9px] text-gray-700">{project.date}</span>
								</div>

								<p className="font-body text-sm text-gray-600 italic mb-4">
									&ldquo;{project.story}&rdquo;
								</p>

								<div className="flex flex-wrap gap-2">
									{project.tech.map((t) => (
										<span
											key={t}
											className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-gray-700 uppercase tracking-wider"
										>
											{t}
										</span>
									))}
								</div>
							</div>

							{/* Metrics */}
							<div className="hidden md:flex gap-6 shrink-0">
								{Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
									<div key={key} className="text-right">
										<div className="font-display text-base text-white font-bold">{value}</div>
										<div className="font-mono text-[9px] text-gray-700 uppercase tracking-wider">{key}</div>
									</div>
								))}
							</div>

							{/* Arrow */}
							<ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-gray-400 transition-all shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</button>
					))}
				</div>

				{/* Empty state */}
				{filteredProjects.length === 0 && (
					<div className="py-20 text-center">
						<p className="font-mono text-[11px] text-gray-700 uppercase tracking-widest">
							No projects with status: {filter}
						</p>
					</div>
				)}
			</section>

			{selectedProject && (
				<ProjectModal
					project={selectedProject}
					onClose={() => setSelectedProject(null)}
				/>
			)}
		</main>
	)
}

function ProjectModal({
	project,
	onClose,
}: {
	project: Project
	onClose: () => void
}) {
	const hasLiveUrl =
		project.liveUrl &&
		project.liveUrl !== project.githubUrl &&
		project.liveUrl !== "#"

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center p-4"
			onClick={onClose}
		>
			<div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

			<div
				className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] rounded-xl border border-white/[0.1] shadow-2xl"
				onClick={(e) => e.stopPropagation()}
				style={{ animation: "modalIn 0.25s ease-out" }}
			>
				{/* Header */}
				<div className="sticky top-0 z-10 bg-[#0a0a0a]/95 border-b border-white/[0.06] px-8 py-5 flex items-start justify-between gap-4">
					<div>
						<div className="flex items-center gap-3 mb-1">
							<span className={`font-mono text-[9px] uppercase tracking-[0.15em] ${statusColors[project.status]}`}>
								{project.status}
							</span>
							<span className="font-mono text-[9px] text-gray-700">{project.date}</span>
						</div>
						<h3 className="font-display text-2xl text-white font-black tracking-tight">
							{project.name}
						</h3>
						<p className="font-body text-sm text-gray-600 italic mt-1">
							&ldquo;{project.story}&rdquo;
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center transition-all"
					>
						<X className="w-4 h-4 text-gray-500" />
					</button>
				</div>

				{/* Body */}
				<div className="p-8 space-y-8">

					{/* Description */}
					<div>
						<h4 className="font-mono text-[9px] text-gray-600 uppercase tracking-[0.2em] mb-3">About</h4>
						<p className="font-body text-gray-400 leading-relaxed text-sm">{project.description}</p>
					</div>

					{/* Tech stack */}
					<div>
						<h4 className="font-mono text-[9px] text-gray-600 uppercase tracking-[0.2em] mb-3">Stack</h4>
						<div className="flex flex-wrap gap-2">
							{project.tech.map((t) => (
								<span
									key={t}
									className="font-mono text-[10px] px-3 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-gray-500 uppercase tracking-wider"
								>
									{t}
								</span>
							))}
						</div>
					</div>

					{/* Metrics */}
					<div>
						<h4 className="font-mono text-[9px] text-gray-600 uppercase tracking-[0.2em] mb-3">Metrics</h4>
						<div className="flex gap-8">
							{Object.entries(project.metrics).map(([key, value]) => (
								<div key={key}>
									<div className="font-display text-2xl text-white font-black">{value}</div>
									<div className="font-mono text-[9px] text-gray-600 uppercase tracking-wider">{key}</div>
								</div>
							))}
						</div>
					</div>

					{/* CTAs */}
					<div className="flex gap-3 pt-2">
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

			<style jsx>{`
				@keyframes modalIn {
					from { opacity: 0; transform: scale(0.97) translateY(12px); }
					to { opacity: 1; transform: scale(1) translateY(0); }
				}
			`}</style>
		</div>
	)
}
