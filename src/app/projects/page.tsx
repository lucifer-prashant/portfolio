"use client"

import { useState } from "react"
import {
	ExternalLink,
	Github,
	X,
	ChevronLeft,
	ArrowUpRight,
} from "lucide-react"
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

const projects: Project[] = projectsData as unknown as Project[]

const statusColors = {
	LIVE: "bg-white/[0.08] text-gray-300 border border-white/[0.15]",
	ARCHIVED: "bg-white/[0.04] text-gray-600 border border-white/[0.08]",
	"IN PROGRESS": "bg-white/[0.06] text-gray-400 border border-white/[0.12]",
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
			{/* Minimal gradient */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[128px]" />
				<div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[128px]" />
			</div>

			{/* Header */}
			<header className="relative z-10 px-6 md:px-12 lg:px-24 py-6 border-b border-white/[0.08]">
				<div className="flex items-center justify-between">
					<Link
						href="/"
						className="flex items-center gap-2 font-body text-sm text-gray-500 hover:text-white transition-colors group">
						<ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
						Back to Home
					</Link>

					<Link href="/" className="font-display text-xl font-bold text-white">
						PV
					</Link>
				</div>
			</header>

			{/* Page content */}
			<section className="relative z-10 px-6 md:px-12 lg:px-24 py-20">
				{/* Section header */}
				<div className="mb-16">
					<span className="inline-block font-mono text-xs text-gray-600 uppercase tracking-widest mb-6">
						Project Archive
					</span>
					<h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tighter">
						All Projects
					</h1>
					<p className="font-body text-lg text-gray-500 mt-6 max-w-xl">
						A comprehensive collection of my work — experiments, side projects,
						and production applications.
					</p>
				</div>

				{/* Filters */}
				<div className="flex flex-wrap gap-3 mb-16">
					{(["ALL", "LIVE", "IN PROGRESS", "ARCHIVED"] as const).map(
						(status) => (
							<button
								key={status}
								onClick={() => setFilter(status)}
								className={`font-body text-sm px-6 py-3 rounded-full transition-all ${
									filter === status
										? "bg-white text-black"
										: "bg-white/[0.03] border border-white/[0.08] text-gray-500 hover:bg-white/[0.06] hover:text-white"
								}`}>
								{status}{" "}
								{status !== "ALL" &&
									`(${projects.filter((p) => p.status === status).length})`}
							</button>
						)
					)}
				</div>

				{/* Projects grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredProjects.map((project, index) => (
						<div
							key={project.id}
							className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 cursor-pointer overflow-hidden card-hover"
							onClick={() => setSelectedProject(project)}
							style={{
								animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
							}}>
							{/* Gradient overlay on hover */}
							<div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

							{/* Status indicator */}
							<div className="absolute top-4 right-4 z-10">
								<span
									className={`font-mono text-[10px] px-3 py-1 rounded-full ${statusColors[project.status]}`}>
									{project.status}
								</span>
							</div>

							{/* Content */}
							<div className="relative p-8">
								<div className="font-mono text-xs text-gray-600 mb-3">
									{project.date}
								</div>
								<h3 className="font-display text-xl text-white group-hover:text-gray-300 transition-colors mb-2 tracking-tight">
									{project.name}
								</h3>
								<p className="font-body text-sm text-gray-500 mb-4 line-clamp-2">
									{project.tagline}
								</p>

								{/* Tech stack */}
								<div className="flex flex-wrap gap-2 mb-4">
									{project.tech.slice(0, 3).map((t) => (
										<span
											key={t}
											className="font-mono text-[10px] px-2 py-1 rounded-md bg-white/[0.04] text-gray-600">
											{t}
										</span>
									))}
									{project.tech.length > 3 && (
										<span className="font-mono text-[10px] text-gray-700">
											+{project.tech.length - 3}
										</span>
									)}
								</div>

								{/* Metrics preview */}
								<div className="flex gap-4 pt-4 border-t border-white/[0.06]">
									{Object.entries(project.metrics)
										.slice(0, 2)
										.map(([key, value]) => (
											<div key={key}>
												<div className="font-display text-sm text-white font-bold gradient-text-subtle">
													{value}
												</div>
												<div className="font-mono text-[10px] text-gray-600 uppercase">
													{key}
												</div>
											</div>
										))}
								</div>
							</div>

							{/* Corner arrow */}
							<div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
								<ArrowUpRight className="w-5 h-5 text-gray-500" />
							</div>
						</div>
					))}
				</div>

				{/* Empty state */}
				{filteredProjects.length === 0 && (
					<div className="text-center py-20">
						<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.04] flex items-center justify-center">
							<ExternalLink className="w-8 h-8 text-gray-600" />
						</div>
						<p className="font-body text-gray-500">
							No projects found with status: {filter}
						</p>
					</div>
				)}
			</section>

			{/* Project Modal */}
			{selectedProject && (
				<ProjectModal
					project={selectedProject}
					onClose={() => setSelectedProject(null)}
				/>
			)}

			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
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
	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center p-4"
			onClick={onClose}>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

			{/* Modal content */}
			<div
				className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] backdrop-blur-xl rounded-2xl border border-white/[0.12] shadow-2xl"
				onClick={(e) => e.stopPropagation()}
				style={{
					animation: "modalIn 0.3s ease-out",
				}}>
				{/* Header */}
				<div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-white/[0.08] px-8 py-5 flex items-center justify-between">
					<div className="flex items-center gap-4">
						<h3 className="font-display text-2xl md:text-3xl text-white font-bold tracking-tight">
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
												No preview available
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
									Tech Stack
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
											<div className="font-mono text-[10px] text-gray-600 uppercase">
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
										View Code
									</a>
								)}
								{project.liveUrl && (
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="flex-1 px-5 py-3 rounded-xl font-body text-sm bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2 font-medium">
										<ExternalLink className="w-4 h-4" />
										Live Demo
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
						transform: scale(0.95) translateY(20px);
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
