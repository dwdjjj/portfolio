"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { countText, type TextStats } from "@/lib/text-count";
import { card, smallButton, textField } from "./shared";

const STATS: { key: keyof TextStats; label: string; unit: string }[] = [
  { key: "chars", label: "공백 포함", unit: "자" },
  { key: "charsNoSpace", label: "공백 제외", unit: "자" },
  { key: "words", label: "단어", unit: "개" },
  { key: "lines", label: "줄", unit: "줄" },
  { key: "utf8Bytes", label: "UTF-8", unit: "바이트" },
  { key: "koreanBytes", label: "한글 2바이트 기준", unit: "바이트" },
];

const BASIS = [
  { key: "chars", label: "공백 포함" },
  { key: "charsNoSpace", label: "공백 제외" },
] as const;
type Basis = (typeof BASIS)[number]["key"];

const num = (n: number) => n.toLocaleString("ko-KR");

export function CharCounter() {
  // 글은 이 state에만 있다. 저장소·URL·네트워크로 내보내지 않는다.
  const [text, setText] = useState("");
  const [target, setTarget] = useState("");
  const [basis, setBasis] = useState<Basis>("chars");
  const stats = useMemo(() => countText(text), [text]);

  const goal = /^\d+$/.test(target) && Number(target) > 0 ? Number(target) : null;
  const current = stats[basis];
  const left = goal === null ? 0 : goal - current;

  return (
    <div className="space-y-6">
      <div className={cn(card, "flex gap-3 text-sm text-[var(--color-muted)]")}>
        <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
        <p>입력한 내용은 서버로 보내지 않고 저장하지도 않습니다.</p>
      </div>

      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="count-input" className="text-sm font-semibold">
            글
          </label>
          <button
            type="button"
            className={smallButton}
            onClick={() => setText("")}
            disabled={!text}
          >
            지우기
          </button>
        </div>
        <textarea
          id="count-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="세어 볼 글을 붙여넣으세요"
          rows={10}
          className={cn(textField, "resize-y p-4 font-sans text-base leading-relaxed")}
        />
      </div>

      <dl className={cn(card, "grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3")}>
        {STATS.map(({ key, label, unit }) => (
          <div key={key}>
            <dt className="text-xs text-[var(--color-subtle)]">{label}</dt>
            <dd className="mt-1 tabular-nums">
              <span className="text-2xl font-semibold">{num(stats[key])}</span>{" "}
              <span className="text-xs text-[var(--color-muted)]">{unit}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className={cn(card, "space-y-4")}>
        <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
          <div>
            <label htmlFor="count-target" className="text-sm font-semibold">
              목표 글자 수
            </label>
            <input
              id="count-target"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="예: 1000"
              className={cn(textField, "mt-2 h-10 w-36 px-4")}
            />
          </div>
          <fieldset>
            <legend className="sr-only">세는 기준</legend>
            <div className="flex gap-2">
              {BASIS.map(({ key, label }) => (
                <label
                  key={key}
                  className={cn(
                    smallButton,
                    "cursor-pointer py-2 has-[:checked]:border-[var(--color-accent)]/60 has-[:checked]:text-[var(--color-accent)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-accent)]",
                  )}
                >
                  <input
                    type="radio"
                    name="count-basis"
                    value={key}
                    checked={basis === key}
                    onChange={() => setBasis(key)}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {goal !== null && (
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm tabular-nums">
              <span className="text-[var(--color-muted)]">
                {num(current)} / {num(goal)}자 ({BASIS.find((b) => b.key === basis)?.label})
              </span>
              <span
                className={cn(
                  "font-semibold",
                  left < 0 ? "text-rose-600 dark:text-rose-400" : "text-[var(--color-accent)]",
                )}
              >
                {left < 0 ? `${num(-left)}자 초과` : `${num(left)}자 남음`}
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="목표 대비 글자 수"
              aria-valuemin={0}
              aria-valuemax={goal}
              aria-valuenow={Math.min(current, goal)}
              className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--color-border)]"
            >
              <div
                className={cn(
                  "h-full rounded-full transition-[width]",
                  left < 0 ? "bg-rose-500" : "bg-[var(--color-accent)]",
                )}
                style={{ width: `${Math.min(100, (current / goal) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className={cn(card, "text-sm text-[var(--color-muted)]")}>
        <h2 className="font-semibold text-[var(--color-fg)]">세는 기준</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            글자: 이모지(👍🏽, 👨‍👩‍👧)와 결합 문자도 눈에 보이는 한 글자로 셉니다. 줄바꿈은
            공백 포함에서 1자, 공백 제외에서는 0자입니다.
          </li>
          <li>단어: 띄어쓰기·줄바꿈으로 나눈 개수</li>
          <li>
            UTF-8: 입력 그대로의 바이트 수입니다. 영문·숫자 1, 한글 3, 이모지는 4
            이상, 줄바꿈 1바이트.
          </li>
          <li>
            한글 2바이트 기준: 영문·숫자·기호·공백(ASCII) 1바이트, 한글·한자·이모지 등
            그 밖의 글자는 한 글자당 2바이트, 줄바꿈은 2바이트(폼 전송 때 CR+LF로
            바뀌는 기준)입니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
