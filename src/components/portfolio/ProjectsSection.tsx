"use client"

import { useState } from "react"
import { ExternalLink, Github, X, ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import projectsData from "@/data/projects.json"

interface Project {
	id: string
	name: string
	tagline: string
	status: "LIVE" | "ARCHIVED" | "IN PROGRESS"
	date: string
	tech: string[]
	description: string
	liveUrl?: string
	githubUrl: string
	metrics: Record<string, string>
}

const allProjects: Project[] = projectsData as unknown as Project[]
const projects = allProjects.filter((p) => p.status === "LIVE").slice(0, 3)

const statusColors = {
	LIVE: "bg-white/[0.08] text-gray-300 border border-white/[0.15]",
	ARCHIVED: "bg-white/[0.04] text-gray-600 border border-white/[0.08]",
	"IN PROGRESS": "bg-white/[0.06] text-gray-400 border border-white/[0.12]",
}

export function ProjectsSection() {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null)

	return (
		<section
			id="projects"
			className="relative z-10 px-6 md:px-12 lg:px-24 py-32">
			{/* Minimal gradient accent */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[128px]" />
			</div>

			{/* Section header */}
			<div className="relative mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
				<div>
					<span className="inline-block font-mono text-xs text-gray-600 uppercase tracking-widest mb-6">
						Selected Work
					</span>
					<h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tighter">
						Featured
						<br />
						<span className="gradient-text-subtle">Projects</span>
					</h2>
				</div>

				<Link
					href="/projects"
					className="group flex items-center gap-2 font-body text-sm text-gray-500 hover:text-white transition-colors bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] px-6 py-3 rounded-full w-fit">
					View All Work
					<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
				</Link>
			</div>

			{/* Projects grid - refined cards */}
			<div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{projects.map((project, index) => (
					<button
						key={project.id}
						onClick={() => setSelectedProject(project)}
						className="group text-left">
						<div className="relative h-full p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500 hover:bg-white/[0.04] card-hover overflow-hidden">
							{/* Subtle gradient overlay on hover */}
							<div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

							{/* Status badge */}
							<div className="relative flex items-center justify-between mb-6">
								<span className="font-mono text-xs text-gray-600">
									{project.date}
								</span>
								<span
									className={`font-mono text-[10px] px-3 py-1 rounded-full ${statusColors[project.status]}`}>
									{project.status}
								</span>
							</div>

							{/* Project info */}
							<div className="relative">
								<h3 className="font-display text-2xl text-white group-hover:text-gray-200 transition-colors mb-3 tracking-tight">
									{project.name}
								</h3>
								<p className="font-body text-sm text-gray-500 group-hover:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
									{project.tagline}
								</p>

								{/* Tech stack */}
								<div className="flex flex-wrap gap-2 mb-6">
									{project.tech.slice(0, 3).map((t) => (
										<span
											key={t}
											className="font-mono text-[10px] px-2.5 py-1 rounded-md bg-white/[0.04] text-gray-600">
											{t}
										</span>
									))}
								</div>

								{/* Arrow indicator */}
								<div className="flex items-center gap-2 text-gray-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-2">
									<span className="font-body text-sm">View Details</span>
									<ArrowUpRight className="w-4 h-4" />
								</div>
							</div>
						</div>
					</button>
				))}
			</div>

			{/* Project Modal */}
			{selectedProject && (
				<ProjectModal
					project={selectedProject}
					onClose={() => setSelectedProject(null)}
				/>
			)}
		</section>
	)
}

function ProjectModal({
	project,
	onClose,
}: {
	project: Project
	onClose: () => void
}) {
	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center p-4"
			onClick={onClose}>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

			{/* Modal content */}
			<div
				className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] backdrop-blur-xl rounded-2xl border border-white/[0.12] shadow-2xl"
				onClick={(e) => e.stopPropagation()}
				style={{
					animation: "modalIn 0.3s ease-out",
				}}>
				{/* Header */}
				<div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-white/[0.08] px-8 py-6 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<h3 className="font-display text-3xl md:text-4xl text-white font-bold tracking-tight">
							{project.name}
						</h3>
						<span
							className={`font-mono text-xs px-3 py-1 rounded-full ${statusColors[project.status]}`}>
							{project.status}
						</span>
					</div>
					<button
						onClick={onClose}
						className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] flex items-center justify-center transition-all group">
						<X className="w-5 h-5 text-gray-500 group-hover:text-white" />
					</button>
				</div>

				{/* Content */}
				<div className="p-8">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
						{/* Demo preview area */}
						<div className="lg:col-span-3">
							<div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/[0.08]">
								{project.liveUrl ? (
									<iframe
										src={project.liveUrl}
										className="w-full h-full"
										title={project.name}
									/>
								) : (
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="text-center">
											<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.04] flex items-center justify-center">
												<ExternalLink className="w-8 h-8 text-gray-600" />
											</div>
											<p className="font-body text-sm text-gray-600">
												Preview unavailable
											</p>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Metadata */}
						<div className="lg:col-span-2 space-y-6">
							{/* Description */}
							<div>
								<h4 className="font-mono text-xs text-gray-600 uppercase tracking-wider mb-3">
									About
								</h4>
								<p className="font-body text-gray-400 leading-relaxed">
									{project.description}
								</p>
							</div>

							{/* Tech stack */}
							<div>
								<h4 className="font-mono text-xs text-gray-600 uppercase tracking-wider mb-3">
									Stack
								</h4>
								<div className="flex flex-wrap gap-2">
									{project.tech.map((t) => (
										<span
											key={t}
											className="font-mono text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-500">
											{t}
										</span>
									))}
								</div>
							</div>

							{/* Metrics */}
							<div>
								<h4 className="font-mono text-xs text-gray-600 uppercase tracking-wider mb-3">
									Metrics
								</h4>
								<div className="grid grid-cols-2 gap-3">
									{Object.entries(project.metrics).map(([key, value]) => (
										<div
											key={key}
											className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]">
											<div className="font-display text-2xl text-white font-bold gradient-text-subtle">
												{value}
											</div>
											<div className="font-mono text-[10px] text-gray-600 uppercase mt-1">
												{key}
											</div>
										</div>
									))}
								</div>
							</div>

							{/* CTAs */}
							<div className="flex gap-3 pt-4">
								{project.githubUrl && project.githubUrl !== "#" && (
									<a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="flex-1 px-5 py-3 rounded-xl font-body text-sm bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all flex items-center justify-center gap-2">
										<Github className="w-4 h-4" />
										Code
									</a>
								)}
								{project.liveUrl && (
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="flex-1 px-5 py-3 rounded-xl font-body text-sm bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2 font-medium">
										<ExternalLink className="w-4 h-4" />
										Live
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes modalIn {
					from {
						opacity: 0;
						transform: scale(0.96) translateY(20px);
					}
					to {
						opacity: 1;
						transform: scale(1) translateY(0);
					}
				}
			`}</style>
		</div>
	)
}
