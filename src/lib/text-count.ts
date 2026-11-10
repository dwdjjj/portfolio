// 글자·단어·줄·바이트 수 계산. 브라우저 표준 API(Intl.Segmenter, TextEncoder)만 쓴다.

export type TextStats = {
  /** 공백·줄바꿈 포함 글자 수 (이모지·결합 문자는 1자) */
  chars: number;
  /** 공백·줄바꿈 제외 글자 수 */
  charsNoSpace: number;
  words: number;
  lines: number;
  /** UTF-8 바이트 수 (입력 그대로, 줄바꿈 LF 1바이트) */
  utf8Bytes: number;
  /** ASCII 1바이트, 그 밖의 글자 2바이트, 줄바꿈 2바이트(CR+LF) */
  koreanBytes: number;
};

let segmenter: Intl.Segmenter | null | undefined;

/** 눈에 보이는 글자 단위로 나눈다. Intl.Segmenter가 없으면 코드 포인트 단위. */
export function graphemes(text: string): string[] {
  if (segmenter === undefined) {
    segmenter =
      typeof Intl !== "undefined" && typeof Intl.Segmenter === "function"
        ? new Intl.Segmenter("ko", { granularity: "grapheme" })
        : null;
  }
  if (!segmenter) return Array.from(text);
  return Array.from(segmenter.segment(text), (s) => s.segment);
}

const NEWLINE = /^(?:\r\n|\r|\n)$/;
const SPACE = /^\s+$/;
const isAscii = (ch: string) => ch.length === 1 && ch.charCodeAt(0) < 0x80;

export function countText(text: string): TextStats {
  const chars = graphemes(text);
  let charsNoSpace = 0;
  let koreanBytes = 0;
  for (const ch of chars) {
    if (!SPACE.test(ch)) charsNoSpace += 1;
    koreanBytes += NEWLINE.test(ch) ? 2 : isAscii(ch) ? 1 : 2;
  }
  const trimmed = text.trim();
  return {
    chars: chars.length,
    charsNoSpace,
    words: trimmed === "" ? 0 : trimmed.split(/\s+/).length,
    lines: text === "" ? 0 : text.split(/\r\n|\r|\n/).length,
    utf8Bytes: new TextEncoder().encode(text).length,
    koreanBytes,
  };
}
