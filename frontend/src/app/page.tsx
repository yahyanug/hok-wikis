"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./css/welcome-loading.css";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/dashboard");
    const timer = window.setTimeout(() => router.replace("/dashboard"), 1000);
    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <section
      aria-labelledby="loading-brand"
      className="fixed inset-0 z-50 isolate flex items-center justify-center overflow-y-auto bg-background px-6 py-10 text-foreground"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--hok-header-border),transparent_65%)] opacity-50" />
        <div className="hok-loading-glow absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <div className="hok-loading-content relative flex w-full max-w-2xl flex-col items-center text-center">
        <h1
          id="loading-brand"
          className="hok-footer__brand m-0! gap-4! text-[clamp(1.75rem,6vw,3rem)]! sm:gap-6!"
        >
          <span className="relative flex size-20 shrink-0 items-center justify-center sm:size-24">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-cyan-700/15 dark:border-cyan-300/15"
            />
            <span
              aria-hidden="true"
              className="hok-loading-orbit absolute inset-0 rounded-full border border-transparent border-t-cyan-600 border-r-cyan-600/30 dark:border-t-cyan-200 dark:border-r-cyan-200/30"
            />
            <span
              aria-hidden="true"
              className="hok-loading-orbit hok-loading-orbit-reverse absolute inset-2 rounded-full border border-transparent border-b-cyan-600/50 dark:border-b-cyan-200/50"
            />
            <Image
              src="/images/hok-logo.png"
              alt=""
              width={80}
              height={80}
              loading="eager"
              className="hok-footer__logo size-14! sm:size-16!"
            />
          </span>
          <span>HOK WIKI</span>
        </h1>

        <p className="hok-footer__tagline mt-5! max-w-xl text-center text-[9px]! leading-7! text-balance sm:text-[10px]!">
          © 2026 HOK Wiki
        </p>

        <div className="mt-10 flex w-full max-w-64 flex-col items-center gap-4 sm:max-w-72">
          <div
            aria-hidden="true"
            className="h-0.5 w-full overflow-hidden rounded-full bg-cyan-900/10 dark:bg-cyan-100/10"
          >
            <div className="hok-loading-beam h-full w-2/5 rounded-full bg-linear-to-r from-transparent via-cyan-600 to-transparent dark:via-cyan-200" />
          </div>

          <p
            role="status"
            className="flex items-center gap-3 text-[10px] font-medium tracking-[0.3em] text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className="hok-loading-dot size-1 rounded-full bg-cyan-600 dark:bg-cyan-200"
            />
            NOW LOADING
            <span className="sr-only">Opening dashboard.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
