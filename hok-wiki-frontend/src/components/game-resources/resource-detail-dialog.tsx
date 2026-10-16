"use client";

import type { ReactElement, ReactNode } from "react";
import { X } from "lucide-react";
import { Dialog } from "radix-ui";

type ResourceDetailDialogProps = {
  name: string;
  description: string;
  trigger: ReactElement;
  children: ReactNode;
};

export function ResourceDetailDialog({ name, description, trigger, children }: ResourceDetailDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:animate-none" style={{ position: "fixed", inset: 0, zIndex: 60 }} />
        <Dialog.Content className="rounded-2xl border border-primary/35 bg-card text-card-foreground shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:animate-none" style={{ position: "fixed", top: "50%", left: "50%", translate: "-50% -50%", zIndex: 61, width: "calc(100vw - 2rem)", maxWidth: "40rem", maxHeight: "calc(100dvh - 2rem)", overflowY: "auto", overscrollBehavior: "contain" }}>
          <div className="relative space-y-3 p-6 pr-16">
            <Dialog.Title className="font-serif text-3xl font-bold leading-tight text-foreground">{name}</Dialog.Title>
            <Dialog.Description className="text-sm leading-7 text-muted-foreground">{description}</Dialog.Description>
          </div>
          <div className="space-y-5 px-6 pb-6">{children}</div>
          <Dialog.Close aria-label={`Tutup detail ${name}`} className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full border border-primary/30 bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <X aria-hidden="true" className="size-4" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
