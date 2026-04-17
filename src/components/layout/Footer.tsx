import type { ComponentType, SVGProps } from "react";
import { Mail, Rss } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
import { navLinks, site } from "@/data/site";

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
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-[var(--color-fg)]">
              {site.shortName}
              <span className="ml-2 text-[var(--color-muted)]">
                · Frontend Developer
              </span>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">
              실시간·인터랙션이 중심이 되는 웹을 좋아하고,
              필요할 땐 백엔드 끝단까지 직접 다루려 합니다.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              Connect
            </p>
            <ul className="mt-4 space-y-2">
              {connectLinks.map(({ Icon, label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    <Icon aria-hidden className="h-3.5 w-3.5" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-subtle)]">
          © {new Date().getFullYear()} {site.shortName}. Built with Next.js · Deployed on Vercel.
        </div>
      </div>
    </footer>
  );
}
