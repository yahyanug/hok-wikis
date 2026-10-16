import type { Metadata } from "next";

import { ResourcePageHeader } from "@/components/game-resources/resource-page-header";
import { getSpells } from "@/lib/game-resources";

import { SpellsCatalog } from "./_components/spells-catalog";

export const metadata: Metadata = {
  title: "Spells | HOK Wiki",
  description: "Kenali fungsi spell dan tips penggunaannya untuk melengkapi gaya bermain hero.",
};

export default async function SpellsPage() {
  const spells = await getSpells();

  return (
    <ResourcePageHeader title="Spells">
      <SpellsCatalog spells={spells} />
    </ResourcePageHeader>
  );
}
