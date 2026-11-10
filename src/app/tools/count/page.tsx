import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { CharCounter } from "@/components/tools/CharCounter";

const intro =
  "글을 붙여넣으면 공백 포함·제외 글자 수와 바이트 수가 바로 나옵니다. 자소서 양식에서 쓰는 한글 2바이트 기준도 같이 셉니다.";

export const metadata: Metadata = {
  title: "글자 수 세기",
  description: intro,
};

export default function CountToolPage() {
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
        글자 수 세기
      </h1>
      <p className="mt-3 text-sm text-[var(--color-muted)] sm:text-base">
        {intro}
      </p>
      <div className="mt-10">
        <CharCounter />
      </div>
    </Section>
  );
}
