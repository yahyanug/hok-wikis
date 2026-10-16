import { Buffer } from "node:buffer";

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024;
const MAX_BASE64_LENGTH = Math.ceil(MAX_ATTACHMENT_SIZE / 3) * 4;

type FeedbackType = "SUGGESTION" | "BUG_REPORT" | "CONTENT_REPORT";

type FeedbackAttachment = {
  name: string;
  mimeType: "image/png" | "image/jpeg";
  size: number;
  data: string;
};

type FeedbackPayload = {
  type: FeedbackType;
  title: string;
  detail: string;
  pageUrl?: string;
  email?: string;
  attachment?: FeedbackAttachment;
};

type InvalidPayload = { message: string; status: 400 | 413 };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFeedbackType(value: unknown): value is FeedbackType {
  return (
    value === "SUGGESTION" ||
    value === "BUG_REPORT" ||
    value === "CONTENT_REPORT"
  );
}

function hasControlCharacters(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const character = value.charCodeAt(index);
    if (character < 32 || character === 127) return true;
  }

  return false;
}

function isPageUrl(value: string): boolean {
  if (
    /[\s\\]/.test(value) ||
    hasControlCharacters(value) ||
    value.startsWith("//")
  ) {
    return false;
  }

  if (!/^[a-z][a-z\d+.-]*:/i.test(value)) {
    return value.startsWith("/");
  }

  try {
    const url = new URL(value);
    return /^https?:\/\//i.test(value) && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function validateAttachment(
  value: unknown,
): { attachment: FeedbackAttachment } | InvalidPayload {
  if (!isRecord(value)) {
    return { message: "Data lampiran tidak valid.", status: 400 };
  }

  const { name, mimeType, size, data } = value;

  if (typeof name !== "string" || !name.trim()) {
    return { message: "Nama lampiran tidak valid.", status: 400 };
  }

  if (mimeType !== "image/png" && mimeType !== "image/jpeg") {
    return { message: "Lampiran harus berupa gambar PNG atau JPEG.", status: 400 };
  }

  if (typeof size !== "number" || !Number.isInteger(size) || size <= 0) {
    return { message: "Ukuran lampiran tidak valid.", status: 400 };
  }

  if (size > MAX_ATTACHMENT_SIZE) {
    return { message: "Ukuran lampiran maksimal 5 MB.", status: 413 };
  }

  if (typeof data !== "string" || !data) {
    return { message: "Data gambar lampiran tidak valid.", status: 400 };
  }

  if (data.length > MAX_BASE64_LENGTH) {
    return { message: "Ukuran lampiran maksimal 5 MB.", status: 413 };
  }

  if (data.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(data)) {
    return {
      message: "Data gambar lampiran harus berupa base64 yang valid.",
      status: 400,
    };
  }

  const image = Buffer.from(data, "base64");

  if (image.length !== size || image.toString("base64") !== data) {
    return { message: "Data dan ukuran lampiran tidak sesuai.", status: 400 };
  }

  const isPng =
    image.length >= 8 &&
    image[0] === 0x89 &&
    image[1] === 0x50 &&
    image[2] === 0x4e &&
    image[3] === 0x47 &&
    image[4] === 0x0d &&
    image[5] === 0x0a &&
    image[6] === 0x1a &&
    image[7] === 0x0a;
  const isJpeg =
    image.length >= 3 &&
    image[0] === 0xff &&
    image[1] === 0xd8 &&
    image[2] === 0xff;

  if (
    (mimeType === "image/png" && !isPng) ||
    (mimeType === "image/jpeg" && !isJpeg)
  ) {
    return {
      message: "Isi lampiran tidak sesuai dengan format gambarnya.",
      status: 400,
    };
  }

  return { attachment: { name: name.trim(), mimeType, size, data } };
}

function validatePayload(
  value: unknown,
): { payload: FeedbackPayload } | InvalidPayload {
  if (!isRecord(value) || !isFeedbackType(value.type)) {
    return { message: "Pilih jenis masukan yang valid.", status: 400 };
  }

  if (
    typeof value.title !== "string" ||
    !value.title.trim() ||
    value.title.trim().length > 120
  ) {
    return { message: "Judul wajib diisi, maksimal 120 karakter.", status: 400 };
  }

  if (
    typeof value.detail !== "string" ||
    !value.detail.trim() ||
    value.detail.trim().length > 2000
  ) {
    return {
      message: "Detail wajib diisi, maksimal 2000 karakter.",
      status: 400,
    };
  }

  const payload: FeedbackPayload = {
    type: value.type,
    title: value.title.trim(),
    detail: value.detail.trim(),
  };

  if (value.pageUrl !== undefined) {
    if (typeof value.pageUrl !== "string") {
      return { message: "Alamat halaman tidak valid.", status: 400 };
    }

    const pageUrl = value.pageUrl.trim();

    if (pageUrl.length > 2048) {
      return { message: "Alamat halaman maksimal 2048 karakter.", status: 400 };
    }

    if (pageUrl && !isPageUrl(pageUrl)) {
      return {
        message: "Gunakan path halaman atau URL HTTP/HTTPS yang valid.",
        status: 400,
      };
    }

    if (pageUrl) payload.pageUrl = pageUrl;
  }

  if (value.email !== undefined) {
    if (typeof value.email !== "string") {
      return { message: "Alamat email tidak valid.", status: 400 };
    }

    const email = value.email.trim();

    if (email.length > 254) {
      return { message: "Alamat email maksimal 254 karakter.", status: 400 };
    }

    if (
      email &&
      (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        hasControlCharacters(email))
    ) {
      return { message: "Masukkan alamat email yang valid.", status: 400 };
    }

    if (email) payload.email = email;
  }

  if (value.attachment !== undefined) {
    const result = validateAttachment(value.attachment);

    if ("message" in result) return result;
    payload.attachment = result.attachment;
  }

  return { payload };
}

function feedbackEndpoint(): URL | null {
  const baseUrl = process.env.BACKEND_API_BASE_URL?.trim();

  if (!baseUrl) return null;

  try {
    const url = new URL(baseUrl);

    if (
      (url.protocol !== "http:" && url.protocol !== "https:") ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      return null;
    }

    url.pathname = `${url.pathname.replace(/\/+$/, "")}/feedback`;
    return url;
  } catch {
    return null;
  }
}

export async function POST(request: Request): Promise<Response> {
  const endpoint = feedbackEndpoint();

  if (!endpoint) {
    return Response.json(
      { message: "Layanan masukan belum tersedia. Silakan coba lagi nanti." },
      { status: 503 },
    );
  }

  const mediaType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();

  if (
    mediaType !== "application/json" &&
    !(mediaType?.startsWith("application/") && mediaType.endsWith("+json"))
  ) {
    return Response.json(
      { message: "Kirim masukan dalam format JSON." },
      { status: 415 },
    );
  }

  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return Response.json(
      { message: "Data masukan harus berupa JSON yang valid." },
      { status: 400 },
    );
  }

  const result = validatePayload(input);

  if ("message" in result) {
    return Response.json({ message: result.message }, { status: result.status });
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(result.payload),
      signal: AbortSignal.timeout(20_000),
      redirect: "error",
    });

    await upstream.body?.cancel().catch(() => undefined);

    if (upstream.ok) {
      return Response.json({
        message: "Terima kasih! Masukanmu berhasil dikirim.",
      });
    }

    if (upstream.status === 429) {
      return Response.json(
        { message: "Terlalu banyak masukan. Tunggu sebentar lalu coba lagi." },
        { status: 429 },
      );
    }

    if (upstream.status === 413) {
      return Response.json(
        { message: "Ukuran masukan melebihi batas yang dapat diterima layanan." },
        { status: 413 },
      );
    }

    if ([400, 409, 415, 422].includes(upstream.status)) {
      return Response.json(
        { message: "Masukan belum dapat diproses. Periksa isian lalu coba lagi." },
        { status: upstream.status },
      );
    }

    return Response.json(
      { message: "Layanan masukan sedang tidak tersedia. Silakan coba lagi nanti." },
      { status: 502 },
    );
  } catch (error) {
    const timedOut =
      error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError");

    return Response.json(
      {
        message: timedOut
          ? "Pengiriman memerlukan waktu terlalu lama. Silakan coba lagi."
          : "Masukan belum dapat dikirim. Silakan coba lagi nanti.",
      },
      { status: timedOut ? 504 : 502 },
    );
  }
}
