import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ColorConverter } from "@/components/tools/ColorConverter";
import { ContrastChecker } from "@/components/tools/ContrastChecker";

export const metadata: Metadata = {
  title: "색상 변환기",
  description:
    "HEX·RGB·HSL·OKLCH를 서로 변환하고 WCAG 2.x 명암 대비를 검사하는 도구. 브라우저 안에서만 계산합니다.",
};

export default function ColorToolPage() {
  return (
    <Section className="max-w-3xl pt-10 sm:pt-10">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
      >
        <ArrowLeft aria-hidden className="h-4 w-4" />
        Tools
      </Link>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
        색상 변환기
      </h1>
      <p className="mt-3 text-sm text-[var(--color-muted)] sm:text-base">
        HEX·rgb()·hsl()·oklch() 중 아무 형식이나 붙여넣으면 나머지 형식으로
        바꿔 보여 줍니다.
      </p>
      <div className="mt-10">
        <ColorConverter />
      </div>

      <h2 className="mt-16 text-xl font-semibold tracking-tight sm:text-2xl">
        명암 대비 검사
      </h2>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        글자색과 배경색의 대비비를 WCAG 2.x 기준으로 계산합니다.
      </p>
      <div className="mt-6">
        <ContrastChecker />
      </div>
    </Section>
  );
}
