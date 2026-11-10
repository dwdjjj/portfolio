"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  describeRoot,
  formatJson,
  formatSize,
  parseJson,
  type ExcerptLine,
  type Indent,
} from "@/lib/json-format";
import { CopyButton, card, smallButton, toggleButton } from "./shared";

// 들여쓰기·줄바꿈이 엉망인 가짜 데이터. 큰 숫자는 자리수가 그대로 남는지 보여 주려고 넣었다.
const EXAMPLE_JSON =
  '{"service":"portfolio","version":"1.4.0",  "owner":{ "name":"홍길동","role":"frontend" },"orderId":12345678901234567890,\n"tags":["next","react" ,"tailwind"],"metrics":{"lcp":1.82,"cls":0.01,"pass":true},"deprecated":null}';

const INDENTS: { value: Indent; label: string }[] = [
  { value: "2", label: "2칸" },
  { value: "4", label: "4칸" },
  { value: "tab", label: "탭" },
];

const checkbox = "h-4 w-4 accent-[var(--color-accent)]";

export function JsonFormatter() {
  // 입력은 이 state에만 있다. 저장소·URL·네트워크로 내보내지 않는다.
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<Indent>("2");
  const [minify, setMinify] = useState(false);
  const [sortKeys, setSortKeys] = useState(false);

  // 큰 입력에서도 타이핑이 먼저 반영되도록 파싱은 한 박자 늦게 한다.
  const deferred = useDeferredValue(input);
  const stale = deferred !== input;
  const parsed = useMemo(
    () => (deferred.trim() ? parseJson(deferred) : null),
    [deferred],
  );
  const result = useMemo(() => {
    if (!parsed?.ok) return null;
    const text = formatJson(parsed.root, { indent, minify, sortKeys });
    return { text, info: `${describeRoot(parsed.root)} · ${formatSize(text)}` };
  }, [parsed, indent, minify, sortKeys]);
  const failed = parsed !== null && !parsed.ok;

  return (
    <div className="space-y-6">
      <div className={cn(card, "flex gap-3 text-sm text-[var(--color-muted)]")}>
        <Info
          aria-hidden
          className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]"
        />
        <div className="space-y-1.5">
          <p>
            <strong className="font-semibold text-[var(--color-fg)]">
              큰 숫자도 그대로 둡니다.
            </strong>{" "}
            12345678901234567890 같은 값은 보통 JSON.parse를 거치면 반올림되지만,
            여기서는 적힌 대로 나옵니다.
          </p>
        </div>
      </div>

      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="json-input" className="text-sm font-semibold">
            JSON
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              className={smallButton}
              onClick={() => setInput(EXAMPLE_JSON)}
            >
              예시 넣기
            </button>
            <button
              type="button"
              className={smallButton}
              onClick={() => setInput("")}
              disabled={!input}
            >
              지우기
            </button>
          </div>
        </div>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"a":1,"b":[1,2]} 처럼 JSON을 붙여넣으세요'
          rows={8}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          wrap="off"
          aria-invalid={failed}
          aria-describedby={failed ? "json-error" : undefined}
          className="block w-full resize-y rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 font-mono text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)]/60 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <div role="group" aria-label="들여쓰기" className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-subtle)]">들여쓰기</span>
          {INDENTS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={indent === value}
              disabled={minify}
              className={toggleButton(indent === value)}
              onClick={() => setIndent(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            className={checkbox}
            checked={minify}
            onChange={(e) => setMinify(e.target.checked)}
          />
          한 줄로 압축
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            className={checkbox}
            checked={sortKeys}
            onChange={(e) => setSortKeys(e.target.checked)}
          />
          키 이름순 정렬
        </label>
      </div>

      {parsed && !parsed.ok && (
        <div
          id="json-error"
          role="alert"
          className={cn(card, "flex gap-3 border-rose-500/40 text-sm")}
        >
          <AlertTriangle
            aria-hidden
            className="mt-0.5 h-5 w-5 shrink-0 text-rose-500"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">
              {parsed.location
                ? `${parsed.location.line}번째 줄 ${parsed.location.column}번째 글자에서 문법 오류`
                : "문법 오류 (위치를 찾지 못함)"}
            </p>
            <p className="mt-1 text-[var(--color-muted)]">{parsed.message}</p>
            {parsed.location && <Excerpt lines={parsed.location.excerpt} />}
          </div>
        </div>
      )}

      {result && (
        <div
          className={cn(card, "transition-opacity", stale && "opacity-60")}
          aria-busy={stale}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold">결과</h2>
              <p className="mt-1 text-xs text-[var(--color-muted)]">
                {result.info}
              </p>
            </div>
            <CopyButton value={result.text} label="정리한 JSON 복사" />
          </div>
          <pre className="mt-3 max-h-[70vh] overflow-auto font-mono text-xs leading-relaxed text-[var(--color-fg)] sm:text-sm">
            {result.text}
          </pre>
        </div>
      )}
    </div>
  );
}

function Excerpt({ lines }: { lines: ExcerptLine[] }) {
  const width = String(lines[lines.length - 1].number).length;
  return (
    <pre className="mt-3 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 font-mono text-xs leading-relaxed">
      {lines.map((line) => (
        <div key={line.number}>
          <span aria-hidden className="text-[var(--color-subtle)] select-none">
            {String(line.number).padStart(width, " ")} │{" "}
          </span>
          {line.cutStart && <span className="text-[var(--color-subtle)]">…</span>}
          {line.before}
          {line.mark !== null && (
            <mark className="rounded-sm bg-rose-500/20 text-rose-600 dark:text-rose-400">
              {line.mark === "" ? " " : line.mark}
              <span className="sr-only">(오류 위치)</span>
            </mark>
          )}
          {line.after}
          {line.cutEnd && <span className="text-[var(--color-subtle)]">…</span>}
        </div>
      ))}
    </pre>
  );
}
