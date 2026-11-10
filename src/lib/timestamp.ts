// 유닉스 타임스탬프 ↔ 날짜 변환. 시간대 계산은 Intl(Asia/Seoul)에 맡기므로
// 한국이 +09:00이 아니던 시기(1961년 이전, 1987·1988년 서머타임)도 그 시기 기준으로 나온다.

export type Unit = "s" | "ms";

/** 절댓값이 이 값 이상이면 밀리초로 본다. 초로는 서기 5138년, 밀리초로는 1973년 3월. */
export const MS_THRESHOLD = 1e11;

/** Date가 표현할 수 있는 최대 범위(±8.64e15 ms, 약 ±27만 년). */
const MAX_MS = 8.64e15;

export function detectUnit(value: number): Unit {
  return Math.abs(value) >= MS_THRESHOLD ? "ms" : "s";
}

export type ParsedTimestamp =
  | { ok: true; ms: number; unit: Unit }
  | { ok: false; message: string };

const NUMERIC = /^-?\d+(?:\.\d+)?$/;

export function parseTimestamp(raw: string, unit: Unit | "auto"): ParsedTimestamp {
  const text = raw.trim();
  if (!NUMERIC.test(text)) {
    return { ok: false, message: "숫자만 입력하세요. 음수와 소수점은 됩니다." };
  }
  const value = Number(text);
  const resolved = unit === "auto" ? detectUnit(value) : unit;
  const ms = Math.round(resolved === "s" ? value * 1000 : value);
  if (!Number.isFinite(ms) || Math.abs(ms) > MAX_MS) {
    return {
      ok: false,
      message: "날짜로 나타낼 수 있는 범위(약 ±27만 년)를 벗어났습니다.",
    };
  }
  return { ok: true, ms, unit: resolved };
}

type Parts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  weekday: string;
};

const WEEKDAY: Record<string, string> = {
  Sun: "일",
  Mon: "월",
  Tue: "화",
  Wed: "수",
  Thu: "목",
  Fri: "금",
  Sat: "토",
};

const FORMATTERS: Record<string, Intl.DateTimeFormat> = {};

function wallParts(ms: number, timeZone: string): Parts {
  FORMATTERS[timeZone] ??= new Intl.DateTimeFormat("en-US", {
    timeZone,
    era: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  });
  const map: Record<string, string> = {};
  for (const part of FORMATTERS[timeZone].formatToParts(ms)) {
    map[part.type] = part.value;
  }
  const year = Number(map.year);
  return {
    // 기원전(BC) 1년이 0년, 2년이 -1년(ISO 8601 방식)
    year: map.era === "BC" || map.era === "B" ? 1 - year : year,
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
    weekday: WEEKDAY[map.weekday] ?? "",
  };
}

function utcFromParts(p: Omit<Parts, "weekday">, millis = 0): number {
  const d = new Date(0);
  d.setUTCFullYear(p.year, p.month - 1, p.day);
  d.setUTCHours(p.hour, p.minute, p.second, millis);
  return d.getTime();
}

const pad = (n: number, width = 2) => String(n).padStart(width, "0");

function formatYear(year: number) {
  if (year >= 0 && year <= 9999) return pad(year, 4);
  return `${year < 0 ? "-" : "+"}${pad(Math.abs(year), 6)}`;
}

function millisOf(ms: number) {
  return ((ms % 1000) + 1000) % 1000;
}

function formatWall(p: Parts, millis: number, separator: string) {
  const date = `${formatYear(p.year)}-${pad(p.month)}-${pad(p.day)}`;
  const time = `${pad(p.hour)}:${pad(p.minute)}:${pad(p.second)}`;
  return `${date}${separator}${time}${millis ? `.${pad(millis, 3)}` : ""}`;
}

/** 해당 시각의 Asia/Seoul UTC 오프셋(밀리초). */
function seoulOffset(ms: number): number {
  return utcFromParts(wallParts(ms, "Asia/Seoul"), millisOf(ms)) - ms;
}

function formatOffset(offsetMs: number) {
  const sign = offsetMs < 0 ? "-" : "+";
  const total = Math.abs(Math.round(offsetMs / 1000));
  const hm = `${sign}${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}`;
  return total % 60 ? `${hm}:${pad(total % 60)}` : hm;
}

export type Instant = {
  kst: string;
  utc: string;
  iso: string;
  isoUtc: string;
};

export function describeInstant(ms: number): Instant {
  const millis = millisOf(ms);
  const seoul = wallParts(ms, "Asia/Seoul");
  const utc = wallParts(ms, "UTC");
  // 표현 범위 끝에서는 벽시계 시각이 범위를 넘어 NaN이 되므로 하루 전 오프셋을 쓴다.
  const local = utcFromParts(seoul, millis) - ms;
  const offset = Number.isNaN(local) ? seoulOffset(ms - 86400_000) : local;
  return {
    kst: `${formatWall(seoul, millis, " ")} (${seoul.weekday})`,
    utc: `${formatWall(utc, millis, " ")} (${utc.weekday})`,
    iso: `${formatWall(seoul, millis, "T")}${formatOffset(offset)}`,
    isoUtc: new Date(ms).toISOString(),
  };
}

const RELATIVE = new Intl.RelativeTimeFormat("ko", { numeric: "always" });

const RELATIVE_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365.2425 * 86400_000],
  ["month", 30.436875 * 86400_000],
  ["day", 86400_000],
  ["hour", 3600_000],
  ["minute", 60_000],
  ["second", 1000],
];

/** "3시간 전", "2일 후"처럼 가장 큰 단위 하나로. 1초 미만 차이는 "지금". */
export function formatRelative(ms: number, nowMs: number): string {
  const diff = ms - nowMs;
  for (const [unit, size] of RELATIVE_UNITS) {
    const amount = Math.trunc(diff / size);
    if (amount !== 0) return RELATIVE.format(amount, unit);
  }
  return "지금";
}

const LOCAL_INPUT = /^(\d{4,6})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$/;

/** datetime-local 값(한국 시간으로 해석)을 밀리초 타임스탬프로. 형식이 다르면 null. */
export function kstInputToMs(value: string): number | null {
  const m = LOCAL_INPUT.exec(value);
  if (!m) return null;
  const wall = utcFromParts(
    {
      year: Number(m[1]),
      month: Number(m[2]),
      day: Number(m[3]),
      hour: Number(m[4]),
      minute: Number(m[5]),
      second: Number(m[6] ?? 0),
    },
    Number((m[7] ?? "0").padEnd(3, "0")),
  );
  // 오프셋은 결과 시각에 따라 달라질 수 있어(서머타임 등) 한 번 더 맞춘다.
  const first = wall - seoulOffset(wall - 9 * 3600_000);
  const offset = seoulOffset(first);
  const ms = wall - offset;
  return Number.isFinite(ms) && Math.abs(ms) <= MAX_MS ? ms : null;
}

/** 밀리초 타임스탬프를 datetime-local 값(한국 시간, 초 단위까지)으로. */
export function msToKstInput(ms: number): string {
  const p = wallParts(ms, "Asia/Seoul");
  return `${pad(p.year, 4)}-${pad(p.month)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}:${pad(p.second)}`;
}

/** 밀리초를 초 단위 문자열로. 1000으로 나누어떨어지지 않으면 소수점 아래 3자리까지. */
export function toSecondsText(ms: number): string {
  return Number.isInteger(ms / 1000) ? String(ms / 1000) : (ms / 1000).toFixed(3);
}
