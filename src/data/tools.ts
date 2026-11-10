import type { LucideIcon } from "lucide-react";
import { Braces, CaseSensitive, Clock, KeyRound, Palette } from "lucide-react";

// /tools 목록과 사이트맵이 함께 읽는다. 도구를 늘리면 여기에만 더한다.
export const tools: {
  href: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    href: "/tools/json",
    title: "JSON 포매터",
    description: "뭉친 JSON을 들여쓰기해 정리하고, 문법 오류 위치를 줄·칸으로 보여 줍니다.",
    Icon: Braces,
  },
  {
    href: "/tools/jwt",
    title: "JWT 디코더",
    description: "토큰의 헤더·페이로드와 만료 시각을 한국 시간으로 확인합니다.",
    Icon: KeyRound,
  },
  {
    href: "/tools/timestamp",
    title: "타임스탬프 변환기",
    description: "유닉스 타임스탬프와 한국 시간·UTC·ISO 8601을 서로 바꿉니다.",
    Icon: Clock,
  },
  {
    href: "/tools/color",
    title: "색상 변환기",
    description: "HEX·RGB·HSL·OKLCH를 서로 바꾸고 명암 대비를 WCAG 기준으로 검사합니다.",
    Icon: Palette,
  },
  {
    href: "/tools/count",
    title: "글자 수 세기",
    description: "공백 포함·제외 글자 수와 한글 2바이트 기준 바이트 수를 셉니다.",
    Icon: CaseSensitive,
  },
];
