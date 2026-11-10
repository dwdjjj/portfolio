// 브라우저 표준 API(atob, TextDecoder)만 쓰는 JWT 디코더.
// 서명은 검증하지 않고, 토큰을 어디에도 보내거나 저장하지 않는다.

export type JwtPart = "header" | "payload" | "signature";

export const PART_LABEL: Record<JwtPart, string> = {
  header: "헤더(1번째 부분)",
  payload: "페이로드(2번째 부분)",
  signature: "서명(3번째 부분)",
};

export type DecodedJwt = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
};

export type DecodeResult =
  | { ok: true; value: DecodedJwt }
  | { ok: false; part?: JwtPart; message: string };

const BASE64URL = /^[A-Za-z0-9_-]*$/;

class PartError extends Error {
  part: JwtPart;
  constructor(part: JwtPart, message: string) {
    super(message);
    this.part = part;
  }
}

function base64UrlToBytes(part: JwtPart, input: string): Uint8Array {
  const text = input.replace(/=+$/, "");
  const bad = text.search(/[^A-Za-z0-9_-]/);
  if (bad !== -1) {
    throw new PartError(
      part,
      `${bad + 1}번째 글자 "${text[bad]}"는 base64url에 쓸 수 없는 문자입니다.`,
    );
  }
  if (text.length % 4 === 1) {
    throw new PartError(part, "길이가 맞지 않습니다. 토큰 일부가 잘렸을 수 있습니다.");
  }
  const base64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

function decodeJsonObject(part: JwtPart, input: string): Record<string, unknown> {
  if (input.length === 0) throw new PartError(part, "비어 있습니다.");
  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(
      base64UrlToBytes(part, input),
    );
  } catch (e) {
    if (e instanceof PartError) throw e;
    throw new PartError(part, "디코딩한 내용이 올바른 UTF-8 텍스트가 아닙니다.");
  }
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new PartError(part, "디코딩은 됐지만 JSON 형식이 아닙니다.");
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new PartError(part, "JSON 객체({ ... })가 아닙니다.");
  }
  return value as Record<string, unknown>;
}

export function decodeJwt(raw: string): DecodeResult {
  const token = raw.trim().replace(/^Bearer\s+/i, "").replace(/\s+/g, "");
  if (token.length === 0) return { ok: false, message: "토큰을 붙여넣어 주세요." };

  const parts = token.split(".");
  if (parts.length === 5) {
    return {
      ok: false,
      message: "점(.)으로 나뉜 부분이 5개입니다. 암호화된 JWE 토큰은 내용을 볼 수 없습니다.",
    };
  }
  if (parts.length !== 3) {
    return {
      ok: false,
      message: `JWT는 점(.)으로 나뉜 3부분(헤더.페이로드.서명)이어야 하는데 지금은 ${parts.length}부분입니다.`,
    };
  }

  try {
    const header = decodeJsonObject("header", parts[0]);
    const payload = decodeJsonObject("payload", parts[1]);
    if (!BASE64URL.test(parts[2].replace(/=+$/, ""))) {
      throw new PartError("signature", "base64url에 쓸 수 없는 문자가 들어 있습니다.");
    }
    return { ok: true, value: { header, payload, signature: parts[2] } };
  } catch (e) {
    if (e instanceof PartError) {
      return { ok: false, part: e.part, message: e.message };
    }
    throw e;
  }
}

export const TIME_CLAIMS = ["exp", "iat", "nbf"] as const;
export type TimeClaim = (typeof TIME_CLAIMS)[number];

const KST = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** 초 단위 NumericDate를 한국 시간 문자열로. */
export function formatKst(seconds: number): string {
  return `${KST.format(new Date(seconds * 1000))} (KST)`;
}

/** 밀리초 간격을 "2일 3시간", "5분", "30초" 처럼 큰 단위 두 개까지. */
export function formatDuration(ms: number): string {
  const total = Math.floor(Math.abs(ms) / 1000);
  const units: [number, string][] = [
    [Math.floor(total / 86400), "일"],
    [Math.floor((total % 86400) / 3600), "시간"],
    [Math.floor((total % 3600) / 60), "분"],
    [total % 60, "초"],
  ];
  const first = units.findIndex(([n]) => n > 0);
  if (first === -1) return "0초";
  return units
    .slice(first, first + 2)
    .filter(([n]) => n > 0)
    .map(([n, u]) => `${n}${u}`)
    .join(" ");
}

export type TokenStatus = {
  tone: "valid" | "expired" | "pending" | "unknown";
  label: string;
};

/** exp·nbf 기준 상태. nowMs는 Date.now() 값. */
export function tokenStatus(
  payload: Record<string, unknown>,
  nowMs: number,
): TokenStatus {
  const { exp, nbf } = payload;
  if (typeof nbf === "number" && nowMs < nbf * 1000) {
    return {
      tone: "pending",
      label: `아직 사용 전 (${formatDuration(nbf * 1000 - nowMs)} 후부터 유효)`,
    };
  }
  if (typeof exp !== "number") {
    return { tone: "unknown", label: "만료 시각(exp) 없음" };
  }
  const diff = exp * 1000 - nowMs;
  if (diff <= 0) {
    return { tone: "expired", label: `만료됨 (${formatDuration(diff)} 전)` };
  }
  return { tone: "valid", label: `유효 · ${formatDuration(diff)} 후 만료` };
}
