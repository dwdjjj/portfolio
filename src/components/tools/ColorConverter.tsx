"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, Copy, Info, Pipette } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  toHex,
  toHslString,
  toOklchString,
  toRgbString,
  type Rgba,
} from "@/lib/color";
import { ColorField, useColorInput } from "./ColorField";
import { card, smallButton } from "./shared";

const FORMATS: [label: string, format: (c: Rgba) => string][] = [
  ["HEX", toHex],
  ["RGB", toRgbString],
  ["HSL", toHslString],
  ["OKLCH", toOklchString],
];

// Chromium 계열에만 있는 EyeDropper API. 표준 DOM 타입에 아직 없어 필요한 부분만 적는다.
type EyeDropperCtor = new () => { open: () => Promise<{ sRGBHex: string }> };

const subscribe = () => () => {};

export function ColorConverter() {
  const input = useColorInput("#0d9488");
  // 서버 렌더·하이드레이션 중에는 null(아직 모름), 그 뒤 실제 지원 여부.
  const eyeDropperSupported = useSyncExternalStore<boolean | null>(
    subscribe,
    () => "EyeDropper" in window,
    () => null,
  );
  const { result } = input;

  async function pick() {
    const EyeDropper = (window as Window & { EyeDropper?: EyeDropperCtor }).EyeDropper;
    if (!EyeDropper) return;
    try {
      const { sRGBHex } = await new EyeDropper().open();
      input.set(sRGBHex);
    } catch {
      // Esc로 취소하면 AbortError로 끝난다. 입력값은 그대로 둔다.
    }
  }

  return (
    <div className="space-y-6">
      <ColorField
        id="color-input"
        label="색"
        input={input}
        placeholder="#0d9488, rgb(13 148 136), hsl(…), oklch(…)"
        actions={
          <button
            type="button"
            className={smallButton}
            onClick={pick}
            disabled={!eyeDropperSupported}
          >
            <Pipette aria-hidden className="h-3.5 w-3.5" />
            스포이드
          </button>
        }
        note={
          eyeDropperSupported === false && (
            <p className="mt-2 text-xs text-[var(--color-subtle)]">
              이 브라우저는 스포이드를 지원하지 않습니다. Chrome·Edge 데스크톱에서
              동작합니다.
            </p>
          )
        }
      />

      {result.ok && (
        <>
          {result.clipped && (
            <div className={cn(card, "flex gap-3 text-sm text-[var(--color-muted)]")}>
              <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
              <p>
                <strong className="font-semibold text-[var(--color-fg)]">
                  sRGB 범위 밖이라 가까운 색으로 표시합니다.
                </strong>{" "}
                아래 네 값은 모두 잘라낸 색 기준입니다.
              </p>
            </div>
          )}

          <div
            role="img"
            aria-label={`미리보기 ${toHex(result.color)}`}
            className="h-32 rounded-2xl border border-[var(--color-border)]"
            style={{
              // 투명도가 있으면 바둑판 무늬 위에 겹쳐 보여 준다.
              backgroundImage: `linear-gradient(${toHex(result.color)}, ${toHex(result.color)}), repeating-conic-gradient(var(--color-border) 0 25%, var(--color-bg) 0 50%)`,
              backgroundSize: "auto, 16px 16px",
            }}
          />

          <dl className={cn(card, "divide-y divide-[var(--color-border)] py-1")}>
            {FORMATS.map(([label, format]) => (
              <div key={label} className="flex items-center gap-3 py-3">
                <dt className="w-14 shrink-0 text-xs text-[var(--color-subtle)]">{label}</dt>
                <dd className="min-w-0 flex-1 font-mono text-sm wrap-anywhere">
                  {format(result.color)}
                </dd>
                <CopyButton label={label} text={format(result.color)} />
              </div>
            ))}
          </dl>
        </>
      )}
    </div>
  );
}

function CopyButton({ label, text }: { label: string; text: string }) {
  const [copy, setCopy] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopy("done");
    } catch {
      setCopy("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopy("idle"), 1500);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(smallButton, "shrink-0")}
      aria-label={`${label} 값 복사`}
    >
      {copy === "done" ? (
        <Check aria-hidden className="h-3.5 w-3.5" />
      ) : (
        <Copy aria-hidden className="h-3.5 w-3.5" />
      )}
      <span aria-live="polite">
        {copy === "done" ? "복사됨" : copy === "failed" ? "복사 실패" : "복사"}
      </span>
    </button>
  );
}
