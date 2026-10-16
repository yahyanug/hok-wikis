export type ContentUpdate = {
  updatedAt: string | null;
};

export async function getLatestContentUpdate(): Promise<ContentUpdate> {
  // Nilai sementara sampai API tersedia.
  // Gunakan tanggal update konten yang sebenarnya.
  return {
    updatedAt: "2026-10-16",
  };
}
