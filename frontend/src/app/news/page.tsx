import type { Metadata } from "next";

import { ContentPageShell } from "@/components/content/content-page-shell";
import { getNewsData } from "@/lib/site-content";

import { NewsCatalog } from "./_components/news-catalog";

export const metadata: Metadata = {
  title: "News & Updates | HOK Wiki",
  description: "Kabar hero, skin, dan referensi pembaruan Honor of Kings di HOK Wiki.",
};

export default async function NewsPage() {
  const { articles } = await getNewsData();

  return (
    <ContentPageShell title="News & Updates" breadcrumb="News" sample={false} avoidFloating>
      <NewsCatalog articles={articles} />
    </ContentPageShell>
  );
}
