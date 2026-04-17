import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-4 px-6 text-sm text-[var(--color-muted)] sm:flex-row sm:items-center sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.shortName}. Built with Next.js
          &amp; deployed on Vercel.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-fg)]"
          >
            GitHub
          </a>
          <a
            href={site.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-fg)]"
          >
            Blog
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-[var(--color-fg)]">
            Email
          </a>
          <a
            href={site.notion}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-fg)]"
          >
            Notion
          </a>
        </div>
      </div>
    </footer>
  );
}
