import type { Hero, HeroRole } from "@/app/types/hero";

export type HeroLane = "CLASH" | "JUNGLE" | "MID" | "FARM" | "ROAMING";

export type CatalogHero = Omit<Hero, "lane"> & {
  lanes: HeroLane[];
  image: string;
  imagePosition?: string;
};

export const roleOptions: {
  value: HeroRole | "ALL";
  label: string;
}[] = [
  { value: "ALL", label: "All" },
  { value: "FIGHTER", label: "Fighter" },
  { value: "ASSASSIN", label: "Assassin" },
  { value: "MAGE", label: "Mage" },
  { value: "MARKSMAN", label: "Marksman" },
  { value: "TANK", label: "Tank" },
  { value: "SUPPORT", label: "Support" },
];

export const laneOptions: {
  value: HeroLane | "ALL";
  label: string;
}[] = [
  { value: "ALL", label: "ALL" },
  { value: "CLASH", label: "Clash" },
  { value: "JUNGLE", label: "Jungle" },
  { value: "MID", label: "Mid" },
  { value: "FARM", label: "Farm" },
  { value: "ROAMING", label: "Roaming" },
];

export const roleLabels: Record<HeroRole, string> = {
  FIGHTER: "Fighter",
  ASSASSIN: "Assassin",
  MAGE: "Mage",
  MARKSMAN: "Marksman",
  TANK: "Tank",
  SUPPORT: "Support",
};

export const laneLabels: Record<HeroLane, string> = {
  CLASH: "Clash Lane",
  JUNGLE: "Jungle",
  MID: "Mid Lane",
  FARM: "Farm Lane",
  ROAMING: "Roaming",
};

export const heroes: CatalogHero[] = [
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
  {
    id: 1,
    slug: "ying",
    name: "Ying",
    roles: ["ASSASSIN", "FIGHTER"],
    lanes: ["JUNGLE"],
    image: "/images/ying-lny2026.png",
    imagePosition: "center 25%",
    description:
      "Assassin dengan mobilitas tinggi yang mengandalkan posisi dan momentum untuk menyerang target.",
    tags: ["Mobility", "Burst", "Assassin"],
    guide: [
      "Perhatikan posisi lawan sebelum masuk ke pertarungan.",
      "Cari kesempatan menyerang target yang terpisah dari timnya.",
      "Siapkan jalur keluar setelah melakukan serangan.",
    ],
  },
];
