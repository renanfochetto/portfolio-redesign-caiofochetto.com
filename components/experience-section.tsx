"use client";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { Briefcase } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "./animated-section";

const experiences = [
  {
    role: "Diretor de Conteúdo Digital, Marketing de Influência e Talentos",
    roleEn: "Director of Digital Content, Influencer Marketing & Talent",
    company: "Octagon",
    logo: "/companies/octagon.avif",
    period: "2023 - ",
    location: "São Paulo, BR"
  },
  {
    role: "Líder de Operações LATAM",
    roleEn: "LATAM Operations Lead",
    company: "Jellysmack",
    logo: "/companies/jellysmack.avif",
    period: "2021 - 2023",
    location: "Remote"
  },
  {
    role: "Content and Product Manager",
    roleEn: "Content and Product Manager",
    company: "Playground",
    logo: "/companies/playground.avif",
    period: "2020 - 2021",
    location: "São Paulo, BR"
  },
  {
    role: "Digital Platforms Manager",
    roleEn: "Digital Platforms Manager",
    company: "A+E Networks",
    logo: "/companies/aenetworks.avif",
    period: "2012 - 2019",
    location: "São Paulo, BR"
  },
];

export function ExperienceSection() {
  const { t, locale } = useI18n();
  return (
    <section id="experience" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          {t.experience.sectionLabel}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          {t.experience.heading}
        </h2>
        <div className="mt-12 space-y-0">
          {experiences.map((exp, i) => (
            <AnimatedItem
              key={i}
              index={i}
              className="flex gap-4 border-b border-border py-6 first:border-t"
            >
              <div className="flex items-center justify-center">
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  width={64}
                  height={64}
                  className="rounded object-contain"
                  unoptimized={true}
                />
              </div>
              <div className="flex-1">
                <p className="font-mono text-xs text-muted-foreground md:text-sm">
                  {exp.period.endsWith("- ")
                    ? `${exp.period}${t.experience.present}`
                    : exp.period}
                </p>
                <h3 className="mt-2 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Briefcase className="h-4 w-4 text-primary" />
                  {locale === "en" ? exp.roleEn : exp.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">{exp.company}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{exp.location}</p>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
