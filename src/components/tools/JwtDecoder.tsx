"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { CopyButton, card, smallButton } from "./shared";
import {
  PART_LABEL,
  TIME_CLAIMS,
  decodeJwt,
  formatKst,
  tokenStatus,
  type TimeClaim,
  type TokenStatus,
} from "@/lib/jwt";

// 가짜 데이터로 만든 예시 토큰(서명도 의미 없는 문자열).
const EXAMPLE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vLXVzZXItMDAwMSIsIm5hbWUiOiLtmY3quLjrj5kiLCJyb2xlIjoi6rKM7Iqk7Yq4IiwiaWF0IjoxNzY3MjI1NjAwLCJuYmYiOjE3NjcyMjU2MDAsImV4cCI6NDEwMjQ0NDgwMH0.ZXhhbXBsZS1zaWduYXR1cmUtbm90LXZlcmlmaWVk";

const CLAIM_LABEL: Record<TimeClaim, string> = {
  exp: "만료",
  iat: "발급",
  nbf: "사용 시작",
};

export function JwtDecoder() {
  // 토큰은 이 state에만 있다. 저장소·URL·네트워크로 내보내지 않는다.
  const [input, setInput] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const result = useMemo(
    () => (input.trim() ? decodeJwt(input) : null),
    [input],
  );
  const decoded = result?.ok ? result.value : null;
  const hasDecoded = decoded !== null;

  useEffect(() => {
    if (!hasDecoded) return;
    const id = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(id);
  }, [hasDecoded]);

  function update(value: string) {
    setInput(value);
    setNow(Date.now());
  }

  const alg = decoded?.header.alg;

  return (
    <div className="space-y-6">
      <div className={cn(card, "flex gap-3 text-sm text-[var(--color-muted)]")}>
        <ShieldCheck
          aria-hidden
          className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]"
        />
        <div className="space-y-1.5">
          <p>
            <strong className="font-semibold text-[var(--color-fg)]">
              토큰은 이 브라우저 안에서만 디코딩합니다.
            </strong>{" "}
            서버로 보내지 않고, localStorage·URL·로그 어디에도 저장하지 않습니다.
            새로고침하거나 페이지를 떠나면 사라집니다.
          </p>
          <p>
            <strong className="font-semibold text-[var(--color-fg)]">
              서명은 검증하지 않습니다.
            </strong>{" "}
            내용을 읽기만 하므로 위조된 토큰인지는 알 수 없습니다.
          </p>
        </div>
      </div>

      <div>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="jwt-input" className="text-sm font-semibold">
            토큰
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              className={smallButton}
              onClick={() => update(EXAMPLE_TOKEN)}
            >
              예시 토큰 넣기
            </button>
            <button
              type="button"
              className={smallButton}
              onClick={() => update("")}
              disabled={!input}
            >
              지우기
            </button>
          </div>
        </div>
        <textarea
          id="jwt-input"
          value={input}
          onChange={(e) => update(e.target.value)}
          placeholder="eyJhbGciOi... 형식의 토큰을 붙여넣으세요 (앞의 Bearer는 자동으로 뺍니다)"
          rows={5}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-invalid={result !== null && !result.ok}
          aria-describedby={result && !result.ok ? "jwt-error" : undefined}
          className="block w-full resize-y rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 font-mono text-sm break-all text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)]/60 focus:outline-none"
        />
      </div>

      {result && !result.ok && (
        <div
          id="jwt-error"
          role="alert"
          className={cn(card, "flex gap-3 border-rose-500/40 text-sm")}
        >
          <AlertTriangle
            aria-hidden
            className="mt-0.5 h-5 w-5 shrink-0 text-rose-500"
          />
          <div>
            <p className="font-semibold">
              {result.part
                ? `${PART_LABEL[result.part]}을 읽을 수 없습니다`
                : "토큰 형식이 올바르지 않습니다"}
            </p>
            <p className="mt-1 text-[var(--color-muted)]">{result.message}</p>
          </div>
        </div>
      )}

      {decoded && (
        <>
          <div className={card}>
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-[var(--color-subtle)]">알고리즘</dt>
                <dd className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge variant="accent" className="font-mono">
                    {typeof alg === "string" ? alg : "(alg 없음)"}
                  </Badge>
                  {alg === "none" && (
                    <span className="text-xs text-[var(--color-muted)]">
                      서명이 없는 토큰입니다
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--color-subtle)]">상태</dt>
                <dd className="mt-1">
                  <StatusBadge status={tokenStatus(decoded.payload, now)} />
                </dd>
              </div>
              {TIME_CLAIMS.filter((c) => c in decoded.payload).map((claim) => {
                const value = decoded.payload[claim];
                return (
                  <div key={claim}>
                    <dt className="text-xs text-[var(--color-subtle)]">
                      {CLAIM_LABEL[claim]}{" "}
                      <span className="font-mono">({claim})</span>
                    </dt>
                    <dd className="mt-1 tabular-nums">
                      {typeof value === "number"
                        ? formatKst(value)
                        : "숫자(초 단위 시각)가 아니라 해석할 수 없습니다"}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <JsonBlock title="헤더" value={decoded.header} />
          <JsonBlock title="페이로드" value={decoded.payload} />

          <div className={card}>
            <h2 className="text-sm font-semibold">서명</h2>
            <p className="mt-1 text-xs text-[var(--color-muted)]">
              확인하지 않은 원문 그대로입니다.
            </p>
            <p className="mt-3 font-mono text-xs break-all text-[var(--color-muted)]">
              {decoded.signature || "(비어 있음)"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: TokenStatus }) {
  if (status.tone === "valid") {
    return <Badge variant="accent">{status.label}</Badge>;
  }
  if (status.tone === "expired") {
    return (
      <Badge className="border-rose-500/40 bg-transparent text-rose-600 dark:text-rose-400">
        {status.label}
      </Badge>
    );
  }
  return <Badge variant="outline">{status.label}</Badge>;
}

function JsonBlock({ title, value }: { title: string; value: unknown }) {
  const text = JSON.stringify(value, null, 2);

  return (
    <div className={card}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        <CopyButton value={text} label={`${title} JSON 복사`} />
      </div>
      <pre className="mt-3 font-mono text-xs leading-relaxed whitespace-pre-wrap wrap-anywhere text-[var(--color-fg)] sm:text-sm">
        {text}
      </pre>
    </div>
  );
}
