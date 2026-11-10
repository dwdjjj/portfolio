import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { TimestampConverter } from "@/components/tools/TimestampConverter";

const intro =
  "로그나 DB에서 본 타임스탬프를 붙여넣으면 한국 시간·UTC·ISO 8601로 바꿉니다. 날짜를 넣으면 거꾸로 초·밀리초 값이 나옵니다.";

export const metadata: Metadata = {
  title: "타임스탬프 변환기",
  description: intro,
};

export default function TimestampToolPage() {
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
        타임스탬프 변환기
      </h1>
      <p className="mt-3 text-sm text-[var(--color-muted)] sm:text-base">
        {intro}
      </p>
      <div className="mt-10">
        <TimestampConverter />
      </div>
    </Section>
  );
}
