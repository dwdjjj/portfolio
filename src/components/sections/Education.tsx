import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { education, awards, languages } from "@/data/education";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="배워온 시간과 만들어 본 결과들"
    >
      <div className="grid gap-4">
        {education.map((edu, i) => (
          <Reveal key={edu.school} delay={i * 0.05}>
            <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 sm:p-7">
              <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold sm:text-lg">
                    {edu.school}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    {edu.program}
                  </p>
                </div>
                <span className="text-sm text-[var(--color-subtle)] tabular-nums">
                  {edu.period}
                </span>
              </header>
              <ul className="mt-4 space-y-1.5 text-sm text-[var(--color-muted)]">
                {edu.bullets.map((b) => (
                  <li
                    key={b}
                    className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-subtle)]"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Reveal>
          <div className="rounded-2xl border border-[var(--color-border)] p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Awards
            </p>
            <ul className="space-y-3 text-sm">
              {awards.map((a) => (
                <li key={a.title}>
                  <p className="font-medium text-[var(--color-fg)]">
                    {a.title}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-subtle)]">
                    {a.org} · {a.date}
                  </p>
                  <p className="mt-1.5 text-sm text-[var(--color-muted)]">
                    {a.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-[var(--color-border)] p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Languages
            </p>
            <ul className="space-y-2 text-sm">
              {languages.map((l) => (
                <li
                  key={l.test}
                  className="flex items-baseline justify-between gap-2"
                >
                  <span className="text-[var(--color-fg)]">
                    {l.test}{" "}
                    <span className="text-[var(--color-muted)]">{l.level}</span>
                  </span>
                  <span className="text-xs text-[var(--color-subtle)] tabular-nums">
                    {l.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
