import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { TimestampConverter } from "@/components/tools/TimestampConverter";

export const metadata: Metadata = {
  title: "타임스탬프 변환기",
  description:
    "유닉스 타임스탬프(초·밀리초)를 한국 시간·UTC·ISO 8601로, 한국 시간을 타임스탬프로 바꾸는 변환기.",
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
        유닉스 타임스탬프를 한국 시간·UTC·ISO 8601로 바꾸고, 반대로 한국 시간을
        초·밀리초 타임스탬프로 바꿉니다.
      </p>
      <div className="mt-10">
        <TimestampConverter />
      </div>
    </Section>
  );
}
