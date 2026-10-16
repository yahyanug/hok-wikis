import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Sparkles } from "lucide-react";

import { getAboutContent } from "@/lib/about-content";

export const metadata: Metadata = {
  title: "About | HOK Wiki",
  description:
    "Kenali HOK Wiki, proyek independen dari penggemar untuk para pemain Honor of Kings.",
};

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <div className="w-full px-4 pt-8 pb-12 text-foreground sm:px-6 sm:pt-9 sm:pb-14 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-7 text-center sm:mb-9"></header>

        <div className="mb-7 sm:mb-9 relative isolate mx-auto w-full max-w-208">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] text-primary/45"
          >
            <svg
              viewBox="0 0 840 420"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >
              <path
                d="M2 152 L420 2 L838 152 L838 418 L2 418 Z"
                fill="var(--secondary)"
                stroke="currentColor"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M15 159 L420 16 L825 159 L825 404 L15 404 Z"
                fill="var(--card)"
                stroke="currentColor"
                strokeWidth="0.7"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M15 159 L420 332 L825 159"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <article
            aria-labelledby="about-letter-heading"
            className="relative z-10 mx-[4%] rounded-t-2xl border border-primary/45 bg-card px-5 pt-7 pb-24 text-card-foreground shadow-[0_16px_50px_color-mix(in_srgb,var(--background)_65%,transparent)] sm:mx-[9%] sm:px-8 sm:pb-28 lg:px-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2.5 rounded-t-xl border border-primary/25 sm:inset-3.5"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-5 top-3 flex items-center gap-3 text-primary/55 sm:inset-x-7"
            >
              <span className="h-px min-w-0 flex-1 bg-linear-to-r from-transparent to-primary/40" />
              <span className="size-1 shrink-0 rotate-45 border border-current" />
              <span className="h-px min-w-0 flex-1 bg-linear-to-l from-transparent to-primary/40" />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-t-2xl opacity-45"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 14% 12%, color-mix(in srgb, var(--primary) 12%, transparent), transparent 38%), radial-gradient(circle at 90% 90%, color-mix(in srgb, var(--primary) 8%, transparent), transparent 45%)",
              }}
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 120 120"
              className="pointer-events-none absolute -top-px -right-px w-14 overflow-visible text-primary/50 sm:w-20 lg:w-24"
            >
              <path
                d="M2 1 H91 Q111 1 111 23 V104 Q95 87 73 80 C44 70 17 82 2 1 Z"
                fill="var(--secondary)"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M10 7 C26 65 52 62 76 71 Q94 77 105 92"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <path
                d="M22 15 L82 75 M35 13 L93 71 M51 13 L102 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.35"
              />
            </svg>

            <div className="relative">
              <div
                aria-hidden="true"
                className="mx-auto mb-3 flex max-w-64 items-center justify-center gap-3 text-primary sm:gap-4"
              >
                <span className="h-px min-w-0 flex-1 bg-linear-to-r from-transparent to-primary/70" />
                <Sparkles className="size-4 shrink-0 text-primary/75" />
                <Mail className="size-8 shrink-0 stroke-[1.25]" />
                <Sparkles className="size-4 shrink-0 text-primary/75" />
                <span className="h-px min-w-0 flex-1 bg-linear-to-l from-transparent to-primary/70" />
              </div>

              <h2
                id="about-letter-heading"
                className="text-center font-serif text-2xl font-semibold leading-snug text-foreground lg:text-[1.7rem]"
              >
                {content.letterTitle}
              </h2>
              <div
                aria-hidden="true"
                className="mx-auto mt-2 mb-5 flex max-w-56 items-center gap-3 px-2 py-2 text-primary"
              >
                <span className="h-px min-w-0 flex-1 bg-linear-to-r from-transparent to-primary/70" />
                <span className="size-2 shrink-0 rotate-45 border-2 border-current" />
                <span className="h-px min-w-0 flex-1 bg-linear-to-l from-transparent to-primary/70" />
              </div>

              <div className="space-y-4 font-serif text-base leading-[1.65] sm:text-[17px] sm:leading-[1.6] lg:text-lg lg:leading-[1.5]">
                <p>{content.greeting}</p>
                {content.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-5 grid items-end gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-4">
                <p className="order-2 text-[11px] leading-5 text-muted-foreground sm:order-1">
                  {content.disclaimer}
                </p>
                <div className="order-1 text-right sm:order-2">
                  <p className="font-serif text-sm italic leading-6 text-foreground sm:text-base">
                    {content.signoff}
                  </p>
                  <p className="mt-1 font-serif text-3xl leading-tight italic tracking-wide text-primary sm:text-4xl">
                    {content.signature}
                  </p>
                  <span
                    aria-hidden="true"
                    className="ml-auto mt-2 block h-px w-28 -rotate-6 bg-primary/70 sm:w-32"
                  />
                </div>
              </div>
            </div>
          </article>

          <div
            aria-hidden="true"
            className="pointer-events-none relative z-20 -mt-20 h-40 sm:-mt-24 sm:h-52"
          >
            <svg
              viewBox="0 0 840 240"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
              style={{
                color: "color-mix(in srgb, var(--chart-5) 60%, var(--primary))",
              }}
            >
              <path
                d="M2 2 L420 139 L838 2 L838 238 L2 238 Z"
                fill="var(--secondary)"
                stroke="currentColor"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M2 238 L345 91 Q420 62 495 91 L838 238 Z"
                fill="var(--card)"
                stroke="currentColor"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M14 229 L350 100 Q420 72 490 100 L826 229"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.65"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M15 12 L405 145 M435 145 L825 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M47 171 L50 182 L61 185 L50 188 L47 199 L44 188 L33 185 L44 182 Z M730 153 L733 164 L744 167 L733 170 L730 181 L727 170 L716 167 L727 164 Z"
                fill="var(--primary)"
                opacity="0.45"
              />
              <path
                d="M92 203 H158 M112 217 H211 M660 201 H749 M620 215 H712"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.35"
              />
            </svg>

            <div className="absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-[44%] border-2 border-primary/80 bg-secondary shadow-[0_0_0_4px_var(--card),0_0_0_5px_var(--border),0_6px_24px_color-mix(in_srgb,var(--primary)_30%,transparent)] sm:size-24 lg:size-28">
              <span className="absolute inset-1 rounded-[44%] border border-primary/45" />
              <span className="absolute inset-2 rounded-full border border-primary/50 bg-card shadow-[inset_0_0_18px_color-mix(in_srgb,var(--primary)_15%,transparent)]" />
              <Image
                src="/images/hok-logo.png"
                alt=""
                width={64}
                height={64}
                className="relative size-10 object-contain sm:size-12 lg:size-14"
                style={{ filter: "var(--hok-footer-logo-filter)" }}
              />
            </div>
            <span className="absolute bottom-4 left-1/2 size-2 -translate-x-1/2 rotate-45 border border-primary/60 sm:bottom-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
