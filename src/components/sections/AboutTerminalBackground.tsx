"use client";

import { useEffect, useRef } from "react";

type LogLine = {
  x: number;
  y: number;
  text: string;
  speed: number;
  alpha: number;
  phase: number;
  width: number;
};

type TraceLine = {
  x: number;
  y: number;
  width: number;
  speed: number;
  alpha: number;
  phase: number;
};

const LOG_TEMPLATES = [
  "git push origin main",
  "ssh company-dev",
  "fetch recent commits",
  "resolve design tokens",
  "optimize image manifest",
  "server listening on :443",
  "npm run dev",
  "claude --resume",
  "git status",
  "git pull origin main",
  "npm run build",
  "git fetch origin",
  "git diff --stat",
  "docker compose up -d --build",
  "npx tsc --noEmit",
  "git branch --show-current",
  "git log --oneline -5",
  "tmux send-keys",
  "npx next build",
  "code .",
];

const random = (min: number, max: number) => min + Math.random() * (max - min);

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function AboutTerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let lastTime = performance.now();
    let logs: LogLine[] = [];
    let traces: TraceLine[] = [];

    const contentMask = (x: number, y: number) => {
      const nx = (x - width * 0.52) / (width * 0.34);
      const ny = (y - height * 0.52) / (height * 0.34);
      const distance = nx * nx + ny * ny;

      return distance < 1 ? 0.015 + distance * 0.18 : 1;
    };

    const lineX = (itemWidth: number) => {
      const readableMax = Math.max(width * 0.08, width - itemWidth - width * 0.04);

      return random(width * 0.04, readableMax);
    };

    const createLog = (index: number, y?: number): LogLine => {
      const text =
        LOG_TEMPLATES[index % LOG_TEMPLATES.length] +
        (Math.random() > 0.78 ? `  ${Math.floor(random(12, 620))}ms` : "");
      const size = width < 768 ? 10 : 12;
      const textWidth = text.length * size * 0.62;

      return {
        x: lineX(textWidth),
        y: y ?? random(0, height * 1.15),
        text,
        speed: random(7, 16),
        alpha: random(0.1, 0.28),
        phase: random(0, Math.PI * 2),
        width: textWidth,
      };
    };

    const createTrace = (y?: number): TraceLine => {
      const traceWidth = random(width * 0.08, width * 0.24);

      return {
        x: lineX(traceWidth),
        y: y ?? random(0, height * 1.15),
        width: traceWidth,
        speed: random(5, 12),
        alpha: random(0.05, 0.13),
        phase: random(0, Math.PI * 2),
      };
    };

    const buildScene = () => {
      const logCount = width < 768 ? 26 : 54;
      const traceCount = width < 768 ? 14 : 30;

      logs = Array.from({ length: logCount }, (_, index) => createLog(index));
      traces = Array.from({ length: traceCount }, () => createTrace());
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildScene();
    };

    const drawBackground = () => {
      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.46,
        0,
        width * 0.5,
        height * 0.52,
        width * 0.62,
      );

      glow.addColorStop(0, "rgba(20, 184, 166, 0.035)");
      glow.addColorStop(0.52, "rgba(14, 116, 144, 0.025)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const drawGrid = () => {
      for (let y = 0; y < height; y += 22) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(148, 163, 184, 0.022)";
        ctx.lineWidth = 1;
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
        ctx.stroke();
      }
    };

    const drawTraces = (delta: number) => {
      for (const trace of traces) {
        trace.y -= trace.speed * delta;

        if (trace.y < -36) Object.assign(trace, createTrace(height + random(20, 160)));

        const alpha =
          trace.alpha *
          contentMask(trace.x + trace.width * 0.5, trace.y) *
          (0.8 + Math.sin(time * 1.2 + trace.phase) * 0.16);
        const gradient = ctx.createLinearGradient(
          trace.x,
          trace.y,
          trace.x + trace.width,
          trace.y,
        );

        gradient.addColorStop(0, "rgba(45, 212, 191, 0)");
        gradient.addColorStop(0.42, `rgba(45, 212, 191, ${alpha})`);
        gradient.addColorStop(1, "rgba(125, 211, 252, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(trace.x, trace.y, trace.width, 1);
      }
    };

    const drawLogs = (delta: number) => {
      const size = width < 768 ? 10 : 12;

      ctx.font = `${size}px var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      for (let index = 0; index < logs.length; index += 1) {
        const log = logs[index];
        log.y -= log.speed * delta;

        if (log.y < -28) {
          Object.assign(log, createLog(index, height + random(20, 180)));
        }

        const x = log.x + Math.sin(time * 0.35 + log.phase) * 8;
        const alpha =
          log.alpha *
          contentMask(x + log.width * 0.5, log.y) *
          (0.76 + Math.sin(time * 1.6 + log.phase) * 0.14);

        if (alpha < 0.018) continue;

        const prompt = index % 4 === 0 ? "$ " : index % 4 === 1 ? "> " : "";

        ctx.fillStyle = `rgba(165, 243, 252, ${clamp(alpha, 0, 0.34)})`;
        ctx.fillText(prompt + log.text, x, log.y);
      }
    };

    const drawFade = () => {
      const fade = ctx.createLinearGradient(0, 0, 0, height);

      fade.addColorStop(0, "rgba(0,0,0,0.34)");
      fade.addColorStop(0.2, "rgba(0,0,0,0)");
      fade.addColorStop(0.78, "rgba(0,0,0,0)");
      fade.addColorStop(1, "rgba(0,0,0,0.42)");

      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, width, height);
    };

    const render = (now: number) => {
      const delta = clamp((now - lastTime) / 1000, 0.001, 0.04);

      lastTime = now;
      time += delta;

      drawBackground();
      drawGrid();
      drawTraces(delta);
      drawLogs(delta);
      drawFade();

      raf = requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);

    resize();
    observer.observe(canvas);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
    />
  );
}
