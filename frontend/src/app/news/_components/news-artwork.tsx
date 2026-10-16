"use client";

import Image from "next/image";
import { useState } from "react";

import type { NewsArticle, NewsCategory } from "@/lib/site-content";

type NewsArtworkProps = {
  article: Pick<NewsArticle, "image" | "category" | "title">;
  className?: string;
  priority?: boolean;
};

const categoryArtwork: Record<NewsCategory, {
  background: string;
  aura: string;
  tone: string;
  images: [string, string, string];
}> = {
  HERO_UPDATES: {
    background: "from-sky-200/65 via-secondary to-card dark:from-sky-950 dark:via-secondary dark:to-card",
    aura: "bg-sky-400/30 dark:bg-sky-400/20",
    tone: "text-sky-600/50 dark:text-sky-300/60",
    images: ["/images/items/master-sword.png", "/images/arcana/mutation.png", "/images/spells/flash.jpg"],
  },
  SKINS: {
    background: "from-violet-200/65 via-secondary to-card dark:from-violet-950/80 dark:via-secondary dark:to-card",
    aura: "bg-violet-400/30 dark:bg-violet-400/20",
    tone: "text-violet-600/45 dark:text-violet-300/60",
    images: ["/images/items/splendor.png", "/images/arcana/nightmare.png", "/images/items/plume-of-enchantment.png"],
  },
  PATCH_NOTES: {
    background: "from-cyan-200/65 via-secondary to-card dark:from-cyan-950 dark:via-secondary dark:to-card",
    aura: "bg-cyan-400/25 dark:bg-cyan-400/20",
    tone: "text-cyan-700/45 dark:text-cyan-300/55",
    images: ["/images/items/spell-tome.png", "/images/arcana/mind-s-eye.png", "/images/items/void-staff.png"],
  },
  EVENTS: {
    background: "from-amber-100/80 via-secondary to-card dark:from-amber-950/60 dark:via-secondary dark:to-card",
    aura: "bg-amber-400/25 dark:bg-amber-300/15",
    tone: "text-amber-700/45 dark:text-amber-200/55",
    images: ["/images/arcana/fate.png", "/images/spells/teleport.webp", "/images/arcana/avarice.png"],
  },
};

export function NewsArtwork({ article, className = "aspect-[16/10] w-full", priority = false }: NewsArtworkProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = article.image.trim();
  const hasImage = Boolean(imageSrc) && failedSrc !== imageSrc;
  const artwork = categoryArtwork[article.category];

  return (
    <span aria-hidden="true" className={`relative isolate block overflow-hidden bg-secondary ${className}`}>
      {hasImage ? (
        <Image key={imageSrc} src={imageSrc} alt="" fill priority={priority} sizes="(max-width: 640px) 100vw, (max-width: 1279px) 60vw, 55vw" unoptimized={/^https?:\/\//i.test(imageSrc)} onError={() => setFailedSrc(imageSrc)} className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none" />
      ) : (
        <>
          <span className={`absolute inset-0 bg-linear-to-br ${artwork.background}`} />
          <span className={`absolute top-1/2 left-1/2 aspect-square w-3/4 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${artwork.aura}`} />
          <span className="absolute inset-0 text-primary/10 dark:text-primary/15" style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "radial-gradient(ellipse at center, black, transparent 78%)" }} />

          <span className={`absolute top-1/2 left-1/2 aspect-square h-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-current ${artwork.tone}`}>
            <span className="absolute inset-[9%] rounded-full border border-dashed border-current opacity-50" />
            <span className="absolute inset-[21%] rotate-45 rounded-[12%] border border-current bg-primary/5" />
            <span className="absolute top-1/2 -left-[5%] aspect-square w-[10%] -translate-y-1/2 rotate-45 border border-current bg-card/90" />
            <span className="absolute top-1/2 -right-[5%] aspect-square w-[10%] -translate-y-1/2 rotate-45 border border-current bg-card/90" />
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-current shadow-[0_0_14px_currentColor]" />
            <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-current shadow-[0_0_14px_currentColor]" />
          </span>

          <span className="absolute top-1/2 left-1/2 aspect-square w-[35%] max-w-36 -translate-x-1/2 -translate-y-1/2 rounded-[24%] border border-primary/40 bg-card/85 shadow-[0_12px_50px_color-mix(in_srgb,var(--primary)_20%,transparent)] transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100 motion-reduce:transition-none">
            <span className="absolute -inset-2 -z-10 rotate-12 rounded-[24%] border border-primary/20 bg-primary/5" />
            <Image src={artwork.images[0]} alt="" fill priority={priority} sizes="144px" className="object-contain p-2 sm:p-3" />
          </span>

          <span className="absolute top-[27%] left-[14%] aspect-square w-[20%] max-w-20 -rotate-12 rounded-[22%] border border-primary/35 bg-card/80 shadow-lg transition-transform duration-700 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 motion-reduce:transition-none">
            <Image src={artwork.images[1]} alt="" fill sizes="80px" className="object-contain p-1.5" />
          </span>
          <span className="absolute right-[13%] bottom-[22%] aspect-square w-[20%] max-w-20 rotate-12 rounded-[22%] border border-primary/35 bg-card/80 shadow-lg transition-transform duration-700 group-hover:translate-y-1 motion-reduce:group-hover:translate-y-0 motion-reduce:transition-none">
            <Image src={artwork.images[2]} alt="" fill sizes="80px" className="rounded-[22%] object-contain p-1.5" />
          </span>

          <span className="absolute top-[18%] right-[23%] size-1.5 rotate-45 bg-primary/70 shadow-[0_0_14px_var(--primary)]" />
          <span className="absolute bottom-[17%] left-[25%] size-1 rotate-45 bg-primary/65 shadow-[0_0_12px_var(--primary)]" />
          <span className="absolute top-[42%] right-[9%] size-1 rounded-full bg-primary/50" />
          <span className="absolute bottom-[24%] left-[8%] size-1 rounded-full bg-primary/45" />
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-card/30 to-transparent" />
        </>
      )}
    </span>
  );
}
