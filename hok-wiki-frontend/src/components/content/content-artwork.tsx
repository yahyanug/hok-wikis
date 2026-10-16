"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useState } from "react";

type ContentArtworkProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  position?: string;
};

export function ContentArtwork({ src, alt, className = "aspect-video w-full", priority = false, position = "center" }: ContentArtworkProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasImage = Boolean(src.trim()) && failedSrc !== src;
  const initials = alt.trim().split(/\s+/).slice(0, 2).map((word) => word.charAt(0)).join("").toUpperCase();

  return (
    <span role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true} className={`relative block overflow-hidden bg-secondary ${className}`} style={{ position: "relative", display: "block" }}>
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-primary" style={{ background: "radial-gradient(ellipse at 20% 15%, color-mix(in srgb, var(--primary) 26%, transparent), transparent 65%), linear-gradient(135deg, var(--secondary), var(--background))" }}>
        <span className="absolute size-2/3 rotate-45 rounded-3xl border border-primary/15" />
        <span className="flex flex-col items-center gap-2 p-2 text-center">
          <Sparkles className="size-6 opacity-60" />
          <span className="font-serif text-2xl font-bold opacity-70">{initials || "HOK"}</span>
        </span>
      </span>
      {hasImage && <Image key={src} src={src} alt="" fill priority={priority} sizes="(max-width: 767px) 100vw, (max-width: 1279px) 70vw, 1100px" unoptimized={/^https?:\/\//i.test(src)} onError={() => setFailedSrc(src)} className="object-cover" style={{ objectPosition: position }} />}
    </span>
  );
}
