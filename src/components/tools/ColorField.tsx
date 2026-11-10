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

// 받는 형식 중 가장 긴 것이 34자(oklch(62.796% 0.25768 29.23 / 0.5))라 공백 여유를 둔다.
const MAX_LENGTH = 40;
// 색 표기에 쓰는 문자만 남긴다. 한글 등은 입력·붙여넣기 모두 지워진다.
const DISALLOWED = /[^0-9a-zA-Z#%(),./;+\-\s]/g;

function sanitize(text: string) {
  return text.replace(DISALLOWED, "").slice(0, MAX_LENGTH);
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
          onChange={(e) => input.set(sanitize(e.target.value))}
          onCompositionEnd={(e) => input.set(sanitize(e.currentTarget.value))}
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
