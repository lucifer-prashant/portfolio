"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, GraduationCap, Briefcase } from "lucide-react"

export function AboutSection() {
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef<HTMLElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
				}
			},
			{ threshold: 0.2 }
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<section
			id="about"
			ref={sectionRef}
			className="relative z-10 px-6 md:px-12 lg:px-24 py-32 overflow-hidden">
			{/* Minimal gradient */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[128px]" />
			</div>

			{/* Section header */}
			<div className="relative mb-20">
				<span className="inline-block font-mono text-xs text-gray-600 uppercase tracking-widest mb-6">
					Background
				</span>
				<h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tighter">
					About Me
				</h2>
			</div>

			{/* Content grid */}
			<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16">
				{/* Bio section */}
				<div
					className={`transition-all duration-700 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					<div className="space-y-8">
						<p className="font-body text-xl text-gray-300 leading-relaxed">
							Computer Science student passionate about intelligent and
							real-time web applications. I enjoy building systems that blend
							user experience with AI — from creating a global typing platform
							with Firebase to developing an AI-powered document automation
							pipeline for Notion.
						</p>
						<p className="font-body text-lg text-gray-500 leading-relaxed">
							Currently exploring ML operations through model drift monitoring,
							fascinated by making AI systems more reliable in production.
						</p>

						{/* Info cards - refined */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
							<div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]">
								<div className="flex items-center gap-3 mb-3">
									<div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
										<MapPin className="w-4 h-4 text-gray-500" />
									</div>
									<span className="font-mono text-xs text-gray-600 uppercase tracking-wider">
										Location
									</span>
								</div>
								<p className="font-body text-white">Bhubaneswar, India</p>
							</div>

							<div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]">
								<div className="flex items-center gap-3 mb-3">
									<div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
										<GraduationCap className="w-4 h-4 text-gray-500" />
									</div>
									<span className="font-mono text-xs text-gray-600 uppercase tracking-wider">
										Education
									</span>
								</div>
								<p className="font-body text-white">KIIT University</p>
								<p className="font-body text-sm text-gray-500 mt-1">
									CSE • CGPA: 8.52
								</p>
							</div>
						</div>

						{/* Experience */}
						{/* <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]">
							<div className="flex items-center gap-3 mb-3">
								<div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
									<Briefcase className="w-4 h-4 text-gray-500" />
								</div>
								<span className="font-mono text-xs text-gray-600 uppercase tracking-wider">
									Experience
								</span>
							</div>
							<p className="font-body text-white">
								AICTE Eduskills Virtual Internship
							</p>
							<p className="font-body text-sm text-gray-500 mt-1">
								AI-ML Track • Jan – March 2025
							</p>
						</div> */}
					</div>
				</div>

				{/* Skills section - refined */}
				<div
					className={`transition-all duration-700 delay-200 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}>
					<div className="space-y-6">
						{/* Frontend */}
						<div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
							<h4 className="font-mono text-xs text-gray-600 uppercase tracking-wider mb-5">
								Frontend
							</h4>
							<div className="flex flex-wrap gap-2">
								{[
									"React",
									"Next.js",
									"TypeScript",
									"Tailwind CSS",
									"JavaScript",
								].map((skill, index) => (
									<span
										key={skill}
										style={{ transitionDelay: `${index * 120}ms` }}
										className={`font-body text-sm px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:bg-white/[0.06] hover:border-white/[0.1] hover:text-gray-300 transition-all transition-[opacity,transform] duration-500 ${
											isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
										}`}>
										{skill}
									</span>
								))}
							</div>
						</div>

						{/* Backend */}
						<div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
							<h4 className="font-mono text-xs text-gray-600 uppercase tracking-wider mb-5">
								Backend
							</h4>
							<div className="flex flex-wrap gap-2">
								{["Python", "FastAPI", "Firebase", "Node.js", "PostgreSQL"].map(
									(skill, index) => (
										<span
											key={skill}
											style={{ transitionDelay: `${index * 120}ms` }}
											className={`font-body text-sm px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:bg-white/[0.06] hover:border-white/[0.1] hover:text-gray-300 transition-all transition-[opacity,transform] duration-500 ${
									isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
								}`}>
											{skill}
										</span>
									)
								)}
							</div>
						</div>

						{/* ML & Tools */}
						<div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
							<h4 className="font-mono text-xs text-gray-600 uppercase tracking-wider mb-5">
								ML & Tools
							</h4>
							<div className="flex flex-wrap gap-2">
								{["Pandas", "Docker", "Git", "Linux", "OpenAI API"].map(
									(skill, index) => (
										<span
											key={skill}
											style={{ transitionDelay: `${index * 120}ms` }}
											className={`font-body text-sm px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:bg-white/[0.06] hover:border-white/[0.1] hover:text-gray-300 transition-all transition-[opacity,transform] duration-500 ${
									isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
								}`}>
											{skill}
										</span>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
