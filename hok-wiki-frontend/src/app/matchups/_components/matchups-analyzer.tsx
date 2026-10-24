"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Check,
  ChevronDown,
  LayoutGrid,
  RotateCcw,
  Search,
  ShieldAlert,
  Swords,
} from "lucide-react";
import { useState } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import type { HeroRole } from "@/app/types/hero";
import {
  laneLabels,
  laneOptions,
  roleLabels,
  roleOptions,
  type HeroLane,
} from "@/app/heroes/_data/heroes";
import { ContentArtwork } from "@/components/content/content-artwork";
import type {
  MatchupData,
  MatchupHero,
  MatchupPhase,
  MatchupPhaseId,
  MatchupRelation,
} from "@/lib/matchups";

const roleImages: Record<HeroRole, string> = {
  FIGHTER: "/images/role/fighter.png",
  ASSASSIN: "/images/role/assassin.png",
  MAGE: "/images/role/mage.png",
  MARKSMAN: "/images/role/marksman.png",
  TANK: "/images/role/tank.png",
  SUPPORT: "/images/role/support.png",
};

const laneImages: Record<HeroLane, string> = {
  CLASH: "/images/lane/clash.png",
  JUNGLE: "/images/lane/jungle.png",
  MID: "/images/lane/mid.png",
  FARM: "/images/lane/farm.png",
  ROAMING: "/images/lane/roaming.png",
};

const panelClass =
  "rounded-xl border border-primary/40 bg-card/95 shadow-[var(--hok-panel-shadow)]";
const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function HeroPortrait({
  hero,
  className,
}: {
  hero: MatchupHero;
  className: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const initials = hero.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("");

  return (
    <span
      role="img"
      aria-label={hero.name}
      className={`relative block shrink-0 overflow-hidden bg-secondary ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center font-serif text-xl font-semibold text-primary"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, color-mix(in srgb, var(--primary) 30%, transparent), transparent 80%), linear-gradient(135deg, var(--secondary), var(--background))",
        }}
      >
        {initials}
      </span>
      {hero.image && failedSrc !== hero.image && (
        <Image
          src={hero.image}
          alt=""
          fill
          sizes="120px"
          unoptimized={/^https?:\/\//i.test(hero.image)}
          onError={() => setFailedSrc(hero.image)}
          className="object-cover"
          style={{
            objectPosition: hero.slug === "ying" ? "center 25%" : "center",
          }}
        />
      )}
    </span>
  );
}

type RelationsPanelProps = {
  type: "advantages" | "counters";
  selectedHero: MatchupHero;
  heroes: MatchupHero[];
  relations: MatchupRelation[];
  onSelect: (slug: string) => void;
  isSample: boolean;
};

function RelationsPanel({
  type,
  selectedHero,
  heroes,
  relations,
  onSelect,
  isSample,
}: RelationsPanelProps) {
  const isAdvantage = type === "advantages";
  const Icon = isAdvantage ? Swords : ShieldAlert;
  const headingId = `matchup-${type}-heading`;
  const accent = isAdvantage
    ? "text-emerald-700 dark:text-emerald-300"
    : "text-rose-700 dark:text-rose-300";

  return (
    <section
      aria-labelledby={headingId}
      className={`${panelClass} min-w-0 p-3 sm:p-3.5 ${isAdvantage ? "border-emerald-500/55" : "border-rose-500/55"}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3 border-b border-border pb-2.5">
        <div className="flex items-start gap-2.5">
          <span
            className={`rounded-md p-1.5 ${isAdvantage ? "bg-emerald-500/10" : "bg-rose-500/10"} ${accent}`}
          >
            <Icon aria-hidden="true" className="size-6" />
          </span>
          <div>
            <h2
              id={headingId}
              className={`font-serif text-2xl leading-none font-semibold ${accent}`}
            >
              {isAdvantage ? "Advantages" : "Counters"}
            </h2>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              {isAdvantage
                ? "Peluang yang bisa dicermati"
                : "Lawan yang perlu diperhatikan"}{" "}
              oleh {selectedHero.name}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded border border-border px-2 py-1 text-[10px] text-muted-foreground">
          {relations.length} hero{isSample ? " · Contoh" : ""}
        </span>
      </div>

      {relations.length ? (
        <div
          key={selectedHero.slug}
          role="region"
          aria-label={`Daftar ${type} ${selectedHero.name}, scroll down to see more heroes`}
          tabIndex={0}
          className={`grid max-h-[41.5rem] grid-cols-2 auto-rows-[10rem] gap-2 overflow-y-auto overscroll-contain rounded-md pr-1 sm:max-h-[20.5rem] sm:grid-cols-4 ${focusClass}`}
        >
          {relations.map((relation) => {
            const hero = heroes.find(
              (entry) => entry.slug === relation.heroSlug,
            );
            if (!hero) return null;

            return (
              <button
                key={hero.slug}
                type="button"
                title={relation.reason}
                onClick={() => onSelect(hero.slug)}
                aria-label={`Pilih ${hero.name}. ${relation.reason}`}
                className={`flex h-40 min-w-0 flex-col overflow-hidden rounded-md border bg-background/45 text-left transition-colors motion-reduce:transition-none ${isAdvantage ? "border-emerald-500/30 hover:border-emerald-500" : "border-rose-500/30 hover:border-rose-500"} ${focusClass}`}
              >
                <HeroPortrait
                  hero={hero}
                  className="h-16 w-full border-b border-border"
                />
                <span className="line-clamp-1 px-1.5 pt-1.5 text-xs font-semibold leading-tight text-foreground">
                  {hero.name}
                </span>
                <span className="mt-1 line-clamp-4 px-1.5 pb-1.5 text-[10px] leading-[1.4] text-muted-foreground">
                  {relation.reason}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="rounded-md border border-dashed border-border p-6 text-sm text-muted-foreground">
          Belum ada perbandingan untuk hero ini.
        </p>
      )}

      {relations.length > 8 && (
        <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
          <ChevronDown aria-hidden="true" className="size-3" />
          Gulir untuk hero lainnya
        </p>
      )}
    </section>
  );
}

function PhaseSection({
  phase,
  hero,
}: {
  phase: MatchupPhase;
  hero: MatchupHero;
}) {
  return (
    <article
      id={`matchup-${hero.slug}-${phase.id}`}
      aria-labelledby={`matchup-${hero.slug}-${phase.id}-title`}
      className="scroll-mt-28 border-t border-border py-6 first:border-t-0 first:pt-0 last:pb-0"
    >
      <h3
        id={`matchup-${hero.slug}-${phase.id}-title`}
        className="font-serif text-2xl font-semibold text-primary"
      >
        {phase.title}
      </h3>
      <p className="mt-2 max-w-5xl text-sm leading-6 text-muted-foreground">
        {phase.introduction}
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            <Check aria-hidden="true" className="size-4" />
            Situasi Menguntungkan
          </h4>
          <ul className="mt-2 space-y-1.5">
            {phase.opportunities.map((opportunity) => (
              <li
                key={opportunity}
                className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-300"
                />
                {opportunity}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-rose-800 dark:text-rose-300">
            <ShieldAlert aria-hidden="true" className="size-4" />
            Situasi Sulit
          </h4>
          <ul className="mt-2 space-y-1.5">
            {phase.cautions.map((caution) => (
              <li
                key={caution}
                className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-600 dark:bg-rose-300"
                />
                {caution}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 border-l-2 border-primary/30 pl-3.5">
        <h4 className="text-xs font-semibold text-foreground">
          Prioritas {hero.name}
        </h4>
        <ol className="mt-2 space-y-1.5">
          {phase.actions.map((action, index) => (
            <li
              key={action}
              className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"
            >
              <span className="font-semibold text-primary">{index + 1}.</span>
              {action}
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

export function MatchupsAnalyzer({ data }: { data: MatchupData }) {
  const [selectedSlug, setSelectedSlug] = useState(data.defaultHeroSlug);
  const [selectedLane, setSelectedLane] = useState<HeroLane | "ALL">("ALL");
  const [selectedRole, setSelectedRole] = useState<HeroRole | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [activeChapter, setActiveChapter] =
    useState<MatchupPhaseId>("overview");

  const selectedHero =
    data.heroes.find((hero) => hero.slug === selectedSlug) ?? data.heroes[0];
  const analysis = data.analyses.find(
    (entry) => entry.heroSlug === selectedHero?.slug,
  );
  const visibleHeroes = data.heroes.filter(
    (hero) =>
      (selectedLane === "ALL" || hero.lanes.includes(selectedLane)) &&
      (selectedRole === "ALL" || hero.roles.includes(selectedRole)) &&
      hero.name
        .toLocaleLowerCase("id")
        .includes(search.trim().toLocaleLowerCase("id")),
  );
  const hasFilters =
    selectedLane !== "ALL" || selectedRole !== "ALL" || Boolean(search.trim());

  function resetFilters() {
    setSelectedLane("ALL");
    setSelectedRole("ALL");
    setSearch("");
  }

  function selectHero(slug: string) {
    setSelectedSlug(slug);
    setActiveChapter("overview");
  }

  if (!selectedHero)
    return (
      <p className={`${panelClass} p-8 text-center text-muted-foreground`}>
        Data hero belum tersedia.
      </p>
    );

  return (
    <div className="space-y-3.5 sm:space-y-4">
      <div className="grid items-stretch gap-3.5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <section
          aria-label="Pilih hero untuk analisis matchup"
          className={`${panelClass} min-w-0 p-3 sm:p-4`}
        >
          <fieldset>
            <legend className="mb-2 text-xs font-semibold tracking-wide text-foreground">
              01. PILIH LANE
            </legend>
            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
              {laneOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selectedLane === option.value}
                  onClick={() => setSelectedLane(option.value)}
                  className={`flex h-13 min-w-0 flex-col items-center justify-center gap-1 rounded-md border px-1 text-[10px] transition-colors motion-reduce:transition-none ${focusClass} ${selectedLane === option.value ? "border-primary bg-accent text-accent-foreground ring-1 ring-primary/35" : "border-border bg-background/40 text-muted-foreground hover:border-primary/60 hover:bg-accent/60"}`}
                >
                  {option.value === "ALL" ? (
                    <LayoutGrid
                      aria-hidden="true"
                      className="size-6 shrink-0"
                    />
                  ) : (
                    <Image
                      src={laneImages[option.value]}
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 shrink-0 object-contain brightness-0 dark:brightness-100"
                    />
                  )}
                  {option.value === "ALL" ? "Semua" : option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-3 border-t border-border pt-3">
            <legend className="float-left mb-2 w-full text-xs font-semibold tracking-wide text-foreground">
              02. PILIH ROLE
            </legend>
            <div className="clear-both grid grid-cols-4 gap-1.5 sm:grid-cols-7">
              {roleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selectedRole === option.value}
                  onClick={() => setSelectedRole(option.value)}
                  className={`flex h-13 min-w-0 flex-col items-center justify-center gap-1 rounded-md border px-0.5 text-[9px] transition-colors motion-reduce:transition-none ${focusClass} ${selectedRole === option.value ? "border-primary bg-accent text-accent-foreground ring-1 ring-primary/35" : "border-border bg-background/40 text-muted-foreground hover:border-primary/60 hover:bg-accent/60"}`}
                >
                  {option.value === "ALL" ? (
                    <LayoutGrid
                      aria-hidden="true"
                      className="size-6 shrink-0"
                    />
                  ) : (
                    <Image
                      src={roleImages[option.value]}
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 shrink-0 object-contain brightness-0 dark:brightness-100"
                    />
                  )}
                  {option.value === "ALL" ? "Semua" : option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-3 border-t border-border pt-3">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h2 className="shrink-0 text-xs font-semibold tracking-wide">
                03. PILIH HERO
              </h2>
              <div className="relative min-w-36 flex-1 sm:max-w-60">
                <label htmlFor="matchup-hero-search" className="sr-only">
                  Cari hero berdasarkan nama
                </label>
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="matchup-hero-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari nama hero..."
                  className="h-8 w-full rounded-md border border-input bg-background/60 py-1 pr-2 pl-7 text-xs text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                />
              </div>
            </div>

            {visibleHeroes.length ? (
              <div
                role="group"
                aria-label="Daftar hero"
                className="grid max-h-36 grid-cols-4 gap-2 overflow-y-auto overscroll-contain p-0.5 sm:grid-cols-6"
              >
                {visibleHeroes.map((hero) => (
                  <button
                    key={hero.slug}
                    type="button"
                    title={hero.name}
                    aria-label={`Pilih ${hero.name}`}
                    aria-pressed={selectedHero.slug === hero.slug}
                    onClick={() => selectHero(hero.slug)}
                    className={`min-w-0 overflow-hidden rounded-md border ${focusClass} ${selectedHero.slug === hero.slug ? "border-primary ring-1 ring-primary/60" : "border-border hover:border-primary/70"}`}
                  >
                    <HeroPortrait hero={hero} className="h-16 w-full" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex min-h-28 items-center justify-center rounded-md border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                Tidak ada hero yang sesuai filter.
              </div>
            )}

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <p role="status" className="text-[10px] text-muted-foreground">
                {visibleHeroes.length} hero · Aktif: {selectedHero.name}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className={`flex items-center gap-1 text-[10px] text-primary underline-offset-4 hover:underline ${focusClass}`}
                >
                  <RotateCcw aria-hidden="true" className="size-3" />
                  Reset filter
                </button>
              )}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="matchup-selected-hero-title"
          className={`${panelClass} relative isolate flex min-h-88 min-w-0 flex-col justify-center overflow-hidden`}
        >
          <div className="absolute inset-y-0 left-0 w-full sm:w-[72%]">
            <ContentArtwork
              src={selectedHero.image}
              alt={selectedHero.name}
              className="h-full w-full"
              position={selectedHero.slug === "ying" ? "center 25%" : "center"}
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 20%, color-mix(in srgb, var(--card) 12%, transparent) 40%, color-mix(in srgb, var(--card) 96%, transparent) 72%), linear-gradient(0deg, color-mix(in srgb, var(--card) 90%, transparent), transparent 55%)",
            }}
          />
          <div
            key={selectedHero.slug}
            className="relative z-1 mt-44 bg-card/90 p-5 sm:mt-0 sm:ml-auto sm:w-[46%] sm:bg-transparent sm:p-5 xl:p-6"
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded border border-primary/45 bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                HERO
              </span>
              {data.isSample && (
                <span className="rounded border border-border bg-card/75 px-2 py-1 text-[9px] text-muted-foreground">
                  Data contoh
                </span>
              )}
            </div>
            <h2
              id="matchup-selected-hero-title"
              className="font-serif text-4xl font-semibold leading-none break-words text-foreground xl:text-5xl"
            >
              {selectedHero.name}
            </h2>
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs text-foreground">
              {selectedHero.roles.map((role) => (
                <span key={role} className="inline-flex items-center gap-1.5">
                  <Image
                    src={roleImages[role]}
                    alt=""
                    width={20}
                    height={20}
                    className="size-5 shrink-0 object-contain brightness-0 dark:brightness-100"
                  />
                  {roleLabels[role]}
                </span>
              ))}
              {selectedHero.lanes.map((lane) => (
                <span key={lane} className="inline-flex items-center gap-1.5">
                  <Image
                    src={laneImages[lane]}
                    alt=""
                    width={20}
                    height={20}
                    className="size-5 shrink-0 object-contain brightness-0 dark:brightness-100"
                  />
                  {laneLabels[lane]}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {selectedHero.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {selectedHero.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-primary/35 bg-background/60 px-2 py-1.5 text-[10px] text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid items-start gap-3.5 lg:grid-cols-2">
        <RelationsPanel
          type="advantages"
          selectedHero={selectedHero}
          heroes={data.heroes}
          relations={analysis?.advantages ?? []}
          onSelect={selectHero}
          isSample={data.isSample}
        />
        <RelationsPanel
          type="counters"
          selectedHero={selectedHero}
          heroes={data.heroes}
          relations={analysis?.counters ?? []}
          onSelect={selectHero}
          isSample={data.isSample}
        />
      </div>

      {/* <section aria-labelledby="matchup-breakdown-heading" className={`${panelClass} p-3.5 sm:p-4`}>
        <div className="flex items-start gap-3 border-b border-border pb-3">
          <span className="rounded-lg bg-primary/10 p-2 text-primary"><BookOpen aria-hidden="true" className="size-7" /></span>
          <div>
            <h2 id="matchup-breakdown-heading" className="font-serif text-xl font-semibold sm:text-2xl">Matchup Breakdown & Gameplay Tips</h2>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">Alasan matchup dan panduan bermain {selectedHero.name} sesuai fase permainan.</p>
          </div>
        </div>

        {analysis?.phases.length ? (
          <TabsPrimitive.Root value={activeChapter} onValueChange={(value) => { const phase = analysis.phases.find((entry) => entry.id === value); if (phase) setActiveChapter(phase.id); }} orientation="vertical" className="mt-4 grid items-start gap-5 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <TabsPrimitive.List aria-label="Bagian panduan matchup" className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:sticky lg:top-28 lg:grid-cols-1">
              {analysis.phases.map((phase) => <TabsPrimitive.Trigger key={phase.id} value={phase.id} className={`flex items-center gap-2 rounded-md border px-3 py-2 text-left text-xs ${focusClass} ${activeChapter === phase.id ? "border-primary/70 bg-accent text-accent-foreground ring-1 ring-primary/20" : "border-border bg-background/40 text-muted-foreground hover:border-primary/60 hover:bg-accent"}`}><BookOpen aria-hidden="true" className="size-3.5 shrink-0" />{phase.title}</TabsPrimitive.Trigger>)}
            </TabsPrimitive.List>
            <div className="min-w-0 lg:border-l lg:border-border lg:pl-5">{analysis.phases.map((phase) => <TabsPrimitive.Content key={`${selectedHero.slug}-${phase.id}`} value={phase.id} className={`rounded-sm outline-none ${focusClass}`}><PhaseSection phase={phase} hero={selectedHero} /></TabsPrimitive.Content>)}</div>
          </TabsPrimitive.Root>
        ) : <p className="mt-6 text-sm text-muted-foreground">Panduan bermain untuk hero ini belum tersedia.</p>}
      </section> */}

      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] leading-relaxed text-muted-foreground">
        {data.isSample && (
          <p>
            Data contoh untuk pratinjau. Advantages dan counters belum merupakan
            rekomendasi terverifikasi.
          </p>
        )}
        <Link
          href="/feedback"
          className={`text-primary underline underline-offset-4 ${focusClass}`}
        >
          Kirim koreksi matchup
        </Link>
      </div>
    </div>
  );
}
