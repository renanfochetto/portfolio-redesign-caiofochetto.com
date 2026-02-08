import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { WorkSection } from "@/components/work-section"
import { ExperienceSection } from "@/components/experience-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WorkSection />
        <ExperienceSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
