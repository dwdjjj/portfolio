import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="만든 것들"
      description="실서비스부터 사이드까지, 직접 부딪쳐 본 프로젝트입니다."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.05}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-bg)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold sm:text-lg">
                      {p.name}
                    </h3>
                    {p.status && (
                      <Badge
                        variant={p.status === "진행중" ? "accent" : "outline"}
                      >
                        {p.status}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {p.tagline}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--color-subtle)] transition-colors group-hover:text-[var(--color-accent)]" />
              </div>

              <dl className="mt-5 grid grid-cols-3 gap-3 text-xs text-[var(--color-muted)]">
                <div>
                  <dt className="text-[var(--color-subtle)]">기간</dt>
                  <dd className="mt-0.5 tabular-nums">{p.period}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-subtle)]">팀</dt>
                  <dd className="mt-0.5">{p.team}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-subtle)]">역할</dt>
                  <dd className="mt-0.5">{p.role.split(" ")[0]}</dd>
                </div>
              </dl>

              <div className="mt-auto pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 5).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                  {p.tech.length > 5 && (
                    <Badge variant="outline">+{p.tech.length - 5}</Badge>
                  )}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
