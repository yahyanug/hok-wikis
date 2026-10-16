"use client";

import { Diamond, Lightbulb, Sparkles } from "lucide-react";

import { ResourceCatalogPanel } from "@/components/game-resources/resource-catalog-panel";
import { ResourceImage } from "@/components/game-resources/resource-image";
import { arcanaColorLabels, type ArcanaColor, type CatalogArcana } from "@/lib/game-resources";

type ArcanaCatalogProps = {
  arcana: CatalogArcana[];
};

const arcanaColorClasses: Record<ArcanaColor, string> = {
  RED: "border-rose-500/45 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  GREEN: "border-emerald-500/45 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  BLUE: "border-sky-500/45 bg-sky-500/10 text-sky-700 dark:text-sky-300",
};

function ArcanaDetails({ entry }: { entry: CatalogArcana }) {
  return (
    <>
          <div className="flex flex-wrap items-center gap-4">
            <ResourceImage src={entry.image} name={entry.name} className="size-28" />
            <span className={`inline-flex rounded-full border px-4 py-1 text-sm font-medium ${arcanaColorClasses[entry.color]}`}>Arcana {arcanaColorLabels[entry.color]}</span>
          </div>

          {entry.attributes.length > 0 && (
            <section className="border-t border-primary/25 pt-4">
              <h3 className="mb-3 font-serif text-xl font-semibold text-primary">Atribut</h3>
              <dl className="space-y-3">
                {entry.attributes.map((attribute, index) => (
                  <div key={`${attribute.label}-${index}`} className="rounded-lg border border-border bg-background/40 px-4 py-3">
                    <dt className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Diamond aria-hidden="true" className="size-3.5 shrink-0 text-primary" />
                      {attribute.label}
                    </dt>
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

          <section className="border-t border-primary/25 pt-4">
            <h3 className="mb-2 font-serif text-xl font-semibold text-primary">Penjelasan</h3>
            <p className="text-sm leading-7 text-foreground">{entry.explanation}</p>
          </section>

          {entry.tips.length > 0 && (
            <section className="rounded-xl border border-primary/25 bg-background/45 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-serif text-lg font-semibold text-primary">
                <Lightbulb aria-hidden="true" className="size-5" />
                Tips menyusun arcana
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-sm leading-7 text-muted-foreground">
                {entry.tips.map((tip, index) => <li key={`${entry.id}-tip-${index}`}>{tip}</li>)}
              </ul>
            </section>
          )}
    </>
  );
}

export function ArcanaCatalog({ arcana }: ArcanaCatalogProps) {
  if (arcana.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-primary/35 bg-card/95 p-8 text-center">
        <Sparkles aria-hidden="true" className="size-9 text-primary" />
        <h2 className="font-serif text-2xl font-semibold">Arcana belum tersedia</h2>
        <p className="max-w-md text-sm leading-7 text-muted-foreground">Daftar arcana akan ditampilkan setelah konten tersedia.</p>
      </div>
    );
  }

  return (
    <ResourceCatalogPanel<CatalogArcana> detailLabel="Detail arcana" renderDetails={(entry) => <ArcanaDetails entry={entry} />}>
      {({ selectedId, isOpen, panelId, gridClassName, select }) => (
        <section aria-label="Daftar arcana" className={gridClassName}>
          {arcana.map((entry) => (
            <button key={entry.id} type="button" aria-haspopup="dialog" aria-expanded={selectedId === entry.id} aria-controls={isOpen ? panelId : undefined} onClick={(event) => select(entry, event)} aria-label={`Lihat detail arcana ${entry.name}`} className={`group flex h-full min-w-0 flex-col rounded-xl border bg-card/95 p-3 text-left text-card-foreground shadow-[var(--hok-panel-shadow)] backdrop-blur-md transition-[border-color,box-shadow,background-color] hover:border-primary hover:bg-accent/90 hover:shadow-[0_0_22px_color-mix(in_srgb,var(--primary)_15%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none sm:p-4 ${selectedId === entry.id ? "border-primary ring-1 ring-primary/50" : "border-primary/35"}`}>
              <span className="mb-3 flex w-full min-w-0 flex-col items-center gap-3">
                <ResourceImage src={entry.image} name={entry.name} className="size-16 shrink-0 min-[480px]:size-20" />
                <span className="block w-full min-w-0">
                  <span className="flex min-h-10 items-center justify-center text-center font-serif text-base font-semibold leading-5 break-words text-foreground">{entry.name}</span>
                  <span className="block text-center">
                    <span className={`mt-2 inline-flex rounded-full border px-3 py-0.5 text-xs font-medium ${arcanaColorClasses[entry.color]}`}>{arcanaColorLabels[entry.color]}</span>
                  </span>
                  <span className="mt-3 block text-xs font-semibold text-primary">Atribut</span>
                  <span className="mt-2 block space-y-2">
                    {entry.attributes.map((attribute, index) => (
                      <span key={`${attribute.label}-${index}`} className="flex items-start gap-2 text-xs leading-5 text-foreground/90">
                        <Diamond aria-hidden="true" className="mt-1 size-3.5 shrink-0 text-primary" />
                        <span>{attribute.value && <span className="mr-1 font-semibold">{attribute.value}</span>}{attribute.label}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </span>
              <span className="mt-auto block w-full border-t border-primary/25 pt-3">
                <span className="mb-1 block text-xs font-semibold text-primary">Penjelasan</span>
                <span className="block text-xs leading-6 text-foreground/90">{entry.explanation}</span>
              </span>
            </button>
          ))}
        </section>
      )}
    </ResourceCatalogPanel>
  );
}
