export type ResourceAttribute = {
  label: string;
  value?: string;
  description?: string;
};

export type ResourceEffect = {
  name: string;
  description: string;
};

export type ResourceBase = {
  id: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  attributes: ResourceAttribute[];
  tips: string[];
};

export type ItemCategory = "ATTACK" | "MAGIC" | "DEFENSE" | "MOVEMENT" | "JUNGLING" | "ROAMING";
export type ArcanaColor = "RED" | "GREEN" | "BLUE";

export type CatalogItem = ResourceBase & {
  category: ItemCategory;
  price: number;
  effects: ResourceEffect[];
  buildsFrom: string[];
};

export type CatalogSpell = ResourceBase & {
  cooldown: string | null;
  usageTip: string;
};

export type CatalogArcana = ResourceBase & {
  color: ArcanaColor;
  explanation: string;
};

export const itemCategoryLabels: Record<ItemCategory, string> = {
  ATTACK: "Attack",
  MAGIC: "Magic",
  DEFENSE: "Defense",
  MOVEMENT: "Movement",
  JUNGLING: "Jungling",
  ROAMING: "Roaming",
};

export const arcanaColorLabels: Record<ArcanaColor, string> = {
  RED: "Merah",
  GREEN: "Hijau",
  BLUE: "Biru",
};

// Konten contoh untuk pratinjau desain. Harga, atribut, dan penjelasan bukan data patch resmi.
const sampleItems: CatalogItem[] = [
  {
    id: "item-iron-sword",
    slug: "iron-sword",
    name: "Iron Sword",
    image: "/images/items/iron-sword.png",
    category: "ATTACK",
    price: 1800,
    description: "Pilihan perlengkapan serangan fisik untuk melengkapi build hero.",
    attributes: [{ label: "Physical Attack", description: "Mendukung kebutuhan serangan fisik hero." }],
    effects: [{ name: "Fokus serangan", description: "Sesuaikan pilihan perlengkapan dengan peran hero dan kondisi pertarungan." }],
    buildsFrom: [],
    tips: ["Pertimbangkan kebutuhan serangan dan ketahanan saat menyusun build."],
  },
  {
    id: "item-spell-tome",
    slug: "spell-tome",
    name: "Spell Tome",
    image: "/images/items/spell-tome.png",
    category: "MAGIC",
    price: 1900,
    description: "Pilihan perlengkapan untuk hero yang mengandalkan serangan magis.",
    attributes: [{ label: "Magic Attack", description: "Melengkapi kebutuhan kekuatan magis hero." }],
    effects: [{ name: "Fokus magis", description: "Pertimbangkan kombinasi perlengkapan yang sesuai dengan kemampuan hero." }],
    buildsFrom: [],
    tips: ["Sesuaikan build magis dengan kemampuan dan peran hero."],
  },
  {
    id: "item-cloth-jerkin",
    slug: "cloth-jerkin",
    name: "Cloth Jerkin",
    image: "/images/items/cloth-jerkin.png",
    category: "DEFENSE",
    price: 2100,
    description: "Pilihan perlengkapan pertahanan untuk melengkapi daya tahan hero.",
    attributes: [{ label: "Physical Defense", description: "Mendukung kebutuhan pertahanan fisik hero." }],
    effects: [{ name: "Fokus pertahanan", description: "Pilih perlengkapan pertahanan dengan mempertimbangkan sumber serangan lawan." }],
    buildsFrom: [],
    tips: ["Perhatikan jenis serangan lawan sebelum memilih perlengkapan pertahanan."],
  },
  {
    id: "item-boots-of-deftness",
    slug: "boots-of-deftness",
    name: "Boots of Deftness",
    image: "/images/items/boots-of-deftness.png",
    category: "MOVEMENT",
    price: 700,
    description: "Pilihan sepatu untuk mendukung perpindahan posisi di arena.",
    attributes: [{ label: "Movement Speed", description: "Melengkapi kebutuhan mobilitas hero." }],
    effects: [{ name: "Fokus mobilitas", description: "Sesuaikan pilihan sepatu dengan kebutuhan rotasi dan pertarungan." }],
    buildsFrom: [],
    tips: ["Manfaatkan mobilitas untuk berpindah posisi dan membantu rekan satu tim."],
  },
  {
    id: "item-hunting-knife",
    slug: "hunting-knife",
    name: "Hunting Knife",
    image: "/images/items/hunting-knife.png",
    category: "JUNGLING",
    price: 1750,
    description: "Pilihan perlengkapan untuk melengkapi kebutuhan hero di jungle.",
    attributes: [{ label: "Jungling", description: "Mendukung peran dan kebutuhan hero jungle." }],
    effects: [{ name: "Fokus jungle", description: "Pertimbangkan perlengkapan yang sesuai dengan rencana penguasaan jungle dan objektif." }],
    buildsFrom: [],
    tips: ["Susun rute jungle sambil memperhatikan posisi tim dan objektif."],
  },
  {
    id: "item-knowledge-gem",
    slug: "knowledge-gem",
    name: "Knowledge Gem",
    image: "/images/items/knowledge-gem.png",
    category: "ROAMING",
    price: 2200,
    description: "Pilihan perlengkapan untuk mendukung kebutuhan hero roaming.",
    attributes: [{ label: "Roaming", description: "Melengkapi peran pendukung dalam tim." }],
    effects: [{ name: "Fokus dukungan", description: "Sesuaikan perlengkapan dengan kebutuhan rekan satu tim dan situasi permainan." }],
    buildsFrom: [],
    tips: ["Perhatikan posisi rekan satu tim sebelum melakukan rotasi."],
  },
];

// Semua aset lokal ditampilkan sebagai data contoh; profil per kategori menjadi
// placeholder sampai harga, atribut, dan efek diambil dari sumber konten.
const itemAssetGroups: Record<ItemCategory, string[]> = {
  ATTACK: [
    "axe-of-torment", "bloodweeper", "cloud-piercer", "dagger", "daybreaker-s-virtue",
    "demonsbane", "destiny", "doomsday", "dragon-s-rage", "eternity-blade",
    "golden-blade", "immovable-sky-dome", "iron-sword", "master-sword", "meteor",
    "mortal-punisher", "nettle-gauntlet", "primordial-crystal", "pugilist-s-gauntlet",
    "pure-sky", "relentless-blade", "shadow-ripper", "sparkforged-dagger", "starbreaker",
    "storm-sword", "sunchaser", "sunglow-striker", "swiftstrike-lance", "tempest", "vampiric-scythe",
  ],
  MAGIC: [
    "ardent-dominion", "augur-s-word", "blood-clan-s-grimoire", "bloodsoul", "breakthrough-robe",
    "enigma-moon-goddess", "frozen-breath", "grand-staff", "holy-grail", "insatiable-tome",
    "mask-of-agony", "mystic-page", "nebulon-wood", "plume-of-enchantment", "sage-s-codex",
    "sage-s-tome", "savant-s-wrath", "scepter-of-reverberation", "spell-tome", "splendor",
    "staves-of-sorcery", "stone-of-sorcery", "twilight-stream", "twinblades-of-destruction",
    "venomous-staff", "void-staff",
  ],
  DEFENSE: [
    "amble-winter", "belt-of-might", "blazing-cape", "blood-rage", "clandestine-cape",
    "cloth-jerkin", "cuirass-of-savagery", "cuirass-of-swiftness", "deepfrost-siege", "eye-of-the-phoenix",
    "frigid-charge", "frosthold-targe", "frostscar-s-embrace", "glacial-buckler", "longnight-guardian",
    "mirror-of-radiance", "ominous-premonition", "overlord-s-might", "overlord-s-platemail",
    "protector-s-cuirass", "resilient-agate", "sage-s-sanctuary", "spikemail", "succubus-cloak",
  ],
  MOVEMENT: [
    "boots-of-deftness", "boots-of-dexterity", "boots-of-fortitude", "boots-of-resistance",
    "boots-of-the-arcane", "boots-of-tranquility", "lightfoot-shoes",
  ],
  JUNGLING: [
    "giant-s-grip", "guerrilla-machete", "hunting-knife", "patrol-axe", "rapacious-bite", "ravage-phantom", "runeblade",
  ],
  ROAMING: [
    "crimson-shadow", "crimson-shadow-howl", "crimson-shadow-radiance", "crimson-shadow-redemption",
    "crimson-shadow-starspring", "dawnlight", "guardian", "guardian-radiance", "guardian-redemption",
    "guardian-starspring", "haste-sunpool", "knowledge-gem", "thunderclap-brand",
  ],
};

function assetName(slug: string): string {
  return slug.replace(/-s(?=-|$)/g, "'s").split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

const itemCatalog: CatalogItem[] = Object.entries(itemAssetGroups).flatMap(([category, slugs]) => {
  const template = sampleItems.find((item) => item.category === category);
  if (!template) return [];

  return slugs.map((slug) => sampleItems.find((item) => item.slug === slug) ?? {
    ...template,
    id: `item-${slug}`,
    slug,
    name: assetName(slug),
    image: `/images/items/${slug}.png`,
  });
});

const sampleSpells: CatalogSpell[] = [
  {
    id: "spell-flash",
    slug: "flash",
    name: "Flash",
    image: "/images/spells/flash.jpg",
    description: "Berpindah posisi dengan cepat untuk mengejar atau menghindari lawan.",
    attributes: [{ label: "Mobilitas" }],
    cooldown: null,
    usageTip: "Simpan untuk momen penting.",
    tips: ["Perhatikan arah perpindahan dan posisi lawan sebelum menggunakannya."],
  },
  {
    id: "spell-smite",
    slug: "smite",
    name: "Smite",
    image: "/images/spells/smite.jpg",
    description: "Membantu menghadapi monster jungle dan mengamankan objektif.",
    attributes: [{ label: "Jungle dan objektif" }],
    cooldown: null,
    usageTip: "Perhatikan timing saat berebut objektif.",
    tips: ["Koordinasikan pengambilan objektif dengan rekan satu tim."],
  },
  {
    id: "spell-heal",
    slug: "heal",
    name: "Heal",
    image: "/images/spells/heal.jpg",
    description: "Memulihkan HP untuk membantu bertahan dalam pertarungan.",
    attributes: [{ label: "Pemulihan" }],
    cooldown: null,
    usageTip: "Gunakan saat tim membutuhkan bantuan.",
    tips: ["Perhatikan kondisi HP dan posisi rekan di sekitar."],
  },
  {
    id: "spell-sprint",
    slug: "sprint",
    name: "Sprint",
    image: "/images/spells/sprint.jpg",
    description: "Membantu mobilitas saat mengejar atau menjauh dari lawan.",
    attributes: [{ label: "Pergerakan" }],
    cooldown: null,
    usageTip: "Sesuaikan dengan posisi pertarungan.",
    tips: ["Rencanakan arah pergerakan sebelum masuk ke area lawan."],
  },
  {
    id: "spell-purify",
    slug: "purify",
    name: "Purify",
    image: "/images/spells/purify.jpg",
    description: "Membantu menghadapi efek kontrol lawan.",
    attributes: [{ label: "Perlindungan dari kontrol" }],
    cooldown: null,
    usageTip: "Perhatikan skill kontrol musuh.",
    tips: ["Kenali ancaman kontrol lawan agar dapat memilih waktu penggunaan."],
  },
  {
    id: "spell-execute",
    slug: "execute",
    name: "Execute",
    image: "/images/spells/execute.jpg",
    description: "Membantu menuntaskan pertarungan melawan target yang melemah.",
    attributes: [{ label: "Penyelesaian pertarungan" }],
    cooldown: null,
    usageTip: "Gunakan saat target sulit dijangkau.",
    tips: ["Perhatikan kondisi target dan risiko mendekati pertarungan."],
  },
  {
    id: "spell-frenzy",
    slug: "frenzy",
    name: "Frenzy",
    image: "/images/spells/frenzy.jpg",
    description: "Mendukung hero saat meningkatkan tekanan serangan dalam pertarungan.",
    attributes: [{ label: "Tekanan serangan" }],
    cooldown: null,
    usageTip: "Gunakan saat memiliki kesempatan menyerang.",
    tips: ["Pastikan posisi hero cukup aman sebelum berkomitmen dalam pertarungan."],
  },
  {
    id: "spell-intimidate",
    slug: "intimidate",
    name: "Intimidate",
    image: "/images/spells/intimidate.jpg",
    description: "Membantu mengurangi tekanan lawan saat menghadapi pertarungan jarak dekat.",
    attributes: [{ label: "Pertahanan dalam pertarungan" }],
    cooldown: null,
    usageTip: "Perhatikan ancaman lawan di sekitar hero.",
    tips: ["Koordinasikan penggunaan dengan rekan tim saat menghadapi serangan lawan."],
  },
  {
    id: "spell-stun",
    slug: "stun",
    name: "Stun",
    image: "/images/spells/stun.jpg",
    description: "Memberi kontrol untuk menghambat lawan dan menciptakan peluang bagi tim.",
    attributes: [{ label: "Kontrol lawan" }],
    cooldown: null,
    usageTip: "Tunggu posisi lawan sebelum memberi kontrol.",
    tips: ["Padukan kontrol dengan kemampuan rekan tim agar peluang serangan lebih baik."],
  },
  {
    id: "spell-teleport",
    slug: "teleport",
    name: "Teleport",
    image: "/images/spells/teleport.webp",
    description: "Mendukung perpindahan ke area lain untuk membantu tim dan menjaga posisi.",
    attributes: [{ label: "Rotasi dan bantuan tim" }],
    cooldown: null,
    usageTip: "Periksa situasi tujuan sebelum berpindah.",
    tips: ["Perhatikan posisi tim dan objektif saat merencanakan perpindahan."],
  },
];

const sampleArcana: CatalogArcana[] = [
  {
    id: "arcana-mutation",
    slug: "mutation",
    name: "Mutation",
    image: "/images/arcana/mutation.png",
    color: "RED",
    description: "Pilihan arcana untuk melengkapi kebutuhan serangan fisik.",
    attributes: [{ label: "Physical Attack" }, { label: "Physical Pierce" }],
    explanation: "Pilihan atribut untuk hero yang mengandalkan serangan fisik.",
    tips: ["Sesuaikan kombinasi arcana dengan peran dan kebutuhan hero."],
  },
  {
    id: "arcana-minds-eye",
    slug: "minds-eye",
    name: "Mind's Eye",
    image: "/images/arcana/mind-s-eye.png",
    color: "GREEN",
    description: "Pilihan arcana untuk melengkapi kebutuhan serangan dan penetrasi magis.",
    attributes: [{ label: "Attack Speed" }, { label: "Magical Pierce" }],
    explanation: "Melengkapi kebutuhan serangan dan penetrasi magis hero.",
    tips: ["Pertimbangkan gaya bermain hero saat memilih kombinasi atribut."],
  },
  {
    id: "arcana-hunt",
    slug: "hunt",
    name: "Hunt",
    image: "/images/arcana/hunt.png",
    color: "BLUE",
    description: "Pilihan arcana untuk mendukung tempo serangan dan pergerakan.",
    attributes: [{ label: "Attack Speed" }, { label: "Movement Speed" }],
    explanation: "Mendukung tempo serangan dan mobilitas saat bertarung.",
    tips: ["Sesuaikan kebutuhan mobilitas dengan posisi dan peran hero."],
  },
  {
    id: "arcana-nightmare",
    slug: "nightmare",
    name: "Nightmare",
    image: "/images/arcana/nightmare.png",
    color: "RED",
    description: "Pilihan arcana untuk melengkapi kebutuhan serangan magis.",
    attributes: [{ label: "Magic Attack" }, { label: "Magical Pierce" }],
    explanation: "Pilihan untuk melengkapi atribut serangan magis.",
    tips: ["Padukan dengan atribut yang sesuai dengan kemampuan hero."],
  },
  {
    id: "arcana-eagle-eye",
    slug: "eagle-eye",
    name: "Eagle Eye",
    image: "/images/arcana/eagle-eye.png",
    color: "GREEN",
    description: "Pilihan arcana untuk mendukung kebutuhan penetrasi fisik.",
    attributes: [{ label: "Physical Attack" }, { label: "Physical Pierce" }],
    explanation: "Mendukung hero yang membutuhkan penetrasi pertahanan fisik.",
    tips: ["Pertimbangkan kombinasi atribut serangan yang dibutuhkan hero."],
  },
  {
    id: "arcana-harmony",
    slug: "harmony",
    name: "Harmony",
    image: "/images/arcana/harmony.png",
    color: "BLUE",
    description: "Pilihan arcana untuk melengkapi kebutuhan daya tahan hero.",
    attributes: [{ label: "Max Health" }, { label: "HP Recovery" }],
    explanation: "Membantu melengkapi daya tahan hero dalam permainan.",
    tips: ["Seimbangkan kebutuhan ketahanan dengan peran hero dalam tim."],
  },
];

const arcanaAssetGroups: Record<ArcanaColor, string[]> = {
  RED: ["beast-scar", "calamity", "conflict", "fate", "inheritance", "mutation", "nightmare", "red-moon", "unparalleled"],
  GREEN: ["compassion", "eagle-eye", "fortify", "meditation", "mind-s-eye", "omen", "reverberation", "tribute", "void"],
  BLUE: ["avarice", "harmony", "hunt", "longevity", "prosperity", "reaver", "reincarnation", "saint", "stealth"],
};

const arcanaCatalog: CatalogArcana[] = Object.entries(arcanaAssetGroups).flatMap(([color, slugs]) => {
  const template = sampleArcana.find((entry) => entry.color === color);
  if (!template) return [];

  return slugs.map((slug) => sampleArcana.find((entry) => entry.image === `/images/arcana/${slug}.png`) ?? {
    ...template,
    id: `arcana-${slug}`,
    slug,
    name: assetName(slug),
    image: `/images/arcana/${slug}.png`,
  });
});

// TODO: Ganti sumber contoh dengan pemanggilan repository/backend setelah kontrak data tersedia.
// Pertahankan tipe hasil ini agar komponen katalog tidak bergantung pada sumber datanya.
export async function getItems(): Promise<CatalogItem[]> {
  return structuredClone(itemCatalog);
}

export async function getSpells(): Promise<CatalogSpell[]> {
  return structuredClone(sampleSpells);
}

export async function getArcana(): Promise<CatalogArcana[]> {
  return structuredClone(arcanaCatalog);
}
