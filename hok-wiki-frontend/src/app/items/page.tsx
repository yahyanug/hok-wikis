import type { Metadata } from "next";

import { ResourcePageHeader } from "@/components/game-resources/resource-page-header";
import { getItems } from "@/lib/game-resources";

import { ItemsCatalog } from "./_components/items-catalog";

export const metadata: Metadata = {
  title: "Items | HOK Wiki",
  description: "Kenali atribut dan efek item untuk menyusun build hero di HOK Wiki.",
};

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <ResourcePageHeader title="Items">
      <ItemsCatalog items={items} />
    </ResourcePageHeader>
  );
}
