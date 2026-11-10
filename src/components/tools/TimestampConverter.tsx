"use client";

import { useState, useSyncExternalStore } from "react";
import { AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  describeInstant,
  formatRelative,
  kstInputToMs,
  msToKstInput,
  parseTimestamp,
  toSecondsText,
  type Unit,
} from "@/lib/timestamp";
import { CopyButton, card, smallButton, toggleButton } from "./shared";

// 1초마다(초가 바뀌는 순간에 맞춰) 현재 시각을 알리는 외부 저장소.
// 서버 렌더와 하이드레이션 중에는 null이라 시각이 마운트 뒤에만 그려진다.
let clock = 0;

function subscribeClock(onChange: () => void) {
  let id: ReturnType<typeof setTimeout>;
  const tick = () => {
    clock = Date.now();
    onChange();
    id = setTimeout(tick, 1000 - (clock % 1000));
  };
  tick();
  return () => clearTimeout(id);
}

const getClock = () => clock || (clock = Date.now());
const getServerClock = () => null;

const UNITS: { value: Unit | "auto"; label: string }[] = [
  { value: "auto", label: "자동" },
  { value: "s", label: "초" },
  { value: "ms", label: "밀리초" },
];

const UNIT_LABEL: Record<Unit, string> = { s: "초", ms: "밀리초" };

const field =
  "block w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3 font-mono text-sm text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:border-[var(--color-accent)]/60 focus:outline-none dark:[color-scheme:dark]";

export function TimestampConverter() {
  const now = useSyncExternalStore(subscribeClock, getClock, getServerClock);
  const [raw, setRaw] = useState("");
  const [unit, setUnit] = useState<Unit | "auto">("auto");
  const [local, setLocal] = useState("");

  const parsed = raw.trim() ? parseTimestamp(raw, unit) : null;
  const instant = parsed?.ok ? describeInstant(parsed.ms) : null;
  const localMs = local ? kstInputToMs(local) : null;

  return (
    <div className="space-y-6">
      <div className={cn(card, "flex gap-3 text-sm text-[var(--color-muted)]")}>
        <Clock
          aria-hidden
          className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]"
        />
        <div className="space-y-1.5">
          <p>
            1000억 이상이면 밀리초, 그보다 작으면 초로 읽습니다. 1973년 이전
            밀리초 값은 직접 골라 주세요.
          </p>
          <p>
            서머타임을 하던 1987·88년 같은 시기는 +09:00이 아니라 +10:00으로
            나옵니다. 그때의 실제 한국 시간을 따르기 때문입니다.
          </p>
        </div>
      </div>

      <section className={card} aria-labelledby="now-title">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 id="now-title" className="text-sm font-semibold">
            현재 시각
          </h2>
          <p className="font-mono text-xs text-[var(--color-muted)] tabular-nums">
            {now === null ? "—" : describeInstant(now).kst}
          </p>
        </div>
        <dl className="mt-3 divide-y divide-[var(--color-border)]">
          <ValueRow
            label="초"
            value={now === null ? "" : String(Math.floor(now / 1000))}
          />
          <ValueRow label="밀리초" value={now === null ? "" : String(now)} />
        </dl>
      </section>

      <section className="space-y-4" aria-labelledby="to-date-title">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="to-date-title" className="text-sm font-semibold">
            <label htmlFor="ts-input">타임스탬프 → 날짜</label>
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              className={smallButton}
              onClick={() => setRaw(String(Math.floor(Date.now() / 1000)))}
            >
              지금
            </button>
            <button
              type="button"
              className={smallButton}
              onClick={() => setRaw("")}
              disabled={!raw}
            >
              지우기
            </button>
          </div>
        </div>
        <input
          id="ts-input"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="1700000000 또는 1700000000000"
          inputMode="numeric"
          autoComplete="off"
          spellCheck={false}
          aria-invalid={parsed !== null && !parsed.ok}
          aria-describedby={parsed && !parsed.ok ? "ts-error" : undefined}
          className={field}
        />
        <div className="flex flex-wrap items-center gap-2">
          <div role="group" aria-label="단위" className="flex gap-2">
            {UNITS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                aria-pressed={unit === value}
                className={toggleButton(unit === value)}
                onClick={() => setUnit(value)}
              >
                {label}
              </button>
            ))}
          </div>
          {unit === "auto" && parsed?.ok && (
            <span className="text-xs text-[var(--color-muted)]">
              {UNIT_LABEL[parsed.unit]}로 판단했습니다
            </span>
          )}
        </div>

        {parsed && !parsed.ok && <ErrorBox id="ts-error" message={parsed.message} />}

        {parsed?.ok && instant && (
          <dl className={cn(card, "divide-y divide-[var(--color-border)] py-2")}>
            <ValueRow label="한국 시간 (KST)" value={instant.kst} />
            <ValueRow label="UTC" value={instant.utc} />
            <ValueRow label="ISO 8601 (한국 시간)" value={instant.iso} />
            <ValueRow label="ISO 8601 (UTC)" value={instant.isoUtc} />
            <ValueRow
              label="상대 시간"
              value={now === null ? "" : formatRelative(parsed.ms, now)}
            />
            <ValueRow label="초" value={toSecondsText(parsed.ms)} />
            <ValueRow label="밀리초" value={String(parsed.ms)} />
          </dl>
        )}
      </section>

      <section className="space-y-4" aria-labelledby="to-ts-title">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="to-ts-title" className="text-sm font-semibold">
            <label htmlFor="local-input">날짜 → 타임스탬프 (한국 시간 기준)</label>
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              className={smallButton}
              onClick={() => setLocal(msToKstInput(Date.now()))}
            >
              지금
            </button>
            <button
              type="button"
              className={smallButton}
              onClick={() => setLocal("")}
              disabled={!local}
            >
              지우기
            </button>
          </div>
        </div>
        <input
          id="local-input"
          type="datetime-local"
          step={1}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          aria-invalid={Boolean(local) && localMs === null}
          aria-describedby={local && localMs === null ? "local-error" : undefined}
          className={field}
        />

        {local && localMs === null && (
          <ErrorBox id="local-error" message="날짜와 시각을 읽지 못했습니다. 연·월·일·시·분을 모두 입력하세요." />
        )}

        {localMs !== null && (
          <dl className={cn(card, "divide-y divide-[var(--color-border)] py-2")}>
            <ValueRow label="초" value={toSecondsText(localMs)} />
            <ValueRow label="밀리초" value={String(localMs)} />
            <ValueRow label="ISO 8601 (UTC)" value={describeInstant(localMs).isoUtc} />
          </dl>
        )}
      </section>
    </div>
  );
}

function ValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <dt className="text-xs text-[var(--color-subtle)]">{label}</dt>
        <dd className="mt-1 font-mono text-sm break-all tabular-nums">
          {value || "—"}
        </dd>
      </div>
      <CopyButton value={value} label={`${label} 복사`} disabled={!value} />
    </div>
  );
}

function ErrorBox({ id, message }: { id: string; message: string }) {
  return (
    <div
      id={id}
      role="alert"
      className={cn(card, "flex gap-3 border-rose-500/40 text-sm")}
    >
      <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
      <p className="text-[var(--color-muted)]">{message}</p>
    </div>
  );
}
