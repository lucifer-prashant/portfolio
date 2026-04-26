"use client"

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react"
import { useRef } from "react"

export function FooterSection() {
	const currentYear = new Date().getFullYear()
	const lastTap = useRef(0)

	const handleCopyrightTap = () => {
		const now = Date.now()
		if (now - lastTap.current < 350) {
			window.dispatchEvent(new CustomEvent("open-terminal"))
		}
		lastTap.current = now
	}

	return (
		<footer id="contact" className="relative z-10 px-6 md:px-12 lg:px-24 py-32">
				{/* Section header */}
			<div className="relative mb-20">
				<span className="inline-block font-mono text-xs text-gray-600 uppercase tracking-widest mb-6">
					Contact
				</span>
				<h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-tighter">
					Let's Work
					<br />
					Together.
				</h2>
			</div>

			<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16">
				{/* Left - CTA */}
				<div>
					<p className="font-body text-xl text-gray-500 leading-relaxed mb-10">
						If something I've built is useful to you, or you want to build
						something together — I'm reachable.
					</p>

					{/* Email CTA */}
					<a href="mailto:prashantverma1357@gmail.com" className="inline-block group">
						<div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
							<div className="font-mono text-xs text-gray-600 mb-3 uppercase tracking-wider">
								Email
							</div>
							<div className="font-body text-xl md:text-2xl text-white group-hover:text-gray-300 transition-colors flex items-center gap-3">
								prashantverma1357@gmail.com
								<ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						</div>
					</a>
				</div>

				{/* Right - Links */}
				<div>
					<div className="font-mono text-xs text-gray-600 uppercase tracking-wider mb-8">
						Connect
					</div>
					<div className="space-y-3">
						<SocialLink
							href="https://github.com/lucifer-prashant"
							icon={<Github className="w-5 h-5" />}
							label="GitHub"
							handle="@lucifer-prashant"
						/>
						<SocialLink
							href="https://www.linkedin.com/in/prashant-verma-a2a717272/"
							icon={<Linkedin className="w-5 h-5" />}
							label="LinkedIn"
							handle="@prashant-verma"
						/>
						<SocialLink
							href="mailto:prashantverma1357@gmail.com"
							icon={<Mail className="w-5 h-5" />}
							label="Email"
							handle="prashantverma1357@gmail.com"
						/>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="relative mt-32 pt-8 border-t border-white/[0.08] flex justify-between items-center">
				<button
					onClick={handleCopyrightTap}
					className="font-mono text-sm text-gray-600 hover:text-gray-500 transition-colors select-none"
				>
					© {currentYear} Prashant Verma
				</button>
			</div>

			{/* Easter egg hint — nearly invisible */}
			<div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/[0.36] select-none">
				<span className="hidden md:inline">$ try typing "SUDO"</span>
				<span className="md:hidden">$ try double-tapping ©</span>
			</div>
		</footer>
	)
}

function SocialLink({
	href,
	icon,
	label,
	handle,
}: {
	href: string
	icon: React.ReactNode
	label: string
	handle: string
}) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-center gap-4 p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all"
		>
			<div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.06] transition-all">
				<span className="text-gray-500 group-hover:text-gray-400">{icon}</span>
			</div>
			<div className="flex-1">
				<div className="font-mono text-xs text-gray-600 uppercase tracking-wider">
					{label}
				</div>
				<div className="font-body text-sm text-white group-hover:text-gray-300 transition-colors mt-1">
					{handle}
				</div>
			</div>
			<ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-gray-500 transition-colors" />
		</a>
	)
}
