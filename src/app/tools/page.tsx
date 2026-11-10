import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { tools } from "@/data/tools";

const intro =
  "일하다 자주 찾게 되는 도구를 직접 만들어 모았습니다. 입력한 값은 서버로 가지 않고 이 브라우저 안에서만 처리됩니다.";

export const metadata: Metadata = {
  title: "Tools",
  description: intro,
};

export default function ToolsPage() {
  return (
    <Section className="max-w-3xl pt-10 sm:pt-10">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Tools
      </h1>
      <p className="mt-3 text-sm text-[var(--color-muted)] sm:text-base">
        {intro}
      </p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {tools.map(({ href, title, description, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition-colors hover:border-[var(--color-accent)]/40"
            >
              <div className="flex items-center justify-between">
                <Icon aria-hidden className="h-5 w-5 text-[var(--color-accent)]" />
                <ArrowUpRight
                  aria-hidden
                  className="h-5 w-5 text-[var(--color-subtle)] transition-colors group-hover:text-[var(--color-accent)]"
                />
              </div>
              <h2 className="mt-4 text-base font-semibold transition-colors group-hover:text-[var(--color-accent)] sm:text-lg">
                {title}
              </h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{description}</p>
              <div className="mt-auto pt-4">
                <Badge variant="outline">브라우저 전용</Badge>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
