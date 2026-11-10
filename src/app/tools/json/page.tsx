import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { JsonFormatter } from "@/components/tools/JsonFormatter";

const intro =
  "읽기 힘든 JSON 텍스트 형식을 보기 좋게 정리해 줍니다. 문법이 틀린 부분도 손쉽게 확인이 가능합니다.";

export const metadata: Metadata = {
  title: "JSON 포매터",
  description: intro,
};

export default function JsonToolPage() {
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
        JSON 포매터
      </h1>
      <p className="mt-3 text-sm text-[var(--color-muted)] sm:text-base">
        {intro}
      </p>
      <div className="mt-10">
        <JsonFormatter />
      </div>
    </Section>
  );
}
