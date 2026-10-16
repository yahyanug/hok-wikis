export type NewsCategory = "HERO_UPDATES" | "SKINS" | "PATCH_NOTES" | "EVENTS";

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  publishedAt: string;
  image: string;
  body: string[];
  featured: boolean;
};

export type NewsData = { articles: NewsArticle[] };

export type DashboardSlide = {
  id: string;
  title: string;
  description: string;
  label: string;
  image: string;
  articleSlug: string;
};

export type DashboardData = {
  slides: DashboardSlide[];
  latestUpdates: NewsArticle[];
  matchup: { title: string; description: string; image: string };
};

export const newsCategoryLabels: Record<NewsCategory, string> = {
  HERO_UPDATES: "Hero Updates",
  SKINS: "Skins",
  PATCH_NOTES: "Patch Notes",
  EVENTS: "Events",
};

// Data contoh untuk pratinjau halaman, bukan pengumuman atau perubahan patch resmi.
// URL gambar dapat diganti dengan lokasi gambar yang disimpan bersama artikel di database.
// image kosong memakai ilustrasi pengganti; contoh lokasi gambar berikutnya: /images/news/{slug}.jpg.
const sampleArticles: NewsArticle[] = [
  {
    id: "news-update-overview",
    slug: "ringkasan-pembaruan",
    title: "Ringkasan update terbaru",
    excerpt: "Temukan sorotan pembaruan dan topik yang bisa kamu jelajahi di HOK Wiki.",
    category: "PATCH_NOTES",
    publishedAt: "2026-10-16",
    image: "/images/ying-lny2026.png",
    featured: true,
    body: [
      "Ringkasan contoh ini mengajak pembaca menelusuri topik pembaruan di HOK Wiki. Konten ini bukan pengumuman atau catatan patch resmi.",
      "Ringkasan dapat memuat perubahan hero, penyesuaian perlengkapan, dan topik yang perlu diperhatikan sebelum bermain. Rincian angka dan perubahan permainan perlu merujuk pada pengumuman resminya.",
      "Gunakan bagian Heroes untuk mengenal gaya bermain, atau jelajahi Items, Spells, dan Arcana untuk menyiapkan referensi build. Matchup Analyzer membantu menyusun pertanyaan tentang lawan yang ingin kamu pelajari.",
      "Jika kamu menemukan informasi yang kurang tepat, kirimkan koreksi melalui halaman Feedback agar konten dapat ditinjau kembali.",
    ],
  },
  {
    id: "news-hero-ying",
    slug: "sorotan-hero-ying",
    title: "Sorotan hero: mengenal Ying",
    excerpt: "Kenali peran, mobilitas, dan hal yang perlu diperhatikan saat mempelajari hero pilihanmu.",
    category: "HERO_UPDATES",
    publishedAt: "2026-10-14",
    image: "/images/ying-lny2026.png",
    featured: false,
    body: [
      "Sorotan hero adalah ruang untuk membahas karakter, peran, dan gaya bermain hero. Mulailah dengan memahami tugas hero dalam tim sebelum mempelajari pilihan build.",
      "Saat mempelajari hero, kenali tujuan perannya terlebih dahulu: kapan perlu mencari ruang, membantu tim, atau menunggu kesempatan masuk ke pertarungan.",
      "Bandingkan referensi build dengan kebutuhan pertandingan. Panduan akan lebih berguna jika menjelaskan alasan di balik setiap pilihan, bukan hanya memberikan daftar perlengkapan.",
      "Data kemampuan dan perubahan keseimbangan nantinya dapat ditambahkan dari sumber yang telah ditinjau.",
    ],
  },
  {
    id: "news-skins-showcase",
    slug: "sorotan-skin-komunitas",
    title: "Sorotan skin pilihan komunitas",
    excerpt: "Ruang untuk menjelajahi tema visual dan karya favorit para pemain.",
    category: "SKINS",
    publishedAt: "2026-10-13",
    image: "",
    featured: false,
    body: [
      "Sorotan skin menempatkan tema visual dan detail karakter sebagai fokus bacaan. Pilihan favorit setiap pemain dapat berbeda sesuai selera.",
      "Sorotan dapat membahas tema warna, konsep karakter, dan detail visual yang membuat sebuah skin menarik bagi komunitas.",
      "Informasi harga, jadwal rilis, dan ketersediaan perlu diperiksa dari kanal resmi sebelum ditambahkan ke artikel.",
    ],
  },
  {
    id: "news-community-events",
    slug: "agenda-komunitas",
    title: "Agenda event komunitas",
    excerpt: "Tempat untuk merangkum kegiatan, diskusi, dan agenda yang menarik bagi komunitas.",
    category: "EVENTS",
    publishedAt: "2026-10-12",
    image: "/images/background-page.png",
    featured: false,
    body: [
      "Halaman ini merupakan contoh artikel agenda, bukan pengumuman event yang sedang berlangsung.",
      "Setiap agenda nantinya dapat memuat nama kegiatan, periode, penyelenggara, dan tautan informasi yang dapat diperiksa oleh pembaca.",
      "Sertakan konteks yang cukup agar pemain memahami kegiatan yang ditampilkan sebelum memutuskan untuk ikut serta.",
    ],
  },
  {
    id: "news-build-planning",
    slug: "menyusun-build-hero",
    title: "Menyusun build sesuai kebutuhan hero",
    excerpt: "Pahami hubungan antara peran hero, pilihan perlengkapan, dan kondisi pertarungan.",
    category: "HERO_UPDATES",
    publishedAt: "2026-10-11",
    image: "",
    featured: false,
    body: [
      "Panduan build sebaiknya dimulai dari kebutuhan hero dan tugasnya dalam tim. Tanyakan apa yang paling dibutuhkan saat menghadapi kondisi permainan yang sedang berlangsung.",
      "Pertimbangkan kebutuhan serangan, pertahanan, dan mobilitas saat membaca rekomendasi perlengkapan. Situasi pertandingan dapat membuat prioritas tersebut berubah.",
      "Katalog Items, Spells, dan Arcana disiapkan untuk membantu pembaca menelusuri atribut dan tujuan setiap pilihan.",
    ],
  },
  {
    id: "news-arcana-notes",
    slug: "catatan-referensi-arcana",
    title: "Catatan referensi Arcana",
    excerpt: "Jelajahi cara penyajian atribut dan kombinasi arcana dalam referensi HOK Wiki.",
    category: "PATCH_NOTES",
    publishedAt: "2026-10-10",
    image: "",
    featured: false,
    body: [
      "Artikel contoh ini membahas format catatan Arcana. Tidak ada perubahan patch resmi yang diumumkan melalui konten contoh ini.",
      "Atribut dapat dikelompokkan agar pembaca lebih mudah memahami kebutuhan serangan, penetrasi, mobilitas, atau ketahanan.",
      "Setiap perubahan angka nantinya perlu dicatat beserta sumber dan tanggal pembaruannya.",
    ],
  },
  {
    id: "news-skin-themes",
    slug: "tema-visual-skin",
    title: "Menjelajahi tema visual skin",
    excerpt: "Dari palet warna hingga detail kostum, setiap tema memberi suasana yang berbeda.",
    category: "SKINS",
    publishedAt: "2026-10-09",
    image: "",
    featured: false,
    body: [
      "Galeri tema visual dapat membantu pembaca mengenal karakter skin sebelum membuka rincian lengkapnya.",
      "Perhatikan hubungan antara konsep karakter, palet warna, dan detail kostum saat menjelajahi sebuah tema.",
      "Gambar artikel dan sumber artwork dapat diperbarui bersama konten agar informasi atribusi tetap jelas.",
    ],
  },
  {
    id: "news-community-week",
    slug: "ruang-komunitas",
    title: "Ruang berbagi untuk komunitas",
    excerpt: "Ide, koreksi, dan pengalaman bermain membantu referensi ini menjadi lebih bermanfaat.",
    category: "EVENTS",
    publishedAt: "2026-10-08",
    image: "/images/background-page-light.png",
    featured: false,
    body: [
      "HOK Wiki dikembangkan sebagai ruang referensi untuk para pemain. Pengalaman dan masukan komunitas membantu kami menentukan hal yang perlu dibahas atau diperbaiki.",
      "Masukan dapat berupa ide fitur, laporan masalah teknis, atau koreksi informasi. Pilih jenis masukan yang sesuai pada halaman Feedback.",
      "Sertakan konteks dan sumber yang membantu agar informasi dapat ditinjau dengan lebih mudah.",
    ],
  },
  {
    id: "news-rotation-guide",
    slug: "memahami-rotasi-dan-objektif",
    title: "Memahami rotasi dan objektif",
    excerpt: "Pertimbangkan posisi rekan, ruang di peta, dan tujuan berikutnya saat membaca situasi.",
    category: "HERO_UPDATES",
    publishedAt: "2026-10-07",
    image: "/images/ying-lny2026.png",
    featured: false,
    body: [
      "Contoh topik panduan ini berfokus pada pertanyaan yang dapat membantu pemain menilai keadaan pertandingan.",
      "Perhatikan informasi yang terlihat di peta, posisi rekan satu tim, dan tujuan yang ingin dicapai sebelum berpindah area.",
      "Penjelasan strategi yang lebih rinci nantinya dapat dilengkapi dengan contoh situasi dan sumber yang sesuai.",
    ],
  },
  {
    id: "news-reading-patches",
    slug: "membaca-patch-notes",
    title: "Panduan membaca patch notes",
    excerpt: "Kenali bagian penting dari catatan pembaruan sebelum membandingkan pengaruhnya pada permainan.",
    category: "PATCH_NOTES",
    publishedAt: "2026-10-06",
    image: "",
    featured: false,
    body: [
      "Catatan pembaruan dapat berisi banyak rincian. Pisahkan ringkasan perubahan, sumber, dan konteks penggunaannya agar lebih mudah ditelusuri.",
      "Pisahkan informasi perubahan dari interpretasinya. Cantumkan versi dan sumber resmi saat membahas angka atau mekanik yang diperbarui.",
      "Pembaca dapat membandingkan catatan tersebut dengan referensi hero dan perlengkapan yang ada di HOK Wiki.",
    ],
  },
  {
    id: "news-role-priorities",
    slug: "mengenal-prioritas-role",
    title: "Mengenal prioritas setiap role",
    excerpt: "Pahami tugas utama hero sebelum menyesuaikan rencana permainan bersama tim.",
    category: "HERO_UPDATES",
    publishedAt: "2026-10-05",
    image: "/images/ying-lny2026.png",
    featured: false,
    body: [
      "Setiap role memiliki kebutuhan yang berbeda. Mengenali tugas utama membantu pemain menilai kapan perlu mencari ruang, menjaga rekan, atau mendekati objektif.",
      "Gunakan referensi role sebagai awal diskusi, lalu pertimbangkan susunan tim dan kondisi pertandingan. Artikel ini adalah contoh bacaan komunitas, bukan perubahan keseimbangan resmi.",
    ],
  },
  {
    id: "news-skin-colors",
    slug: "warna-dan-identitas-skin",
    title: "Warna dan identitas sebuah skin",
    excerpt: "Jelajahi bagaimana palet warna membentuk suasana dan karakter sebuah desain.",
    category: "SKINS",
    publishedAt: "2026-10-04",
    image: "",
    featured: false,
    body: [
      "Palet warna dapat membuat tema skin terasa cerah, tenang, atau dramatis. Perhatikan juga detail kostum dan bentuk yang menghubungkan tema tersebut dengan karakter hero.",
      "Artikel contoh ini memberi ruang untuk ulasan visual. Informasi rilis, harga, dan ketersediaan perlu mengikuti pengumuman resmi saat konten yang sebenarnya ditambahkan.",
    ],
  },
  {
    id: "news-community-feedback",
    slug: "berbagi-masukan-komunitas",
    title: "Berbagi masukan untuk HOK Wiki",
    excerpt: "Ide yang jelas dan koreksi dengan sumber membantu referensi ini semakin bermanfaat.",
    category: "EVENTS",
    publishedAt: "2026-10-03",
    image: "/images/background-page.png",
    featured: false,
    body: [
      "Komunitas dapat membantu menyempurnakan referensi melalui saran fitur, laporan masalah, atau koreksi konten. Halaman Feedback menyediakan pilihan jenis masukan yang sesuai.",
      "Sertakan halaman terkait dan jelaskan konteksnya agar masukan lebih mudah dipahami. Untuk koreksi informasi permainan, tautan sumber akan membantu proses peninjauan.",
    ],
  },
  {
    id: "news-spell-reference",
    slug: "menjelajahi-referensi-spell",
    title: "Menjelajahi referensi spell",
    excerpt: "Kenali tujuan penggunaan spell sebelum membandingkan pilihan untuk hero favoritmu.",
    category: "PATCH_NOTES",
    publishedAt: "2026-10-02",
    image: "",
    featured: false,
    body: [
      "Referensi spell dapat membantu pemain membedakan kebutuhan mobilitas, pertahanan, dan tekanan dalam pertarungan. Bacalah deskripsi serta konteks penggunaan bersama-sama.",
      "Konten contoh ini bukan catatan perubahan spell. Rincian angka, cooldown, dan pembaruan berikutnya perlu disertai sumber sebelum dipublikasikan sebagai referensi permainan.",
    ],
  },
  {
    id: "news-duel-preparation",
    slug: "mempersiapkan-duel-di-lane",
    title: "Mempersiapkan duel di lane",
    excerpt: "Perhatikan jarak, informasi lawan, dan kesempatan mundur sebelum memulai pertukaran serangan.",
    category: "HERO_UPDATES",
    publishedAt: "2026-10-01",
    image: "/images/ying-lny2026.png",
    featured: false,
    body: [
      "Memahami lawan dimulai dengan membaca jangkauan kemampuan dan pola pergerakannya. Catat kapan kamu dapat mendekat serta kapan lebih baik menjaga jarak.",
      "Gunakan Matchup Analyzer untuk menelusuri pertanyaan tentang keunggulan dan situasi yang perlu diwaspadai. Rekomendasi tetap perlu disesuaikan dengan kondisi permainan.",
    ],
  },
  {
    id: "news-skin-details",
    slug: "detail-kecil-dalam-desain-skin",
    title: "Detail kecil dalam desain skin",
    excerpt: "Motif, aksesori, dan efek visual dapat melengkapi cerita sebuah tema.",
    category: "SKINS",
    publishedAt: "2026-09-30",
    image: "",
    featured: false,
    body: [
      "Selain warna utama, aksesori dan pola kecil sering membantu memperjelas tema skin. Detail tersebut dapat menjadi bahan diskusi visual yang menarik bagi komunitas.",
      "Artikel contoh ini belum mengumumkan skin tertentu. Gambar dan informasi detail nantinya dapat ditambahkan bersama atribusi sumbernya.",
    ],
  },
  {
    id: "news-community-sharing",
    slug: "berbagi-pengalaman-bermain",
    title: "Ruang untuk berbagi pengalaman bermain",
    excerpt: "Pengalaman yang disertai konteks membantu pemain lain memahami alasan sebuah keputusan.",
    category: "EVENTS",
    publishedAt: "2026-09-29",
    image: "/images/background-page-light.png",
    featured: false,
    body: [
      "Pengalaman bermain akan lebih mudah dipahami jika menjelaskan situasi, tujuan, dan pilihan yang tersedia saat itu. Pendekatan ini membantu diskusi tetap terarah.",
      "Ini adalah contoh topik komunitas. Agenda diskusi atau kegiatan yang sebenarnya akan dicantumkan beserta informasi penyelenggara dan jadwalnya.",
    ],
  },
  {
    id: "news-item-reference",
    slug: "membaca-atribut-dan-efek-item",
    title: "Membaca atribut dan efek item",
    excerpt: "Pisahkan manfaat atribut dasar dari efek khusus sebelum membandingkan perlengkapan.",
    category: "PATCH_NOTES",
    publishedAt: "2026-09-28",
    image: "",
    featured: false,
    body: [
      "Atribut dasar dan efek khusus memberi manfaat dengan cara yang berbeda. Membacanya secara terpisah membantu pemain memahami alasan sebuah item digunakan.",
      "Artikel contoh ini menyiapkan format referensi item. Perubahan nilai atau mekanik yang sebenarnya perlu mengikuti sumber resmi dan mencantumkan versi pembaruannya.",
    ],
  },
  {
    id: "news-team-composition",
    slug: "mengenali-kebutuhan-komposisi-tim",
    title: "Mengenali kebutuhan komposisi tim",
    excerpt: "Perhatikan cara tim memulai pertarungan, menjaga ruang, dan menindaklanjuti peluang.",
    category: "HERO_UPDATES",
    publishedAt: "2026-09-27",
    image: "/images/ying-lny2026.png",
    featured: false,
    body: [
      "Susunan hero memberi gambaran tentang cara sebuah tim bermain. Cari hubungan antara jangkauan, mobilitas, perlindungan, dan kemampuan menindaklanjuti inisiasi.",
      "Tidak semua kondisi dapat dijawab dengan satu susunan yang sama. Gunakan referensi sebagai panduan untuk menilai kebutuhan tim pada pertandingan yang sedang berlangsung.",
    ],
  },
  {
    id: "news-skin-gallery",
    slug: "catatan-untuk-galeri-skin",
    title: "Catatan untuk galeri skin favorit",
    excerpt: "Simpan konteks tema dan sumber gambar agar galeri mudah ditelusuri kembali.",
    category: "SKINS",
    publishedAt: "2026-09-26",
    image: "",
    featured: false,
    body: [
      "Galeri yang mudah dijelajahi dapat mengelompokkan gambar berdasarkan tema, hero, atau warna. Keterangan singkat membantu pembaca mengenali konteks setiap karya.",
      "Contoh artikel ini menjadi ruang untuk dokumentasi visual. Informasi kepemilikan artwork dan sumber gambar perlu tetap dicantumkan ketika galeri dilengkapi.",
    ],
  },
  {
    id: "news-community-reference",
    slug: "referensi-yang-tumbuh-bersama-komunitas",
    title: "Referensi yang tumbuh bersama komunitas",
    excerpt: "Perbaikan kecil yang konsisten membantu informasi lebih nyaman dibaca dan diperiksa.",
    category: "EVENTS",
    publishedAt: "2026-09-25",
    image: "/images/background-page.png",
    featured: false,
    body: [
      "HOK Wiki berkembang melalui proses membaca ulang, meninjau sumber, dan memperbaiki bagian yang belum jelas. Masukan pembaca membantu kami mengenali kebutuhan berikutnya.",
      "Gunakan halaman Feedback untuk menyampaikan ide atau koreksi dengan konteks yang cukup. Artikel ini merupakan contoh kabar komunitas dan tidak mengumumkan kegiatan resmi.",
    ],
  },
];

const articleDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatArticleDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Tanpa tanggal" : articleDateFormatter.format(date);
}

// TODO: Ganti data contoh dengan query repository atau fetch backend ketika kontrak API tersedia.
// Halaman menerima hasil loader ini, sehingga tidak perlu mengubah komponen tampilannya.
export async function getNewsData(): Promise<NewsData> {
  return { articles: structuredClone(sampleArticles) };
}

export async function getDashboardData(): Promise<DashboardData> {
  const { articles } = await getNewsData();
  return {
    slides: articles.slice(0, 3).map((article) => ({
      id: `slide-${article.id}`,
      title: article.title,
      description: article.excerpt,
      label: newsCategoryLabels[article.category],
      image: article.image,
      articleSlug: article.slug,
    })),
    latestUpdates: articles.slice(1, 6),
    matchup: {
      title: "Analyze Matchups",
      description: "Kenali keunggulan, temukan counter, dan siapkan strategi untuk hero pilihanmu.",
      image: "/images/ying-lny2026.png",
    },
  };
}
