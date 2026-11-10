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
    description: "JSON 텍스트를 정렬합니다. 문법 오류 혹은 괄호가 잘못된 경우 표시해 줍니다.",
    Icon: Braces,
  },
  {
    href: "/tools/jwt",
    title: "JWT 디코더",
    description: "JWT 토큰을 디코딩해 보세요! 숨겨진 값들을 확인할 수 있습니다.",
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
    description: "HEX·RGB·HSL·OKLCH를 오가며 바꾸고, 글자색과 배경색 대비가 WCAG 기준을 넘는지 봅니다.",
    Icon: Palette,
  },
  {
    href: "/tools/count",
    title: "글자 수 세기",
    description: "자소서 글자 수를 공백 포함·제외로 세고, 한글 2바이트 기준 바이트도 함께 셉니다.",
    Icon: CaseSensitive,
  },
];
