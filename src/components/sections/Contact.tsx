import { Mail, Phone } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact">
      <Reveal>
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 sm:p-12">
          <p className="text-sm text-[var(--color-muted)]">
            함께 만들고 싶은 제품이 있나요?
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 block break-all text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            {site.email}
          </a>
          <p className="mt-6 max-w-xl text-sm text-[var(--color-muted)] sm:text-base">
            함께 일할 동료, 사이드 프로젝트, 또는 가벼운 커피챗 모두
            환영합니다. 메일이 가장 빠릅니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              메일 보내기
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-fg)] transition-colors hover:bg-[var(--color-bg)]"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={`tel:${site.phone.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-fg)] transition-colors hover:bg-[var(--color-bg)]"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
