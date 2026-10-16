import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Home } from "lucide-react";

import { QrisCard } from "./_components/qris-card";

export const metadata: Metadata = {
  title: "Support Us | HOK Wiki",
  description:
    "Dukung pengembangan HOK Wiki melalui QRIS. Setiap dukungan membantu kami menghadirkan informasi yang lebih baik untuk para pemain.",
};

export default function SupportUsPage() {
  return (
    <div className="mx-auto w-full max-w-432 px-4 pt-7 pb-14 text-foreground sm:px-8 lg:px-12 lg:pr-48">
      <header className="mb-6">
        <nav
          aria-label="Breadcrumb"
          className="mb-3 flex items-center gap-2.5 text-xs text-muted-foreground sm:text-sm"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <Home aria-hidden="true" className="size-4" />
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-foreground">
            Support Us
          </span>
        </nav>

        <div
          style={{ display: "flex", flexWrap: "wrap", columnGap: "1.25rem" }}
        >
          <div style={{ flex: "2 1 0", minWidth: "min(100%, 32rem)" }}>
            <h1 className="text-center font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl dark:drop-shadow-[0_0_14px_rgb(78_191_255_/_0.25)]">
              Support Us
            </h1>

            <div
              aria-hidden="true"
              className="mx-auto mt-3 flex w-full max-w-lg items-center gap-3 px-3 py-2 text-primary dark:text-cyan-300"
            >
              <span
                className="h-px min-w-0 flex-1"
                style={{
                  background:
                    "linear-gradient(to right, transparent, currentColor)",
                }}
              />
              <span className="size-2.5 shrink-0 rotate-45 border-2 border-current shadow-[0_0_8px_currentColor]" />
              <span
                className="h-px min-w-0 flex-1"
                style={{
                  background:
                    "linear-gradient(to left, transparent, currentColor)",
                }}
              />
            </div>
          </div>
          <div
            aria-hidden="true"
            style={{ flex: "1 1 0", minWidth: "min(100%, 19rem)", height: 0 }}
          />
        </div>
      </header>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: "1.25rem",
        }}
      >
        <QrisCard />

        <aside
          aria-labelledby="support-thanks-heading"
          className="flex min-w-0 flex-col items-center px-4 py-5 text-center sm:px-5 sm:py-8"
          style={{ flex: "1 1 0", minWidth: "min(100%, 19rem)" }}
        >
          <Image
            data-support-illustration="true"
            src="/images/support-us.png"
            alt=""
            width={320}
            height={320}
            sizes="(min-width: 1024px) 288px, (min-width: 640px) 280px, 240px"
            loading="eager"
            className="mx-auto h-auto w-full max-w-60 object-contain sm:max-w-70 lg:max-w-72"
          />
          <h2
            id="support-thanks-heading"
            className="mt-5 max-w-sm font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl dark:drop-shadow-[0_0_12px_rgb(78_191_255_/_0.2)]"
          >
            Terima kasih sudah mendukung!
          </h2>
          <Heart
            aria-hidden="true"
            className="mt-4 size-7 text-primary drop-shadow-[0_0_8px_currentColor] dark:text-cyan-300"
          />
          <p className="mt-4 max-w-xs text-sm leading-7 text-muted-foreground sm:text-base">
            Dukunganmu membantu HOK Wiki terus berkembang, menghadirkan
            informasi terbaru, dan menjadi referensi yang lebih baik untuk para
            pemain.
          </p>
        </aside>
      </div>
    </div>
  );
}
