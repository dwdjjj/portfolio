import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  UserRoundCog,
  Users,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { gradientFor } from "@/lib/project-gradients";
import { SkillIcon } from "@/lib/skill-icons";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="만든 것들"
      description="실서비스부터 사이드까지, 직접 부딪쳐 본 프로젝트입니다."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => {
          const gradient = gradientFor(p.slug);
          return (
            <Reveal key={p.slug} delay={(i % 2) * 0.05}>
              <Link
                href={`/projects/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30"
              >
                <div
                  className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${gradient}`}
                >
                  {p.cover ? (
                    <Image
                      src={p.cover}
                      alt={p.name}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <>
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:24px_24px]"
                      />
                      <div className="absolute inset-0 flex flex-col justify-between p-5">
                        <div className="flex items-center justify-between">
                          {p.category && (
                            <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                              {p.category}
                            </span>
                          )}
                          <ArrowUpRight className="h-5 w-5 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <p
                          aria-hidden
                          className="font-display text-xl font-semibold leading-tight tracking-tight text-white/95 sm:text-2xl"
                        >
                          {p.name}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold sm:text-lg">
                          {p.name}
                        </h3>
                        {p.status && (
                          <Badge
                            variant={
                              p.status === "진행중" ? "accent" : "outline"
                            }
                          >
                            {p.status}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        {p.tagline}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-5 grid grid-cols-3 gap-3 text-xs text-[var(--color-muted)]">
                    <div>
                      <dt className="flex items-center gap-1 text-[var(--color-subtle)]">
                        <Calendar aria-hidden className="h-3 w-3" />
                        기간
                      </dt>
                      <dd className="mt-1 tabular-nums">{p.period}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1 text-[var(--color-subtle)]">
                        <Users aria-hidden className="h-3 w-3" />팀
                      </dt>
                      <dd className="mt-1">{p.team}</dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1 text-[var(--color-subtle)]">
                        <UserRoundCog aria-hidden className="h-3 w-3" />
                        역할
                      </dt>
                      <dd className="mt-1">{p.role.split(" ")[0]}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-5">
                    <ul className="flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 5).map((t) => (
                        <li
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1 text-xs text-[var(--color-muted)]"
                        >
                          <SkillIcon
                            name={t}
                            className="h-3.5 w-3.5 shrink-0"
                          />
                          <span>{t}</span>
                        </li>
                      ))}
                      {p.tech.length > 5 && (
                        <li className="inline-flex items-center rounded-md border border-[var(--color-border)] px-2 py-1 text-xs text-[var(--color-subtle)]">
                          +{p.tech.length - 5}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
