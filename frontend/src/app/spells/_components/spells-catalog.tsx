"use client";

import { Clock3, Lightbulb, Sparkles } from "lucide-react";

import { ResourceCatalogPanel } from "@/components/game-resources/resource-catalog-panel";
import { ResourceImage } from "@/components/game-resources/resource-image";
import type { CatalogSpell } from "@/lib/game-resources";

type SpellsCatalogProps = {
  spells: CatalogSpell[];
};

function SpellDetails({ spell }: { spell: CatalogSpell }) {
  return (
    <>
          <div className="flex flex-wrap items-center gap-4">
            <ResourceImage src={spell.image} name={spell.name} className="size-28" />
            {spell.cooldown && (
              <p className="inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-background/45 px-3 py-2 text-sm text-primary">
                <Clock3 aria-hidden="true" className="size-4" />
                Cooldown: {spell.cooldown}
              </p>
            )}
          </div>

          {spell.attributes.length > 0 && (
            <section className="border-t border-primary/25 pt-4">
              <h3 className="mb-3 font-serif text-xl font-semibold text-primary">Fungsi spell</h3>
              <dl className="space-y-3">
                {spell.attributes.map((attribute, index) => (
                  <div key={`${attribute.label}-${index}`} className="rounded-lg border border-border bg-background/40 px-4 py-3">
                    <dt className="text-sm font-semibold text-foreground">{attribute.label}</dt>
                    {(attribute.value || attribute.description) && (
                      <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                        {attribute.value && <span className="mr-2 font-semibold text-primary">{attribute.value}</span>}
                        {attribute.description}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="rounded-xl border border-primary/25 bg-background/45 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-serif text-xl font-semibold text-primary">
              <Lightbulb aria-hidden="true" className="size-5" />
              Tips penggunaan
            </h3>
            <p className="text-sm leading-7 text-foreground">{spell.usageTip}</p>
            {spell.tips.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
                {spell.tips.map((tip, index) => <li key={`${spell.id}-tip-${index}`}>{tip}</li>)}
              </ul>
            )}
          </section>
    </>
  );
}

export function SpellsCatalog({ spells }: SpellsCatalogProps) {
  if (spells.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-primary/35 bg-card/95 p-8 text-center">
        <Sparkles aria-hidden="true" className="size-9 text-primary" />
        <h2 className="font-serif text-2xl font-semibold">Spell belum tersedia</h2>
        <p className="max-w-md text-sm leading-7 text-muted-foreground">Daftar spell akan ditampilkan setelah konten tersedia.</p>
      </div>
    );
  }

  return (
    <ResourceCatalogPanel<CatalogSpell> detailLabel="Detail spell" renderDetails={(spell) => <SpellDetails spell={spell} />}>
      {({ selectedId, isOpen, panelId, gridClassName, select }) => (
        <section aria-label="Daftar spell" className={gridClassName}>
          {spells.map((spell) => (
            <button key={spell.id} type="button" aria-haspopup="dialog" aria-expanded={selectedId === spell.id} aria-controls={isOpen ? panelId : undefined} onClick={(event) => select(spell, event)} aria-label={`Lihat detail spell ${spell.name}`} className={`group flex h-full min-w-0 flex-col rounded-xl border bg-card/95 p-3 text-left text-card-foreground shadow-[var(--hok-panel-shadow)] backdrop-blur-md transition-[border-color,box-shadow,background-color] hover:border-primary hover:bg-accent/90 hover:shadow-[0_0_22px_color-mix(in_srgb,var(--primary)_15%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none sm:p-4 ${selectedId === spell.id ? "border-primary ring-1 ring-primary/50" : "border-primary/35"}`}>
              <span className="mb-3 flex w-full min-w-0 flex-col items-center gap-3">
                <ResourceImage src={spell.image} name={spell.name} className="size-16 shrink-0 min-[480px]:size-20" />
                <span className="flex min-h-10 w-full min-w-0 items-center justify-center text-center font-serif text-base font-semibold leading-5 break-words text-foreground">{spell.name}</span>
              </span>
              <span className="mb-3 block flex-1 text-xs leading-6 text-foreground/90">{spell.description}</span>
              <span className="block w-full border-t border-primary/25 pt-3">
                <span className="flex items-start gap-2">
                  <Lightbulb aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="mb-1 block text-xs font-semibold text-primary">Tips penggunaan</span>
                    <span className="block text-xs leading-5 text-muted-foreground">{spell.usageTip}</span>
                  </span>
                </span>
              </span>
            </button>
          ))}
        </section>
      )}
    </ResourceCatalogPanel>
  );
}
