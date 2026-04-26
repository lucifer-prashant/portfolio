"use client"

import { useEffect, useState, useRef, useCallback } from "react"

const PROJECTS = [
  { name: "TypinSpeed",             status: "LIVE",      url: "https://typinspeeed.vercel.app/",                                    tech: "React · Firebase" },
  { name: "AI Flowchart",           status: "LIVE",      url: "https://genflowchart.vercel.app/",                                   tech: "React · NVIDIA NIM · D3.js" },
  { name: "Duplicate File Cleaner", status: "LIVE",      url: "https://github.com/lucifer-prashant/DuplicateFileCleaner/releases",  tech: "Electron · Windows" },
  { name: "LLM → Notion",           status: "CODE REPO", url: "https://github.com/lucifer-prashant/textToNotion",                  tech: "Python · OpenRouter · Notion API" },
  { name: "ML-Monitor",             status: "CODE REPO", url: "https://github.com/lucifer-prashant/ml-monitor",                    tech: "Python · FastAPI · React · Pandas" },
]

const LAB = [
  { name: "Sorting Visualizer", url: "https://visuasort.vercel.app/" },
  { name: "Falling Sand",       url: "https://lucifer-prashant.github.io/FallingSand/" },
  { name: "EvoSim",             url: "https://lucifer-prashant.github.io/EvoSim/" },
  { name: "2048",               url: "https://lucifer-prashant.github.io/2048_game/" },
  { name: "Swiggy Statistics",  url: "https://github.com/lucifer-prashant/swiggy-statistics" },
]

// All openable targets — keys are lowercase aliases, values are URLs
const OPEN_MAP: Record<string, string> = {
  typinspeed:             "https://typinspeeed.vercel.app/",
  typingspeed:            "https://typinspeeed.vercel.app/",
  typing:                 "https://typinspeeed.vercel.app/",
  "ai-flowchart":         "https://genflowchart.vercel.app/",
  flowchart:              "https://genflowchart.vercel.app/",
  "ai flowchart":         "https://genflowchart.vercel.app/",
  cleaner:                "https://github.com/lucifer-prashant/DuplicateFileCleaner/releases",
  duplicate:              "https://github.com/lucifer-prashant/DuplicateFileCleaner/releases",
  "duplicate file cleaner":"https://github.com/lucifer-prashant/DuplicateFileCleaner/releases",
  notion:                 "https://github.com/lucifer-prashant/textToNotion",
  "llm-notion":           "https://github.com/lucifer-prashant/textToNotion",
  "ml-monitor":           "https://github.com/lucifer-prashant/ml-monitor",
  mlmonitor:              "https://github.com/lucifer-prashant/ml-monitor",
  sorting:                "https://visuasort.vercel.app/",
  "sorting-visualizer":   "https://visuasort.vercel.app/",
  sand:                   "https://lucifer-prashant.github.io/FallingSand/",
  "falling-sand":         "https://lucifer-prashant.github.io/FallingSand/",
  evosim:                 "https://lucifer-prashant.github.io/EvoSim/",
  evo:                    "https://lucifer-prashant.github.io/EvoSim/",
  "2048":                 "https://lucifer-prashant.github.io/2048_game/",
  swiggy:                 "https://github.com/lucifer-prashant/swiggy-statistics",
  github:                 "https://github.com/lucifer-prashant",
  linkedin:               "https://www.linkedin.com/in/prashant-verma-a2a717272/",
}

function resolveOpenTarget(input: string): string | null {
  const normalized = input.toLowerCase().replace(/\s+/g, "-")
  // exact match
  if (OPEN_MAP[normalized]) return OPEN_MAP[normalized]
  // spaces version
  const spaced = input.toLowerCase()
  if (OPEN_MAP[spaced]) return OPEN_MAP[spaced]
  // partial: find first key that contains the input or input contains the key
  const key = Object.keys(OPEN_MAP).find(
    (k) => k.includes(normalized) || normalized.includes(k)
  )
  return key ? OPEN_MAP[key] : null
}

function resolveCommand(raw: string): { lines: string[]; action?: "clear" | "exit" | { open: string } } {
  const cmd = raw.trim().toLowerCase()
  const parts = cmd.split(/\s+/)

  if (cmd === "help") {
    return {
      lines: [
        "┌─ COMMANDS ──────────────────────────────────────────────┐",
        "│                                                           │",
        "│  whoami              identity card                       │",
        "│  neofetch            system specs                        │",
        "│  ls projects         list all projects                   │",
        "│  ls lab              list experiments                    │",
        "│  open <name>         launch a project in browser         │",
        "│  skills              skill breakdown                     │",
        "│  git log             commit history                      │",
        "│  contact             reach out                           │",
        "│  clear               clear terminal                      │",
        "│  exit                close                               │",
        "│                                                           │",
        "└───────────────────────────────────────────────────────────┘",
      ],
    }
  }

  if (cmd === "whoami") {
    return {
      lines: [
        "  ┌──────────────────────────────────────────┐",
        "  │  prashant verma                          │",
        "  │  ───────────────────────────────────     │",
        "  │  role    full-stack + ML                 │",
        "  │  based   bhubaneswar, india              │",
        "  │  uni     KIIT · CSE · CGPA 8.52          │",
        "  └──────────────────────────────────────────┘",
      ],
    }
  }

  if (cmd === "neofetch" || cmd === "fetch") {
    return {
      lines: [
        "  ┌──┐    prashant@portfolio",
        "  │PV│    ───────────────────────────────────",
        "  └──┘    OS        NightOwl 2.0 LTS",
        "          Kernel    caffeine-4.2.0-amd64",
        "          Shell     overthinking-zsh 5.9",
        "          Uptime    20 yrs 6 mos",
        "          Packages  too many (npm audit: scary)",
        "          Memory    perpetually full",
        "          CPU       sleep-deprived @ ~3am",
        "          Disk      /projects filling up fast",
        "          ",
        "          ████ ████ ████ ████ ████ ████ ████ ████",
      ],
    }
  }

  if (cmd === "ls" || cmd === "ls projects") {
    return {
      lines: [
        `  ${"NAME".padEnd(26)} ${"STATUS".padEnd(12)} TECH`,
        `  ${"─".repeat(66)}`,
        ...PROJECTS.map((p) => `  ${p.name.padEnd(26)} ${p.status.padEnd(12)} ${p.tech}`),
        "",
        "  run 'open <name>' to launch · 'ls lab' for experiments",
      ],
    }
  }

  if (cmd === "ls lab" || cmd === "ls /lab") {
    return {
      lines: [
        `  ${"NAME".padEnd(24)} URL`,
        `  ${"─".repeat(60)}`,
        ...LAB.map((p) => `  ${p.name.padEnd(24)} ${p.url}`),
      ],
    }
  }

  if (parts[0] === "open") {
    const target = parts.slice(1).join(" ")
    if (!target) return { lines: ["usage: open <project-name>", "e.g.  open flowchart"] }
    const url = resolveOpenTarget(target)
    if (!url) {
      return {
        lines: [
          `no match for '${target}'`,
          "try: typinspeed · flowchart · cleaner · notion · ml-monitor",
          "     sorting · sand · evosim · 2048 · swiggy · github",
        ],
      }
    }
    return { lines: [`opening ${url} ...`], action: { open: url } }
  }

  if (cmd === "skills") {
    return {
      lines: [
        "  FRONTEND",
        "  React · Next.js · TypeScript · Tailwind · JavaScript",
        "",
        "  BACKEND",
        "  Python · FastAPI · Firebase · Node.js · PostgreSQL",
        "",
        "  ML & TOOLS",
        "  Pandas · Docker · Git · Linux · OpenAI API · NVIDIA NIM",
      ],
    }
  }

  if (cmd === "git log" || cmd === "git log --oneline") {
    return {
      lines: [
        "* f3a91c2  (HEAD) fix: convinced it works by not looking too hard",
        "* b7d04e1  feat: added AI that actually does the thing",
        "* 9c21fa3  chore: deleted node_modules. cried. reinstalled.",
        "* 4e5b89d  feat: built sorting visualizer at 2am for fun",
        "* 12ab3c7  fix: it works on my machine — shipping the machine",
        "* 8d90e14  refactor: renamed everything to names i'll forget",
        "* a1f55b2  feat: ML monitor because prod was a black box",
        "* 0d32c91  init: decided to be a developer. no looking back.",
      ],
    }
  }

  if (cmd === "contact") {
    return {
      lines: [
        "  email     prashantverma1357@gmail.com",
        "  github    github.com/lucifer-prashant",
        "  linkedin  linkedin.com/in/prashant-verma-a2a717272",
        "  phone     +91-7586985253",
      ],
    }
  }

  if (cmd === "date") return { lines: [new Date().toString()] }

  if (cmd === "ping" || cmd === "ping prashant") {
    return {
      lines: [
        "PING prashant (0.0.0.1): 56 bytes",
        "64 bytes: icmp_seq=0 ttl=64 time=0.3ms",
        "64 bytes: icmp_seq=1 ttl=64 time=0.2ms",
        "--- prashant ping statistics ---",
        "2 packets transmitted, 2 received, 0% loss",
        "he's online.",
      ],
    }
  }

  if (cmd.startsWith("sudo ")) {
    return { lines: ["you're already root. there's nowhere higher to go."] }
  }

  if (cmd === "42") return { lines: ["yes. that is the answer."] }

  if (cmd === "coffee" || cmd === "make coffee") {
    return {
      lines: [
        "  ( (",
        "   ) )",
        "  ........",
        "  |      |]",
        "  \\      /",
        "   `────'",
        "  brewing... done.",
      ],
    }
  }

  if (cmd === "clear") return { lines: [], action: "clear" }
  if (cmd === "exit" || cmd === "quit") return { lines: [], action: "exit" }

  return {
    lines: [`command not found: ${parts[0]}  (type 'help' to see commands)`],
  }
}

type HistoryLine = { type: "input" | "output"; text: string; id: number }

const BOOT_LINES = [
  "access granted.",
  "welcome, stranger.",
  "",
  "you found the terminal. type 'help' to see what's here.",
]

export function EasterEggTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<HistoryLine[]>([])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState(-1)
  const [keySequence, setKeySequence] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const lineId = useRef(0)
  // tracks active tab-cycle session for `open` completions
  const tabSession = useRef<{ matches: string[]; index: number } | null>(null)

  const nextId = () => ++lineId.current

  const focusInput = useCallback(() => {
    setTimeout(() => inputRef.current?.focus(), 10)
  }, [])

  const addLines = useCallback((lines: string[], delayMs = 25) => {
    return new Promise<void>((resolve) => {
      if (lines.length === 0) { resolve(); return }
      lines.forEach((text, i) => {
        setTimeout(() => {
          setHistory((prev) => [...prev, { type: "output", text, id: nextId() }])
          if (i === lines.length - 1) resolve()
        }, i * delayMs)
      })
    })
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setHistory([])
    setCmdHistory([])
    setCmdHistoryIndex(-1)
    setInput("")
  }, [])

  // SUDO keyboard listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isOpen) return
      const seq = (keySequence + e.key.toUpperCase()).slice(-4)
      setKeySequence(seq)
      if (seq === "SUDO") {
        setIsOpen(true)
        setKeySequence("")
      }
    }
    window.addEventListener("keypress", handleKey)
    return () => window.removeEventListener("keypress", handleKey)
  }, [keySequence, isOpen])

  // Mobile double-tap listener
  useEffect(() => {
    const handleOpenTerminal = () => { if (!isOpen) setIsOpen(true) }
    window.addEventListener("open-terminal", handleOpenTerminal)
    return () => window.removeEventListener("open-terminal", handleOpenTerminal)
  }, [isOpen])

  // Boot sequence
  useEffect(() => {
    if (isOpen) {
      setHistory([])
      addLines(BOOT_LINES, 60).then(focusInput)
    }
  }, [isOpen, addLines, focusInput])

  // Scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, close])

  const runCommand = useCallback(async (raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) { focusInput(); return }

    setHistory((prev) => [...prev, { type: "input", text: trimmed, id: nextId() }])
    setCmdHistory((prev) => [trimmed, ...prev])
    setCmdHistoryIndex(-1)
    setIsProcessing(true)

    const result = resolveCommand(trimmed)

    if (result.action === "clear") {
      setHistory([{ type: "output", text: "type 'help' to see commands", id: nextId() }])
      setIsProcessing(false)
      focusInput()
      return
    }
    if (result.action === "exit") {
      close()
      setIsProcessing(false)
      return
    }
    if (typeof result.action === "object" && "open" in result.action) {
      await addLines(result.lines, 20)
      setTimeout(() => window.open((result.action as { open: string }).open, "_blank"), 400)
      setIsProcessing(false)
      focusInput()
      return
    }

    await addLines(result.lines, result.lines.length > 6 ? 20 : 0)
    setIsProcessing(false)
    focusInput()
  }, [addLines, close, focusInput])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return
    const val = input
    setInput("")
    runCommand(val)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      const next = Math.min(cmdHistoryIndex + 1, cmdHistory.length - 1)
      setCmdHistoryIndex(next)
      setInput(cmdHistory[next] ?? "")
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = cmdHistoryIndex - 1
      if (next < 0) { setCmdHistoryIndex(-1); setInput(""); return }
      setCmdHistoryIndex(next)
      setInput(cmdHistory[next] ?? "")
    }
    if (e.key === "Tab") {
      e.preventDefault()

      if (input.toLowerCase().startsWith("open ")) {
        const query = input.slice(5).toLowerCase()
        const session = tabSession.current

        // if we're already cycling and the current input matches where we left off, advance
        if (session && session.matches[session.index] === query) {
          const next = (session.index + 1) % session.matches.length
          tabSession.current = { ...session, index: next }
          setInput("open " + session.matches[next])
          return
        }

        // new session — find all keys that start with the query
        const matches = Object.keys(OPEN_MAP).filter(
          (k) => k.startsWith(query) && k !== query
        )
        if (matches.length === 0) return
        tabSession.current = { matches, index: 0 }
        setInput("open " + matches[0])
        return
      }

      // not an open command — reset any session
      tabSession.current = null
      const completions = ["help", "whoami", "neofetch", "ls projects", "ls lab", "open ", "skills", "git log", "contact", "clear", "exit"]
      const match = completions.find((c) => c.startsWith(input) && c !== input)
      if (match) setInput(match)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center md:p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={close} />

      <div
        className="relative w-full md:max-w-2xl bg-[#0d0d0d] md:rounded-xl rounded-t-xl border border-white/[0.1] shadow-[0_32px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        style={{ animation: "termIn 0.2s ease-out" }}
        onClick={(e) => { e.stopPropagation(); focusInput() }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.07]">
          <button onClick={close} className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <span className="font-mono text-[11px] text-gray-600 mx-auto tracking-wider">
            prashant@portfolio — bash
          </span>
        </div>

        {/* Output */}
        <div
          ref={terminalRef}
          className="h-[60vh] md:h-[420px] overflow-y-auto px-4 md:px-6 py-4 md:py-5 font-mono text-[11px] md:text-[13px] leading-relaxed scrollbar-none"
        >
          {history.map((line) => (
            <div
              key={line.id}
              className={line.type === "input" ? "text-white mb-1 mt-3" : "text-gray-500 mb-0.5"}
            >
              {line.type === "input" && (
                <span className="text-gray-700 mr-2 select-none">❯</span>
              )}
              <span className="whitespace-pre-wrap">{line.text}</span>
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-3">
            <span className="text-gray-700 select-none">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => { tabSession.current = null; setInput(e.target.value) }}
              onKeyDown={handleKeyDown}
              disabled={isProcessing}
              className="flex-1 bg-transparent text-white outline-none font-mono text-[11px] md:text-[13px] caret-white disabled:opacity-50"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              enterKeyHint="send"
            />
          </form>
        </div>

        {/* Status bar */}
        <div className="px-4 py-2 border-t border-white/[0.05] flex justify-between items-center">
          <span className="font-mono text-[10px] text-gray-700 hidden md:block">
            ↑↓ history · tab complete · esc close
          </span>
          <span className="font-mono text-[10px] text-gray-700 md:hidden">
            tap backdrop to close
          </span>
          <span className="font-mono text-[10px] text-gray-800">root access</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes termIn {
          from { opacity: 0; transform: scale(0.97) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
