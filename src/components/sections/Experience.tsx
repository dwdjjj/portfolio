import {
  Building2,
  Calendar,
  CircleCheckBig,
  MapPin,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/experience";

const STRIPE_GRADIENTS = [
  "from-sky-400 via-indigo-400 to-violet-500",
  "from-teal-400 via-emerald-400 to-cyan-500",
  "from-amber-400 via-orange-400 to-rose-500",
  "from-fuchsia-400 via-pink-400 to-rose-500",
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="제품과 함께 거쳐온 일과 시간"
      description="실서비스에서 만든 결과물과 그 과정의 의사결정을 정리했습니다."
    >
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent sm:left-[15px]"
        />

        <ol className="space-y-8">
          {experience.map((exp, i) => {
            const stripe = STRIPE_GRADIENTS[i % STRIPE_GRADIENTS.length];
            return (
              <li
                key={exp.company}
                className="relative pl-8 sm:pl-12"
              >
                <span
                  aria-hidden
                  className={`absolute left-[5px] top-7 h-3 w-3 rounded-full bg-gradient-to-br ${stripe} ring-4 ring-[var(--color-bg)] sm:left-[9px]`}
                />

                <Reveal delay={i * 0.05}>
                  <article className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
                    <div
                      aria-hidden
                      className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${stripe}`}
                    />

                    <div className="p-6 pl-7 sm:p-8 sm:pl-9">
                      <header className="flex flex-col gap-3 border-b border-[var(--color-border)] pb-5">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                          <div className="flex items-center gap-2">
                            <Building2
                              aria-hidden
                              className="h-5 w-5 text-[var(--color-muted)]"
                            />
                            <h3 className="text-lg font-semibold sm:text-xl">
                              {exp.company}
                            </h3>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {exp.tags?.map((t) => (
                              <Badge key={t} variant="outline">
                                {t}
                              </Badge>
                            ))}
                            {exp.current && (
                              <Badge variant="accent">재직중</Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-sm font-medium text-[var(--color-fg)]">
                          {exp.role}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-muted)]">
                          {exp.location && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin aria-hidden className="h-3.5 w-3.5" />
                              {exp.location}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 tabular-nums">
                            <Calendar aria-hidden className="h-3.5 w-3.5" />
                            {exp.period}
                          </span>
                        </div>
                      </header>

                      {exp.summary && (
                        <p className="mt-5 text-sm text-[var(--color-muted)] sm:text-base">
                          {exp.summary}
                        </p>
                      )}

                      <div className="mt-6">
                        <div className="mb-4 flex items-center gap-2">
                          <TrendingUp
                            aria-hidden
                            className="h-4 w-4 text-[var(--color-accent)]"
                          />
                          <h4 className="text-sm font-semibold text-[var(--color-fg)]">
                            주요 성과
                          </h4>
                        </div>

                        <div className="space-y-5">
                          {exp.workItems.map((item) => (
                            <div
                              key={item.title}
                              className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)]/60 p-4 sm:p-5"
                            >
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <h5 className="text-sm font-semibold sm:text-base">
                                  {item.title}
                                </h5>
                                <span className="text-xs text-[var(--color-subtle)] tabular-nums">
                                  {item.period}
                                </span>
                              </div>

                              <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-muted)]">
                                {item.bullets.map((b) => (
                                  <li
                                    key={b}
                                    className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-sky-500"
                                  >
                                    {b}
                                  </li>
                                ))}
                              </ul>

                              {item.results && item.results.length > 0 && (
                                <ul className="mt-3 space-y-1 border-t border-[var(--color-border)] pt-3 text-sm text-[var(--color-fg)]">
                                  {item.results.map((r) => (
                                    <li
                                      key={r}
                                      className="flex items-start gap-2"
                                    >
                                      <CircleCheckBig
                                        aria-hidden
                                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]"
                                      />
                                      <span>{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="mb-3 flex items-center gap-2">
                          <Wrench
                            aria-hidden
                            className="h-4 w-4 text-[var(--color-muted)]"
                          />
                          <h4 className="text-sm font-semibold text-[var(--color-fg)]">
                            사용 기술
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tech.map((t) => (
                            <Badge key={t} variant="outline">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
