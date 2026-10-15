"use client";

import { useEffect, useState } from "react";

import { siteInfo } from "@/config/site-info";
import {
  getLatestContentUpdate,
  type ContentUpdate,
} from "@/lib/content-update";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatContentDate(value: string | null): string {
  if (!value) {
    return "Belum tersedia";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Belum tersedia";
  }

  return dateFormatter.format(date);
}

export function FooterReleaseInfo() {
  const [contentUpdate, setContentUpdate] = useState<ContentUpdate | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadContentUpdate() {
      try {
        const data = await getLatestContentUpdate();

        if (!cancelled) {
          setContentUpdate(data);
        }
      } catch {
        if (!cancelled) {
          setContentUpdate({ updatedAt: null });
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadContentUpdate();

    return () => {
      cancelled = true;
    };
  }, []);

  const updatedAt = contentUpdate?.updatedAt ?? null;
  const formattedDate = formatContentDate(updatedAt);

  const hasValidDate =
    updatedAt !== null && !Number.isNaN(new Date(updatedAt).getTime());

  return (
    <div
      className="hok-footer__release-info"
      role="group"
      aria-label="Versi website dan pembaruan konten"
    >
      <span className="hok-footer__version">
        <span className="sr-only">Versi aplikasi </span>v
        {siteInfo.deploymentVersion}
      </span>

      <span className="hok-footer__update-label">Latest content update:</span>

      {isLoading ? (
        <span className="hok-footer__update-date">Memuat…</span>
      ) : hasValidDate ? (
        <time dateTime={updatedAt} className="hok-footer__update-date">
          {formattedDate}
        </time>
      ) : (
        <span className="hok-footer__update-date">Belum tersedia</span>
      )}
    </div>
  );
}
