import type { HeroRole } from "@/app/types/hero";
import type { HeroLane } from "@/app/heroes/_data/heroes";

export type MatchupPhaseId = "overview" | "laning" | "mid-game" | "late-game" | "team-fight" | "tips";

export type MatchupHero = {
  slug: string;
  name: string;
  roles: HeroRole[];
  lanes: HeroLane[];
  image: string;
  description: string;
  tags: string[];
};

export type MatchupRelation = { heroSlug: string; reason: string };

export type MatchupPhase = {
  id: MatchupPhaseId;
  title: string;
  introduction: string;
  actions: string[];
  opportunities: string[];
  cautions: string[];
};

export type HeroMatchupAnalysis = {
  heroSlug: string;
  advantages: MatchupRelation[];
  counters: MatchupRelation[];
  phases: MatchupPhase[];
};

export type MatchupData = {
  heroes: MatchupHero[];
  analyses: HeroMatchupAnalysis[];
  defaultHeroSlug: string;
  isSample: boolean;
};

type HeroSeed = [slug: string, name: string, roles: HeroRole[], lanes: HeroLane[], tags: string[]];

const heroSeeds: HeroSeed[] = [
  ["allain", "Allain", ["FIGHTER"], ["CLASH"], ["Sustain", "Duel", "Melee"]],
  ["arthur", "Arthur", ["FIGHTER", "TANK"], ["CLASH"], ["Frontline", "Melee", "Initiation"]],
  ["lian-po", "Lian Po", ["TANK"], ["CLASH", "ROAMING"], ["Frontline", "Control", "Team Fight"]],
  ["dun", "Dun", ["TANK", "FIGHTER"], ["CLASH"], ["Frontline", "Control", "Melee"]],
  ["zhang-fei", "Zhang Fei", ["TANK", "SUPPORT"], ["ROAMING"], ["Protection", "Frontline", "Control"]],
  ["cai-yan", "Cai Yan", ["SUPPORT"], ["ROAMING"], ["Recovery", "Protection", "Team Fight"]],
  ["lam", "Lam", ["ASSASSIN"], ["JUNGLE"], ["Mobility", "Melee", "Flank"]],
  ["hou-yi", "Hou Yi", ["MARKSMAN"], ["FARM"], ["Ranged", "Damage", "Team Fight"]],
  ["angela", "Angela", ["MAGE"], ["MID"], ["Magic", "Ranged", "Control"]],
  ["daji", "Daji", ["MAGE"], ["MID"], ["Magic", "Control", "Ranged"]],
  ["princess-frost", "Princess Frost", ["MAGE"], ["MID"], ["Magic", "Area", "Control"]],
  ["ying", "Ying", ["ASSASSIN", "FIGHTER"], ["JUNGLE"], ["Mobility", "Flank", "Melee"]],
  ["li-bai", "Li Bai", ["ASSASSIN"], ["JUNGLE"], ["Mobility", "Melee", "Timing"]],
  ["mulan", "Mulan", ["FIGHTER", "ASSASSIN"], ["CLASH"], ["Melee", "Combo", "Duel"]],
  ["lu-bu", "Lu Bu", ["FIGHTER"], ["CLASH"], ["Melee", "Area", "Frontline"]],
  ["sun-ce", "Sun Ce", ["FIGHTER", "TANK"], ["CLASH"], ["Initiation", "Control", "Rotation"]],
  ["mai-shiranui", "Mai Shiranui", ["MAGE", "ASSASSIN"], ["MID"], ["Magic", "Mobility", "Combo"]],
  ["lady-sun", "Lady Sun", ["MARKSMAN"], ["FARM"], ["Ranged", "Mobility", "Damage"]],
  ["marco-polo", "Marco Polo", ["MARKSMAN"], ["FARM"], ["Ranged", "Mobility", "Team Fight"]],
  ["di-renjie", "Di Renjie", ["MARKSMAN"], ["FARM"], ["Ranged", "Damage", "Control"]],
  ["yaria", "Yaria", ["SUPPORT"], ["ROAMING"], ["Protection", "Mobility", "Support"]],
  ["donghuang", "Donghuang", ["TANK", "SUPPORT"], ["ROAMING"], ["Control", "Frontline", "Protection"]],
  ["diaochan", "Diaochan", ["MAGE"], ["MID"], ["Magic", "Mobility", "Area"]],
  ["kongming", "Kongming", ["MAGE"], ["MID", "JUNGLE"], ["Magic", "Mobility", "Timing"]],
  ["nakoruru", "Nakoruru", ["ASSASSIN"], ["JUNGLE"], ["Mobility", "Flank", "Melee"]],
  ["kaizer", "Kaizer", ["FIGHTER", "TANK"], ["CLASH", "JUNGLE"], ["Duel", "Melee", "Frontline"]],
  ["erin", "Erin", ["MARKSMAN"], ["FARM"], ["Ranged", "Mobility", "Damage"]],
  ["sun-bin", "Sun Bin", ["SUPPORT", "MAGE"], ["ROAMING"], ["Rotation", "Protection", "Area"]],
];

const laneNames: Record<HeroLane, string> = {
  CLASH: "Clash Lane",
  JUNGLE: "Jungle",
  MID: "Mid Lane",
  FARM: "Farm Lane",
  ROAMING: "Roaming",
};

const sampleHeroes: MatchupHero[] = heroSeeds.map(([slug, name, roles, lanes, tags]) => ({
  slug,
  name,
  roles,
  lanes,
  // Database records can supply /images/heroes/{slug}.png or a hosted artwork URL.
  image: slug === "ying" ? "/images/ying-lny2026.png" : "",
  description: `Kenali jangkauan, posisi, dan momentum ${name} untuk merencanakan duel serta membantu pertarungan tim.`,
  tags,
}));

function createPhases(hero: MatchupHero): MatchupPhase[] {
  const lane = laneNames[hero.lanes[0]];

  return [
    {
      id: "overview",
      title: "Overview",
      introduction: `Gunakan ${hero.name} sebagai titik awal untuk membaca komposisi kedua tim, bukan sebagai jaminan menang dalam duel. Contoh analisis ini mengajakmu mempertimbangkan jangkauan lawan, informasi pada minimap, serta kesempatan tim melakukan tindak lanjut. Perbedaan level, item, dan jumlah pemain yang hadir dapat mengubah hasil pertemuan yang sama.`,
      actions: [
        `Kenali tugas ${hero.name} pada ${lane}, lalu bandingkan kebutuhan tim sebelum menentukan rencana bermain.`,
        "Periksa sumber damage dan efek kontrol kedua tim. Tentukan siapa yang perlu dilindungi dan siapa yang dapat membuka ruang.",
        "Gunakan daftar advantages dan counters sebagai contoh cara mencatat alasan matchup; data pratinjau belum menjadi rekomendasi pertandingan.",
      ],
      opportunities: ["Posisi rekan satu tim terlihat dan memungkinkan tindak lanjut.", "Lawan baru saja menggunakan kemampuan penting.", "Jumlah pemain dan sumber daya mendukung keputusan bersama."],
      cautions: ["Informasi lawan di minimap belum cukup.", "Perbedaan level atau item belum diperhitungkan.", "Rencana masuk tidak disertai jalur keluar yang aman."],
    },
    {
      id: "laning",
      title: "Laning Phase",
      introduction: `Pada fase awal, fokuskan pengamatan ${hero.name} pada akses farm yang aman dan pola pergerakan lawan di ${lane}. Catat kapan lawan maju, kapan rekan dapat membantu, serta kapan lebih baik mempertahankan posisi. Jika hero dimainkan pada jalur lain, sesuaikan prioritas ini dengan tanggung jawab posisi tersebut.`,
      actions: [
        "Amati posisi gelombang minion atau monster sebelum bertukar serangan. Jangan mengejar sampai kehilangan sumber daya utama.",
        `Setelah lawan menggunakan skill penting, nilai apakah ${hero.name} memiliki ruang untuk maju atau cukup mengambil posisi yang lebih baik.`,
        "Sampaikan informasi rotasi yang terlihat. Saat lawan menghilang, kurangi risiko sampai informasi baru tersedia.",
      ],
      opportunities: ["Gelombang dan posisi memungkinkan farm tanpa membuka jalur gank.", "Rekan memberi informasi posisi lawan yang mendekat.", "Ada kesempatan kembali ke base tanpa melewatkan terlalu banyak sumber daya."],
      cautions: ["Maju tanpa mengetahui posisi jungler lawan.", "Menukar terlalu banyak HP demi serangan kecil.", "Memaksakan duel saat kemampuan penting belum tersedia."],
    },
    {
      id: "mid-game",
      title: "Mid Game",
      introduction: `Ketika rotasi mulai sering terjadi, keputusan ${hero.name} perlu mempertimbangkan objektif berikutnya dan jalur yang memberi informasi paling aman. Nilai apakah tim membutuhkan tambahan pemain, tekanan pada lane, atau waktu untuk melengkapi item. Tidak semua pertemuan harus berubah menjadi pertarungan.`,
      actions: [
        "Lihat lane yang perlu didorong sebelum berpindah. Gelombang yang tertata membantu tim bergerak tanpa langsung kehilangan tekanan.",
        `Tentukan bersama rekan apakah ${hero.name} perlu bergabung, menjaga sisi, atau mengambil sumber daya yang aman.`,
        "Masuk ke area objektif bersama rekan yang dapat membuka informasi. Hindari memeriksa semak tanpa dukungan.",
      ],
      opportunities: ["Lane sudah tertata dan rekan siap berpindah bersama.", "Lawan terlihat pada sisi lain sehingga tim dapat menilai pertukaran objektif.", "Skill dan sumber daya penting tersedia sebelum kontes."],
      cautions: ["Rotasi melewati jalur gelap sendirian.", "Terpancing duel jauh dari objektif yang diprioritaskan tim.", "Mengabaikan kebutuhan farm saat tim belum siap bertarung."],
    },
    {
      id: "late-game",
      title: "Late Game",
      introduction: `Pada fase akhir, satu kehilangan pemain dapat memberi lawan banyak ruang. Untuk ${hero.name}, evaluasi posisi berdasarkan informasi terbaru, bukan berdasarkan pertemuan sebelumnya. Perhatikan waktu hidup kembali, posisi gelombang minion, dan siapa yang memegang kemampuan penentu sebelum tim mengambil risiko.`,
      actions: [
        "Tinjau kembali pilihan item sesuai ancaman yang benar-benar muncul dalam pertandingan, bukan hanya urutan build awal.",
        "Bergerak bersama ketika informasi terbatas. Utamakan mempertahankan jalur aman menuju objektif dan area pertahanan.",
        `Simpan kemampuan penting ${hero.name} untuk sasaran dan momen yang disepakati; manfaatkan ping agar rekan dapat mengikuti.`,
      ],
      opportunities: ["Seluruh rekan tersedia dan mengetahui rencana yang sama.", "Gelombang memberi tekanan sehingga lawan harus menunjukkan posisi.", "Tim memiliki informasi cukup untuk memilih bertarung atau mundur."],
      cautions: ["Mengejar terlalu jauh setelah mendapat satu eliminasi.", "Mengambil jalur pendek yang tidak memiliki informasi.", "Memaksakan objektif tanpa memperhatikan kondisi base."],
    },
    {
      id: "team-fight",
      title: "Team Fight",
      introduction: `Tugas ${hero.name} dalam pertarungan tim dapat berbeda menurut komposisi. Sebelum masuk, putuskan apakah prioritasnya membuka ruang, menjaga rekan, atau mengikuti inisiasi yang sudah terjadi. Panduan contoh ini menekankan koordinasi; urutan combo dan target spesifik perlu diisi dari analisis matchup yang telah ditinjau.`,
      actions: [
        "Kenali jalur masuk lawan dan posisi pemberi damage tim sendiri. Jangan meninggalkan rekan tanpa memahami ancaman yang mendekat.",
        "Pantau kemampuan kontrol utama. Kesempatan menyerang dapat berubah setelah kemampuan tersebut digunakan atau meleset.",
        `Sesudah ${hero.name} bergerak, evaluasi ulang jarak rekan dan kondisi target. Mundur teratur dapat lebih bernilai daripada mengejar.`,
      ],
      opportunities: ["Rekan berada dalam jangkauan untuk membantu.", "Target dapat dijangkau tanpa memisahkan tim terlalu jauh.", "Area pertarungan mendukung posisi dan jalur keluar tim."],
      cautions: ["Masuk sendirian ketika rekan masih berpindah posisi.", "Seluruh tim mengejar satu target dan kehilangan fokus objektif.", "Menggunakan semua kemampuan sebelum ancaman utama terlihat."],
    },
    {
      id: "tips",
      title: "Tips & Tricks",
      introduction: `Setelah bermain dengan ${hero.name}, catat konteks kejadian yang ingin kamu pelajari: posisi, level, item, serta kemampuan yang tersedia saat itu. Catatan tersebut membantu membedakan masalah pengambilan keputusan dari persoalan mekanik. Gunakan bagian ini sebagai kerangka belajar sambil menunggu panduan hero yang terverifikasi.`,
      actions: [
        "Latih satu kebiasaan dalam satu sesi, seperti melihat minimap sebelum maju atau menyampaikan waktu kemampuan penting kepada tim.",
        "Tinjau ulang satu pertemuan yang sulit. Tuliskan pilihan lain yang tersedia dan informasi yang sebenarnya sudah terlihat.",
        `Bila menemukan informasi ${hero.name} yang perlu diperbaiki, kirim koreksi melalui halaman Feedback dengan contoh dan sumber pendukung.`,
      ],
      opportunities: ["Ada rekaman atau catatan untuk membandingkan beberapa keputusan.", "Latihan dilakukan dengan satu tujuan yang mudah diamati.", "Masukan mengandung konteks dan dapat ditinjau kembali."],
      cautions: ["Menyimpulkan matchup hanya dari satu pertandingan.", "Mengabaikan pengaruh level, item, dan bantuan pemain lain.", "Menganggap data pratinjau sebagai informasi balance terbaru."],
    },
  ];
}

const advantageContexts = [
  "posisi setelah kemampuan utama lawan digunakan",
  "dukungan rekan yang datang lebih dahulu",
  "jalur mundur yang masih terbuka",
  "perbedaan sumber daya sebelum duel",
];
const counterContexts = [
  "jangkauan lawan sebelum mendekat",
  "potensi bantuan dari area yang belum terlihat",
  "kemampuan kontrol yang belum digunakan",
  "ruang yang tersedia untuk kembali ke tim",
];

const sampleAnalyses: HeroMatchupAnalysis[] = sampleHeroes.map((hero, index) => {
  const others = [...sampleHeroes.slice(index + 1), ...sampleHeroes.slice(0, index)];

  return {
    heroSlug: hero.slug,
    advantages: others.slice(0, 12).map((other, relationIndex) => ({
      heroSlug: other.slug,
      reason: `${hero.name}: nilai ${advantageContexts[relationIndex % advantageContexts.length]}.`,
    })),
    counters: others.slice(12, 24).map((other, relationIndex) => ({
      heroSlug: other.slug,
      reason: `${hero.name}: periksa ${counterContexts[relationIndex % counterContexts.length]}.`,
    })),
    phases: createPhases(hero),
  };
});

// Replace this boundary with database access when the content source is available.
export async function getMatchupData(): Promise<MatchupData> {
  return { heroes: sampleHeroes, analyses: sampleAnalyses, defaultHeroSlug: "allain", isSample: true };
}
