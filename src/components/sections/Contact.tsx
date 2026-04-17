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
        <p className="text-sm text-[var(--color-muted)] sm:text-base">
          똑똑, 함께 일할 사람을 찾고 계신가요?
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-4 block break-all text-3xl font-semibold tracking-tight text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)] sm:text-6xl lg:text-7xl"
        >
          <ScrambleText text={site.email} />
        </a>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-sm text-[var(--color-muted)] sm:text-base">
              합류 또는 프로젝트 제안 문의가 있으시다면 편하게 메일 주세요.
              1–2일 이내에 꼭 답장 드리겠습니다 :)
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-fg)] hover:text-[var(--color-accent)]"
            >
              <Mail aria-hidden className="h-4 w-4" />
              메일 보내기
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <div>
            <p className="text-sm text-[var(--color-muted)] sm:text-base">
              가벼운 개발 이야기 커피챗이나 포트폴리오 피드백도 환영합니다.
              &ldquo;이런 거 만들어 보고 싶은데 어떻게 시작하면 좋을까요?&rdquo; 같은 질문도 부담 없이 보내 주세요 :)
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
