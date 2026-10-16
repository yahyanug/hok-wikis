import type { Metadata } from "next";

import { floatingContentClassName } from "@/components/layout/floating-content";

import { heroes } from "./_data/heroes";
import { HeroesCatalog } from "./_components/heroes-catalog";

export const metadata: Metadata = {
  title: "Heroes | HOK Wiki",
  description:
    "Jelajahi hero Honor of Kings berdasarkan role dan lane. Kenali gaya bermain dan tips dasar setiap hero.",
};

export default function HeroesPage() {
  return (
    <div className={`${floatingContentClassName} w-full px-4 pt-7 pb-14 text-foreground sm:px-8 lg:px-12`}>
      <header className="mb-7">
        <h1 className="text-center font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl dark:drop-shadow-[0_0_14px_rgb(78_191_255_/_0.25)]">
          Hero Library
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
              background: "linear-gradient(to left, transparent, currentColor)",
            }}
          />
        </div>
      </header>

      <HeroesCatalog heroes={heroes} />
    </div>
  );
}
