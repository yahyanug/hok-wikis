"use client";

import Image from "next/image";
import { Download, ExternalLink, Heart, QrCode, Store } from "lucide-react";
import { useState } from "react";

const QRIS_IMAGE_PATH = "/images/qris.jpg";

export function QrisCard() {
  const [imageState, setImageState] = useState<
    "loading" | "ready" | "unavailable"
  >("loading");
  const isReady = imageState === "ready";
  const actionClassName =
    "inline-flex min-h-10 min-w-0 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none sm:text-sm";

  return (
    <section
      aria-labelledby="qris-heading"
      className="min-w-0 rounded-2xl border border-primary/40 bg-card/95 p-4 text-center shadow-[var(--hok-panel-shadow)] sm:p-5"
    >
      <h2
        id="qris-heading"
        className="font-serif text-xl font-bold break-words text-foreground sm:text-2xl"
      >
        Dukung melalui QRIS
      </h2>
      <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
        Setiap dukungan membantu pengembangan HOK Wiki.
      </p>

      <div className="relative mx-auto mt-4 aspect-square w-full max-w-56 overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-600 shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_12%,transparent)]">
        {!isReady && (
          <div
            role="status"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3"
          >
            <span className="text-sm font-bold tracking-widest text-slate-700">
              QRIS
            </span>
            <QrCode
              aria-hidden="true"
              className="size-14 shrink-0 text-slate-300"
              strokeWidth={1.25}
            />
            <div>
              <p className="text-xs font-semibold text-slate-600">
                QRIS belum tersedia
              </p>
              <p className="mt-1 text-[11px] leading-4 text-slate-500">
                Terima kasih atas niat baikmu untuk mendukung.
              </p>
            </div>
          </div>
        )}
        <Image
          src={QRIS_IMAGE_PATH}
          alt="Kode QRIS untuk mendukung HOK Wiki"
          width={640}
          height={640}
          sizes="224px"
          unoptimized
          onLoad={() => setImageState("ready")}
          onError={() => setImageState("unavailable")}
          className={`absolute inset-0 h-full w-full object-contain p-2 ${isReady ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <div className="mt-3 flex min-h-11 flex-wrap items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-background/35 px-3 py-2 text-xs">
        <Store aria-hidden="true" className="size-4 shrink-0 text-primary" />
        <span className="text-muted-foreground">Penerima:</span>
        <span className="min-w-0 font-semibold break-words text-foreground">
          ohacqqkb3w
        </span>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <a
          href={QRIS_IMAGE_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className={`${actionClassName} border-primary bg-primary/15 text-foreground shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_15%,transparent)] hover:bg-primary/25 dark:border-cyan-300 dark:bg-cyan-400/15`}
        >
          <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
          Lihat QRIS
          <span className="sr-only"> (tab baru)</span>
        </a>
        <a
          href={QRIS_IMAGE_PATH}
          download="HOK-Wiki-QRIS.jpg"
          className={`${actionClassName} border-primary/50 bg-background/35 text-foreground hover:border-primary hover:bg-primary/10`}
        >
          <Download aria-hidden="true" className="size-4 shrink-0" />
          Unduh QRIS
        </a>
      </div>
      <p
        id="qris-status"
        className="mt-2 text-xs leading-5 text-muted-foreground"
      >
        {isReady
          ? "Scan atau unduh QRIS menggunakan aplikasi pembayaranmu."
          : "QRIS sedang disiapkan. Kamu dapat kembali lagi nanti."}
      </p>

      <div className="mt-4">
        <div
          aria-hidden="true"
          className="flex items-center gap-3 py-1 text-primary dark:text-cyan-300"
        >
          <span className="h-px min-w-0 flex-1 bg-primary/30" />
          <Heart className="size-5 shrink-0 drop-shadow-[0_0_6px_currentColor]" />
          <span className="h-px min-w-0 flex-1 bg-primary/30" />
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Dukungan bersifat sukarela. Terima kasih sudah menjadi bagian dari
          perjalanan HOK Wiki.
        </p>
      </div>
    </section>
  );
}
