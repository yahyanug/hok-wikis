"use client";

import Image from "next/image";
import { Download, ExternalLink, Heart, QrCode, Store } from "lucide-react";
import { useState } from "react";

const QRIS_IMAGE_PATH = "/images/qris.jpg";

export function QrisCard() {
  const [imageState, setImageState] = useState<"loading" | "ready" | "unavailable">("loading");
  const isReady = imageState === "ready";
  const actionClassName = "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none";

  return (
    <section aria-labelledby="qris-heading" className="rounded-xl border border-primary/40 bg-card/95 p-5 text-center shadow-[var(--hok-panel-shadow)] sm:p-6" style={{ flex: "2 1 0", minWidth: "min(100%, 32rem)" }}>
      <h2 id="qris-heading" className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
        Dukung melalui QRIS
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
        Setiap dukungan membantu pengembangan HOK Wiki.
      </p>

      <div className="relative mx-auto mt-5 aspect-square w-full max-w-80 overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-600 shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_12%,transparent)]">
        {!isReady && (
          <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-5">
            <span className="text-xl font-bold tracking-widest text-slate-700">QRIS</span>
            <QrCode aria-hidden="true" className="size-24 text-slate-300" strokeWidth={1.25} />
            <div>
              <p className="text-sm font-semibold text-slate-600">QRIS belum tersedia</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Terima kasih atas niat baikmu untuk mendukung.</p>
            </div>
          </div>
        )}
        <Image src={QRIS_IMAGE_PATH} alt="Kode QRIS untuk mendukung HOK Wiki" width={640} height={640} sizes="(max-width: 640px) calc(100vw - 80px), 320px" unoptimized onLoad={() => setImageState("ready")} onError={() => setImageState("unavailable")} className={`absolute inset-0 h-full w-full object-contain p-3 ${isReady ? "opacity-100" : "opacity-0"}`} />
      </div>

      <div className="mt-4 flex min-h-12 flex-wrap items-center justify-center gap-2 rounded-lg border border-primary/30 bg-background/35 px-3 py-3 text-sm">
        <Store aria-hidden="true" className="size-5 shrink-0 text-primary" />
        <span className="text-muted-foreground">Penerima:</span>
        <span className="font-semibold text-foreground">Nama penerima belum ditentukan</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {isReady ? (
          <>
            <a href={QRIS_IMAGE_PATH} target="_blank" rel="noopener noreferrer" className={`${actionClassName} border-primary bg-primary/15 text-foreground shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_15%,transparent)] hover:bg-primary/25 dark:border-cyan-300 dark:bg-cyan-400/15`}>
              <ExternalLink aria-hidden="true" className="size-5" />
              Lihat QRIS
              <span className="sr-only"> (tab baru)</span>
            </a>
            <a href={QRIS_IMAGE_PATH} download="HOK-Wiki-QRIS.jpg" className={`${actionClassName} border-primary/50 bg-background/35 text-foreground hover:border-primary hover:bg-primary/10`}>
              <Download aria-hidden="true" className="size-5" />
              Unduh QRIS
            </a>
          </>
        ) : (
          <>
            <button type="button" disabled aria-describedby="qris-status" className={`${actionClassName} cursor-not-allowed border-primary/25 bg-primary/5 text-muted-foreground opacity-60`}>
              <ExternalLink aria-hidden="true" className="size-5" />
              Lihat QRIS
            </button>
            <button type="button" disabled aria-describedby="qris-status" className={`${actionClassName} cursor-not-allowed border-primary/25 bg-background/25 text-muted-foreground opacity-60`}>
              <Download aria-hidden="true" className="size-5" />
              Unduh QRIS
            </button>
          </>
        )}
      </div>
      <p id="qris-status" className="mt-3 text-xs leading-5 text-muted-foreground">
        {isReady ? "Scan atau unduh QRIS menggunakan aplikasi pembayaranmu." : "QRIS sedang disiapkan. Kamu dapat kembali lagi nanti."}
      </p>

      <div className="mt-6">
        <div aria-hidden="true" className="flex items-center gap-3 py-1 text-primary dark:text-cyan-300">
          <span className="h-px min-w-0 flex-1 bg-primary/30" />
          <Heart className="size-6 shrink-0 drop-shadow-[0_0_6px_currentColor]" />
          <span className="h-px min-w-0 flex-1 bg-primary/30" />
        </div>
        <p className="mt-2 text-xs leading-6 text-muted-foreground sm:text-sm">
          Dukungan bersifat sukarela. Terima kasih sudah menjadi bagian dari perjalanan HOK Wiki.
        </p>
      </div>
    </section>
  );
}
