import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { WorkSection } from "@/components/work-section"
import { ExperienceSection } from "@/components/experience-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      <Header />
      <main>
        <Hero />
        <WorkSection />
        <ExperienceSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
