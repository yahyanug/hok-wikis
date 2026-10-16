import Link from "next/link";
import { Home } from "lucide-react";
import type { ReactNode } from "react";

import { floatingContentClassName } from "@/components/layout/floating-content";

import { ViewportPageFrame } from "./viewport-page-frame";

type ContentPageShellProps = {
  title: string;
  breadcrumb?: string;
  description?: string;
  sample?: boolean;
  fitViewport?: boolean;
  avoidFloating?: boolean;
  children: ReactNode;
};

export function ContentPageShell({
  title,
  breadcrumb,
  description,
  sample = false,
  fitViewport = false,
  avoidFloating = false,
  children,
}: ContentPageShellProps) {
  const Frame = fitViewport ? ViewportPageFrame : "div";

  return (
    <Frame
      className={`group/content-shell w-full px-4 text-foreground sm:px-8 lg:px-12 ${fitViewport ? "flex min-h-0 flex-col py-3 data-[fit-density=tight]:py-2" : "pt-7 pb-14"} ${avoidFloating ? floatingContentClassName : ""}`}
    >
      <header
        className={
          fitViewport
            ? "mb-3 shrink-0 group-data-[fit-density=tight]/content-shell:mb-2"
            : "mb-7"
        }
      >
        <h1
          className={`text-center font-serif font-bold leading-tight tracking-tight text-foreground dark:drop-shadow-[0_0_14px_rgb(78_191_255_/_0.25)] ${fitViewport ? "text-3xl sm:text-4xl group-data-[fit-density=tight]/content-shell:text-2xl" : "text-4xl sm:text-5xl lg:text-6xl"}`}
        >
          {title}
        </h1>
        <div
          aria-hidden="true"
          className={`mx-auto flex w-full max-w-lg items-center gap-3 px-3 text-primary dark:text-cyan-300 ${fitViewport ? "mt-1.5 py-1.5 group-data-[fit-density=tight]/content-shell:mt-1 group-data-[fit-density=tight]/content-shell:py-1" : "mt-3 py-2"}`}
        >
          <span
            className="h-px min-w-0 flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, currentColor)",
            }}
          />
          <span className="size-2.5 shrink-0 rotate-45 border-2 border-current shadow-[0_0_8px_currentColor]" />
          <span
            className="h-px min-w-0 flex-1"
            style={{
              background: "linear-gradient(to left, transparent, currentColor)",
            }}
          />
        </div>
        {description && (
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm leading-7 text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
        {sample && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Konten contoh
          </p>
        )}
      </header>
      {children}
    </Frame>
  );
}
