import { NotFoundIllustration } from "@/components/ui/not-found-illustration";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="hok-welcome-arrival mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-6 py-12 text-center sm:py-16"
    >
      <h1 id="not-found-title" className="sr-only">
        404 — Halaman tidak ditemukan
      </h1>

      <NotFoundIllustration alt="" className="max-w-xs sm:max-w-md" />

      <p className="text-sm leading-relaxed text-muted-foreground">
        Halaman yang kamu cari tidak tersedia
      </p>
    </section>
  );
}
