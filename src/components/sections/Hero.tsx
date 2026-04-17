import { profile } from "@/data/profile";
import { site } from "@/data/site";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section
      id="about"
      className="relative mx-auto flex min-h-[88vh] w-full max-w-5xl scroll-mt-24 flex-col justify-center px-6 pt-32 pb-20 sm:px-8"
    >
      <Reveal>
        <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1 text-xs text-[var(--color-muted)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          </span>
          {profile.status}
        </span>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">
          PORTFOLIO / {new Date().getFullYear()}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h1 className="mt-4 text-balance text-5xl font-semibold leading-tight tracking-tight sm:text-7xl">
          {profile.headline}
        </h1>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-6 max-w-2xl space-y-1.5 text-base text-[var(--color-muted)] sm:text-lg">
          {profile.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mt-4 max-w-2xl text-sm text-[var(--color-subtle)] sm:text-base">
          {profile.philosophy}
        </p>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-10 grid w-full max-w-2xl gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-subtle)]">
              Focus
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.focus.map((f) => (
                <Badge key={f} variant="outline">
                  {f}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-subtle)]">
              Contact
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="text-[var(--color-fg)] hover:text-[var(--color-accent)]"
              >
                {site.email}
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-fg)]"
              >
                github.com/dwdjjj
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
