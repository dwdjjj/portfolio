// 라이브러리 없이 표준 공식으로 구현한 색 변환·명암 대비 계산.
// 색은 감마 보정된 sRGB 0~1과 알파 0~1로 다룬다.
// - sRGB 전달 함수: IEC 61966-2-1
// - OKLab: Björn Ottosson, "A perceptual color space for image processing" (2020)
// - 대비비: WCAG 2.x relative luminance / contrast ratio

export type Rgba = { r: number; g: number; b: number; alpha: number };

export type ParseResult =
  | { ok: true; color: Rgba; clipped: boolean }
  | { ok: false; message: string };

// 8비트 한 칸의 절반. 이 안쪽으로 벗어난 값은 반올림 오차로 보고 조용히 자른다.
const GAMUT_EPSILON = 0.5 / 255;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

const toLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

const toGamma = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;

// ---------- 변환 ----------

export type Hsl = { h: number; s: number; l: number }; // h 0~360, s·l 0~1

export function rgbToHsl({ r, g, b }: Rgba): Hsl {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  if (d === 0) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s, l };
}

export function hslToRgb({ h, s, l }: Hsl, alpha = 1): Rgba {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return { r: f(0), g: f(8), b: f(4), alpha };
}

export type Oklch = { l: number; c: number; h: number }; // l 0~1, c ≥ 0, h 0~360

export function rgbToOklch({ r, g, b }: Rgba): Oklch {
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);
  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const c = Math.hypot(A, B);
  const h = c < 1e-4 ? 0 : ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360;
  return { l: L, c, h };
}

/** OKLCH → sRGB. 범위를 벗어난 채널은 0~1로 잘라내고 clipped로 알린다. */
export function oklchToRgb(
  { l, c, h }: Oklch,
  alpha = 1,
): { color: Rgba; clipped: boolean } {
  const rad = (h * Math.PI) / 180;
  const A = c * Math.cos(rad);
  const B = c * Math.sin(rad);
  const l_ = l + 0.3963377774 * A + 0.2158037573 * B;
  const m_ = l - 0.1055613458 * A - 0.0638541728 * B;
  const s_ = l - 0.0894841775 * A - 1.291485548 * B;
  const L3 = l_ ** 3;
  const M3 = m_ ** 3;
  const S3 = s_ ** 3;
  const raw = [
    4.0767416621 * L3 - 3.3077115913 * M3 + 0.2309699292 * S3,
    -1.2684380046 * L3 + 2.6097574011 * M3 - 0.3413193965 * S3,
    -0.0041960863 * L3 - 0.7034186147 * M3 + 1.707614701 * S3,
  ].map(toGamma);
  const clipped = raw.some((v) => v < -GAMUT_EPSILON || v > 1 + GAMUT_EPSILON);
  const [r, g, b] = raw.map(clamp01);
  return { color: { r, g, b, alpha }, clipped };
}

// ---------- 출력 형식 ----------

const fmt = (n: number, digits: number) => String(Number(n.toFixed(digits)));
// 359.996 같은 값이 "360"으로 찍히지 않게 반올림 뒤 360을 0으로 접는다.
const fmtHue = (h: number, digits: number) => fmt(Number(h.toFixed(digits)) % 360, digits);
const byte = (c: number) => Math.round(clamp01(c) * 255);
const hex2 = (n: number) => n.toString(16).padStart(2, "0");
const alphaPart = (a: number) => (a < 1 ? ` / ${fmt(a, 3)}` : "");

/** `<input type="color">`가 받는 #rrggbb (알파 제외). */
export function toHex6({ r, g, b }: Rgba): string {
  return `#${hex2(byte(r))}${hex2(byte(g))}${hex2(byte(b))}`;
}

export function toHex(color: Rgba): string {
  return color.alpha < 1 ? toHex6(color) + hex2(byte(color.alpha)) : toHex6(color);
}

export function toRgbString(color: Rgba): string {
  return `rgb(${byte(color.r)} ${byte(color.g)} ${byte(color.b)}${alphaPart(color.alpha)})`;
}

export function toHslString(color: Rgba): string {
  const { h, s, l } = rgbToHsl(color);
  return `hsl(${fmtHue(h, 1)} ${fmt(s * 100, 1)}% ${fmt(l * 100, 1)}%${alphaPart(color.alpha)})`;
}

export function toOklchString(color: Rgba): string {
  const { l, c, h } = rgbToOklch(color);
  return `oklch(${fmt(l * 100, 3)}% ${fmt(c, 5)} ${fmtHue(h, 2)}${alphaPart(color.alpha)})`;
}

// ---------- 입력 해석 ----------

class ParseError extends Error {}

type Token = { value: number; unit: string };

const TOKEN = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(%|deg|rad|grad|turn)?$/i;

function token(raw: string, what: string): Token {
  const m = TOKEN.exec(raw);
  if (!m) throw new ParseError(`${what} 값 "${raw}"를 숫자로 읽을 수 없습니다.`);
  return { value: Number(m[1]), unit: (m[2] ?? "").toLowerCase() };
}

function inRange(n: number, min: number, max: number, message: string): number {
  if (n < min || n > max) throw new ParseError(message);
  return n;
}

function parseAlpha(raw: string | undefined): number {
  if (raw === undefined) return 1;
  const t = token(raw, "투명도");
  if (t.unit !== "" && t.unit !== "%") throw new ParseError("투명도는 0~1 또는 0%~100%로 적어 주세요.");
  const a = t.unit === "%" ? t.value / 100 : t.value;
  return inRange(a, 0, 1, "투명도는 0~1 또는 0%~100% 사이여야 합니다.");
}

function parseHue(raw: string): number {
  const t = token(raw, "색상(hue)");
  const turns: Record<string, number> = { "": 1, deg: 1, rad: 180 / Math.PI, grad: 0.9, turn: 360 };
  if (!(t.unit in turns)) throw new ParseError("색상(hue)은 각도(예: 180, 180deg)로 적어 주세요.");
  return (((t.value * turns[t.unit]) % 360) + 360) % 360;
}

function percent(raw: string, what: string): number {
  const t = token(raw, what);
  if (t.unit !== "" && t.unit !== "%") throw new ParseError(`${what} 값은 퍼센트(예: 50%)로 적어 주세요.`);
  return inRange(t.value, 0, 100, `${what} 값은 0%~100% 사이여야 합니다.`) / 100;
}

/** "a, b, c, d" 또는 "a b c / d"를 [성분 3개, 알파]로 나눈다. */
function splitArgs(body: string): [string[], string | undefined] {
  let parts: string[];
  let alpha: string | undefined;
  if (body.includes(",")) {
    parts = body.split(",").map((s) => s.trim());
    if (parts.length === 4) alpha = parts.pop();
  } else {
    const [main, a, ...rest] = body.split("/");
    if (rest.length > 0) throw new ParseError("슬래시(/)는 투명도 앞에 한 번만 씁니다.");
    parts = main.trim().split(/\s+/);
    alpha = a?.trim();
  }
  if (parts.length !== 3 || parts.some((p) => p === "")) {
    throw new ParseError("괄호 안에 값 3개(투명도는 선택)를 적어 주세요.");
  }
  return [parts, alpha];
}

function parseHex(hex: string): Rgba {
  const full =
    hex.length <= 4 ? [...hex].map((ch) => ch + ch).join("") : hex;
  const n = (i: number) => parseInt(full.slice(i, i + 2), 16) / 255;
  return { r: n(0), g: n(2), b: n(4), alpha: full.length === 8 ? n(6) : 1 };
}

function parseFunction(name: string, body: string): { color: Rgba; clipped: boolean } {
  const [[p1, p2, p3], rawAlpha] = splitArgs(body);
  const alpha = parseAlpha(rawAlpha);

  if (name === "rgb" || name === "rgba") {
    const channel = (raw: string, what: string) => {
      const t = token(raw, what);
      if (t.unit === "%") return inRange(t.value, 0, 100, `${what} 값은 0%~100% 사이여야 합니다.`) / 100;
      if (t.unit !== "") throw new ParseError(`${what} 값은 0~255 숫자나 퍼센트로 적어 주세요.`);
      return inRange(t.value, 0, 255, `${what} 값은 0~255 사이여야 합니다.`) / 255;
    };
    return {
      color: { r: channel(p1, "빨강(R)"), g: channel(p2, "초록(G)"), b: channel(p3, "파랑(B)"), alpha },
      clipped: false,
    };
  }

  if (name === "hsl" || name === "hsla") {
    const hsl = { h: parseHue(p1), s: percent(p2, "채도(S)"), l: percent(p3, "명도(L)") };
    return { color: hslToRgb(hsl, alpha), clipped: false };
  }

  // oklch
  const L = token(p1, "밝기(L)");
  if (L.unit !== "" && L.unit !== "%") throw new ParseError("밝기(L)는 0~1 또는 0%~100%로 적어 주세요.");
  const l = inRange(
    L.unit === "%" ? L.value / 100 : L.value,
    0,
    1,
    "밝기(L)는 0~1 또는 0%~100% 사이여야 합니다.",
  );
  const C = token(p2, "채도(C)");
  if (C.unit !== "" && C.unit !== "%") throw new ParseError("채도(C)는 숫자(예: 0.15)로 적어 주세요.");
  // CSS Color 4: C의 100%는 0.4
  const c = C.unit === "%" ? (C.value / 100) * 0.4 : C.value;
  if (c < 0) throw new ParseError("채도(C)는 0 이상이어야 합니다.");
  return oklchToRgb({ l, c, h: parseHue(p3) }, alpha);
}

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const FUNC = /^(rgba?|hsla?|oklch)\((.*)\)$/i;

/** HEX(#rgb·#rgba·#rrggbb·#rrggbbaa), rgb()/rgba(), hsl()/hsla(), oklch()를 읽는다. */
export function parseColor(input: string): ParseResult {
  const text = input.trim().replace(/;$/, "").trim();
  if (text === "") return { ok: false, message: "색을 입력해 주세요." };

  const hex = HEX.exec(text);
  if (hex) return { ok: true, color: parseHex(hex[1]), clipped: false };

  const fn = FUNC.exec(text);
  if (!fn) {
    return {
      ok: false,
      message: "읽을 수 있는 형식: HEX(#0d9488), rgb(), hsl(), oklch()",
    };
  }
  try {
    return { ok: true, ...parseFunction(fn[1].toLowerCase(), fn[2].trim()) };
  } catch (e) {
    if (e instanceof ParseError) return { ok: false, message: e.message };
    throw e;
  }
}

// ---------- 명암 대비 (WCAG 2.x) ----------

export function relativeLuminance({ r, g, b }: Rgba): number {
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** 전경을 배경 위에 겹친 색. 배경의 투명도는 보지 않는다(불투명으로 간주). */
export function composite(fg: Rgba, bg: Rgba): Rgba {
  const mix = (f: number, b: number) => f * fg.alpha + b * (1 - fg.alpha);
  return { r: mix(fg.r, bg.r), g: mix(fg.g, bg.g), b: mix(fg.b, bg.b), alpha: 1 };
}

/** 대비비 1~21. 통과 여부는 반올림하지 않은 이 값으로 판단한다. */
export function contrastRatio(fg: Rgba, bg: Rgba): number {
  const a = relativeLuminance(composite(fg, bg));
  const b = relativeLuminance(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export const WCAG_LEVELS = [
  { id: "aa-normal", level: "AA", size: "일반 글자", min: 4.5 },
  { id: "aa-large", level: "AA", size: "큰 글자", min: 3 },
  { id: "aaa-normal", level: "AAA", size: "일반 글자", min: 7 },
  { id: "aaa-large", level: "AAA", size: "큰 글자", min: 4.5 },
] as const;
