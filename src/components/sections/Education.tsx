import { Award, Languages as LanguagesIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { education, awards, languages } from "@/data/education";

type TimelineEntry = {
  date: string;
  sortKey: number;
  type: "award" | "language";
  title: string;
  subtitle?: string;
  detail?: string;
};

function toSortKey(date: string): number {
  const [y, m = "01", d = "01"] = date.split(".");
  return new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`).getTime();
}

const timelineEntries: TimelineEntry[] = [
  ...awards.map<TimelineEntry>((a) => ({
    date: a.date,
    sortKey: toSortKey(a.date),
    type: "award",
    title: a.title,
    subtitle: a.org,
    detail: a.detail,
  })),
  ...languages.map<TimelineEntry>((l) => ({
    date: l.date,
    sortKey: toSortKey(l.date),
    type: "language",
    title: `${l.test} · ${l.level}`,
  })),
].sort((a, b) => b.sortKey - a.sortKey);

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

      <Reveal delay={0.05}>
        <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-2">
            <Award
              aria-hidden
              className="h-4 w-4 text-[var(--color-accent)]"
            />
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Certifications & Awards
            </h3>
          </div>

          <ol className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute left-[72px] top-1.5 bottom-1.5 w-px bg-gradient-to-b from-transparent via-[var(--color-border)] to-transparent sm:left-[88px]"
            />

            {timelineEntries.map((entry) => (
              <li
                key={`${entry.type}-${entry.title}`}
                className="relative flex gap-4 py-3 sm:gap-6"
              >
                <time className="w-[56px] shrink-0 pt-0.5 text-xs font-medium tabular-nums text-[var(--color-subtle)] sm:w-[72px] sm:text-sm">
                  {entry.date}
                </time>

                <span
                  aria-hidden
                  className={`relative mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-4 ring-[var(--color-bg-elevated)] ${
                    entry.type === "award"
                      ? "bg-[var(--color-accent)]"
                      : "bg-sky-500"
                  }`}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ${
                        entry.type === "award"
                          ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                          : "bg-sky-500/10 text-sky-500"
                      }`}
                    >
                      {entry.type === "award" ? (
                        <Award aria-hidden className="h-3 w-3" />
                      ) : (
                        <LanguagesIcon aria-hidden className="h-3 w-3" />
                      )}
                      {entry.type === "award" ? "수상" : "어학"}
                    </span>
                    <h4 className="text-sm font-medium text-[var(--color-fg)] sm:text-base">
                      {entry.title}
                    </h4>
                  </div>
                  {entry.subtitle && (
                    <p className="mt-1 text-xs text-[var(--color-muted)] sm:text-sm">
                      {entry.subtitle}
                    </p>
                  )}
                  {entry.detail && (
                    <p className="mt-1.5 text-xs text-[var(--color-muted)] sm:text-sm">
                      {entry.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}
