import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="제품과 함께 거쳐온 일과 시간"
      description="실서비스에서 만든 결과물과 그 과정의 의사결정을 정리했습니다."
    >
      <div className="space-y-6">
        {experience.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.05}>
            <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 sm:p-8">
              <header className="flex flex-col gap-2 border-b border-[var(--color-border)] pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold sm:text-xl">
                      {exp.company}
                    </h3>
                    {exp.current && <Badge variant="accent">재직중</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {exp.role}
                  </p>
                </div>
                <p className="text-sm text-[var(--color-subtle)] tabular-nums">
                  {exp.period}
                </p>
              </header>

              {exp.summary && (
                <p className="mt-5 text-sm text-[var(--color-muted)] sm:text-base">
                  {exp.summary}
                </p>
              )}

              <div className="mt-6 space-y-5">
                {exp.workItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-sm font-semibold sm:text-base">
                        {item.title}
                      </h4>
                      <span className="text-xs text-[var(--color-subtle)] tabular-nums">
                        {item.period}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-muted)]">
                      {item.bullets.map((b) => (
                        <li
                          key={b}
                          className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-subtle)]"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                    {item.results && item.results.length > 0 && (
                      <div className="mt-3 border-t border-[var(--color-border)] pt-3">
                        <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
                          Results
                        </p>
                        <ul className="space-y-1 text-sm text-[var(--color-fg)]">
                          {item.results.map((r) => (
                            <li
                              key={r}
                              className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-accent)]"
                            >
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {exp.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
