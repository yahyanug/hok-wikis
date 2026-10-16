export type AboutContent = {
  letterTitle: string;
  greeting: string;
  paragraphs: string[];
  signoff: string;
  signature: string;
  disclaimer: string;
};

const aboutContent: AboutContent = {
  letterTitle: "Untuk para penjelajah Kings Gorge",
  greeting: "Halo, sesama pemain Honor of Kings!",
  paragraphs: [
    "HOK Wiki hadir sebagai tempat untuk mengenal hero, memahami matchup, dan menemukan referensi permainan dalam satu tempat.",
    "Dari item, spell, dan arcana hingga panduan serta kabar terbaru, semuanya disusun agar lebih mudah dijelajahi dan dipahami.",
    "Proyek ini tumbuh bersama komunitas. Setiap saran dan koreksi membantu kami menghadirkan informasi yang lebih baik untuk para pemain.",
  ],
  signoff: "Dari penggemar, untuk penggemar.",
  signature: "HOK Wiki",
  disclaimer:
    "Proyek fan-made independen, tidak berafiliasi dengan atau didukung oleh Honor of Kings maupun TiMi Studio Group.",
};

// Ganti sumber konten ini dengan repository database/backend setelah tersedia.
export async function getAboutContent(): Promise<AboutContent> {
  return structuredClone(aboutContent);
}
