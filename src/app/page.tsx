import { NavBar } from "@/components/portfolio/NavBar"
import { HeroSection } from "@/components/portfolio/HeroSection"
import { ProjectsSection } from "@/components/portfolio/ProjectsSection"
import { AboutSection } from "@/components/portfolio/AboutSection"
import { FooterSection } from "@/components/portfolio/FooterSection"
import { EasterEggTerminal } from "@/components/portfolio/EasterEggTerminal"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <NavBar />
      <EasterEggTerminal />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <FooterSection />
    </main>
  )
}
