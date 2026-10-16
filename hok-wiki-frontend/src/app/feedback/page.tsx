import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";

import { FeedbackForm } from "./_components/feedback-form";

export const metadata: Metadata = {
  title: "Feedback | HOK Wiki",
  description:
    "Bantu HOK Wiki menjadi lebih baik. Kirim saran, laporkan bug, atau beri tahu kami tentang informasi yang perlu diperbaiki.",
};

export default function FeedbackPage() {
  return (
    <div className="w-full px-4 pt-7 pb-14 text-foreground sm:px-8 lg:px-12">
      <header className="mb-6">
        <div
          style={{ display: "flex", flexWrap: "wrap", columnGap: "1.25rem" }}
        >
          <div style={{ flex: "2 1 0", minWidth: "min(100%, 32rem)" }}>
            <h1 className="text-center font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl dark:drop-shadow-[0_0_14px_rgb(78_191_255_/_0.25)]">
              Help Us Improve
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
                  background:
                    "linear-gradient(to left, transparent, currentColor)",
                }}
              />
            </div>
          </div>
          <div
            aria-hidden="true"
            style={{ flex: "1 1 0", minWidth: "min(100%, 19rem)", height: 0 }}
          />
        </div>
      </header>

      <FeedbackForm />
    </div>
  );
}
