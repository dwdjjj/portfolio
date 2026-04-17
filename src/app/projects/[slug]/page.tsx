import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CircleCheckBig,
  ExternalLink,
  ListChecks,
  Sparkles,
  TrendingUp,
  UserRoundCog,
  Users,
  Wrench,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { gradientFor } from "@/lib/project-gradients";
import { SkillIcon } from "@/lib/skill-icons";

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

function isGitHubLink(href: string) {
  return /github\.com/i.test(href);
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;
  const gradient = gradientFor(project.slug);

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-10 pb-24 sm:px-8">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <div
        className={`relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${gradient}`}
      >
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.name}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        ) : (
          <>
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:32px_32px]"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              {project.category && (
                <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  {project.category}
                </span>
              )}
              <p
                aria-hidden
                className="font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
              >
                {project.name}
              </p>
            </div>
          </>
        )}
      </div>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
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
            <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              <Calendar aria-hidden className="h-3.5 w-3.5" />
              기간
            </dt>
            <dd className="mt-1.5 tabular-nums">{project.period}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              <Users aria-hidden className="h-3.5 w-3.5" />
              인원
            </dt>
            <dd className="mt-1.5">{project.team}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              <UserRoundCog aria-hidden className="h-3.5 w-3.5" />
              역할
            </dt>
            <dd className="mt-1.5">{project.role}</dd>
          </div>
        </dl>
      </header>

      <section className="mt-10">
        <div className="mb-3 flex items-center gap-2">
          <Wrench aria-hidden className="h-4 w-4 text-[var(--color-muted)]" />
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-fg)]">
            기술 스택
          </h2>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2.5 py-1 text-xs text-[var(--color-muted)]"
            >
              <SkillIcon name={t} className="h-3.5 w-3.5 shrink-0" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <ListChecks
            aria-hidden
            className="h-4 w-4 text-[var(--color-accent)]"
          />
          <h2 className="text-lg font-semibold">주요 업무</h2>
        </div>
        <ul className="space-y-2 text-sm text-[var(--color-muted)] sm:text-base">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-sky-500"
            >
              {h}
            </li>
          ))}
        </ul>
      </section>

      {project.results && project.results.length > 0 && (
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp
              aria-hidden
              className="h-4 w-4 text-[var(--color-accent)]"
            />
            <h2 className="text-lg font-semibold">주요 성과</h2>
          </div>
          <ul className="space-y-2 text-sm sm:text-base">
            {project.results.map((r) => (
              <li key={r} className="flex items-start gap-2">
                <CircleCheckBig
                  aria-hidden
                  className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.growth && (
        <section className="relative mt-10 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
          <div
            aria-hidden
            className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${gradient}`}
          />
          <div className="p-6 pl-7">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles
                aria-hidden
                className="h-4 w-4 text-[var(--color-accent)]"
              />
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                성장 경험
              </h2>
            </div>
            <p className="text-sm text-[var(--color-fg)] sm:text-base">
              {project.growth}
            </p>
          </div>
        </section>
      )}

      {project.links && project.links.length > 0 && (
        <section className="mt-10 flex flex-wrap gap-3">
          {project.links.map((l) => {
            const IconComp = isGitHubLink(l.href) ? FaGithub : ExternalLink;
            return (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
              >
                <IconComp aria-hidden className="h-4 w-4" />
                {l.label}
              </a>
            );
          })}
        </section>
      )}

      {(prev || next) && (
        <nav
          aria-label="다른 프로젝트"
          className="mt-16 grid gap-3 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 transition-colors hover:border-[var(--color-accent)]/40"
            >
              <ArrowLeft className="mt-1 h-4 w-4 shrink-0 text-[var(--color-subtle)] transition-colors group-hover:text-[var(--color-accent)]" />
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                  이전
                </p>
                <p className="mt-1 truncate text-sm font-medium">{prev.name}</p>
                <p className="mt-0.5 truncate text-xs text-[var(--color-muted)]">
                  {prev.tagline}
                </p>
              </div>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-start justify-end gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 text-right transition-colors hover:border-[var(--color-accent)]/40 sm:text-right"
            >
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                  다음
                </p>
                <p className="mt-1 truncate text-sm font-medium">{next.name}</p>
                <p className="mt-0.5 truncate text-xs text-[var(--color-muted)]">
                  {next.tagline}
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[var(--color-subtle)] transition-colors group-hover:text-[var(--color-accent)]" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </article>
  );
}
