"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { LayoutGrid, RotateCcw, Users } from "lucide-react";

import type { HeroRole } from "@/app/types/hero";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  laneOptions,
  roleOptions,
  type CatalogHero,
  type HeroLane,
} from "../_data/heroes";

import { HeroCard } from "./hero-card";

type HeroesCatalogProps = {
  heroes: CatalogHero[];
};

type SortOrder = "ASC" | "DESC";

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

export function HeroesCatalog({ heroes }: HeroesCatalogProps) {
  const [selectedRole, setSelectedRole] = useState<HeroRole | "ALL">("ALL");

  const [selectedLane, setSelectedLane] = useState<HeroLane | "ALL">("ALL");

  const [sortOrder, setSortOrder] = useState<SortOrder>("ASC");

  const visibleHeroes = useMemo(() => {
    return heroes
      .filter((hero) => {
        const matchesRole =
          selectedRole === "ALL" || hero.roles.includes(selectedRole);

        const matchesLane =
          selectedLane === "ALL" || hero.lanes.includes(selectedLane);

        return matchesRole && matchesLane;
      })
      .sort((first, second) => {
        const comparison = first.name.localeCompare(second.name, "en");

        return sortOrder === "ASC" ? comparison : -comparison;
      });
  }, [heroes, selectedRole, selectedLane, sortOrder]);

  const hasActiveFilters = selectedRole !== "ALL" || selectedLane !== "ALL";

  function resetFilters() {
    setSelectedRole("ALL");
    setSelectedLane("ALL");
  }

  function changeRole(value: string) {
    const option = roleOptions.find((item) => item.value === value);

    if (option) {
      setSelectedRole(option.value);
    }
  }

  function changeLane(value: string) {
    const option = laneOptions.find((item) => item.value === value);

    if (option) {
      setSelectedLane(option.value);
    }
  }

  function changeSort(value: string) {
    if (value === "ASC" || value === "DESC") {
      setSortOrder(value);
    }
  }

  return (
    <div className="space-y-7">
      <Card
        className="gap-0 rounded-xl border border-border bg-card/95 py-0 shadow-lg backdrop-blur-md"
      >
        <CardContent className="space-y-5 p-4 sm:p-5">
          {/* Lane filter */}
          <div className="min-w-0">
            <p
              id="heroes-lane-label"
              className="mb-3 text-[11px] font-semibold tracking-widest uppercase"
            >
              Pilih Lane
            </p>

            <ToggleGroup
              type="single"
              variant="outline"
              value={selectedLane}
              onValueChange={changeLane}
              aria-labelledby="heroes-lane-label"
              className="w-full flex-wrap justify-start gap-2"
            >
              {laneOptions.map((option) => (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  className="h-20 w-20 min-w-20 flex-col gap-2 rounded-lg border border-border bg-background/40 px-2 py-3 text-xs tracking-normal text-muted-foreground hover:bg-accent hover:text-accent-foreground data-[state=on]:border-primary data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:ring-1 data-[state=on]:ring-primary/30"
                >
                  {option.value === "ALL" ? (
                    <LayoutGrid aria-hidden="true" className="size-7!" />
                  ) : (
                    <Image
                      src={laneImages[option.value]}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 shrink-0 object-contain brightness-0 dark:brightness-100"
                    />
                  )}

                  <span>{option.label}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div
            className="flex flex-col gap-5 border-t border-border pt-5 lg:flex-row lg:items-end lg:justify-between"
          >
            {/* Role filter */}
            <div className="min-w-0">
              <p
                id="heroes-role-label"
                className="mb-3 text-[11px] font-semibold tracking-widest uppercase"
              >
                Pilih Role
              </p>

              <ToggleGroup
                type="single"
                variant="outline"
                value={selectedRole}
                onValueChange={changeRole}
                aria-labelledby="heroes-role-label"
                className="w-full flex-wrap justify-start gap-2"
              >
                {roleOptions.map((option) => (
                  <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    className="h-20 w-20 min-w-20 flex-col gap-2 rounded-lg border border-border bg-background/40 px-2 py-3 text-xs tracking-normal text-muted-foreground hover:bg-accent hover:text-accent-foreground data-[state=on]:border-primary data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:ring-1 data-[state=on]:ring-primary/30"
                  >
                    {option.value === "ALL" ? (
                      <LayoutGrid aria-hidden="true" className="size-7!" />
                    ) : (
                      <Image
                        src={roleImages[option.value]}
                        alt=""
                        width={32}
                        height={32}
                        className="size-8 shrink-0 object-contain brightness-0 dark:brightness-100"
                      />
                    )}

                    <span>{option.label}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Sorting */}
            <div className="shrink-0">
              <p
                id="heroes-sort-label"
                className="mb-3 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase"
              >
                Urutkan Nama
              </p>

              <ToggleGroup
                type="single"
                variant="outline"
                value={sortOrder}
                onValueChange={changeSort}
                aria-labelledby="heroes-sort-label"
                className="gap-2"
              >
                <ToggleGroupItem
                  value="ASC"
                  aria-label="Nama A sampai Z"
                  className="min-h-10 rounded-md border px-4 text-xs data-[state=on]:border-primary data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                >
                  A–Z
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="DESC"
                  aria-label="Nama Z sampai A"
                  className="min-h-10 rounded-md border px-4 text-xs data-[state=on]:border-primary data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                >
                  Z–A
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hero list */}
      <section aria-labelledby="heroes-results-title">
        <div
          className="mb-4 flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex flex-wrap items-center gap-3">
            <h2
              id="heroes-results-title"
              className="font-serif text-2xl font-semibold"
            >
              Semua Hero
            </h2>

            <p role="status" aria-live="polite">
              <Badge
                variant="secondary"
                className="rounded-full border border-border bg-card px-3 py-1 text-xs font-normal tracking-normal normal-case"
              >
                {visibleHeroes.length} dari {heroes.length} hero
              </Badge>
            </p>
          </div>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="gap-2 rounded-md bg-card tracking-normal normal-case"
            >
              <RotateCcw aria-hidden="true" />
              Reset Filter
            </Button>
          )}
        </div>

        {visibleHeroes.length > 0 ? (
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 min-[1400px]:grid-cols-6"
          >
            {visibleHeroes.map((hero) => (
              <HeroCard key={hero.slug} hero={hero} />
            ))}
          </div>
        ) : (
          <Empty
            className="min-h-64 rounded-xl border border-border bg-card/95"
          >
            <EmptyHeader>
              <EmptyMedia variant="icon" className="rounded-lg">
                <Users aria-hidden="true" />
              </EmptyMedia>

              <EmptyTitle className="tracking-normal normal-case">
                Hero tidak ditemukan
              </EmptyTitle>

              <EmptyDescription>
                Belum ada hero yang cocok dengan kombinasi role dan lane ini.
              </EmptyDescription>
            </EmptyHeader>

            <EmptyContent>
              <Button
                type="button"
                onClick={resetFilters}
                className="rounded-md tracking-normal normal-case"
              >
                Tampilkan Semua Hero
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </section>
    </div>
  );
}
