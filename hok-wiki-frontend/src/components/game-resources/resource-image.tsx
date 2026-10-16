"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useState } from "react";

type ResourceImageProps = {
  src: string;
  name: string;
  className?: string;
};

export function ResourceImage({ src, name, className = "size-20" }: ResourceImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const hasImage = Boolean(src.trim()) && failedSrc !== src;

  return (
    <span aria-hidden="true" title={name} className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-primary/30 bg-background/55 ${className}`} style={{ aspectRatio: "1 / 1", flexShrink: 0 }}>
      {hasImage ? (
        <Image key={src} src={src} alt="" fill sizes="(max-width: 640px) 96px, 144px" unoptimized={/^https?:\/\//i.test(src)} onError={() => setFailedSrc(src)} className="object-contain p-1" />
      ) : (
        <Sparkles className="size-9 text-primary/60" />
      )}
    </span>
  );
}
