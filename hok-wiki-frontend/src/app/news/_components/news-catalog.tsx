"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Newspaper, Search, X } from "lucide-react";

import { formatArticleDate, newsCategoryLabels, type NewsArticle, type NewsCategory } from "@/lib/site-content";

import { NewsArticleDialog } from "./news-article-dialog";
import { NewsArtwork } from "./news-artwork";

const categories: Array<NewsCategory | "ALL"> = ["ALL", "HERO_UPDATES", "SKINS", "PATCH_NOTES", "EVENTS"];
const pageSize = 3;
const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

function CategoryLabel({ category }: { category: NewsCategory }) {
  return <span className="inline-flex w-fit rounded-full border border-primary/50 bg-card/95 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary uppercase">{newsCategoryLabels[category]}</span>;
}

function ArticleDate({ article }: { article: NewsArticle }) {
  return <span className="inline-flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays aria-hidden="true" className="size-4 shrink-0 text-primary" /><time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time></span>;
}

function LeadStory({ article }: { article: NewsArticle }) {
  return (
    <NewsArticleDialog article={article} trigger={
      <button type="button" aria-label={`Baca berita utama: ${article.title}`} className={`group flex min-w-0 flex-col overflow-hidden rounded-xl border border-primary/40 bg-card/95 text-left shadow-[var(--hok-panel-shadow)] transition-colors hover:border-primary/75 motion-reduce:transition-none md:grid md:grid-cols-2 md:min-h-90 ${focusClass}`}>
        <NewsArtwork article={article} priority className="aspect-[16/10] w-full md:aspect-auto md:h-full" />
        <span className="flex min-w-0 flex-col items-start justify-center gap-4 p-5 break-words sm:p-6">
          <CategoryLabel category={article.category} />
          <span role="heading" aria-level={2} className="w-full font-serif text-3xl font-bold leading-tight break-words text-foreground lg:text-[2rem]">{article.title}</span>
          <span className="text-sm leading-7 text-muted-foreground lg:text-base">{article.excerpt}</span>
          <span className="mt-3 flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <ArticleDate article={article} />
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary sm:text-sm">Baca selengkapnya<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" /></span>
          </span>
        </span>
      </button>
    } />
  );
}

function RecentStory({ article }: { article: NewsArticle }) {
  return (
    <NewsArticleDialog article={article} trigger={
      <button type="button" aria-label={`Baca ${article.title}`} className={`group relative flex w-full min-w-0 items-start gap-3 rounded-lg text-left ${focusClass}`}>
        <span aria-hidden="true" className="absolute top-2 -left-6 size-2 rounded-full bg-primary shadow-[0_0_8px_color-mix(in_srgb,var(--primary)_55%,transparent)] ring-4 ring-card" />
        <NewsArtwork article={article} className="size-16 shrink-0 rounded-md border border-primary/25" />
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <time dateTime={article.publishedAt} className="text-xs text-muted-foreground">{formatArticleDate(article.publishedAt)}</time>
          <span role="heading" aria-level={3} className="line-clamp-2 text-sm font-semibold leading-5 text-foreground transition-colors group-hover:text-primary">{article.title}</span>
          <span className="line-clamp-2 text-xs leading-5 text-muted-foreground">{article.excerpt}</span>
        </span>
      </button>
    } />
  );
}

function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <NewsArticleDialog article={article} trigger={
      <button type="button" aria-label={`Baca ${article.title}`} className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-primary/30 bg-card/95 text-left shadow-[var(--hok-panel-shadow)] transition-colors hover:border-primary/75 motion-reduce:transition-none ${focusClass}`}>
        <span className="relative block w-full">
          <NewsArtwork article={article} className="aspect-[16/7] w-full" />
          <span className="absolute bottom-3 left-4"><CategoryLabel category={article.category} /></span>
        </span>
        <span className="flex flex-1 flex-col gap-3 p-4">
          <span role="heading" aria-level={3} className="font-serif text-xl font-bold leading-snug break-words text-foreground transition-colors group-hover:text-primary">{article.title}</span>
          <span className="line-clamp-2 text-sm leading-6 text-muted-foreground">{article.excerpt}</span>
          <span className="mt-auto flex w-full items-center justify-between gap-3 pt-1">
            <ArticleDate article={article} />
            <ArrowRight aria-hidden="true" className="size-4 text-primary transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
          </span>
        </span>
      </button>
    } />
  );
}

export function NewsCatalog({ articles }: { articles: NewsArticle[] }) {
  const [category, setCategory] = useState<NewsCategory | "ALL">("ALL");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const searchId = useId();
  const gridId = useId();
  const archiveRef = useRef<HTMLDivElement>(null);
  const searchTerm = query.trim().toLowerCase();
  const hasFilters = category !== "ALL" || Boolean(searchTerm);
  const filtered = articles.filter((article) => (category === "ALL" || article.category === category) && (!searchTerm || `${article.title} ${article.excerpt} ${newsCategoryLabels[article.category]} ${article.body.join(" ")}`.toLowerCase().includes(searchTerm))).sort((first, second) => second.publishedAt.localeCompare(first.publishedAt));
  const leadArticle = filtered.find((article) => article.featured) ?? filtered[0];
  const catalogArticles = filtered.filter((article) => article.id !== leadArticle?.id);
  const recentArticles = catalogArticles.slice(0, 3);
  const pageCount = Math.max(1, Math.ceil(catalogArticles.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageArticles = catalogArticles.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function resetFilters() {
    setCategory("ALL");
    setQuery("");
    setPage(1);
  }

  function changePage(nextPage: number) {
    setPage(Math.max(1, Math.min(nextPage, pageCount)));
    archiveRef.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center">
        <div role="group" aria-label="Kategori berita" className="flex min-w-0 flex-1 gap-1 overflow-x-auto rounded-xl border border-primary/30 bg-card/95 p-1.5">
          {categories.map((option) => <button key={option} type="button" aria-pressed={category === option} onClick={() => { setCategory(option); setPage(1); }} className={`min-w-max flex-1 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors motion-reduce:transition-none ${focusClass} ${category === option ? "border-primary bg-primary/15 text-foreground shadow-sm" : "border-transparent text-muted-foreground hover:border-primary/25 hover:bg-primary/10 hover:text-foreground"}`}>{option === "ALL" ? "All Updates" : newsCategoryLabels[option]}</button>)}
        </div>
        <div className="relative min-w-0 lg:w-80 lg:shrink-0">
          <label htmlFor={searchId} className="sr-only">Cari berita, hero, atau topik</label>
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-primary" />
          <input id={searchId} type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Cari berita, hero, atau topik..." className="h-13 w-full rounded-xl border border-primary/30 bg-card/95 pr-11 pl-12 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25" />
          {query && <button type="button" onClick={() => { setQuery(""); setPage(1); }} aria-label="Hapus pencarian" className={`absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground ${focusClass}`}><X aria-hidden="true" className="size-4" /></button>}
        </div>
      </div>

      {leadArticle ? (
        <>
          <section aria-label="Sorotan dan update terbaru" className={`grid items-stretch gap-4 ${recentArticles.length ? "lg:grid-cols-[minmax(0,2.4fr)_minmax(17rem,1fr)]" : ""}`}>
            <LeadStory article={leadArticle} />
            {recentArticles.length > 0 && (
              <aside aria-labelledby="news-recent-title" className="rounded-xl border border-primary/30 bg-card/95 p-4 shadow-[var(--hok-panel-shadow)]">
                <h2 id="news-recent-title" className="font-serif text-xl font-bold text-foreground sm:text-2xl">Update Terbaru</h2>
                <span aria-hidden="true" className="mt-1 mb-4 flex items-center gap-2 py-1 text-primary"><span className="h-px w-10 bg-current" /><span className="size-1.5 rotate-45 border border-current" /><span className="h-px flex-1 bg-linear-to-r from-primary/40 to-transparent" /></span>
                <div className="ml-1 space-y-4 border-l border-primary/30 pl-5">{recentArticles.map((article) => <RecentStory key={article.id} article={article} />)}</div>
              </aside>
            )}
          </section>

          {pageArticles.length > 0 && <div ref={archiveRef} id={gridId} role="region" aria-label="Daftar berita" className="grid scroll-mt-8 items-stretch gap-4 md:grid-cols-3">{pageArticles.map((article) => <ArticleCard key={article.id} article={article} />)}</div>}

          <div className="space-y-3 pt-1">
            {pageCount > 1 && (
              <nav aria-label="Halaman berita" className="flex flex-wrap items-center justify-center gap-2">
                <button type="button" aria-label="Halaman sebelumnya" aria-controls={gridId} disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} className={`inline-flex min-h-10 items-center justify-center gap-1 rounded-lg border border-primary/30 bg-card/95 px-3 text-sm text-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 ${focusClass}`}><ChevronLeft aria-hidden="true" className="size-4" /><span className="hidden sm:inline">Previous</span></button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} type="button" aria-label={`Halaman ${number}`} aria-current={currentPage === number ? "page" : undefined} aria-controls={gridId} onClick={() => changePage(number)} className={`size-10 rounded-lg border text-sm font-semibold ${focusClass} ${currentPage === number ? "border-primary bg-primary/15 text-foreground shadow-sm" : "border-primary/30 bg-card/95 text-muted-foreground hover:bg-accent hover:text-foreground"}`}>{number}</button>)}
                <button type="button" aria-label="Halaman berikutnya" aria-controls={gridId} disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)} className={`inline-flex min-h-10 items-center justify-center gap-1 rounded-lg border border-primary/30 bg-card/95 px-3 text-sm text-foreground hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 ${focusClass}`}><span className="hidden sm:inline">Next</span><ChevronRight aria-hidden="true" className="size-4" /></button>
              </nav>
            )}
            <p role="status" className="text-center text-xs text-muted-foreground">{filtered.length} berita{hasFilters ? " ditemukan" : " tersedia"}{pageCount > 1 ? ` - Halaman ${currentPage} dari ${pageCount}` : ""}{hasFilters && <button type="button" onClick={resetFilters} className={`ml-2 font-semibold text-primary underline underline-offset-4 ${focusClass}`}>Reset filter</button>}</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-primary/30 bg-card/95 px-6 py-16 text-center">
          <Newspaper aria-hidden="true" className="size-10 text-primary" />
          <h2 className="font-serif text-2xl font-bold text-foreground">Berita tidak ditemukan</h2>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">Coba kata pencarian atau kategori lain untuk menemukan berita yang kamu cari.</p>
          <button type="button" onClick={resetFilters} className={`mt-1 rounded-lg border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-primary/20 ${focusClass}`}>Tampilkan semua berita</button>
        </div>
      )}
    </div>
  );
}
