"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AlertCircle, Bug, CheckCircle2, FileCheck2, Lightbulb, LoaderCircle, Paperclip, Send, UploadCloud, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
const MAX_DETAIL_LENGTH = 2000;

const feedbackTypes = [
  { value: "SUGGESTION", label: "Saran", description: "Ide dan fitur baru untuk HOK Wiki.", icon: Lightbulb, color: "text-amber-500 dark:text-amber-300" },
  { value: "BUG_REPORT", label: "Laporkan Bug", description: "Laporkan error, bug, atau masalah teknis.", icon: Bug, color: "text-rose-500 dark:text-rose-400" },
  { value: "CONTENT_REPORT", label: "Koreksi Konten", description: "Informasi yang kurang tepat atau perlu diperbarui.", icon: FileCheck2, color: "text-violet-600 dark:text-violet-400" },
] as const;

type FeedbackType = (typeof feedbackTypes)[number]["value"];
type SubmissionStatus = { kind: "success" | "error"; message: string } | null;

const fieldClassName = "w-full rounded-md border border-primary/35 bg-background/55 px-3.5 py-2.5 text-sm text-foreground shadow-inner outline-none transition-colors placeholder:text-muted-foreground/85 hover:border-primary/55 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-60 motion-reduce:transition-none";

function encodeAttachment(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string" || !reader.result.includes(",")) {
        reject(new Error("Screenshot tidak dapat dibaca. Silakan pilih ulang file."));
        return;
      }
      resolve(reader.result.slice(reader.result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Screenshot tidak dapat dibaca. Silakan pilih ulang file."));
    reader.onabort = () => reject(new Error("Pembacaan screenshot dibatalkan."));
    reader.readAsDataURL(file);
  });
}

export function FeedbackForm() {
  const [type, setType] = useState<FeedbackType>("BUG_REPORT");
  const [detail, setDetail] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentError, setAttachmentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  function changeAttachment(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0] ?? null;
    setAttachmentError("");

    if (file && !["image/png", "image/jpeg"].includes(file.type)) {
      setAttachment(null);
      setAttachmentError("Pilih screenshot dalam format PNG atau JPG.");
      event.currentTarget.value = "";
      return;
    }

    if (file && file.size === 0) {
      setAttachment(null);
      setAttachmentError("Screenshot kosong. Silakan pilih file lain.");
      event.currentTarget.value = "";
      return;
    }

    if (file && file.size > MAX_ATTACHMENT_SIZE) {
      setAttachment(null);
      setAttachmentError("Ukuran screenshot maksimal 5 MB.");
      event.currentTarget.value = "";
      return;
    }

    setAttachment(file);
  }

  function removeAttachment() {
    setAttachment(null);
    setAttachmentError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestRef.current) return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    const title = String(fields.get("title") ?? "").trim();
    const pageUrl = String(fields.get("pageUrl") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();

    if (!title || !detail.trim()) {
      setStatus({ kind: "error", message: "Lengkapi judul dan detail masukan terlebih dahulu." });
      form.querySelector<HTMLInputElement | HTMLTextAreaElement>(!title ? "#feedback-title" : "#feedback-detail")?.focus();
      return;
    }

    if (pageUrl) {
      const hasInvalidCharacters = /[\s\\\u0000-\u001f\u007f]/.test(pageUrl);
      let validPage = !hasInvalidCharacters && pageUrl.startsWith("/") && !pageUrl.startsWith("//");
      if (!validPage && !hasInvalidCharacters) {
        try {
          validPage = /^https?:\/\//i.test(pageUrl) && ["http:", "https:"].includes(new URL(pageUrl).protocol);
        } catch {
          validPage = false;
        }
      }
      if (!validPage) {
        setStatus({ kind: "error", message: "Isi halaman terkait dengan path seperti /heroes atau tautan HTTP/HTTPS." });
        form.querySelector<HTMLInputElement>("#feedback-page")?.focus();
        return;
      }
    }

    if (attachmentError) return;

    const controller = new AbortController();
    requestRef.current = controller;
    setIsSubmitting(true);
    setStatus(null);

    try {
      const payload = {
        type,
        title,
        detail: detail.trim(),
        ...(pageUrl ? { pageUrl } : {}),
        ...(email ? { email } : {}),
        ...(attachment ? {
          attachment: {
            name: attachment.name,
            mimeType: attachment.type,
            size: attachment.size,
            data: await encodeAttachment(attachment),
          },
        } : {}),
      };

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result: unknown = await response.json().catch(() => null);
      const message = result && typeof result === "object" && "message" in result && typeof result.message === "string" ? result.message : null;

      if (!response.ok) throw new Error(message ?? "Masukan belum berhasil dikirim. Silakan coba lagi.");
      if (controller.signal.aborted) return;

      form.reset();
      setType("BUG_REPORT");
      setDetail("");
      removeAttachment();
      setStatus({ kind: "success", message: message ?? "Terima kasih! Masukanmu berhasil dikirim." });
    } catch (error) {
      if (controller.signal.aborted) return;
      setStatus({ kind: "error", message: error instanceof Error && error.message !== "Failed to fetch" ? error.message : "Koneksi bermasalah. Periksa koneksi internetmu lalu coba lagi." });
    } finally {
      if (!controller.signal.aborted) setIsSubmitting(false);
      if (requestRef.current === controller) requestRef.current = null;
    }
  }

  return (
    <section aria-labelledby="feedback-form-heading" className="min-w-0 rounded-xl border border-primary/35 bg-card/95 p-5 shadow-[var(--hok-panel-shadow)] sm:p-6">
      <h2 id="feedback-form-heading" className="font-serif text-2xl font-bold text-foreground sm:text-3xl">Kirim Masukan</h2>
      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">Tidak perlu login untuk mengirim masukan.</p>

      <form onSubmit={submitFeedback} aria-busy={isSubmitting} className="mt-5 space-y-4">
        <fieldset disabled={isSubmitting} className="min-w-0">
          <legend className="mb-2 text-sm font-semibold">Jenis masukan <span aria-hidden="true" className="text-rose-500">*</span></legend>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {feedbackTypes.map((option) => {
              const Icon = option.icon;
              return (
                <label key={option.value} className="relative cursor-pointer">
                  <input type="radio" name="type" value={option.value} checked={type === option.value} onChange={() => setType(option.value)} required className="peer sr-only" />
                  <span className="flex h-full min-h-24 items-start gap-3 rounded-lg border border-primary/30 bg-background/40 p-3 transition-colors hover:border-primary/65 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:shadow-[inset_0_0_18px_color-mix(in_srgb,var(--primary)_10%,transparent)] peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-card peer-disabled:cursor-wait peer-disabled:opacity-60 motion-reduce:transition-none dark:peer-checked:border-cyan-300 dark:peer-checked:ring-1 dark:peer-checked:ring-cyan-300/30">
                    <Icon aria-hidden="true" className={`mt-0.5 size-8 shrink-0 ${option.color}`} />
                    <span className="min-w-0 pr-2">
                      <span className="block text-xs font-semibold leading-5 text-foreground">{option.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">{option.description}</span>
                    </span>
                    <span aria-hidden="true" className={`absolute top-2.5 right-2.5 flex size-3.5 items-center justify-center rounded-full border ${type === option.value ? "border-primary bg-primary/15 dark:border-cyan-300" : "border-primary/60"}`}>
                      {type === option.value && <span className="size-1.5 rounded-full bg-primary dark:bg-cyan-200" />}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="feedback-title" className="mb-1.5 block text-sm font-semibold">Judul <span aria-hidden="true" className="text-rose-500">*</span></label>
          <input id="feedback-title" name="title" required maxLength={120} disabled={isSubmitting} placeholder="Ringkas masalah yang kamu temukan" className={fieldClassName} />
        </div>

        <div>
          <label htmlFor="feedback-detail" className="mb-1.5 block text-sm font-semibold">Detail <span aria-hidden="true" className="text-rose-500">*</span></label>
          <textarea id="feedback-detail" name="detail" required value={detail} onChange={(event) => setDetail(event.currentTarget.value)} maxLength={MAX_DETAIL_LENGTH} disabled={isSubmitting} rows={5} aria-describedby="feedback-detail-count" placeholder={"Apa yang terjadi?\nBagaimana cara mengulanginya?\nApa yang seharusnya terjadi?"} className={`${fieldClassName} block min-h-28 resize-y leading-6`} />
          <p id="feedback-detail-count" className="mt-1 text-right text-xs text-muted-foreground">{detail.length} / {MAX_DETAIL_LENGTH}</p>
        </div>

        <div>
          <label htmlFor="feedback-page" className="mb-1.5 block text-sm font-semibold">Halaman terkait <span className="font-normal text-muted-foreground">(opsional)</span></label>
          <input id="feedback-page" name="pageUrl" maxLength={2048} disabled={isSubmitting} placeholder="Contoh: /heroes atau tautan halaman" className={fieldClassName} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-sm font-semibold">Lampiran <span className="font-normal text-muted-foreground">(opsional)</span></p>
            <label htmlFor="feedback-attachment" className="flex min-h-20 cursor-pointer items-center justify-center gap-3 rounded-lg border border-dashed border-primary/50 bg-background/40 px-3 py-3 text-primary transition-colors hover:border-primary hover:bg-primary/5 focus-within:ring-2 focus-within:ring-ring motion-reduce:transition-none">
              <UploadCloud aria-hidden="true" className="size-8 shrink-0" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground">{attachment ? "Ganti screenshot" : "Tambah screenshot"}</span>
                <span id="feedback-attachment-help" className="mt-1 block text-xs text-muted-foreground">PNG, JPG · Maks. 5 MB</span>
              </span>
              <input ref={fileInputRef} id="feedback-attachment" name="attachment" type="file" accept="image/png,image/jpeg" onChange={changeAttachment} disabled={isSubmitting} aria-describedby={attachmentError ? "feedback-attachment-help feedback-attachment-error" : "feedback-attachment-help"} aria-invalid={Boolean(attachmentError)} className="sr-only" />
            </label>
            {attachment && (
              <div className="mt-2 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                <Paperclip aria-hidden="true" className="size-3.5 shrink-0" />
                <span className="truncate" title={attachment.name}>{attachment.name}</span>
                <button type="button" onClick={removeAttachment} disabled={isSubmitting} aria-label="Hapus screenshot" className="ml-auto shrink-0 rounded-sm p-1 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50"><X aria-hidden="true" className="size-3.5" /></button>
              </div>
            )}
            {attachmentError && (
              <div className="mt-2 space-y-1 text-xs">
                <p id="feedback-attachment-error" role="alert" className="text-destructive">{attachmentError}</p>
                <button type="button" onClick={removeAttachment} disabled={isSubmitting} className="rounded-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50">Batalkan lampiran</button>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="feedback-email" className="mb-1.5 block text-sm font-semibold">Email <span className="font-normal text-muted-foreground">(opsional)</span></label>
            <input id="feedback-email" name="email" type="email" autoComplete="email" maxLength={254} disabled={isSubmitting} aria-describedby="feedback-email-help" placeholder="nama@email.com" className={fieldClassName} />
            <p id="feedback-email-help" className="mt-1.5 text-xs leading-5 text-muted-foreground">Isi jika ingin dihubungi terkait masukanmu.</p>
          </div>
        </div>

        {status && (
          <div role={status.kind === "error" ? "alert" : "status"} className={`flex items-start gap-2.5 rounded-lg border p-3 text-sm leading-6 ${status.kind === "error" ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-primary/40 bg-primary/10 text-foreground"}`}>
            {status.kind === "error" ? <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0" /> : <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />}
            <p>{status.message}</p>
          </div>
        )}

        <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:gap-5">
          <Button type="submit" variant="outline" disabled={isSubmitting} className="h-11 w-full gap-2 rounded-lg border-primary bg-linear-to-r from-primary/20 to-primary/5 px-5 text-sm tracking-normal text-foreground normal-case shadow-md shadow-primary/15 hover:bg-primary/15 sm:w-auto dark:border-cyan-300 dark:shadow-cyan-400/15">
            {isSubmitting ? <LoaderCircle aria-hidden="true" className="size-5! animate-spin text-primary motion-reduce:animate-none" /> : <Send aria-hidden="true" className="size-5! text-primary" />}
            <span className="border-l border-primary/40 pl-2.5">{isSubmitting ? "Mengirim..." : "Kirim Masukan"}</span>
          </Button>
          <p className="text-xs leading-5 text-muted-foreground">Hindari mengirim password atau data pribadi.</p>
        </div>
      </form>
    </section>
  );
}
