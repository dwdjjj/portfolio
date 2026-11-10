import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { JwtDecoder } from "@/components/tools/JwtDecoder";

const intro =
  "토큰을 복사하여 붙여넣으면 헤더와 페이로드를 JSON 형태로 펼쳐 줍니다. 만료 시각과 남은 시간도 한국 시간 기준으로 확인이 가능합니다.";

export const metadata: Metadata = {
  title: "JWT 디코더",
  description: intro,
};

export default function JwtToolPage() {
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
        JWT 디코더
      </h1>
      <p className="mt-3 text-sm text-[var(--color-muted)] sm:text-base">
        {intro}
      </p>
      <div className="mt-10">
        <JwtDecoder />
      </div>
    </Section>
  );
}
