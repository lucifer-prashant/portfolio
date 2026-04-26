"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import projectsData from "@/data/projects.json"

interface Project {
	id: string
	featured?: boolean
	name: string
	story: string
	status: "LIVE" | "IN PROGRESS" | "CODE REPO"
	date: string
	tech: string[]
	description: string
	liveUrl?: string
	githubUrl: string
}

const allProjects: Project[] = projectsData as unknown as Project[]
const featuredProjects = allProjects.filter((p) => p.featured)

const statusColors: Record<string, string> = {
	LIVE: "bg-emerald-500",
	"IN PROGRESS": "bg-amber-500",
	"CODE REPO": "bg-sky-500",
}

export function ProjectsSection() {
	return (
		<section id="projects" className="relative z-10 px-6 md:px-12 lg:px-24 py-32">

			{/* Header */}
			<div className="flex items-end justify-between mb-16">
				<div>
					<span className="inline-block font-mono text-[10px] text-gray-600 uppercase tracking-[0.25em] mb-6">
						Selected Work
					</span>
					<h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-black tracking-tighter leading-[0.9]">
						Projects.
					</h2>
				</div>
				<Link
					href="/projects"
					className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors duration-200 pb-2"
				>
					View all
					<ArrowUpRight className="w-3 h-3" />
				</Link>
			</div>

			{/* List */}
			<div className="flex flex-col divide-y divide-white/[0.05]">
				{featuredProjects.map((project, index) => {
					const href = project.liveUrl && project.liveUrl !== "#" ? project.liveUrl : project.githubUrl
					return (
						<a
							key={project.id}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-6 py-7 -mx-4 px-4 rounded-lg hover:bg-white/[0.02] transition-colors duration-200"
						>
							{/* Index */}
							<span className="font-mono text-[10px] text-gray-800 w-5 shrink-0">
								{String(index + 1).padStart(2, "0")}
							</span>

							{/* Name + story */}
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-3 mb-1">
									<span
										className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusColors[project.status]}`}
									/>
									<h3 className="font-display text-2xl md:text-3xl text-white font-bold tracking-tight group-hover:text-gray-300 transition-colors duration-200">
										{project.name}
									</h3>
								</div>
								<p className="font-body text-sm text-gray-600 italic pl-[18px]">
									{project.story}
								</p>
							</div>

							{/* Tech — hidden on small screens */}
							<div className="hidden lg:flex gap-2 shrink-0">
								{project.tech.slice(0, 3).map((t) => (
									<span
										key={t}
										className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-gray-700 uppercase tracking-wider"
									>
										{t}
									</span>
								))}
							</div>

							{/* Arrow */}
							<ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
						</a>
					)
				})}
			</div>

			{/* Mobile view all */}
			<div className="mt-10 md:hidden">
				<Link
					href="/projects"
					className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors duration-200"
				>
					View all work
					<ArrowUpRight className="w-3 h-3" />
				</Link>
			</div>
		</section>
	)
}
