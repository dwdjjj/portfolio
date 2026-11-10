import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { CharCounter } from "@/components/tools/CharCounter";

export const metadata: Metadata = {
  title: "글자 수 세기",
  description:
    "공백 포함·제외 글자 수, 단어·줄 수, UTF-8과 한글 2바이트 기준 바이트 수를 세는 도구. 글을 서버로 보내지 않습니다.",
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
        글을 붙여넣으면 공백 포함·제외 글자 수와 바이트 수를 바로 셉니다. 자기소개서
        양식에서 쓰는 한글 2바이트 기준도 함께 보여 줍니다.
      </p>
      <div className="mt-10">
        <CharCounter />
      </div>
    </Section>
  );
}
