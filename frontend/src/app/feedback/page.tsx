import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

import { FeedbackForm } from "./_components/feedback-form";

export const metadata: Metadata = {
  title: "Feedback | HOK Wiki",
  description:
    "Bantu HOK Wiki menjadi lebih baik. Kirim saran, laporkan bug, atau beri tahu kami tentang informasi yang perlu diperbaiki.",
};

const feedbackTips = [
  {
    title: "Jelaskan masalah secara spesifik",
    description:
      "Sebutkan apa yang terjadi dan di mana masalah itu muncul.",
  },
  {
    title: "Sertakan langkah untuk mengulanginya",
    description:
      "Tuliskan langkah-langkah yang bisa kami ikuti untuk menirunya.",
  },
  {
    title: "Tambahkan screenshot jika diperlukan",
    description:
      "Gambar dapat sangat membantu kami memahami masalah.",
  },
];

export default function FeedbackPage() {
  return (
    <div className="mx-auto w-full max-w-432 px-4 pt-7 pb-14 text-foreground sm:px-8 lg:px-12 lg:pr-48">
      <header className="mb-6">
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-2.5 text-xs text-muted-foreground sm:text-sm">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            <Home aria-hidden="true" className="size-4" />
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-foreground">
            Feedback
          </span>
        </nav>

        <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl dark:drop-shadow-[0_0_14px_rgb(78_191_255_/_0.25)]">
          Help Us Improve
        </h1>

        <div aria-hidden="true" className="mt-3 flex w-full max-w-96 items-center gap-3 text-primary dark:text-cyan-300">
          <span className="h-px flex-1 bg-linear-to-r from-transparent via-current to-current" />
          <span className="size-2.5 shrink-0 rotate-45 border-2 border-current shadow-[0_0_8px_currentColor]" />
          <span className="h-px w-20 bg-linear-to-r from-current to-transparent" />
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          Punya saran, menemukan bug, atau informasi yang kurang tepat? Beri tahu
          kami.
        </p>
      </header>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(19rem,1fr)]">
        <FeedbackForm />

        <aside aria-label="Panduan mengirim masukan" className="flex min-w-0 flex-col gap-4 rounded-xl border border-primary/35 bg-card/95 p-4 shadow-[var(--hok-panel-shadow)] sm:p-5">
          <Image data-feedback-illustration="true" src="/images/help-us-improve.png" alt="" width={320} height={320} sizes="(min-width: 1024px) 288px, (min-width: 640px) 280px, 240px" className="mx-auto h-auto w-full max-w-60 object-contain sm:max-w-70 lg:max-w-72" />

          <section aria-labelledby="feedback-guide-heading" className="rounded-xl border border-primary/25 bg-background/45 p-4">
            <h2 id="feedback-guide-heading" className="font-serif text-lg font-bold leading-snug text-foreground">
              Bantu kami memahami masalahnya
            </h2>

            <ol className="mt-4 space-y-5">
              {feedbackTips.map((tip, index) => (
                <li key={tip.title} className="flex items-start gap-3">
                  <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-sm font-semibold text-primary dark:border-cyan-300 dark:bg-cyan-400/15 dark:text-cyan-100 dark:shadow-[0_0_10px_rgb(34_211_238_/_0.2)]">
                    {index + 1}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-sm font-semibold leading-5 text-foreground">
                      {tip.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-[13px]">
                      {tip.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}
