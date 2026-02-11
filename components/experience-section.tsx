"use client";
import { useI18n } from "@/lib/i18n";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Diretor de Conteúdo Digital, Marketing de Influência e Talentos",
    roleEn: "Director of Digital Content, Influencer Marketing & Talent",
    company: "Octagon",
    period: "2023 - ",
    location: "São Paulo, BR"
  },
  {
    role: "Líder de Operações LATAM",
    roleEn: "LATAM Operations Lead",
    company: "Jellysmack",
    period: "2021 - 2023",
    location: "Remote"
  },
  {
    role: "Content and Product Manager",
    roleEn: "Content and Product Manager",
    company: "Playground",
    period: "2020 - 2021",
    location: "São Paulo, BR"
  },
  {
    role: "Digital Platforms Manager",
    roleEn: "Digital Platforms Manager",
    company: "A+E Networks",
    period: "2012 - 2019",
    location: "São Paulo, BR"
  },
];

export function ExperienceSection() {
  const { t, locale } = useI18n();
  return (
    <section id="experience" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          {t.experience.sectionLabel}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          {t.experience.heading}
        </h2>
        <div className="mt-12 space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="flex gap-6 border-b border-border py-6 first:border-t"
            >
              <div className="w-32 flex-shrink-0">
                <p className="font-mono text-sm text-muted-foreground">
                  {exp.period.endsWith("- ")
                    ? `${exp.period}${t.experience.present}`
                    : exp.period}
                </p>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Briefcase className="h-4 w-4 text-primary" />
                  {locale === "en" ? exp.roleEn : exp.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">{exp.company}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{exp.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
