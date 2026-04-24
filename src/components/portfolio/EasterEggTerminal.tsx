"use client"

import { useEffect, useState, useRef, useCallback } from "react"

const commands: Record<string, string> = {
	help: `Available commands:
  ls projects    - List all projects
  cat about.txt  - Display about info
  whoami         - Display identity
  skills         - Show skill levels
  contact        - Show contact info
  clear          - Clear terminal
  exit           - Close terminal`,

	"ls projects": `drwxr-xr-x  typing-website    [LIVE]
drwxr-xr-x  notion-sync       [LIVE]
drwxr-xr-x  ml-monitor        [LIVE]
drwxr-xr-x  ai-flowchart      [IN PROGRESS]`,

	"cat about.txt": `==========================================
PRASHANT VERMA - Developer Profile
==========================================

Computer Science student passionate about 
intelligent and real-time web applications.

Focus Areas:
- Full-stack web development
- AI/ML integration
- Real-time systems
- Developer tooling

Currently exploring ML operations through 
model drift monitoring.
==========================================`,

	whoami: `
╔═══════════════════════════════════╗
║  USER: prashant                   ║
║  ROLE: Full-Stack Developer       ║
║  LEVEL: Senior Student            ║
║  STATUS: AVAILABLE                ║
╚═══════════════════════════════════╝`,

	skills: `SKILL MATRIX:
───────────────────────────────────────
React       ████████████████████░░░░ 85%
Python      ████████████████████░░░░ 80%
TypeScript  ████████████████████░░░░ 85%
FastAPI     ████████████████░░░░░░░░ 70%
Firebase    ███████████████████░░░░░ 80%
Docker      ██████████████░░░░░░░░░░ 60%
───────────────────────────────────────`,

	contact: `
CONTACT ENDPOINTS:
───────────────────────────────────────
EMAIL:    prashantverma1357@gmail.com
GITHUB:   github.com/lucifer-prashant
LINKEDIN: linkedin.com/in/prashant-verma-a2a717272
PHONE:    +91-7586985253
───────────────────────────────────────`,
}

export function EasterEggTerminal() {
	const [isOpen, setIsOpen] = useState(false)
	const [input, setInput] = useState("")
	const [history, setHistory] = useState<
		{ type: "input" | "output"; text: string }[]
	>([])
	const [keySequence, setKeySequence] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)
	const terminalRef = useRef<HTMLDivElement>(null)

	// Listen for SUDO sequence
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (isOpen) return

			const newSequence = (keySequence + e.key.toUpperCase()).slice(-4)
			setKeySequence(newSequence)

			if (newSequence === "SUDO") {
				setIsOpen(true)
				setKeySequence("")
				setHistory([
					{
						type: "output",
						text: `
╔═══════════════════════════════════════════════╗
║   WELCOME TO THE TERMINAL                     ║
║   Type 'help' for available commands          ║
╚═══════════════════════════════════════════════╝
`,
					},
				])
			}
		}

		window.addEventListener("keypress", handleKeyPress)
		return () => window.removeEventListener("keypress", handleKeyPress)
	}, [keySequence, isOpen])

	// Focus input when terminal opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isOpen])

	// Scroll to bottom when history updates
	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight
		}
	}, [history])

	const handleCommand = useCallback((cmd: string) => {
		const trimmedCmd = cmd.trim().toLowerCase()

		setHistory((prev) => [...prev, { type: "input", text: `> ${cmd}` }])

		if (trimmedCmd === "exit") {
			setIsOpen(false)
			setHistory([])
			return
		}

		if (trimmedCmd === "clear") {
			setHistory([])
			return
		}

		const response =
			commands[trimmedCmd] ||
			`Command not found: ${cmd}\nType 'help' for available commands.`
		setHistory((prev) => [...prev, { type: "output", text: response }])
	}, [])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!input.trim()) return
		handleCommand(input)
		setInput("")
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/95 backdrop-blur-xl"
				onClick={() => {
					setIsOpen(false)
					setHistory([])
				}}
			/>

			{/* Terminal window */}
			<div className="relative w-full max-w-3xl bg-black rounded-2xl border border-white/[0.15] shadow-[0_0_50px_rgba(255,255,255,0.1)] animate-terminalOpen overflow-hidden">
				{/* Title bar */}
				<div className="flex items-center justify-between px-4 py-3 bg-white/[0.08] border-b border-white/[0.12]">
					<div className="flex items-center gap-2">
						<div
							className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/30 cursor-pointer"
							onClick={() => {
								setIsOpen(false)
								setHistory([])
							}}
						/>
						<div className="w-3 h-3 rounded-full bg-white/15" />
						<div className="w-3 h-3 rounded-full bg-white/15" />
					</div>
					<span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
						prashant@portfolio:~$
					</span>
					<span className="font-mono text-xs text-gray-600">v1.0.0</span>
				</div>

				{/* Terminal content */}
				<div
					ref={terminalRef}
					className="h-[400px] overflow-y-auto p-6 font-mono text-sm bg-black">
					{history.map((item, index) => (
						<div
							key={index}
							className={`whitespace-pre-wrap mb-2 ${
								item.type === "input" ? "text-white" : "text-gray-400"
							}`}>
							{item.text}
						</div>
					))}

					{/* Input line */}
					<form onSubmit={handleSubmit} className="flex items-center gap-2">
						<span className="text-white">{">"}</span>
						<input
							ref={inputRef}
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className="flex-1 bg-transparent text-white outline-none font-mono caret-white"
							autoFocus
							spellCheck={false}
							autoComplete="off"
						/>
						<span className="w-2 h-4 bg-white rounded-sm animate-pulse" />
					</form>
				</div>

				{/* Status bar */}
				<div className="px-4 py-2 bg-white/[0.04] border-t border-white/[0.08] flex justify-between">
					<span className="font-mono text-xs text-gray-600">
						Press ESC or type 'exit' to close
					</span>
					<span className="font-mono text-xs text-gray-500">
						SECRET ACCESS GRANTED
					</span>
				</div>
			</div>

			{/* ESC key listener */}
			<style jsx>{`
				@keyframes terminalOpen {
					from {
						opacity: 0;
						transform: scale(0.95) translateY(20px);
					}
					to {
						opacity: 1;
						transform: scale(1) translateY(0);
					}
				}
				.animate-terminalOpen {
					animation: terminalOpen 0.3s ease-out;
				}
			`}</style>
		</div>
	)
}
