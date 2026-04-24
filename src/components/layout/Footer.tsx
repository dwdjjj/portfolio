import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { ArrowUp, Mail, Rss } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { site } from "@/data/site";

type ConnectLink = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  external: boolean;
};

const connectLinks: ConnectLink[] = [
  { Icon: FaGithub, label: "GitHub", href: site.github, external: true },
  { Icon: Rss, label: "Blog", href: site.blog, external: true },
  { Icon: Mail, label: "Email", href: `mailto:${site.email}`, external: false },
  { Icon: SiNotion, label: "Notion", href: site.notion, external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-5 sm:items-start">
          <div className="sm:col-span-3">
            <div className="flex items-center gap-2 text-[var(--color-fg)]">
              <Image
                src="/images/logo/kyj_18.png"
                alt={site.shortName}
                width={80}
                height={40}
                className="h-7 w-auto object-contain dark:invert"
              />
              <span className="text-sm font-normal text-[var(--color-muted)]">
                · Frontend Developer
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-muted)]">
              실시간·인터랙션이 중심이 되는 웹을 좋아하고,
              필요할 땐 백엔드 끝단까지 직접 다루려 합니다.
            </p>
          </div>

          <nav aria-label="Social links" className="sm:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-subtle)] sm:text-right">
              Connect
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
              {connectLinks.map(({ Icon, label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    <Icon
                      aria-hidden
                      className="h-3.5 w-3.5 text-[var(--color-subtle)] transition-colors group-hover:text-[var(--color-accent)]"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-subtle)]">
          <p>
            © {new Date().getFullYear()} {site.shortName}. Built with Next.js · Deployed on Vercel.
          </p>
          <a
            href="#about"
            className="group inline-flex items-center gap-1.5 text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
          >
            맨 위로
            <ArrowUp
              aria-hidden
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
