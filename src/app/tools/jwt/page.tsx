import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { JwtDecoder } from "@/components/tools/JwtDecoder";

export const metadata: Metadata = {
  title: "JWT 디코더",
  description:
    "JWT의 헤더·페이로드와 만료 시각을 브라우저 안에서만 확인하는 디코더. 토큰을 서버로 보내지 않습니다.",
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
        토큰을 붙여넣으면 헤더와 페이로드를 펼쳐 보여주고, 만료 시각을 한국
        시간으로 알려줍니다.
      </p>
      <div className="mt-10">
        <JwtDecoder />
      </div>
    </Section>
  );
}
