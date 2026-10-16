import type { Metadata } from "next";

import { getMatchupData } from "@/lib/matchups";

import { MatchupsAnalyzer } from "./_components/matchups-analyzer";

export const metadata: Metadata = {
  title: "Matchups | HOK Wiki",
  description: "Jelajahi pilihan hero, perbandingan matchup, dan panduan bermain di setiap fase pertandingan.",
};

export default async function MatchupsPage() {
  const data = await getMatchupData();

  return (
    <div className="w-full px-4 pt-7 pb-14 text-foreground sm:px-8 lg:px-12">
      <h1 className="sr-only">Matchup Analyzer</h1>
      <MatchupsAnalyzer data={data} />
    </div>
  );
}
