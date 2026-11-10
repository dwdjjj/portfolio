"use client";

import { ArrowLeftRight, ArrowUpDown, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { WCAG_LEVELS, contrastRatio, toHex } from "@/lib/color";
import { ColorField, useColorInput } from "./ColorField";
import { card, smallButton } from "./shared";

export function ContrastChecker() {
  const fg = useColorInput("#ffffff");
  const bg = useColorInput("#0d9488");

  function swap() {
    const fgText = fg.text;
    fg.set(bg.text);
    bg.set(fgText);
  }

  const fgColor = fg.result.ok ? fg.result.color : null;
  const bgColor = bg.result.ok ? { ...bg.result.color, alpha: 1 } : null;
  const ratio = fgColor && bgColor ? contrastRatio(fgColor, bgColor) : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-start">
        <ColorField id="contrast-fg" label="글자색(전경)" input={fg} />
        <button
          type="button"
          onClick={swap}
          className={cn(smallButton, "justify-self-center sm:mt-9")}
          aria-label="글자색과 배경색 바꾸기"
        >
          <ArrowUpDown aria-hidden className="h-3.5 w-3.5 sm:hidden" />
          <ArrowLeftRight aria-hidden className="hidden h-3.5 w-3.5 sm:block" />
          바꾸기
        </button>
        <ColorField id="contrast-bg" label="배경색" input={bg} />
      </div>

      {ratio !== null && fgColor && bgColor && (
        <>
          <div className={card}>
            <p className="text-xs text-[var(--color-subtle)]">대비비</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">
              {ratio.toFixed(2)}
              <span className="text-[var(--color-muted)]">:1</span>
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {WCAG_LEVELS.map(({ id, level, size, min }) => {
                const pass = ratio >= min;
                return (
                  <li
                    key={id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] px-4 py-3"
                  >
                    <div className="text-sm">
                      <span className="font-semibold">{level}</span> {size}
                      <span className="block text-xs text-[var(--color-subtle)] tabular-nums">
                        {min}:1 이상
                      </span>
                    </div>
                    {pass ? (
                      <Badge variant="accent" className="gap-1">
                        <Check aria-hidden className="h-3.5 w-3.5" />
                        통과
                      </Badge>
                    ) : (
                      <Badge className="gap-1 border-rose-500/40 bg-transparent text-rose-600 dark:text-rose-400">
                        <X aria-hidden className="h-3.5 w-3.5" />
                        미달
                      </Badge>
                    )}
                  </li>
                );
              })}
            </ul>
            <ul className="mt-4 space-y-1 text-xs text-[var(--color-muted)]">
              <li>큰 글자: 24px 이상, 또는 굵게 18.66px(14pt) 이상.</li>
              <li>통과 여부는 반올림하기 전 값으로 판정합니다.</li>
              {fgColor.alpha < 1 && <li>글자색의 투명도는 배경 위에 겹친 색으로 계산합니다.</li>}
              {bg.result.ok && bg.result.color.alpha < 1 && (
                <li>배경색의 투명도는 빼고 불투명한 색으로 계산합니다.</li>
              )}
            </ul>
          </div>

          <div
            className="space-y-2 rounded-2xl border border-[var(--color-border)] p-5 wrap-anywhere"
            style={{ backgroundColor: toHex(bgColor), color: toHex(fgColor) }}
          >
            <p className="text-base">일반 글자 16px · 다람쥐 헌 쳇바퀴에 타고파 0123</p>
            <p className="text-2xl">큰 글자 24px · 가나다 ABC</p>
            <p className="text-[18.66px] font-bold">굵은 글자 18.66px · 가나다 ABC</p>
          </div>
        </>
      )}
    </div>
  );
}
