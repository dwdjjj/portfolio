"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

// 도구 화면 공통 카드·버튼·입력칸 모양과 복사 버튼.
export const card =
  "rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5";
export const smallButton =
  "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-50";

export const textField =
  "block w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] font-mono text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)]/60 focus:outline-none";

/** 여러 값 중 하나를 고르는 버튼. 선택된 쪽은 강조색. */
export function toggleButton(active: boolean) {
  return cn(
    smallButton,
    active &&
      "border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
  );
}

export function CopyButton({
  value,
  label,
  disabled,
}: {
  value: string;
  /** 스크린 리더용 이름. 예: "결과 복사" */
  label: string;
  disabled?: boolean;
}) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("done");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 1500);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(smallButton, "shrink-0")}
      aria-label={label}
      disabled={disabled}
    >
      {state === "done" ? (
        <Check aria-hidden className="h-3.5 w-3.5" />
      ) : (
        <Copy aria-hidden className="h-3.5 w-3.5" />
      )}
      <span aria-live="polite">
        {state === "done" ? "복사됨" : state === "failed" ? "복사 실패" : "복사"}
      </span>
    </button>
  );
}
