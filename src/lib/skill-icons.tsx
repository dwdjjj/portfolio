import type { ComponentType, SVGProps } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiTailwindcss,
  SiVuedotjs,
  SiChartdotjs,
  SiD3,
  SiWebrtc,
  SiSocketdotio,
  SiNodedotjs,
  SiSpringboot,
  SiDjango,
  SiCelery,
  SiPrisma,
  SiKotlin,
  SiJetpackcompose,
  SiFirebase,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiJsonwebtokens,
  SiDocker,
  SiWebpack,
  SiGit,
  SiGithub,
  SiJira,
  SiFigma,
  SiNotion,
  SiMui,
  SiTerraform,
} from "react-icons/si";
import {
  Boxes,
  Key,
  Layers,
  PencilRuler,
  Radio,
  Waypoints,
  MousePointer2,
  Shuffle,
  LineChart,
} from "lucide-react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type IconMeta = {
  Icon: IconComponent;
  color?: string;
  adaptive?: boolean;
};

export const SKILL_ICONS: Record<string, IconMeta> = {
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, adaptive: true },
  "Next.js API Routes": { Icon: SiNextdotjs, adaptive: true },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  Redux: { Icon: SiRedux, color: "#764ABC" },
  Zustand: { Icon: Boxes, color: "#F97316" },
  TailwindCSS: { Icon: SiTailwindcss, color: "#06B6D4" },
  "Vue.js": { Icon: SiVuedotjs, color: "#4FC08D" },
  "Chart.js": { Icon: SiChartdotjs, color: "#FF6384" },
  "D3.js": { Icon: SiD3, color: "#F9A03C" },
  MUI: { Icon: SiMui, color: "#007FFF" },
  "Material UI": { Icon: SiMui, color: "#007FFF" },

  "WebRTC (OpenVidu)": { Icon: SiWebrtc, adaptive: true },
  WebRTC: { Icon: SiWebrtc, adaptive: true },
  OpenVidu: { Icon: Radio, color: "#FF6B35" },
  WebSocket: { Icon: SiSocketdotio, adaptive: true },
  Stomp: { Icon: Waypoints, color: "#8B5CF6" },
  "Canvas API": { Icon: PencilRuler, color: "#F59E0B" },
  Canvas: { Icon: PencilRuler, color: "#F59E0B" },
  Signal: { Icon: Radio, color: "#22C55E" },

  "Node.js": { Icon: SiNodedotjs, color: "#339933" },
  "Spring Boot": { Icon: SiSpringboot, color: "#6DB33F" },
  Django: { Icon: SiDjango, color: "#092E20", adaptive: true },
  Celery: { Icon: SiCelery, color: "#37814A" },
  Prisma: { Icon: SiPrisma, adaptive: true },

  Kotlin: { Icon: SiKotlin, color: "#7F52FF" },
  "Jetpack Compose": { Icon: SiJetpackcompose, color: "#4285F4" },
  "React Native (WebView)": { Icon: SiReact, color: "#61DAFB" },
  "WebView Bridge": { Icon: Waypoints, color: "#0EA5E9" },
  FCM: { Icon: SiFirebase, color: "#FFCA28" },

  MySQL: { Icon: SiMysql, color: "#4479A1" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Redis: { Icon: SiRedis, color: "#DC382D" },
  SQLite: { Icon: SiSqlite, color: "#003B57", adaptive: true },

  JWT: { Icon: SiJsonwebtokens, adaptive: true },
  RSA: { Icon: Key, color: "#EAB308" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  Webpack: { Icon: SiWebpack, color: "#8DD6F9" },

  Git: { Icon: SiGit, color: "#F05032" },
  GitHub: { Icon: SiGithub, adaptive: true },
  Jira: { Icon: SiJira, color: "#0052CC" },
  Figma: { Icon: SiFigma, color: "#F24E1E" },
  Notion: { Icon: SiNotion, adaptive: true },
  "GA / Meta Analytics": { Icon: LineChart, color: "#F59E0B" },

  "react-beautiful-dnd": { Icon: MousePointer2, color: "#8B5CF6" },
  Xarrow: { Icon: Shuffle, color: "#0EA5E9" },
  Terraform: { Icon: SiTerraform, color: "#7B42BC" },
};

export const FALLBACK_ICON: IconMeta = { Icon: Layers, adaptive: true };

type SkillIconProps = {
  name: string;
  className?: string;
};

export function SkillIcon({ name, className }: SkillIconProps) {
  const { Icon, color, adaptive } = SKILL_ICONS[name] ?? FALLBACK_ICON;
  return (
    <Icon
      aria-hidden
      className={
        adaptive
          ? `${className ?? ""} text-[var(--color-fg)]`.trim()
          : className
      }
      style={adaptive ? undefined : { color }}
    />
  );
}
