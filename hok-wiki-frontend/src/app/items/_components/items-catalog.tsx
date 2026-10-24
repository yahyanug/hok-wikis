"use client";

import Image from "next/image";
import { useId, useState } from "react";
import {
  Coins,
  Footprints,
  Gem,
  LayoutGrid,
  Lightbulb,
  PackageOpen,
  Search,
  Shield,
  Sparkles,
  Sword,
  Trees,
  Users,
  WandSparkles,
} from "lucide-react";

import { ResourceCatalogPanel } from "@/components/game-resources/resource-catalog-panel";
import { ResourceImage } from "@/components/game-resources/resource-image";
import {
  itemCategoryLabels,
  type CatalogItem,
  type ItemCategory,
} from "@/lib/game-resources";

type ItemsCatalogProps = {
  items: CatalogItem[];
};

const categoryIcons = {
  PHYSICAL: Sword,
  MAGIC: WandSparkles,
  DEFENSE: Shield,
  MOVEMENT: Footprints,
  JUNGLING: Trees,
  ROAMING: Users,
};

const categoryImages: Partial<Record<ItemCategory, string>> = {
  MAGIC: "/images/lane/mid.png",
  DEFENSE: "/images/role/tank.png",
  JUNGLING: "/images/lane/jungle.png",
  ROAMING: "/images/lane/roaming.png",
};

const categoryColors: Record<ItemCategory, string> = {
  PHYSICAL:
    "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  MAGIC:
    "border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  DEFENSE: "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  MOVEMENT:
    "border-teal-500/40 bg-teal-500/10 text-teal-700 dark:text-teal-300",
  JUNGLING:
    "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  ROAMING:
    "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300",
};

const categories: Array<ItemCategory | "ALL"> = [
  "ALL",
  "PHYSICAL",
  "MAGIC",
  "DEFENSE",
  "MOVEMENT",
  "JUNGLING",
  "ROAMING",
];

function ItemCategoryBadge({ category }: { category: ItemCategory }) {
  const Icon = categoryIcons[category];
  const imageSrc = categoryImages[category];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium ${categoryColors[category]}`}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={14}
          height={14}
          className="size-3.5 shrink-0 object-contain brightness-0 dark:brightness-100"
        />
      ) : (
        <Icon aria-hidden="true" className="size-3.5 shrink-0" />
      )}
      {itemCategoryLabels[category]}
    </span>
  );
}

function ItemPrice({ price }: { price: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-amber-800 dark:text-amber-200">
      <Coins
        aria-hidden="true"
        className="size-4 shrink-0 text-amber-600 dark:text-amber-300"
      />
      <span>
        <span className="sr-only">Harga: </span>
        {price.toLocaleString("id-ID")}
        <span className="sr-only"> gold</span>
      </span>
    </span>
  );
}

function ItemDetails({ item }: { item: CatalogItem }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <ResourceImage
          src={item.image}
          name={item.name}
          className="size-28 shrink-0"
        />
        <div className="flex flex-col items-start gap-3">
          <ItemPrice price={item.price} />
          <ItemCategoryBadge category={item.category} />
        </div>
      </div>

      {item.attributes.length > 0 && (
        <section className="border-t border-primary/25 pt-5">
          <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-foreground">
            <Gem aria-hidden="true" className="size-4 text-primary" />
            Stats
          </h3>
          <dl className="space-y-4">
            {item.attributes.map((attribute) => (
              <div key={attribute.label}>
                <dt className="flex items-center justify-between gap-3 text-sm font-semibold text-card-foreground">
                  <span>{attribute.label}</span>
                  {attribute.value && (
                    <span className="text-primary">{attribute.value}</span>
                  )}
                </dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      {item.effects.length > 0 && (
        <section className="border-t border-primary/25 pt-5">
          <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-foreground">
            <Sparkles aria-hidden="true" className="size-4 text-primary" />
            Efek item
          </h3>
          <div className="space-y-4">
            {item.effects.map((effect) => (
              <div
                key={effect.name}
                className="rounded-xl border border-primary/20 bg-background/40 p-4"
              >
                <h4 className="text-sm font-semibold text-card-foreground">
                  {effect.name}
                </h4>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                  {effect.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {item.buildsFrom.length > 0 && (
        <section className="border-t border-primary/25 pt-5">
          <h3 className="mb-3 font-serif text-xl font-bold text-foreground">
            Komponen item
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-primary">
            {item.buildsFrom.map((component) => (
              <li key={component}>{component}</li>
            ))}
          </ul>
        </section>
      )}

      {item.tips.length > 0 && (
        <section className="rounded-xl border border-primary/25 bg-primary/5 p-4">
          <h3 className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-primary">
            <Lightbulb aria-hidden="true" className="size-4 shrink-0" />
            Tips penggunaan
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground marker:text-primary">
            {item.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export function ItemsCatalog({ items }: ItemsCatalogProps) {
  const [category, setCategory] = useState<ItemCategory | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const searchId = useId();
  const searchTerm = query.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    const matchesCategory = category === "ALL" || item.category === category;
    const matchesSearch =
      !searchTerm ||
      `${item.name} ${item.description} ${item.attributes.map((attribute) => attribute.label).join(" ")}`
        .toLowerCase()
        .includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  function resetFilters() {
    setCategory("ALL");
    setQuery("");
  }

  return (
    <ResourceCatalogPanel<CatalogItem>
      detailLabel="Detail item"
      showHeaderDescription={false}
      showHeaderSeparator={false}
      renderDetails={(item) => <ItemDetails item={item} />}
    >
      {({ selectedId, isOpen, panelId, gridClassName, select }) => (
        <section aria-label="Katalog item" className="space-y-5">
          <div className="flex min-w-0 flex-wrap items-center justify-center gap-3">
            <div
              role="group"
              aria-label="Kategori item"
              className="flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-primary/35 bg-card/95 p-2 shadow-[var(--hok-panel-shadow)]"
            >
              {categories.map((option) => {
                const Icon =
                  option === "ALL" ? LayoutGrid : categoryIcons[option];
                const imageSrc =
                  option === "ALL" ? undefined : categoryImages[option];
                const active = category === option;

                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(option)}
                    className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none ${active ? "border-primary bg-primary/15 text-foreground shadow-sm" : "border-transparent text-muted-foreground hover:border-primary/25 hover:bg-primary/10 hover:text-foreground"}`}
                  >
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 shrink-0 object-contain brightness-0 dark:brightness-100"
                      />
                    ) : (
                      <Icon aria-hidden="true" className="size-4 shrink-0" />
                    )}
                    {option === "ALL" ? "Semua" : itemCategoryLabels[option]}
                  </button>
                );
              })}
            </div>

            <div className="relative flex w-full items-center rounded-xl border border-primary/35 bg-card/95 p-2 sm:w-64 sm:shrink-0">
              <label htmlFor={searchId} className="sr-only">
                Cari item
              </label>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-5 size-4 text-primary"
              />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari item..."
                className="min-w-0 w-full rounded-lg border border-primary/25 bg-background/45 py-2.5 pr-3 pl-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25"
              />
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className={gridClassName}>
              {filteredItems.map((item) => {
                const active = selectedId === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Lihat detail ${item.name}`}
                    aria-haspopup="dialog"
                    aria-expanded={active}
                    aria-controls={isOpen ? panelId : undefined}
                    onClick={(event) => select(item, event)}
                    className={`group flex min-w-0 flex-col gap-4 rounded-xl border bg-card/95 p-3 text-left shadow-[var(--hok-panel-shadow)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none sm:p-4 ${active ? "border-primary ring-1 ring-primary/50" : "border-primary/35 hover:border-primary/75 hover:bg-card"}`}
                  >
                    <span className="flex w-full min-w-0 flex-col items-center gap-3">
                      <ResourceImage
                        src={item.image}
                        name={item.name}
                        className="size-16 shrink-0 min-[480px]:size-20"
                      />
                      <span className="flex w-full min-w-0 flex-col items-center gap-2">
                        <span className="flex min-h-10 w-full min-w-0 items-center justify-center text-center font-serif text-base font-bold leading-5 break-words text-foreground">
                          {item.name}
                        </span>
                        <ItemPrice price={item.price} />
                        <ItemCategoryBadge category={item.category} />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-primary/35 bg-card/95 px-6 py-14 text-center">
              <PackageOpen
                aria-hidden="true"
                className="size-10 text-primary"
              />
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Item tidak ditemukan
              </h2>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Coba kata pencarian atau kategori lain untuk menemukan item.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-1 rounded-lg border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Reset filter
              </button>
            </div>
          )}
        </section>
      )}
    </ResourceCatalogPanel>
  );
}
