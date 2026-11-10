// 외부 라이브러리 없이 JSON을 읽고 다시 쓰는 포매터.
// JSON.parse 대신 직접 파싱한다. 이유는 두 가지다.
// 1) 문법 오류 위치를 브라우저마다 다른 에러 메시지에서 뽑지 않고 직접 안다.
// 2) 숫자·문자열을 적힌 그대로 두므로 큰 숫자(2^53 초과)의 자리수가 바뀌지 않는다.

export type JsonNode =
  | { kind: "object"; entries: { key: string; value: JsonNode }[] }
  | { kind: "array"; items: JsonNode[] }
  | { kind: "string" | "number" | "boolean" | "null"; raw: string };

export type ExcerptLine = {
  number: number;
  before: string;
  /** 오류 위치의 글자. 줄 끝·입력 끝이면 빈 문자열. 이전 줄이면 null. */
  mark: string | null;
  after: string;
  cutStart: boolean;
  cutEnd: boolean;
};

export type ErrorLocation = {
  line: number;
  column: number;
  excerpt: ExcerptLine[];
};

export type ParseResult =
  | { ok: true; root: JsonNode }
  | { ok: false; message: string; location: ErrorLocation | null };

class JsonSyntaxError extends Error {
  offset: number;
  constructor(message: string, offset: number) {
    super(message);
    this.offset = offset;
  }
}

const NUMBER = /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/y;
const WORD = /[A-Za-z_$][\w$]*/y;
const ESCAPABLE = '"\\/bfnrt';
const HEX4 = /^[0-9a-fA-F]{4}$/;

function describe(ch: string): string {
  if (ch === '"') return '큰따옴표(")';
  const code = ch.codePointAt(0) ?? 0;
  if (
    code <= 0x20 ||
    (code >= 0x7f && code <= 0xa0) ||
    (code >= 0x200b && code <= 0x200f) ||
    code === 0x2028 ||
    code === 0x2029 ||
    code === 0xfeff
  ) {
    return `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;
  }
  return `"${String.fromCodePoint(code)}"`;
}

function isWhitespace(c: number) {
  return c === 0x20 || c === 0x09 || c === 0x0a || c === 0x0d;
}

function parseTree(text: string): JsonNode {
  const len = text.length;
  let i = 0;

  const fail = (message: string, at = i): never => {
    throw new JsonSyntaxError(message, at);
  };

  // 입력이 끝났을 때는 뒤쪽 공백을 건너뛴 마지막 글자 바로 뒤를 가리킨다.
  const failEnd = (opener: string, openAt: number): never => {
    let end = len;
    while (end > 0 && isWhitespace(text.charCodeAt(end - 1))) end--;
    return fail(
      `입력이 끝났는데 ${lineOf(text, openAt)}번째 줄에서 연 ${opener}가 닫히지 않았습니다.`,
      end,
    );
  };

  function skipWhitespace() {
    while (i < len && isWhitespace(text.charCodeAt(i))) i++;
  }

  function parseString(): string {
    const start = i;
    i++;
    while (i < len) {
      const c = text.charCodeAt(i);
      if (c === 0x22) {
        i++;
        return text.slice(start, i);
      }
      if (c === 0x5c) {
        const next = text[i + 1];
        if (next === undefined) break;
        if (next === "u") {
          if (!HEX4.test(text.slice(i + 2, i + 6))) {
            fail("\\u 뒤에는 16진수 4자리가 와야 합니다.");
          }
          i += 6;
        } else if (ESCAPABLE.includes(next)) {
          i += 2;
        } else {
          fail(`\\${next}는 JSON에서 쓸 수 없는 이스케이프입니다.`);
        }
        continue;
      }
      if (c === 0x0a || c === 0x0d) {
        fail(
          '문자열이 줄이 바뀌기 전에 닫히지 않았습니다. 닫는 따옴표(")가 빠졌거나, 줄바꿈을 \\n으로 써야 합니다.',
        );
      }
      if (c < 0x20) {
        fail(`문자열 안의 제어 문자(${describe(text[i])})는 \\t, \\u0000처럼 이스케이프해야 합니다.`);
      }
      i++;
    }
    return fail('문자열이 닫히지 않았습니다. 닫는 따옴표(")가 없습니다.', start);
  }

  function parseNumber(): JsonNode {
    const start = i;
    NUMBER.lastIndex = i;
    const raw = NUMBER.exec(text)?.[0];
    const next = raw === undefined ? undefined : text[start + raw.length];
    if ((raw === "0" || raw === "-0") && next !== undefined && next >= "0" && next <= "9") {
      return fail("숫자는 0으로 시작할 수 없습니다(예: 01).", start);
    }
    if (raw === undefined || (next !== undefined && ".eE0123456789".includes(next))) {
      return fail("숫자 형식이 올바르지 않습니다.", start);
    }
    i += raw.length;
    return { kind: "number", raw };
  }

  function parseWord(): JsonNode {
    WORD.lastIndex = i;
    const word = WORD.exec(text)?.[0];
    if (word === "true" || word === "false") {
      i += word.length;
      return { kind: "boolean", raw: word };
    }
    if (word === "null") {
      i += 4;
      return { kind: "null", raw: word };
    }
    if (word === "NaN" || word === "Infinity" || word === "undefined") {
      return fail("NaN·Infinity·undefined는 JSON 값이 아닙니다. 문자열이나 null로 바꾸세요.");
    }
    if (word && ["true", "false", "null"].includes(word.toLowerCase())) {
      return fail("true·false·null은 소문자로 써야 합니다.");
    }
    return fail(`값이 와야 합니다. 문자열이면 큰따옴표로 감싸세요. (발견: ${describe(text[i])})`);
  }

  function parseValue(): JsonNode {
    skipWhitespace();
    if (i >= len) return fail("값이 와야 하는데 입력이 끝났습니다.");
    const ch = text[i];
    if (ch === "{") return parseObject();
    if (ch === "[") return parseArray();
    if (ch === '"') return { kind: "string", raw: parseString() };
    if (ch === "-" || (ch >= "0" && ch <= "9")) return parseNumber();
    if (ch === "'") return fail("작은따옴표는 쓸 수 없습니다. 큰따옴표(\")로 감싸세요.");
    if (ch === "/") return fail("JSON에는 주석을 쓸 수 없습니다.");
    if (ch === "+") return fail("숫자 앞에 +를 붙일 수 없습니다.");
    if (ch === ".") return fail("숫자는 0.5처럼 정수 부분부터 써야 합니다.");
    return parseWord();
  }

  function parseObject(): JsonNode {
    const openAt = i;
    const entries: { key: string; value: JsonNode }[] = [];
    let commaAt = -1;
    i++;
    skipWhitespace();
    if (text[i] === "}") {
      i++;
      return { kind: "object", entries };
    }
    for (;;) {
      skipWhitespace();
      if (i >= len) failEnd("{", openAt);
      const ch = text[i];
      if (ch !== '"') {
        if (ch === "}" && commaAt !== -1) {
          fail("마지막 항목 뒤에 쉼표가 있습니다. 이 쉼표를 지우세요.", commaAt);
        }
        if (ch === "'") fail("키는 작은따옴표가 아니라 큰따옴표(\")로 감싸야 합니다.");
        if (ch === "/") fail("JSON에는 주석을 쓸 수 없습니다.");
        if (/[A-Za-z_$]/.test(ch)) fail("키는 큰따옴표(\")로 감싸야 합니다.");
        fail(`키(큰따옴표로 감싼 문자열)가 와야 합니다. (발견: ${describe(ch)})`);
      }
      const key = parseString();
      skipWhitespace();
      if (i >= len) failEnd("{", openAt);
      if (text[i] !== ":") {
        fail(`키 뒤에는 콜론(:)이 와야 합니다. (발견: ${describe(text[i])})`);
      }
      i++;
      skipWhitespace();
      if (text[i] === "}" || text[i] === ",") {
        fail(`키 뒤에 값이 없습니다. (발견: ${describe(text[i])})`);
      }
      entries.push({ key, value: parseValue() });
      skipWhitespace();
      if (i >= len) failEnd("{", openAt);
      if (text[i] === "/") fail("JSON에는 주석을 쓸 수 없습니다.");
      if (text[i] === ",") {
        commaAt = i;
        i++;
        continue;
      }
      if (text[i] === "}") {
        i++;
        return { kind: "object", entries };
      }
      fail(
        `쉼표(,)나 닫는 중괄호(})가 와야 합니다. 앞 항목 뒤에 쉼표가 빠졌을 수 있습니다. (발견: ${describe(text[i])})`,
      );
    }
  }

  function parseArray(): JsonNode {
    const openAt = i;
    const items: JsonNode[] = [];
    let commaAt = -1;
    i++;
    skipWhitespace();
    if (text[i] === "]") {
      i++;
      return { kind: "array", items };
    }
    for (;;) {
      skipWhitespace();
      if (i >= len) failEnd("[", openAt);
      if (text[i] === "]" && commaAt !== -1) {
        fail("마지막 항목 뒤에 쉼표가 있습니다. 이 쉼표를 지우세요.", commaAt);
      }
      if (text[i] === "," || text[i] === "]") {
        fail(`값이 와야 합니다. (발견: ${describe(text[i])})`);
      }
      items.push(parseValue());
      skipWhitespace();
      if (i >= len) failEnd("[", openAt);
      if (text[i] === "/") fail("JSON에는 주석을 쓸 수 없습니다.");
      if (text[i] === ",") {
        commaAt = i;
        i++;
        continue;
      }
      if (text[i] === "]") {
        i++;
        return { kind: "array", items };
      }
      fail(
        `쉼표(,)나 닫는 대괄호(])가 와야 합니다. 앞 항목 뒤에 쉼표가 빠졌을 수 있습니다. (발견: ${describe(text[i])})`,
      );
    }
  }

  const root = parseValue();
  skipWhitespace();
  if (i < len) {
    if (text[i] === "/") fail("JSON에는 주석을 쓸 수 없습니다.");
    fail("JSON 값이 끝난 뒤에 다른 내용이 있습니다. 값 여러 개는 배열 [ ]로 묶어야 합니다.");
  }
  return root;
}

function lineOf(text: string, offset: number): number {
  let line = 1;
  for (let p = text.indexOf("\n"); p !== -1 && p < offset; p = text.indexOf("\n", p + 1)) {
    line++;
  }
  return line;
}

const WINDOW = 40;

/** 서로게이트 쌍 중간에서 자르지 않도록 위치를 조정한다. */
function safeCut(text: string, at: number): number {
  const c = text.charCodeAt(at);
  return c >= 0xdc00 && c <= 0xdfff ? at - 1 : at;
}

function trimCr(s: string) {
  return s.endsWith("\r") ? s.slice(0, -1) : s;
}

/** 오프셋을 줄·칸(코드 포인트 기준, 1부터)과 주변 두 줄로 바꾼다. */
export function locate(text: string, offset: number): ErrorLocation {
  const at = Math.max(0, Math.min(offset, text.length));
  const lineStart = text.lastIndexOf("\n", at - 1) + 1;
  const newline = text.indexOf("\n", at);
  const lineEnd = newline === -1 ? text.length : newline;
  const line = lineOf(text, at);
  const column = Array.from(text.slice(lineStart, at)).length + 1;

  const ch = text.codePointAt(at);
  const mark =
    at >= lineEnd || ch === 0x0d || ch === undefined ? "" : String.fromCodePoint(ch);
  const from = safeCut(text, Math.max(lineStart, at - WINDOW));
  const to = safeCut(text, Math.min(lineEnd, at + mark.length + WINDOW));
  const current: ExcerptLine = {
    number: line,
    before: text.slice(from, at),
    mark,
    after: trimCr(text.slice(at + mark.length, to)),
    cutStart: from > lineStart,
    cutEnd: to < lineEnd && trimCr(text.slice(to, lineEnd)).length > 0,
  };

  const excerpt: ExcerptLine[] = [current];
  if (lineStart > 0) {
    const prevStart = text.lastIndexOf("\n", lineStart - 2) + 1;
    const prevText = trimCr(text.slice(prevStart, lineStart - 1));
    const cut = safeCut(prevText, Math.max(0, prevText.length - WINDOW * 2));
    excerpt.unshift({
      number: line - 1,
      before: prevText.slice(cut),
      mark: null,
      after: "",
      cutStart: cut > 0,
      cutEnd: false,
    });
  }
  return { line, column, excerpt };
}

export function parseJson(text: string): ParseResult {
  try {
    return { ok: true, root: parseTree(text) };
  } catch (e) {
    if (e instanceof JsonSyntaxError) {
      return { ok: false, message: e.message, location: locate(text, e.offset) };
    }
    if (e instanceof RangeError) {
      return { ok: false, message: "중첩이 너무 깊어 처리하지 못했습니다.", location: null };
    }
    throw e;
  }
}

export type Indent = "2" | "4" | "tab";

export type FormatOptions = {
  indent: Indent;
  minify: boolean;
  sortKeys: boolean;
};

const INDENT_TEXT: Record<Indent, string> = { "2": "  ", "4": "    ", tab: "\t" };

function compareKeys(a: string, b: string) {
  return a < b ? -1 : a > b ? 1 : 0;
}

export function formatJson(root: JsonNode, options: FormatOptions): string {
  const unit = options.minify ? null : INDENT_TEXT[options.indent];
  const out: string[] = [];

  function newline(depth: number) {
    if (unit !== null) out.push("\n", unit.repeat(depth));
  }

  function walk(node: JsonNode, depth: number) {
    if (node.kind === "object") {
      if (node.entries.length === 0) return void out.push("{}");
      const entries = options.sortKeys
        ? node.entries
            .map((entry) => ({ entry, name: JSON.parse(entry.key) as string }))
            .sort((a, b) => compareKeys(a.name, b.name))
            .map(({ entry }) => entry)
        : node.entries;
      out.push("{");
      entries.forEach(({ key, value }, index) => {
        if (index > 0) out.push(",");
        newline(depth + 1);
        out.push(key, unit === null ? ":" : ": ");
        walk(value, depth + 1);
      });
      newline(depth);
      out.push("}");
      return;
    }
    if (node.kind === "array") {
      if (node.items.length === 0) return void out.push("[]");
      out.push("[");
      node.items.forEach((item, index) => {
        if (index > 0) out.push(",");
        newline(depth + 1);
        walk(item, depth + 1);
      });
      newline(depth);
      out.push("]");
      return;
    }
    out.push(node.raw);
  }

  walk(root, 0);
  return out.join("");
}

const KIND_LABEL: Record<JsonNode["kind"], string> = {
  object: "객체",
  array: "배열",
  string: "문자열",
  number: "숫자",
  boolean: "불리언",
  null: "null",
};

export function describeRoot(root: JsonNode): string {
  if (root.kind === "object") return `${KIND_LABEL.object} · 키 ${root.entries.length.toLocaleString("ko-KR")}개`;
  if (root.kind === "array") return `${KIND_LABEL.array} · 항목 ${root.items.length.toLocaleString("ko-KR")}개`;
  return KIND_LABEL[root.kind];
}

/** 문자 수(코드 포인트)와 UTF-8 바이트 수. 큰 문자열도 복사본 없이 한 번에 센다. */
export function measure(text: string): { chars: number; bytes: number } {
  let chars = 0;
  let bytes = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    chars++;
    if (c < 0x80) bytes += 1;
    else if (c < 0x800) bytes += 2;
    else if (c >= 0xd800 && c <= 0xdbff && i + 1 < text.length) {
      const d = text.charCodeAt(i + 1);
      if (d >= 0xdc00 && d <= 0xdfff) {
        bytes += 4;
        i++;
      } else bytes += 3;
    } else bytes += 3;
  }
  return { chars, bytes };
}

export function formatSize(text: string): string {
  const { chars, bytes } = measure(text);
  const base = `${chars.toLocaleString("ko-KR")}자 · ${bytes.toLocaleString("ko-KR")}바이트`;
  if (bytes < 1024) return base;
  const scaled =
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)}KB`
      : `${(bytes / 1024 / 1024).toFixed(2)}MB`;
  return `${base}(${scaled})`;
}
