import type { Metadata } from "next";
import Image from "next/image";
import { Heart } from "lucide-react";

import { floatingContentClassName } from "@/components/layout/floating-content";

import { QrisCard } from "./_components/qris-card";

export const metadata: Metadata = {
  title: "Support Us | HOK Wiki",
  description:
    "Dukung pengembangan HOK Wiki melalui QRIS. Setiap dukungan membantu kami menghadirkan informasi yang lebih baik untuk para pemain.",
};

export default function SupportUsPage() {
  return (
    <div className={`${floatingContentClassName} w-full px-4 pt-5 pb-8 text-foreground sm:px-8 lg:px-12`}>
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-5 text-center">
          <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl dark:drop-shadow-[0_0_14px_rgb(78_191_255_/_0.25)]">
            Support Us
          </h1>
          <div aria-hidden="true" className="mx-auto mt-2 flex w-full max-w-sm items-center gap-3 px-3 py-2 text-primary dark:text-cyan-300">
            <span className="h-px min-w-0 flex-1 bg-linear-to-r from-transparent to-current" />
            <span className="size-2 shrink-0 rotate-45 border-2 border-current shadow-[0_0_8px_currentColor]" />
            <span className="h-px min-w-0 flex-1 bg-linear-to-l from-transparent to-current" />
          </div>
        </header>

        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <QrisCard />

          <aside aria-labelledby="support-thanks-heading" className="relative flex min-w-0 flex-col items-center justify-center rounded-2xl border border-primary/30 bg-card/95 px-5 py-6 text-center shadow-[var(--hok-panel-shadow)] sm:p-6">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent" />
            <div className="relative w-full max-w-52">
              <span aria-hidden="true" className="pointer-events-none absolute inset-6 rounded-full bg-primary/10 blur-2xl" />
              <Image
                data-support-illustration="true"
                src="/images/support-us.png"
                alt=""
                width={320}
                height={320}
                sizes="208px"
                loading="eager"
                className="relative mx-auto h-auto w-full object-contain"
              />
            </div>
            <h2 id="support-thanks-heading" className="mt-4 max-w-64 font-serif text-2xl font-bold leading-tight break-words text-foreground dark:drop-shadow-[0_0_12px_rgb(78_191_255_/_0.2)]">
              Terima kasih sudah mendukung!
            </h2>
            <div aria-hidden="true" className="mt-3 flex w-full max-w-40 items-center gap-3 py-1 text-primary dark:text-cyan-300">
              <span className="h-px min-w-0 flex-1 bg-primary/25" />
              <Heart className="size-5 shrink-0 drop-shadow-[0_0_6px_currentColor]" />
              <span className="h-px min-w-0 flex-1 bg-primary/25" />
            </div>
            <p className="mt-3 max-w-64 text-sm leading-6 text-muted-foreground">
              Dukunganmu membantu HOK Wiki terus berkembang, menghadirkan
              informasi terbaru, dan menjadi referensi yang lebih baik untuk para
              pemain.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
