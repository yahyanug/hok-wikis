"use client";

import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { Dialog } from "radix-ui";

const catalogGridClassName = "grid grid-cols-1 gap-3 min-[375px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:group-data-[open=true]/resource-catalog:grid-cols-3 2xl:group-data-[open=true]/resource-catalog:grid-cols-4";

type CatalogRecord = {
  id: string;
  name: string;
  description: string;
};

type CatalogSelection<T> = {
  selectedId: string | null;
  isOpen: boolean;
  panelId: string;
  gridClassName: string;
  select: (record: T, event: MouseEvent<HTMLButtonElement>) => void;
};

type ResourceCatalogPanelProps<T extends CatalogRecord> = {
  detailLabel: string;
  showHeaderDescription?: boolean;
  showHeaderSeparator?: boolean;
  children: (selection: CatalogSelection<T>) => ReactNode;
  renderDetails: (record: T) => ReactNode;
};

export function ResourceCatalogPanel<T extends CatalogRecord>({ detailLabel, showHeaderDescription = true, showHeaderSeparator = true, children, renderDetails }: ResourceCatalogPanelProps<T>) {
  const [selected, setSelected] = useState<T | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef(false);

  useEffect(() => {
    if (isOpen && selected && !window.matchMedia("(min-width: 1280px)").matches) {
      panelRef.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }, [isOpen, selected]);

  function select(record: T, event: MouseEvent<HTMLButtonElement>) {
    openerRef.current = event.currentTarget;
    setSelected(record);
    setIsOpen(true);
  }

  function changeOpen(open: boolean) {
    if (!open) {
      restoreFocusRef.current = Boolean(panelRef.current?.contains(document.activeElement));
    }
    setIsOpen(open);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={changeOpen} modal={false}>
      <div className="group/resource-catalog grid min-w-0 grid-cols-1 items-start gap-5 data-[open=true]:xl:grid-cols-[minmax(0,1fr)_minmax(19rem,22rem)]" data-open={isOpen}>
        <div className="min-w-0 group-data-[open=true]/resource-catalog:row-start-2 xl:col-start-1 xl:group-data-[open=true]/resource-catalog:row-start-1">
          {children({ selectedId: isOpen ? selected?.id ?? null : null, isOpen, panelId, gridClassName: catalogGridClassName, select })}
        </div>

        <Dialog.Content ref={panelRef} id={panelId} aria-describedby={showHeaderDescription ? `${panelId}-description` : undefined} className="relative row-start-1 flex min-w-0 max-h-[min(75dvh,44rem)] scroll-mt-4 flex-col overflow-hidden rounded-2xl border border-primary/40 bg-card text-card-foreground shadow-[var(--hok-panel-shadow)] outline-none duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-4 motion-reduce:animate-none xl:sticky xl:top-4 xl:col-start-2 xl:max-h-[calc(100dvh-2rem)]" onInteractOutside={(event) => event.preventDefault()} onCloseAutoFocus={(event) => {
          event.preventDefault();
          const activeElement = document.activeElement;
          if (restoreFocusRef.current && (activeElement === document.body || panelRef.current?.contains(activeElement)) && openerRef.current?.isConnected) {
            openerRef.current.focus();
          }
        }}>
          {selected && (
            <>
              <div className={`relative min-w-0 shrink-0 p-5 pr-16 ${showHeaderSeparator ? "border-b border-primary/25" : ""}`}>
                <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-primary uppercase">{detailLabel}</p>
                <Dialog.Title className="font-serif text-3xl font-bold leading-tight break-words text-foreground">{selected.name}</Dialog.Title>
                {showHeaderDescription && (
                  <Dialog.Description id={`${panelId}-description`} className="mt-3 text-sm leading-7 break-words text-muted-foreground">{selected.description}</Dialog.Description>
                )}
                <Dialog.Close aria-label={`Tutup ${detailLabel.toLowerCase()}`} className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full border border-primary/30 bg-background/60 text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none">
                  <X aria-hidden="true" className="size-4" />
                </Dialog.Close>
              </div>
              <div key={selected.id} tabIndex={0} role="region" aria-label={`Isi ${detailLabel.toLowerCase()}`} className="min-h-0 min-w-0 space-y-6 overflow-y-auto overscroll-contain p-5 break-words outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">{renderDetails(selected)}</div>
            </>
          )}
        </Dialog.Content>
      </div>
    </Dialog.Root>
  );
}
