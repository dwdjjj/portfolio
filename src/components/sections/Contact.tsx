import { ArrowRight, Mail, Phone } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { site } from "@/data/site";

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact">
      <Reveal>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)] sm:text-base">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs font-medium text-[var(--color-accent)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            답장 가능
          </span>
          <span>서울에서, 함께 만들 제품을 기다리고 있습니다.</span>
        </div>

        <a
          href={`mailto:${site.email}`}
          className="mt-6 block break-all text-3xl font-semibold tracking-tight text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)] sm:text-6xl lg:text-7xl"
        >
          <ScrambleText text={site.email} />
        </a>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              For work
            </p>
            <p className="mt-3 text-sm text-[var(--color-muted)] sm:text-base">
              채용 · 외주 · 사이드 프로젝트 제안은 메일이 가장 빠릅니다.
              평일 기준 하루 안에 회신드리는 것을 목표로 하고 있어요.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-fg)] hover:text-[var(--color-accent)]"
            >
              <Mail aria-hidden className="h-4 w-4" />
              바로 메일 쓰기
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              Or just say hi
            </p>
            <p className="mt-3 text-sm text-[var(--color-muted)] sm:text-base">
              기술 잡담이나 포트폴리오 피드백, 커리어 고민 같은 이야기도 편하게 주세요.
              30분 커피챗도 환영합니다.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[var(--color-fg)] hover:text-[var(--color-accent)]"
              >
                <FaGithub aria-hidden className="h-4 w-4" />
                GitHub
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={`tel:${site.phone.replace(/-/g, "")}`}
                className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-fg)]"
              >
                <Phone aria-hidden className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
