import type { Metadata } from "next";

import { ContentPageShell } from "@/components/content/content-page-shell";
import { getDashboardData, getNewsData } from "@/lib/site-content";

import { DashboardContent } from "./_components/dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard | HOK Wiki",
  description: "Jelajahi kabar terbaru, referensi hero, dan Matchup Analyzer di HOK Wiki.",
};

export default async function DashboardPage() {
  const [data, { articles }] = await Promise.all([getDashboardData(), getNewsData()]);

  return (
    <ContentPageShell title="Welcome to HOK Wiki" sample={false} avoidFloating>
      <DashboardContent data={data} articles={articles} />
    </ContentPageShell>
  );
}
