import type { ReactNode } from "react";

import { floatingContentClassName } from "@/components/layout/floating-content";

type ResourcePageHeaderProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function ResourcePageHeader({
  title,
  description,
  children,
}: ResourcePageHeaderProps) {
  return (
    <div className={`${floatingContentClassName} w-full px-4 pt-7 pb-14 text-foreground sm:px-8 lg:px-12`}>
      <header className="mb-7">
        <h1 className="text-center font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl dark:drop-shadow-[0_0_14px_rgb(78_191_255_/_0.25)]">
          {title}
        </h1>
        <div
          aria-hidden="true"
          className="mx-auto mt-3 flex w-full max-w-lg items-center gap-3 px-3 py-2 text-primary dark:text-cyan-300"
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
      </header>

      {children}
    </div>
  );
}
