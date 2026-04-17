import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Skills"
      title="다루는 기술"
      description="실제 프로젝트에서 사용해 본 기술을 카테고리별로 정리했습니다."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * 0.05}>
            <div className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-fg)]">
                {g.title}
              </h3>
              <p className="mt-2 text-xs text-[var(--color-muted)]">
                {g.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1 text-xs text-[var(--color-muted)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
