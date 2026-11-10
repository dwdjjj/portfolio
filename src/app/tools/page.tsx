import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, KeyRound } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Tools",
  description: "브라우저 안에서만 동작하는 작은 개발 도구 모음.",
};

export default function ToolsPage() {
  return (
    <Section className="max-w-3xl pt-10 sm:pt-10">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Tools
      </h1>
      <p className="mt-3 text-sm text-[var(--color-muted)] sm:text-base">
        개발하면서 자주 쓰는 작은 도구들입니다. 입력한 내용은 모두 브라우저
        안에서만 처리합니다.
      </p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        <li>
          <Link
            href="/tools/jwt"
            className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition-colors hover:border-[var(--color-accent)]/40"
          >
            <div className="flex items-center justify-between">
              <KeyRound
                aria-hidden
                className="h-5 w-5 text-[var(--color-accent)]"
              />
              <ArrowUpRight
                aria-hidden
                className="h-5 w-5 text-[var(--color-subtle)] transition-colors group-hover:text-[var(--color-accent)]"
              />
            </div>
            <h2 className="mt-4 text-base font-semibold transition-colors group-hover:text-[var(--color-accent)] sm:text-lg">
              JWT 디코더
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              토큰의 헤더·페이로드와 만료 시각을 한국 시간으로 확인합니다.
            </p>
            <div className="mt-auto pt-4">
              <Badge variant="outline">브라우저 전용</Badge>
            </div>
          </Link>
        </li>
      </ul>
    </Section>
  );
}
