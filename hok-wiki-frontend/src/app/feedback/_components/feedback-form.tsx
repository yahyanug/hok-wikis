"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  AlertCircle,
  Bug,
  CheckCircle2,
  FileCheck2,
  Lightbulb,
  LoaderCircle,
  Paperclip,
  Send,
  UploadCloud,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
const MAX_DETAIL_LENGTH = 2000;

const feedbackTypes = [
  {
    value: "SUGGESTION",
    label: "Saran",
    description: "Ide dan fitur baru untuk HOK Wiki.",
    icon: Lightbulb,
    color: "text-amber-500 dark:text-amber-300",
  },
  {
    value: "BUG_REPORT",
    label: "Laporkan Bug",
    description: "Laporkan error, bug, atau masalah teknis.",
    icon: Bug,
    color: "text-rose-500 dark:text-rose-400",
  },
  {
    value: "CONTENT_REPORT",
    label: "Koreksi Konten",
    description: "Informasi yang kurang tepat atau perlu diperbarui.",
    icon: FileCheck2,
    color: "text-violet-600 dark:text-violet-400",
  },
] as const;

type FeedbackType = (typeof feedbackTypes)[number]["value"];

type FeedbackCopy = {
  heading: string;
  titleLabel: string;
  titlePlaceholder: string;
  detailLabel: string;
  detailPlaceholder: string;
  pageLabel: string;
  pagePlaceholder: string;
  attachmentLabel: string;
  addAttachment: string;
  changeAttachment: string;
  emailHelp: string;
  submitLabel: string;
  submittingLabel: string;
  requiredMessage: string;
  successMessage: string;
  guideHeading: string;
  tips: { title: string; description: string }[];
};

const feedbackCopy = {
  SUGGESTION: {
    heading: "Kirim Saran",
    titleLabel: "Judul saran",
    titlePlaceholder: "Contoh: Tambahkan filter tingkat kesulitan hero",
    detailLabel: "Detail saran",
    detailPlaceholder:
      "Ide atau fitur apa yang kamu usulkan?\nMengapa ini bermanfaat?\nBagaimana kamu ingin fitur ini bekerja?",
    pageLabel: "Halaman terkait saran",
    pagePlaceholder: "Contoh: /heroes, jika saran terkait halaman tertentu",
    attachmentLabel: "Referensi gambar",
    addAttachment: "Tambah referensi",
    changeAttachment: "Ganti referensi",
    emailHelp: "Isi jika ingin dihubungi untuk membahas saranmu.",
    submitLabel: "Kirim Saran",
    submittingLabel: "Mengirim saran...",
    requiredMessage: "Lengkapi judul dan detail saran terlebih dahulu.",
    successMessage: "Terima kasih! Saranmu berhasil dikirim.",
    guideHeading: "Bantu kami memahami idemu",
    tips: [
      {
        title: "Jelaskan ide yang kamu usulkan",
        description:
          "Ceritakan fitur baru atau bagian HOK Wiki yang ingin kamu tingkatkan.",
      },
      {
        title: "Ceritakan manfaatnya",
        description:
          "Jelaskan siapa yang terbantu dan bagaimana idemu membuat HOK Wiki lebih berguna.",
      },
      {
        title: "Tambahkan contoh atau referensi",
        description:
          "Sertakan gambaran penggunaan atau gambar referensi jika ada.",
      },
    ],
  },
  BUG_REPORT: {
    heading: "Kirim Laporan Bug",
    titleLabel: "Judul laporan bug",
    titlePlaceholder: "Contoh: Filter lane tidak menampilkan hero yang sesuai",
    detailLabel: "Detail bug",
    detailPlaceholder:
      "Apa yang terjadi?\nBagaimana cara mengulanginya?\nApa yang seharusnya terjadi?",
    pageLabel: "Halaman yang mengalami bug",
    pagePlaceholder: "Contoh: /heroes atau tautan halaman yang bermasalah",
    attachmentLabel: "Screenshot bug",
    addAttachment: "Tambah screenshot",
    changeAttachment: "Ganti screenshot",
    emailHelp: "Isi jika ingin dihubungi untuk menelusuri bug ini.",
    submitLabel: "Kirim Laporan Bug",
    submittingLabel: "Mengirim laporan bug...",
    requiredMessage: "Lengkapi judul dan detail bug terlebih dahulu.",
    successMessage: "Terima kasih! Laporan bugmu berhasil dikirim.",
    guideHeading: "Bantu kami memahami masalahnya",
    tips: [
      {
        title: "Jelaskan masalah secara spesifik",
        description:
          "Sebutkan apa yang terjadi, halaman yang bermasalah, serta browser atau perangkat yang kamu gunakan.",
      },
      {
        title: "Sertakan langkah untuk mengulanginya",
        description:
          "Tuliskan urutan langkah, hasil yang muncul, dan hasil yang seharusnya terjadi.",
      },
      {
        title: "Tambahkan screenshot jika diperlukan",
        description:
          "Tampilkan pesan error atau bagian yang bermasalah agar kami lebih mudah menelusurinya.",
      },
    ],
  },
  CONTENT_REPORT: {
    heading: "Kirim Koreksi Konten",
    titleLabel: "Judul koreksi",
    titlePlaceholder: "Contoh: Deskripsi skill hero belum sesuai patch terbaru",
    detailLabel: "Detail koreksi",
    detailPlaceholder:
      "Informasi mana yang kurang tepat?\nApa informasi yang seharusnya ditampilkan?\nSertakan sumber atau patch yang mendukung koreksimu.",
    pageLabel: "Halaman yang perlu dikoreksi",
    pagePlaceholder: "Contoh: /heroes/ying atau tautan konten terkait",
    attachmentLabel: "Bukti atau referensi",
    addAttachment: "Tambah gambar referensi",
    changeAttachment: "Ganti gambar referensi",
    emailHelp: "Isi jika ingin dihubungi untuk mengonfirmasi koreksimu.",
    submitLabel: "Kirim Koreksi Konten",
    submittingLabel: "Mengirim koreksi...",
    requiredMessage: "Lengkapi judul dan detail koreksi terlebih dahulu.",
    successMessage: "Terima kasih! Koreksi kontenmu berhasil dikirim.",
    guideHeading: "Bantu kami memperbaiki informasinya",
    tips: [
      {
        title: "Tunjukkan bagian yang perlu dikoreksi",
        description:
          "Cantumkan halaman dan informasi yang kurang tepat, tidak lengkap, atau sudah berubah.",
      },
      {
        title: "Tuliskan informasi yang benar",
        description:
          "Jelaskan koreksi yang kamu usulkan dan sertakan angka atau rincian yang relevan.",
      },
      {
        title: "Sertakan sumber pendukung",
        description:
          "Tambahkan tautan sumber resmi, catatan patch, atau gambar referensi agar koreksi dapat diperiksa.",
      },
    ],
  },
} satisfies Record<FeedbackType, FeedbackCopy>;
type SubmissionStatus = { kind: "success" | "error"; message: string } | null;

const fieldClassName =
  "w-full rounded-md border border-primary/35 bg-background/55 px-3.5 py-2.5 text-sm text-foreground shadow-inner outline-none transition-colors placeholder:text-muted-foreground/85 hover:border-primary/55 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-60 motion-reduce:transition-none";

function encodeAttachment(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string" || !reader.result.includes(",")) {
        reject(
          new Error("Gambar tidak dapat dibaca. Silakan pilih ulang file."),
        );
        return;
      }
      resolve(reader.result.slice(reader.result.indexOf(",") + 1));
    };
    reader.onerror = () =>
      reject(new Error("Gambar tidak dapat dibaca. Silakan pilih ulang file."));
    reader.onabort = () => reject(new Error("Pembacaan gambar dibatalkan."));
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
  const copy = feedbackCopy[type];

  useEffect(() => () => requestRef.current?.abort(), []);

  function changeAttachment(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0] ?? null;
    setAttachmentError("");

    if (file && !["image/png", "image/jpeg"].includes(file.type)) {
      setAttachment(null);
      setAttachmentError("Pilih gambar dalam format PNG atau JPG.");
      event.currentTarget.value = "";
      return;
    }

    if (file && file.size === 0) {
      setAttachment(null);
      setAttachmentError("Gambar kosong. Silakan pilih file lain.");
      event.currentTarget.value = "";
      return;
    }

    if (file && file.size > MAX_ATTACHMENT_SIZE) {
      setAttachment(null);
      setAttachmentError("Ukuran gambar maksimal 5 MB.");
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
      setStatus({ kind: "error", message: copy.requiredMessage });
      form
        .querySelector<
          HTMLInputElement | HTMLTextAreaElement
        >(!title ? "#feedback-title" : "#feedback-detail")
        ?.focus();
      return;
    }

    if (pageUrl) {
      const hasInvalidCharacters = /[\s\\\u0000-\u001f\u007f]/.test(pageUrl);
      let validPage =
        !hasInvalidCharacters &&
        pageUrl.startsWith("/") &&
        !pageUrl.startsWith("//");
      if (!validPage && !hasInvalidCharacters) {
        try {
          validPage =
            /^https?:\/\//i.test(pageUrl) &&
            ["http:", "https:"].includes(new URL(pageUrl).protocol);
        } catch {
          validPage = false;
        }
      }
      if (!validPage) {
        setStatus({
          kind: "error",
          message:
            "Isi halaman terkait dengan path seperti /heroes atau tautan HTTP/HTTPS.",
        });
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
        ...(attachment
          ? {
              attachment: {
                name: attachment.name,
                mimeType: attachment.type,
                size: attachment.size,
                data: await encodeAttachment(attachment),
              },
            }
          : {}),
      };

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result: unknown = await response.json().catch(() => null);
      const message =
        result &&
        typeof result === "object" &&
        "message" in result &&
        typeof result.message === "string"
          ? result.message
          : null;

      if (!response.ok)
        throw new Error(
          message ?? "Masukan belum berhasil dikirim. Silakan coba lagi.",
        );
      if (controller.signal.aborted) return;

      form.reset();
      setDetail("");
      removeAttachment();
      setStatus({ kind: "success", message: message ?? copy.successMessage });
    } catch (error) {
      if (controller.signal.aborted) return;
      setStatus({
        kind: "error",
        message:
          error instanceof Error && error.message !== "Failed to fetch"
            ? error.message
            : "Koneksi bermasalah. Periksa koneksi internetmu lalu coba lagi.",
      });
    } finally {
      if (!controller.signal.aborted) setIsSubmitting(false);
      if (requestRef.current === controller) requestRef.current = null;
    }
  }

  return (
    <div
      className="flex flex-wrap items-start gap-5"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: "1.25rem",
      }}
    >
      <section
        aria-labelledby="feedback-form-heading"
        className="rounded-xl border border-primary/35 bg-card/95 p-5 shadow-[var(--hok-panel-shadow)] sm:p-6"
        style={{ flex: "2 1 0", minWidth: "min(100%, 32rem)" }}
      >
        <h2
          id="feedback-form-heading"
          className="text-center font-serif text-2xl font-bold text-foreground sm:text-3xl"
        >
          {copy.heading}
        </h2>

        <form
          onSubmit={submitFeedback}
          aria-busy={isSubmitting}
          className="mt-5 space-y-4"
        >
          <fieldset disabled={isSubmitting} className="min-w-0">
            <legend className="mb-2 text-sm font-semibold">
              Jenis masukan{" "}
              <span aria-hidden="true" className="text-rose-500">
                *
              </span>
            </legend>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {feedbackTypes.map((option) => {
                const Icon = option.icon;
                return (
                  <label key={option.value} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value={option.value}
                      checked={type === option.value}
                      onChange={() => {
                        setType(option.value);
                        setStatus(null);
                      }}
                      required
                      className="peer sr-only"
                    />
                    <span className="flex h-full min-h-24 items-start gap-3 rounded-lg border border-primary/30 bg-background/40 p-3 transition-colors hover:border-primary/65 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:shadow-[inset_0_0_18px_color-mix(in_srgb,var(--primary)_10%,transparent)] peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-card peer-disabled:cursor-wait peer-disabled:opacity-60 motion-reduce:transition-none dark:peer-checked:border-cyan-300 dark:peer-checked:ring-1 dark:peer-checked:ring-cyan-300/30">
                      <Icon
                        aria-hidden="true"
                        className={`mt-0.5 size-8 shrink-0 ${option.color}`}
                      />
                      <span className="min-w-0 pr-2">
                        <span className="block text-xs font-semibold leading-5 text-foreground">
                          {option.label}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                          {option.description}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`absolute top-2.5 right-2.5 flex size-3.5 items-center justify-center rounded-full border ${type === option.value ? "border-primary bg-primary/15 dark:border-cyan-300" : "border-primary/60"}`}
                      >
                        {type === option.value && (
                          <span className="size-1.5 rounded-full bg-primary dark:bg-cyan-200" />
                        )}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="feedback-title"
              className="mb-1.5 block text-sm font-semibold"
            >
              {copy.titleLabel}{" "}
              <span aria-hidden="true" className="text-rose-500">
                *
              </span>
            </label>
            <input
              id="feedback-title"
              name="title"
              required
              maxLength={120}
              disabled={isSubmitting}
              placeholder={copy.titlePlaceholder}
              className={fieldClassName}
            />
          </div>

          <div>
            <label
              htmlFor="feedback-detail"
              className="mb-1.5 block text-sm font-semibold"
            >
              {copy.detailLabel}{" "}
              <span aria-hidden="true" className="text-rose-500">
                *
              </span>
            </label>
            <textarea
              id="feedback-detail"
              name="detail"
              required
              value={detail}
              onChange={(event) => setDetail(event.currentTarget.value)}
              maxLength={MAX_DETAIL_LENGTH}
              disabled={isSubmitting}
              rows={5}
              aria-describedby="feedback-detail-count"
              placeholder={copy.detailPlaceholder}
              className={`${fieldClassName} block min-h-28 resize-y leading-6`}
            />
            <p
              id="feedback-detail-count"
              className="mt-1 text-right text-xs text-muted-foreground"
            >
              {detail.length} / {MAX_DETAIL_LENGTH}
            </p>
          </div>

          <div>
            <label
              htmlFor="feedback-page"
              className="mb-1.5 block text-sm font-semibold"
            >
              {copy.pageLabel}{" "}
              <span className="font-normal text-muted-foreground">
                (opsional)
              </span>
            </label>
            <input
              id="feedback-page"
              name="pageUrl"
              maxLength={2048}
              disabled={isSubmitting}
              placeholder={copy.pagePlaceholder}
              className={fieldClassName}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-sm font-semibold">
                {copy.attachmentLabel}{" "}
                <span className="font-normal text-muted-foreground">
                  (opsional)
                </span>
              </p>
              <label
                htmlFor="feedback-attachment"
                className="flex min-h-20 cursor-pointer items-center justify-center gap-3 rounded-lg border border-dashed border-primary/50 bg-background/40 px-3 py-3 text-primary transition-colors hover:border-primary hover:bg-primary/5 focus-within:ring-2 focus-within:ring-ring motion-reduce:transition-none"
              >
                <UploadCloud aria-hidden="true" className="size-8 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">
                    {attachment ? copy.changeAttachment : copy.addAttachment}
                  </span>
                  <span
                    id="feedback-attachment-help"
                    className="mt-1 block text-xs text-muted-foreground"
                  >
                    PNG, JPG · Maks. 5 MB
                  </span>
                </span>
                <input
                  ref={fileInputRef}
                  id="feedback-attachment"
                  name="attachment"
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={changeAttachment}
                  disabled={isSubmitting}
                  aria-describedby={
                    attachmentError
                      ? "feedback-attachment-help feedback-attachment-error"
                      : "feedback-attachment-help"
                  }
                  aria-invalid={Boolean(attachmentError)}
                  className="sr-only"
                />
              </label>
              {attachment && (
                <div className="mt-2 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                  <Paperclip aria-hidden="true" className="size-3.5 shrink-0" />
                  <span className="truncate" title={attachment.name}>
                    {attachment.name}
                  </span>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    disabled={isSubmitting}
                    aria-label="Hapus lampiran"
                    className="ml-auto shrink-0 rounded-sm p-1 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50"
                  >
                    <X aria-hidden="true" className="size-3.5" />
                  </button>
                </div>
              )}
              {attachmentError && (
                <div className="mt-2 space-y-1 text-xs">
                  <p
                    id="feedback-attachment-error"
                    role="alert"
                    className="text-destructive"
                  >
                    {attachmentError}
                  </p>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    disabled={isSubmitting}
                    className="rounded-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50"
                  >
                    Batalkan lampiran
                  </button>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="feedback-email"
                className="mb-1.5 block text-sm font-semibold"
              >
                Email{" "}
                <span className="font-normal text-muted-foreground">
                  (opsional)
                </span>
              </label>
              <input
                id="feedback-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                disabled={isSubmitting}
                aria-describedby="feedback-email-help"
                placeholder="nama@email.com"
                className={fieldClassName}
              />
              <p
                id="feedback-email-help"
                className="mt-1.5 text-xs leading-5 text-muted-foreground"
              >
                {copy.emailHelp}
              </p>
            </div>
          </div>

          {status && (
            <div
              role={status.kind === "error" ? "alert" : "status"}
              className={`flex items-start gap-2.5 rounded-lg border p-3 text-sm leading-6 ${status.kind === "error" ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-primary/40 bg-primary/10 text-foreground"}`}
            >
              {status.kind === "error" ? (
                <AlertCircle
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0"
                />
              ) : (
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-primary"
                />
              )}
              <p>{status.message}</p>
            </div>
          )}

          <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:gap-5">
            <Button
              type="submit"
              variant="outline"
              disabled={isSubmitting}
              className="h-11 w-full gap-2 rounded-lg border-primary bg-linear-to-r from-primary/20 to-primary/5 px-5 text-sm tracking-normal text-foreground normal-case shadow-md shadow-primary/15 hover:bg-primary/15 sm:w-auto dark:border-cyan-300 dark:shadow-cyan-400/15"
            >
              {isSubmitting ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="size-5! animate-spin text-primary motion-reduce:animate-none"
                />
              ) : (
                <Send aria-hidden="true" className="size-5! text-primary" />
              )}
              <span className="border-l border-primary/40 pl-2.5">
                {isSubmitting ? copy.submittingLabel : copy.submitLabel}
              </span>
            </Button>
            <p className="text-xs leading-5 text-muted-foreground">
              Hindari mengirim password atau data pribadi.
            </p>
          </div>
        </form>
      </section>
      <aside
        aria-label="Panduan mengirim masukan"
        className="flex flex-col gap-4 rounded-xl border border-primary/35 bg-card/95 p-4 shadow-[var(--hok-panel-shadow)] sm:p-5"
        style={{ flex: "1 1 0", minWidth: "min(100%, 19rem)" }}
      >
        <Image
          data-feedback-illustration="true"
          src="/images/help-us-improve.png"
          alt=""
          width={320}
          height={320}
          loading="eager"
          sizes="(min-width: 1024px) 288px, (min-width: 640px) 280px, 240px"
          className="mx-auto h-auto w-full max-w-60 object-contain sm:max-w-70 lg:max-w-72"
        />

        <section
          aria-labelledby="feedback-guide-heading"
          className="rounded-xl border border-primary/25 bg-background/45 p-4"
        >
          <h2
            id="feedback-guide-heading"
            className="font-serif text-lg font-bold leading-snug text-foreground"
          >
            {copy.guideHeading}
          </h2>
          <ol className="mt-4 space-y-5" aria-live="polite" aria-atomic="true">
            {copy.tips.map((tip, index) => (
              <li key={tip.title} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-sm font-semibold text-primary dark:border-cyan-300 dark:bg-cyan-400/15 dark:text-cyan-100 dark:shadow-[0_0_10px_rgb(34_211_238_/_0.2)]"
                >
                  {index + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-sm font-semibold leading-5 text-foreground">
                    {tip.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-[13px]">
                    {tip.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </aside>
    </div>
  );
}
