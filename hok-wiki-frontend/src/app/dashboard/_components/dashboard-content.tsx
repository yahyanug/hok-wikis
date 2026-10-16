"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactElement } from "react";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Newspaper, Pause, Play, ScrollText, Sparkles, Swords } from "lucide-react";

import { ContentArtwork } from "@/components/content/content-artwork";
import { ResourceDetailDialog } from "@/components/game-resources/resource-detail-dialog";
import { formatArticleDate, newsCategoryLabels, type DashboardData, type NewsArticle } from "@/lib/site-content";

type DashboardContentProps = {
  data: DashboardData;
  articles: NewsArticle[];
};

const updateCategoryPresentation = {
  HERO_UPDATES: { icon: Swords, className: "border-primary/25 bg-primary/10 text-primary" },
  SKINS: { icon: Sparkles, className: "border-chart-4/25 bg-chart-4/10 text-chart-4" },
  PATCH_NOTES: { icon: ScrollText, className: "border-chart-2/25 bg-chart-2/10 text-chart-2" },
  EVENTS: { icon: CalendarDays, className: "border-chart-5/25 bg-chart-5/10 text-chart-5" },
} satisfies Record<NewsArticle["category"], { icon: typeof Swords; className: string }>;

function subscribeReducedMotion(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function getVisible() {
  return document.visibilityState === "visible";
}

const getServerReducedMotion = () => true;
const getServerVisible = () => false;

function ArticleDialog({ article, trigger }: { article: NewsArticle; trigger: ReactElement }) {
  return (
    <ResourceDetailDialog name={article.title} description={article.excerpt} trigger={trigger}>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-primary">{newsCategoryLabels[article.category]}</span>
        <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
      </div>
      <ContentArtwork src={article.image} alt={article.title} className="aspect-video w-full rounded-xl border border-primary/20" />
      <div className="space-y-4 text-sm leading-7 text-card-foreground">
        {article.body.map((paragraph, index) => <p key={`${article.id}-${index}`}>{paragraph}</p>)}
      </div>
    </ResourceDetailDialog>
  );
}

export function DashboardContent({ data, articles }: DashboardContentProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion);
  const visible = useSyncExternalStore(subscribeVisibility, getVisible, getServerVisible);
  const artworkRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const idleAnimationRef = useRef<Animation | null>(null);
  const carouselId = useId();
  const activeIndex = data.slides.length > 0 ? slideIndex % data.slides.length : 0;
  const slide = data.slides[activeIndex];
  const slideArticle = slide ? articles.find((article) => article.slug === slide.articleSlug) : undefined;
  const [leadUpdate, ...remainingUpdates] = data.latestUpdates.slice(0, 5);
  const motionActive = !paused && !hovered && !focused && !reducedMotion && visible;
  const readButton = <button type="button" onClick={() => setPaused(true)} className="inline-flex items-center gap-3 rounded-xl border border-cyan-300/80 bg-cyan-400/15 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgb(34_211_238_/_0.2)] transition-colors hover:bg-cyan-400/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:transition-none">Baca update<ArrowRight aria-hidden="true" className="size-4" /></button>;

  useEffect(() => {
    if (reducedMotion || typeof Element.prototype.animate !== "function") return;
    const idle = artworkRef.current?.animate([{ transform: "scale(1)" }, { transform: "scale(1.045)" }], { duration: 9000, iterations: Infinity, direction: "alternate", easing: "ease-in-out" });
    const entrance = textRef.current?.animate([{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 650, easing: "cubic-bezier(0.22, 0.75, 0.25, 1)" });
    idleAnimationRef.current = idle ?? null;
    return () => {
      idle?.cancel();
      entrance?.cancel();
      idleAnimationRef.current = null;
    };
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    if (motionActive) idleAnimationRef.current?.play();
    else idleAnimationRef.current?.pause();
  }, [motionActive, activeIndex, reducedMotion]);

  useEffect(() => {
    if (!motionActive || data.slides.length < 2) return;
    const timer = window.setTimeout(() => setSlideIndex((current) => (current + 1) % data.slides.length), 7000);
    return () => window.clearTimeout(timer);
  }, [motionActive, activeIndex, data.slides.length]);

  function changeSlide(offset: number) {
    if (data.slides.length < 2) return;
    setSlideIndex((current) => (current + offset + data.slides.length) % data.slides.length);
  }

  return (
    <div className="@container/dashboard grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      {slide ? (
        <section aria-roledescription="karusel" aria-label="Sorotan HOK Wiki" onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }} className="relative isolate flex min-w-0 flex-col overflow-hidden rounded-2xl border border-primary/50 bg-card shadow-[var(--hok-panel-shadow)]">
          {data.slides.map((entry, index) => <div key={entry.id} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ opacity: index === activeIndex ? 1 : 0, transition: reducedMotion ? "none" : "opacity 700ms ease-in-out" }}><div ref={index === activeIndex ? artworkRef : undefined} className="h-full w-full"><ContentArtwork src={entry.image} alt="" priority={index === 0} className="h-full w-full" position="65% center" /></div></div>)}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-slate-950/95 via-slate-950/80 to-slate-950/25" />
          <div id={carouselId} aria-live={motionActive ? "off" : "polite"} aria-atomic="true" className="flex min-h-96 flex-1 flex-col justify-center px-6 py-14 sm:min-h-112 sm:px-16 lg:px-16 xl:px-20">
            <div ref={textRef} className="max-w-xl space-y-4">
              <p className="inline-flex rounded-full border border-cyan-300/60 bg-slate-950/70 px-3 py-1 text-xs font-semibold tracking-wider text-cyan-100 uppercase">{slide.label}</p>
              <h2 className="font-serif text-3xl font-bold leading-tight break-words text-white sm:text-4xl lg:text-5xl">{slide.title}</h2>
              <p className="max-w-md text-sm leading-7 text-slate-100 sm:text-base">{slide.description}</p>
              <div className="pt-1">{slideArticle ? <ArticleDialog article={slideArticle} trigger={readButton} /> : <Link href="/news" className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/80 bg-cyan-400/15 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-400/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">Jelajahi berita<ArrowRight aria-hidden="true" className="size-4" /></Link>}</div>
            </div>
          </div>
          {data.slides.length > 1 && (
            <>
              <div className="pointer-events-none absolute inset-x-3 top-1/2 hidden -translate-y-1/2 justify-between sm:flex">
                <button type="button" aria-label="Sorotan sebelumnya" aria-controls={carouselId} onClick={() => changeSlide(-1)} className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-primary/60 bg-card/90 text-primary shadow-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"><ChevronLeft aria-hidden="true" className="size-5" /></button>
                <button type="button" aria-label="Sorotan berikutnya" aria-controls={carouselId} onClick={() => changeSlide(1)} className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-primary/60 bg-card/90 text-primary shadow-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"><ChevronRight aria-hidden="true" className="size-5" /></button>
              </div>
              <div role="group" aria-label="Pilih sorotan" className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 px-3">
                {data.slides.map((entry, index) => <button key={entry.id} type="button" aria-label={`Sorotan ${index + 1}: ${entry.title}`} aria-pressed={index === activeIndex} aria-controls={carouselId} onClick={() => setSlideIndex(index)} className="flex size-7 items-center justify-center rounded-full bg-card/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"><span className={`h-2 rounded-full transition-all motion-reduce:transition-none ${index === activeIndex ? "w-5 bg-primary" : "w-2 bg-primary/40"}`} /></button>)}
                {!reducedMotion && <button type="button" aria-label={paused ? "Aktifkan pergantian sorotan otomatis" : "Jeda pergantian sorotan otomatis"} aria-pressed={paused} onClick={() => setPaused((current) => !current)} className="ml-2 inline-flex min-h-7 items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-card/90 px-2 text-xs text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{paused ? <Play aria-hidden="true" className="size-3" /> : <Pause aria-hidden="true" className="size-3" />}<span className="hidden sm:inline">{paused ? "Putar" : "Jeda"}</span></button>}
              </div>
            </>
          )}
        </section>
      ) : <div className="flex min-h-96 items-center justify-center rounded-2xl border border-primary/35 bg-card/95 p-8 text-center text-muted-foreground">Sorotan baru akan tampil di sini.</div>}

      <div className="flex min-w-0 flex-col gap-5">
        <Link href="/matchups" className="group relative isolate flex min-h-44 min-w-0 flex-col items-start gap-4 overflow-hidden rounded-2xl border border-primary/60 bg-card p-5 shadow-[var(--hok-panel-shadow)] transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none @md/dashboard:flex-row @md/dashboard:items-center sm:p-6">
          <div className="pointer-events-none absolute inset-0 -z-10"><ContentArtwork src={data.matchup.image} alt="" className="h-full w-full" position="75% 35%" /></div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-slate-950/95 via-slate-950/85 to-slate-950/55" />
          <Swords aria-hidden="true" className="hidden size-10 shrink-0 text-cyan-200 @md/dashboard:block" />
          <span className="w-full min-w-0 flex-1 border-l border-cyan-200/40 pl-4"><span className="block font-serif text-2xl font-bold leading-tight break-words text-white sm:text-3xl lg:text-2xl xl:text-3xl">{data.matchup.title}</span><span className="mt-2 line-clamp-2 text-sm leading-6 text-slate-100">{data.matchup.description}</span></span>
          <span className="inline-flex size-10 shrink-0 items-center justify-center self-end rounded-full border border-cyan-300 bg-slate-950/70 text-cyan-200 shadow-[0_0_20px_rgb(34_211_238_/_0.2)] @md/dashboard:self-auto"><ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" /></span>
        </Link>

        <section aria-labelledby="dashboard-updates-title" className="relative flex min-w-0 flex-1 flex-col gap-4 rounded-2xl border border-primary/35 bg-card/95 p-5 shadow-[var(--hok-panel-shadow)] sm:p-6">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary"><Newspaper aria-hidden="true" className="size-5" /></span>
            <h2 id="dashboard-updates-title" className="min-w-0 font-serif text-2xl font-bold text-foreground">Latest Updates</h2>
            <span aria-hidden="true" className="ml-auto hidden items-center gap-2 pl-2 sm:flex"><span className="h-px w-6 bg-primary/25" /><span className="size-1.5 rotate-45 border border-primary/60" /></span>
          </div>
          {leadUpdate ? (
            <div className="flex flex-1 flex-col gap-3">
              <ArticleDialog article={leadUpdate} trigger={
                <button type="button" aria-label={`Baca ${leadUpdate.title}`} onClick={() => setPaused(true)} className="group grid min-w-0 grid-cols-1 overflow-hidden rounded-xl border border-primary/30 bg-linear-to-br from-primary/10 via-secondary/35 to-card text-left transition-[border-color,box-shadow] duration-300 hover:border-primary/60 hover:shadow-[0_6px_24px_color-mix(in_srgb,var(--primary)_10%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none @md/dashboard:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
                  <span className="relative block min-h-44 overflow-hidden border-b border-primary/15 @md/dashboard:border-r @md/dashboard:border-b-0">
                    <span className="absolute inset-0 transition-transform duration-500 motion-safe:group-hover:scale-105 motion-reduce:transition-none"><ContentArtwork src={leadUpdate.image} alt="" className="h-full w-full" /></span>
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/30 to-transparent" />
                  </span>
                  <span className="flex min-w-0 flex-col items-start gap-2.5 p-4">
                    <span className={`inline-flex max-w-full rounded-md border px-2 py-1 text-[10px] font-semibold tracking-wider uppercase ${updateCategoryPresentation[leadUpdate.category].className}`}>{newsCategoryLabels[leadUpdate.category]}</span>
                    <span className="line-clamp-3 w-full font-serif text-xl font-semibold leading-6 break-words text-foreground transition-colors group-hover:text-primary motion-reduce:transition-none">{leadUpdate.title}</span>
                    <span className="line-clamp-2 text-xs leading-5 text-muted-foreground">{leadUpdate.excerpt}</span>
                    <span className="mt-auto flex w-full flex-wrap items-center justify-between gap-2 pt-1 text-xs text-muted-foreground"><time dateTime={leadUpdate.publishedAt}>{formatArticleDate(leadUpdate.publishedAt)}</time><ArrowRight aria-hidden="true" className="size-4 shrink-0 text-primary transition-transform motion-safe:group-hover:translate-x-1 motion-reduce:transition-none" /></span>
                  </span>
                </button>
              } />
              {remainingUpdates.length > 0 && (
                <div className="divide-y divide-primary/10">
                  {remainingUpdates.map((article) => {
                    const { icon: CategoryIcon, className: categoryClassName } = updateCategoryPresentation[article.category];

                    return (
                      <ArticleDialog key={article.id} article={article} trigger={
                        <button type="button" aria-label={`Baca ${article.title}`} onClick={() => setPaused(true)} className="group flex w-full min-w-0 items-center gap-3 rounded-lg px-2 py-3 text-left transition-colors hover:bg-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none">
                          {article.image.trim() ? <ContentArtwork src={article.image} alt="" className="size-8 shrink-0 rounded-lg border border-primary/20 @md/dashboard:size-12" /> : <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg border @md/dashboard:size-12 ${categoryClassName}`}><CategoryIcon aria-hidden="true" className="size-4 @md/dashboard:size-5" /></span>}
                          <span className="flex min-w-0 flex-1 flex-col gap-1">
                            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-4"><span className="font-medium text-primary">{newsCategoryLabels[article.category]}</span><span aria-hidden="true" className="size-0.5 rounded-full bg-muted-foreground/60" /><time dateTime={article.publishedAt} className="text-muted-foreground">{formatArticleDate(article.publishedAt)}</time></span>
                            <span className="line-clamp-2 text-sm font-semibold leading-5 break-words text-foreground transition-colors group-hover:text-primary motion-reduce:transition-none">{article.title}</span>
                          </span>
                          <ChevronRight aria-hidden="true" className="hidden size-4 shrink-0 text-primary/60 transition-[color,translate] group-hover:text-primary motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none @md/dashboard:block" />
                        </button>
                      } />
                    );
                  })}
                </div>
              )}
            </div>
          ) : <p className="py-6 text-sm text-muted-foreground">Belum ada kabar terbaru.</p>}
          <Link href="/news" className="group mt-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none">Lihat semua update<ArrowRight aria-hidden="true" className="size-4 transition-transform motion-safe:group-hover:translate-x-1 motion-reduce:transition-none" /></Link>
        </section>
      </div>
    </div>
  );
}
