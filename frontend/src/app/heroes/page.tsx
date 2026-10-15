import type { Metadata } from "next";
import Link from "next/link";

import { heroes } from "./_data/heroes";
import { HeroesCatalog } from "./_components/heroes-catalog";

export const metadata: Metadata = {
  title: "Heroes | HOK Wiki",
  description:
    "Jelajahi hero Honor of Kings berdasarkan role dan lane. Kenali gaya bermain dan tips dasar setiap hero.",
};

export default function HeroesPage() {
  return (
    <div
      className="mx-auto w-full max-w-432 px-4 pt-7 pb-14 text-foreground sm:px-8 lg:px-12"
    >
      <header className="mb-7">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2.5 text-xs text-muted-foreground"
        >
          <Link
            href="/dashboard"
            className="text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <span aria-current="page">Heroes</span>
        </nav>

        <h6
          className="font-serif text-4xl font-bold leading-tight sm:text-5xl"
        >
          Hero Library
        </h6>

        <p
          className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base"
        >
          Kenali hero, role, dan gaya bermainnya.
        </p>
      </header>

      <HeroesCatalog heroes={heroes} />
    </div>
  );
}
