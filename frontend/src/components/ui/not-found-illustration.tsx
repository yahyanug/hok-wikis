import Image from "next/image";

import doliaNotFound from "../../../public/images/dolia-404-not-found.png";
import { cn } from "@/lib/utils";

type NotFoundIllustrationProps = {
  alt: string;
  className?: string;
  sizes?: string;
};

export function NotFoundIllustration({
  alt,
  className,
  sizes = "(max-width: 639px) 320px, 448px",
}: NotFoundIllustrationProps) {
  return (
    <Image
      src={doliaNotFound}
      alt={alt}
      sizes={sizes}
      className={cn("h-auto w-full rounded-xl object-contain", className)}
    />
  );
}
