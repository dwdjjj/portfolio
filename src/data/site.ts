export const site = {
  name: "권영재 · Frontend Developer",
  shortName: "권영재",
  title: "권영재 — 아이디어를 현실로 구현하는 개발자",
  description:
    "프론트엔드로 시작해 백엔드와 인프라까지 직접 다루며 서비스를 출시해 온 개발자 권영재의 포트폴리오입니다.",
  url: "https://young-jae.com",
  email: "dwdjjj@naver.com",
  github: "https://github.com/dwdjjj",
  blog: "https://dwdjjj.tistory.com/",
  notion:
    "https://ionian-bonnet-da3.notion.site/3246922bc4e8422e868d12d2c765d8c1",
  baekjoon: "https://www.acmicpc.net/user/dwdyj0514",
  solvedAc: "https://solved.ac/profile/dwdyj0514",
  availableForWork: true,
} as const;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;
