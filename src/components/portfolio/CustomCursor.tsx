"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
	const cursorRef = useRef<HTMLDivElement>(null)
	const dotRef = useRef<HTMLDivElement>(null)
	const [isPointer, setIsPointer] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		// Check for mobile/touch devices
		setIsMobile("ontouchstart" in window || navigator.maxTouchPoints > 0)
	}, [])

	useEffect(() => {
		if (isMobile) return

		let mouseX = 0
		let mouseY = 0
		let cursorX = 0
		let cursorY = 0
		let dotX = 0
		let dotY = 0

		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX
			mouseY = e.clientY
			setIsVisible(true)

			const target = e.target as HTMLElement
			const isClickable =
				target.tagName === "BUTTON" ||
				target.tagName === "A" ||
				target.closest("button") ||
				target.closest("a") ||
				window.getComputedStyle(target).cursor === "pointer"

			setIsPointer(!!isClickable)
		}

		const handleMouseLeave = () => setIsVisible(false)
		const handleMouseEnter = () => setIsVisible(true)

		// Smooth animation loop using requestAnimationFrame
		const animate = () => {
			// Smooth lerp for outer ring
			cursorX += (mouseX - cursorX) * 0.12
			cursorY += (mouseY - cursorY) * 0.12

			// Faster lerp for dot
			dotX += (mouseX - dotX) * 0.3
			dotY += (mouseY - dotY) * 0.3

			if (cursorRef.current) {
				cursorRef.current.style.transform = `translate(${cursorX - 16}px, ${cursorY - 16}px)`
			}
			if (dotRef.current) {
				dotRef.current.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`
			}

			requestAnimationFrame(animate)
		}

		window.addEventListener("mousemove", handleMouseMove)
		document.addEventListener("mouseleave", handleMouseLeave)
		document.addEventListener("mouseenter", handleMouseEnter)

		const animationId = requestAnimationFrame(animate)

		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
			document.removeEventListener("mouseleave", handleMouseLeave)
			document.removeEventListener("mouseenter", handleMouseEnter)
			cancelAnimationFrame(animationId)
		}
	}, [isMobile])

	if (isMobile) return null

	return (
		<>
			<style jsx global>{`
				@media (pointer: fine) {
					* {
						cursor: none !important;
					}
				}
			`}</style>

			{/* Outer ring - refined grayscale */}
			<div
				ref={cursorRef}
				className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
					isVisible ? "opacity-100" : "opacity-0"
				}`}>
				<div
					className={`w-8 h-8 rounded-full border transition-all duration-300 ${
						isPointer
							? "border-white bg-white/5 scale-150"
							: "border-white/20 bg-transparent scale-100"
					}`}
				/>
			</div>

			{/* Inner dot - minimal */}
			<div
				ref={dotRef}
				className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
					isVisible ? "opacity-100" : "opacity-0"
				}`}>
				<div
					className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
						isPointer ? "bg-white scale-0" : "bg-white scale-100"
					}`}
				/>
			</div>
		</>
	)
}
