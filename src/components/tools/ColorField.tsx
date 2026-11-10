"use client";

import { useState, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";
import { parseColor, toHex6, type ParseResult } from "@/lib/color";
import { card, textField } from "./shared";

export type ColorInput = {
  text: string;
  result: ParseResult;
  /** 네이티브 색 선택기용 #rrggbb. 입력이 틀리면 마지막으로 읽은 색을 유지한다. */
  pickerHex: string;
  set: (text: string) => void;
};

// 형식별 최대 글자 수. 실제로 쓸 만한 가장 긴 표기에 여유를 조금 뒀다.
//   rgb   30자 ← rgb(100% 100% 100% / 0.555) 27자
//   hsl   36자 ← hsla(359.9, 100.0%, 100.0%, 0.555) 34자
//   oklch 40자 ← oklch(62.796% 0.25768 359.99 / 0.555) 37자
const FUNC_LIMITS: [prefix: string, max: number][] = [
  ["rgb", 30],
  ["hsl", 36],
];
const MAX_LENGTH = 40;
// HEX는 #rrggbbaa까지라 16진 숫자 8자리(# 포함 9자).
const HEX_DIGITS = 8;
// 색 표기에 쓰는 문자만 남긴다. 한글 등은 입력·붙여넣기 모두 지워진다.
const DISALLOWED = /[^0-9a-zA-Z#%(),./;+\-\s]/g;

function limitFor(text: string) {
  const head = text.trimStart().toLowerCase();
  return FUNC_LIMITS.find(([prefix]) => head.startsWith(prefix))?.[1] ?? MAX_LENGTH;
}

const HEX_PARTIAL = new RegExp(`^\\s*#?[0-9a-fA-F]{0,${HEX_DIGITS}}\\s*$`);

/** # 가 있거나 16진 숫자만 있으면 HEX를 입력하는 중으로 본다. */
function isHexLike(text: string) {
  return text.includes("#") || /^\s*[0-9a-fA-F]+\s*$/.test(text);
}

/**
 * 입력칸에 들어갈 다음 값.
 * 형식별 최대 길이(HEX 16진 8자리, rgb 30·hsl 36·그 밖 40자)를 넘거나 HEX에 다른 글자가 끼면
 * 그 키 입력은 받지 않는다. 붙여넣기는 길이에 맞게 자른다.
 */
function nextValue(prev: string, raw: string, pasted: boolean) {
  const filtered = raw.replace(DISALLOWED, "");
  // 붙여넣은 글에서 지워진 문자 자리에 남는 끝 공백은 정리한다.
  const allowed = pasted ? filtered.trimEnd() : filtered;
  if (!isHexLike(allowed)) {
    const max = limitFor(allowed);
    if (allowed.length <= max) return allowed;
    return pasted ? allowed.slice(0, max).trimEnd() : prev;
  }
  if (HEX_PARTIAL.test(allowed)) return allowed;
  if (!pasted) return prev;
  const from = allowed.slice(Math.max(0, allowed.indexOf("#")));
  return /^#?[0-9a-fA-F]*/.exec(from)![0].replace(/[0-9a-fA-F]+/, (d) => d.slice(0, HEX_DIGITS));
}

/** 입력 문자열과 해석 결과. 값은 이 state에만 있고 어디에도 저장하지 않는다. */
export function useColorInput(initial: string): ColorInput {
  const [state, setState] = useState(() => {
    const result = parseColor(initial);
    return { text: initial, result, pickerHex: result.ok ? toHex6(result.color) : "#000000" };
  });

  function set(text: string) {
    const result = parseColor(text);
    setState((prev) => ({
      text,
      result,
      pickerHex: result.ok ? toHex6(result.color) : prev.pickerHex,
    }));
  }

  return { ...state, set };
}

function ColorErrorBox({ id, message }: { id: string; message: string }) {
  return (
    <div id={id} role="alert" className={cn(card, "flex gap-3 border-rose-500/40 text-sm")}>
      <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
      <div className="min-w-0">
        <p className="font-semibold">색을 읽을 수 없습니다</p>
        <p className="mt-1 text-[var(--color-muted)]">{message}</p>
      </div>
    </div>
  );
}

type ColorFieldProps = {
  id: string;
  label: string;
  input: ColorInput;
  placeholder?: string;
  /** 라벨 오른쪽 버튼 자리 */
  actions?: ReactNode;
  /** 입력칸 바로 아래 안내 */
  note?: ReactNode;
};

/** 네이티브 색 선택기 + 아무 형식이나 받는 텍스트 입력. */
export function ColorField({ id, label, input, placeholder, actions, note }: ColorFieldProps) {
  const errorId = `${id}-error`;
  const invalid = !input.result.ok;

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
        </label>
        {actions}
      </div>
      <div className="flex gap-2">
        <input
          type="color"
          value={input.pickerHex}
          onChange={(e) => input.set(e.target.value)}
          aria-label={`${label} 팔레트에서 고르기`}
          className="h-11 w-11 shrink-0 cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-1 transition-colors hover:border-[var(--color-accent)]/40"
        />
        <input
          id={id}
          type="text"
          value={input.text}
          maxLength={MAX_LENGTH}
          onChange={(e) => {
            const el = e.target;
            const type = (e.nativeEvent as InputEvent).inputType;
            const pasted = type === "insertFromPaste" || type === "insertFromDrop";
            const next = nextValue(input.text, el.value, pasted);
            if (next === input.text && el.value !== input.text) {
              // 막힌 입력이면 커서를 친 자리 그대로 둔다(값이 되돌려지며 끝으로 튀는 것 방지).
              const caret = (el.selectionStart ?? 0) - (el.value.length - input.text.length);
              requestAnimationFrame(() => el.setSelectionRange(caret, caret));
            }
            input.set(next);
          }}
          onCompositionEnd={(e) => input.set(nextValue(input.text, e.currentTarget.value, false))}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          className={cn(textField, "h-11 min-w-0 flex-1 px-4")}
        />
      </div>
      {note}
      {!input.result.ok && (
        <div className="mt-3">
          <ColorErrorBox id={errorId} message={input.result.message} />
        </div>
      )}
    </div>
  );
}
