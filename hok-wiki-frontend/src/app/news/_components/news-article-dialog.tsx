"use client";

import type { ReactElement } from "react";
import { CalendarDays, X } from "lucide-react";
import { Dialog } from "radix-ui";

import { formatArticleDate, newsCategoryLabels, type NewsArticle } from "@/lib/site-content";

import { NewsArtwork } from "./news-artwork";

type NewsArticleDialogProps = {
  article: NewsArticle;
  trigger: ReactElement;
};

export function NewsArticleDialog({ article, trigger }: NewsArticleDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 backdrop-blur-sm duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none" style={{ position: "fixed", inset: 0, zIndex: 60 }} />
        <Dialog.Content className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-primary/30 bg-card text-card-foreground shadow-2xl outline-none duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:animate-none" style={{ position: "fixed", top: "50%", left: "50%", translate: "-50% -50%", zIndex: 61, width: "calc(100vw - 2rem)", maxWidth: "56rem", maxHeight: "calc(100dvh - 2rem)" }}>
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-primary/20 px-5 py-3 sm:px-8">
            <span className="text-xs font-semibold tracking-wide text-muted-foreground sm:text-sm">HOK Wiki / News &amp; Updates</span>
            <Dialog.Close aria-label="Tutup artikel" className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-background/50 text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none">
              <X aria-hidden="true" className="size-5" />
            </Dialog.Close>
          </div>

          <div tabIndex={0} role="region" aria-label="Isi artikel" className="min-h-0 overflow-y-auto overscroll-contain px-5 py-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-8 sm:py-8">
            <article className="mx-auto max-w-3xl space-y-6 sm:space-y-8">
              <header className="space-y-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-semibold text-primary">{newsCategoryLabels[article.category]}</span>
                  <span className="inline-flex items-center gap-2 text-muted-foreground"><CalendarDays aria-hidden="true" className="size-4 shrink-0" /><time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time></span>
                </div>
                <Dialog.Title className="font-serif text-3xl font-bold leading-tight break-words text-foreground sm:text-4xl lg:text-[2.5rem]">{article.title}</Dialog.Title>
                <Dialog.Description className="text-base leading-7 break-words text-muted-foreground sm:text-lg sm:leading-8">{article.excerpt}</Dialog.Description>
              </header>

              <NewsArtwork article={article} className="aspect-[16/9] w-full rounded-xl border border-primary/20 sm:aspect-[16/8]" />

              <div className="space-y-5 border-t border-primary/15 pt-6 text-base leading-8 break-words text-card-foreground sm:space-y-6 sm:pt-8 sm:text-lg">
                {article.body.map((paragraph, index) => <p key={`${article.id}-${index}`}>{paragraph}</p>)}
              </div>
            </article>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
