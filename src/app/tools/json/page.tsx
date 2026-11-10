import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { JsonFormatter } from "@/components/tools/JsonFormatter";

export const metadata: Metadata = {
  title: "JSON 포매터",
  description:
    "뭉친 JSON을 들여쓰기해 정리하고, 문법 오류는 줄·칸 위치로 보여 주는 포매터. 입력을 서버로 보내지 않습니다.",
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
        붙여넣는 즉시 들여쓰기를 맞춰 다시 쓰고, 문법이 틀리면 몇 번째 줄 몇 번째
        글자인지 보여 줍니다.
      </p>
      <div className="mt-10">
        <JsonFormatter />
      </div>
    </Section>
  );
}
