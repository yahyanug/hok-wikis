import type { Metadata } from "next";

import { ResourcePageHeader } from "@/components/game-resources/resource-page-header";
import { getArcana } from "@/lib/game-resources";

import { ArcanaCatalog } from "./_components/arcana-catalog";

export const metadata: Metadata = {
  title: "Arcana | HOK Wiki",
  description:
    "Kenali atribut arcana untuk melengkapi kebutuhan dan gaya bermain hero.",
};

export default async function ArcanaPage() {
  const arcana = await getArcana();

  return (
    <ResourcePageHeader title="Arcana">
      <ArcanaCatalog arcana={arcana} />
    </ResourcePageHeader>
  );
}
