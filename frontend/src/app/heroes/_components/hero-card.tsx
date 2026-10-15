"use client";

import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { Dialog } from "radix-ui";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { laneLabels, roleLabels, type CatalogHero } from "../_data/heroes";

type HeroCardProps = {
  hero: CatalogHero;
};

export function HeroCard({ hero }: HeroCardProps) {
  return (
    <Dialog.Root>
      <Card className="gap-0 rounded-xl border border-border py-0">
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-label={`Lihat informasi hero ${hero.name}`}
            className="group flex w-full flex-col text-left outline-none transition-colors hover:bg-accent/30 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          >
            <span
              className="relative block aspect-[4/3] w-full overflow-hidden bg-secondary"
            >
              <Image
                src={hero.image}
                alt=""
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1399px) 25vw, 17vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                style={{
                  objectPosition: hero.imagePosition ?? "center",
                }}
              />

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-slate-950/75 to-transparent"
              />

              <span
                className="absolute inset-x-2 bottom-2 flex flex-wrap justify-end gap-1"
              >
                {hero.lanes.map((lane) => (
                  <Badge
                    key={lane}
                    variant="outline"
                    className="rounded-md border border-white/25 bg-slate-950/80 px-2 py-1 text-[10px] font-medium tracking-normal text-slate-100 normal-case"
                  >
                    <Image
                      src={`/images/lane/${lane.toLowerCase()}.png`}
                      alt=""
                      width={14}
                      height={14}
                      className="size-3.5 shrink-0 object-contain"
                    />
                    {laneLabels[lane]}
                  </Badge>
                ))}
              </span>
            </span>

            <span className="block w-full p-3.5">
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-card-foreground">
                  {hero.name}
                </span>

                <ArrowRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </span>

              <span className="mt-2 flex flex-wrap gap-2">
                {hero.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <Image
                      src={`/images/role/${role.toLowerCase()}.png`}
                      alt=""
                      width={16}
                      height={16}
                      className="size-4 shrink-0 object-contain brightness-0 dark:brightness-100"
                    />

                    {roleLabels[role]}
                  </span>
                ))}
              </span>
            </span>
          </button>
        </Dialog.Trigger>
      </Card>

      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none"
        />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col gap-0 overflow-y-auto overscroll-contain rounded-2xl border border-border bg-card text-card-foreground shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:animate-none"
        >
          <div className="relative aspect-[4/3] w-full shrink-0 bg-secondary">
            <Image
              src={hero.image}
              alt={`Artwork ${hero.name}`}
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
              style={{
                objectPosition: hero.imagePosition ?? "center",
              }}
            />

            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-card to-transparent"
            />
          </div>

          <div className="flex flex-col gap-3 p-6">
            <p
              className="text-[10px] font-semibold tracking-[0.2em] text-primary uppercase"
            >
              Hero Profile
            </p>

            <Dialog.Title
              className="font-serif text-4xl font-semibold tracking-normal text-card-foreground normal-case"
            >
              {hero.name}
            </Dialog.Title>

            <Dialog.Description className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
              {hero.description}
            </Dialog.Description>
          </div>

          <div className="space-y-6 px-6 pb-8">
            <dl
              className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-secondary p-4"
            >
              <div>
                <dt className="text-xs text-muted-foreground">Roles</dt>

                <dd
                  className="mt-1.5 text-sm font-semibold text-secondary-foreground"
                >
                  {hero.roles.map((role) => roleLabels[role]).join(" / ")}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-muted-foreground">Lanes</dt>

                <dd
                  className="mt-1.5 text-sm font-semibold text-secondary-foreground"
                >
                  {hero.lanes.map((lane) => laneLabels[lane]).join(" / ")}
                </dd>
              </div>
            </dl>

            {hero.tags.length > 0 && (
              <section>
                <h3 className="mb-3 text-sm font-semibold">Gaya Bermain</h3>

                <div className="flex flex-wrap gap-2">
                  {hero.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium tracking-normal normal-case"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </section>
            )}

            {hero.guide.length > 0 && (
              <section>
                <h3 className="mb-3 text-sm font-semibold">Tips Dasar</h3>

                <ul
                  className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground marker:text-primary"
                >
                  {hero.guide.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          <Dialog.Close
            aria-label="Tutup detail hero"
            className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full border border-border bg-card/95 text-card-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
          >
            <X aria-hidden="true" className="size-4" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
