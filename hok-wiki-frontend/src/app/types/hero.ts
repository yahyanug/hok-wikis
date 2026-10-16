export type HeroRole =
  "FIGHTER" | "ASSASSIN" | "MAGE" | "MARKSMAN" | "TANK" | "SUPPORT";
export interface Role {
  code: HeroRole;
  name: string;
}
export interface HeroSummary {
  id: number;
  slug: string;
  name: string;
  roles: HeroRole[];
  lane: string;
}
export interface Hero extends HeroSummary {
  description: string;
  tags: string[];
  guide: string[];
}
export interface Matchup {
  hero: HeroSummary;
  reason: string;
  gameplayTips: string;
}
export interface HeroMatchups {
  heroSlug: string;
  advantages: Matchup[];
  counters: Matchup[];
}
