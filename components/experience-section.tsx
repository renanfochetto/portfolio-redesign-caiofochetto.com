"use client";

import { useI18n } from "@/lib/i18n";
import { Briefcase } from "lucide-react";

const experiences = [
  { role: "Director of Creator Economy", company: "Octagon", period: "2022 - ", location: "Sao Paulo, BR" },
  { role: "LATAM Lead", company: "Jellysmack", period: "2021 - 2022", location: "Remote" },
  { role: "Head of Digital Strategy", company: "Agencia XYZ", period: "2018 - 2021", location: "Sao Paulo, BR" },
  { role: "Senior Marketing Manager", company: "Agency ABC", period: "2015 - 2018", location: "Sao Paulo, BR" },
  { role: "Digital Marketing Analyst", company: "StartupCo", period: "2012 - 2015", location: "Sao Paulo, BR" },
];

export function ExperienceSection() {
  const { t } = useI18n();

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
                  {exp.period.endsWith("- ") ? `${exp.period}${t.experience.present}` : exp.period}
                </p>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Briefcase className="h-4 w-4 text-primary" />
                  {exp.role}
                </h3>
                <p className="mt-0.5 ml-6 text-sm font-medium text-primary">
                  {exp.company}
                </p>
                <p className="ml-6 text-xs text-muted-foreground">{exp.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
