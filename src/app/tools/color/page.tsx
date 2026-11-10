import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ColorConverter } from "@/components/tools/ColorConverter";
import { ContrastChecker } from "@/components/tools/ContrastChecker";

const intro =
  "HEX·rgb()·hsl()·oklch() 중 어떤 형식으로 넣어도 나머지 세 형식으로 바꿉니다.";

export const metadata: Metadata = {
  title: "색상 변환기",
  description: intro,
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
        {intro}
      </p>
      <div className="mt-10">
        <ColorConverter />
      </div>

      <h2 className="mt-16 text-xl font-semibold tracking-tight sm:text-2xl">
        명암 대비 검사
      </h2>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        글자색과 배경색을 넣으면 WCAG 2.x 대비비와 통과 여부가 나옵니다.
      </p>
      <div className="mt-6">
        <ContrastChecker />
      </div>
    </Section>
  );
}
