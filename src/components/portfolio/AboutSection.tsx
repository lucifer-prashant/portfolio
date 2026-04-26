"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef<HTMLElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
			{ threshold: 0.2 }
		)
		if (sectionRef.current) observer.observe(sectionRef.current)
		return () => observer.disconnect()
	}, [])

	return (
		<section
			id="about"
			ref={sectionRef}
			className="relative z-10 px-6 md:px-12 lg:px-24 py-32 overflow-hidden"
		>
				{/* Section header */}
			<div className="relative mb-20">
				<span className="inline-block font-mono text-xs text-gray-600 uppercase tracking-widest mb-6">
					Background
				</span>
				<h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tighter">
					About.
				</h2>
			</div>

			<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

				{/* Bio */}
				<div
					className={`transition-all duration-700 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}
				>
					<div className="space-y-6">
						<p className="font-body text-xl text-gray-300 leading-relaxed">
							Most of what I build started because something was missing and I
							got impatient waiting for someone else to make it — a typing test
							because I wanted to know my actual WPM, a clipboard tool because
							AI insights kept dying in chat windows, an ML monitor because
							production was a black box.
						</p>
						<p className="font-body text-lg text-gray-500 leading-relaxed">
							I work across the full stack, from drift-detection pipelines to
							the interfaces people actually use. CS student at KIIT, graduating
							soon. The work is the résumé.
						</p>
						<p className="font-body text-lg text-gray-500 leading-relaxed">
							Most of what I build touches AI in some way — integrating models,
							tracking when they degrade, generating outputs people actually use.
							AI right now feels like an arms race. I'm more interested in what
							happens after everyone has the gun.
						</p>

						{/* Meta */}
						<div className="pt-4">
							<span className="font-mono text-xs text-gray-700">
								KIIT University · CSE · CGPA 8.52
							</span>
						</div>
					</div>
				</div>

				{/* Skills */}
				<div
					className={`transition-all duration-700 delay-200 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}
				>
					<span className="font-mono text-xs text-gray-600 uppercase tracking-widest">
						Stack
					</span>
					<p className="font-mono text-sm text-gray-500 leading-loose mt-6">
						React · Next.js · TypeScript · JavaScript · Tailwind
						<br />
						Python · FastAPI · Firebase · Node.js · PostgreSQL
						<br />
						Pandas · Docker · Git · Linux · OpenAI API · NVIDIA NIM
					</p>
				</div>

			</div>
		</section>
	)
}
