import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} · ${site.shortName}`,
      description: project.tagline,
      url: `${site.url}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-16 pb-24 sm:px-8">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <header className="mt-8">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.name}
          </h1>
          {project.status && (
            <Badge variant={project.status === "진행중" ? "accent" : "outline"}>
              {project.status}
            </Badge>
          )}
        </div>
        <p className="mt-3 text-base text-[var(--color-muted)] sm:text-lg">
          {project.tagline}
        </p>

        <dl className="mt-6 grid gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              기간
            </dt>
            <dd className="mt-1 tabular-nums">{project.period}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              인원
            </dt>
            <dd className="mt-1">{project.team}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              역할
            </dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
        </dl>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
          기술 스택
        </h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">주요 업무</h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)] sm:text-base">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-subtle)]"
            >
              {h}
            </li>
          ))}
        </ul>
      </section>

      {project.results && project.results.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">주요 성과</h2>
          <ul className="mt-4 space-y-2 text-sm sm:text-base">
            {project.results.map((r) => (
              <li
                key={r}
                className="relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--color-accent)]"
              >
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.growth && (
        <section className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            성장 경험
          </h2>
          <p className="mt-3 text-sm text-[var(--color-fg)] sm:text-base">
            {project.growth}
          </p>
        </section>
      )}

      {project.links && project.links.length > 0 && (
        <section className="mt-10 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
            >
              {l.label}
            </a>
          ))}
        </section>
      )}
    </article>
  );
}
