"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";

type FlightRect = { left: number; top: number; width: number; height: number };
type HelpFlight = {
  id: number;
  sourcePath: string;
  src: string;
  origin: FlightRect;
};

function sameRect(first: FlightRect, second: FlightRect): boolean {
  return (
    Math.abs(first.left - second.left) < 0.5 &&
    Math.abs(first.top - second.top) < 0.5 &&
    Math.abs(first.width - second.width) < 0.5 &&
    Math.abs(first.height - second.height) < 0.5
  );
}

function waitForLayout(
  image: HTMLImageElement,
  signal: AbortSignal,
): Promise<DOMRect | null> {
  return new Promise((resolve) => {
    let frame = 0;
    let frames = 0;
    let stableFrames = 0;
    let previous: DOMRect | undefined;

    function finish(rect: DOMRect | null) {
      window.cancelAnimationFrame(frame);
      signal.removeEventListener("abort", cancel);
      resolve(rect);
    }
    function cancel() {
      finish(null);
    }
    function measure() {
      if (signal.aborted || !image.isConnected) {
        finish(null);
        return;
      }
      const rect = image.getBoundingClientRect();
      stableFrames =
        previous && sameRect(previous, rect) ? stableFrames + 1 : 0;
      previous = rect;
      frames += 1;
      if (stableFrames >= 2 || frames >= 12) {
        finish(rect.width > 0 && rect.height > 0 ? rect : null);
        return;
      }
      frame = window.requestAnimationFrame(measure);
    }

    if (signal.aborted) {
      finish(null);
      return;
    }
    signal.addEventListener("abort", cancel, { once: true });
    frame = window.requestAnimationFrame(measure);
  });
}

function waitForIllustration(
  signal: AbortSignal,
): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const observer = new MutationObserver(find);
    const timeout = window.setTimeout(() => finish(null), 1000);
    function finish(image: HTMLImageElement | null) {
      observer.disconnect();
      window.clearTimeout(timeout);
      signal.removeEventListener("abort", cancel);
      resolve(image);
    }
    function cancel() {
      finish(null);
    }
    function find() {
      const image = document.querySelector<HTMLImageElement>(
        "[data-feedback-illustration]",
      );
      if (image) finish(image);
      return image;
    }
    if (signal.aborted) {
      finish(null);
      return;
    }
    if (find()) return;
    observer.observe(document.body, { childList: true, subtree: true });
    signal.addEventListener("abort", cancel, { once: true });
  });
}

function waitForImage(
  image: HTMLImageElement,
  signal: AbortSignal,
): Promise<void> {
  if (image.complete || signal.aborted) return Promise.resolve();
  return new Promise((resolve) => {
    const timeout = window.setTimeout(finish, 600);
    function finish() {
      window.clearTimeout(timeout);
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
      signal.removeEventListener("abort", finish);
      resolve();
    }
    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
    signal.addEventListener("abort", finish, { once: true });
    if (image.complete || signal.aborted) finish();
  });
}

type FloatingSupportProps = {
  href: string;
};

export function FloatingSupport({ href }: FloatingSupportProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [flight, setFlight] = useState<HelpFlight | null>(null);
  const flightRef = useRef<HelpFlight | null>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const flightId = useRef(0);
  const navigationStarted = useRef<number | null>(null);

  const finishFlight = useCallback((id: number) => {
    if (flightRef.current?.id !== id) return;
    flightRef.current = null;
    setFlight((current) => (current?.id === id ? null : current));
  }, []);

  function openFeedback(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof Element.prototype.animate !== "function"
    )
      return;
    event.preventDefault();
    if (flightRef.current) return;

    const image = event.currentTarget.querySelector("img");
    if (!image) {
      router.push("/feedback");
      return;
    }
    const rect = image.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      router.push("/feedback");
      return;
    }

    const nextFlight: HelpFlight = {
      id: ++flightId.current,
      sourcePath: pathname,
      src: image.currentSrc || image.src,
      origin: {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      },
    };
    flightRef.current = nextFlight;
    setFlight(nextFlight);
    router.prefetch("/feedback");
  }

  useEffect(() => {
    const ghost = ghostRef.current;
    if (!flight || !ghost) return;

    const controller = new AbortController();
    let animation: Animation | undefined;
    let navigationTimeout: number | undefined;
    let hiddenTarget: HTMLImageElement | undefined;
    let targetVisibility = "";

    function restoreTarget() {
      if (hiddenTarget) {
        hiddenTarget.style.visibility = targetVisibility;
        hiddenTarget = undefined;
      }
    }

    function navigateToFeedback() {
      if (!flight || controller.signal.aborted) return;
      navigationStarted.current = flight.id;
      router.push("/feedback");
      navigationTimeout = window.setTimeout(
        () => finishFlight(flight.id),
        5000,
      );
    }

    function transformTo(rect: FlightRect) {
      if (!flight) return "none";
      const origin = flight.origin;
      return `translate3d(${rect.left - origin.left}px, ${rect.top - origin.top}px, 0) scale(${rect.width / origin.width}, ${rect.height / origin.height})`;
    }

    async function moveTo(rect: FlightRect, duration: number, landing = false) {
      if (!ghost || !flight || controller.signal.aborted) return;
      const currentStyle = window.getComputedStyle(ghost);
      const transform = transformTo(rect);
      const filter = landing ? "none" : currentStyle.filter;
      const movement = ghost.animate(
        [
          { transform: currentStyle.transform, filter: currentStyle.filter },
          { transform, filter },
        ],
        {
          duration,
          easing: "cubic-bezier(0.22, 0.75, 0.25, 1)",
          fill: "forwards",
        },
      );
      animation = movement;
      await movement.finished;
      if (controller.signal.aborted) return;
      ghost.style.transform = transform;
      ghost.style.filter = filter;
      movement.cancel();
      if (animation === movement) animation = undefined;
    }

    async function playFlight() {
      if (!flight || !ghost || controller.signal.aborted) return;
      try {
        if (pathname === flight.sourcePath) {
          if (navigationStarted.current === flight.id) {
            finishFlight(flight.id);
            return;
          }

          const viewportWidth = document.documentElement.clientWidth;
          const viewportHeight = window.innerHeight;
          const headerBottom =
            document.querySelector(".hok-header")?.getBoundingClientRect()
              .bottom ?? 0;
          const size = Math.min(280, viewportWidth - 48, viewportHeight * 0.42);
          const contentWidth = Math.min(viewportWidth, 1728);
          const centerX =
            viewportWidth >= 1280
              ? (viewportWidth - contentWidth) / 2 + contentWidth * 0.78
              : viewportWidth / 2;
          const top = Math.max(
            16,
            Math.min(
              viewportHeight - size - 24,
              Math.max(headerBottom + 24, (viewportHeight - size) * 0.38),
            ),
          );

          await moveTo(
            {
              left: Math.max(
                16,
                Math.min(viewportWidth - size - 16, centerX - size / 2),
              ),
              top,
              width: size,
              height: size,
            },
            600,
          );
          navigateToFeedback();
          return;
        }

        if (pathname !== "/feedback") {
          finishFlight(flight.id);
          return;
        }

        const target = await waitForIllustration(controller.signal);
        if (controller.signal.aborted) return;
        if (target) {
          hiddenTarget = target;
          targetVisibility = target.style.visibility;
          target.style.visibility = "hidden";
          await waitForImage(target, controller.signal);
        }
        const rect = target
          ? await waitForLayout(target, controller.signal)
          : null;
        if (controller.signal.aborted) return;
        const visible =
          rect &&
          rect.width > 0 &&
          rect.top >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.left >= 0 &&
          rect.right <= document.documentElement.clientWidth;

        if (target && rect && visible) {
          await moveTo(rect, 220, true);
          if (controller.signal.aborted) return;
          const updatedRect = target.getBoundingClientRect();
          if (target.isConnected && !sameRect(rect, updatedRect)) {
            await moveTo(updatedRect, 100, true);
          }
          if (controller.signal.aborted) return;
          // Match the destination in this frame before revealing the real image.
          if (target.isConnected)
            ghost.style.transform = transformTo(target.getBoundingClientRect());
        } else {
          animation = ghost.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 180,
            fill: "forwards",
          });
          await animation.finished;
        }

        restoreTarget();
        if (!controller.signal.aborted) finishFlight(flight.id);
      } catch {
        if (!controller.signal.aborted) {
          restoreTarget();
          finishFlight(flight.id);
          if (pathname === flight.sourcePath) router.push("/feedback");
        }
      } finally {
        restoreTarget();
      }
    }

    const frame = window.requestAnimationFrame(() => {
      void playFlight();
    });
    return () => {
      controller.abort();
      window.cancelAnimationFrame(frame);
      window.clearTimeout(navigationTimeout);
      if (animation) {
        // Keep the viewport origin fixed; carry only the transform across routes.
        ghost.style.transform = window.getComputedStyle(ghost).transform;
        animation.cancel();
      }
      restoreTarget();
    };
  }, [flight, pathname, router, finishFlight]);

  const isFeedbackPage =
    pathname === "/feedback" || pathname.startsWith("/feedback/");
  const isSupportPage =
    pathname === "/support-us" || pathname.startsWith("/support-us/");

  return (
    <>
      <div
        className="hok-floating-actions"
        style={{
          position: "fixed",
          top: "70dvh",
          bottom: "auto",
          transform: "translateY(-50%)",
        }}
      >
        {!isSupportPage && (
          <Link
            href="/support-us"
            className="hok-floating-support"
            aria-label="Support Us — dukung HOK Wiki"
          >
            <Image
              src="/images/support-us.png"
              alt="Support Us"
              width={150}
              height={150}
              sizes="(max-width: 640px) 76px, 150px"
              className="hok-floating-support__image"
              loading="eager"
            />
          </Link>
        )}
        {!isFeedbackPage && (
          <Link
            href="/feedback"
            onClick={openFeedback}
            aria-busy={Boolean(flight)}
            data-help-launching={Boolean(flight)}
            className="hok-floating-support"
            aria-label="Help Us Improve — kirim masukan untuk HOK Wiki"
          >
            <Image
              src="/images/help-us-improve.png"
              alt="Help Us Improve"
              width={160}
              height={160}
              sizes="(max-width: 640px) 76px, 150px"
              className="hok-floating-support__image"
              style={{ visibility: flight ? "hidden" : undefined }}
              loading="eager"
            />
          </Link>
        )}
      </div>
      {flight &&
        createPortal(
          <div
            key={flight.id}
            ref={ghostRef}
            aria-hidden="true"
            className="hok-help-flight"
            style={{
              position: "fixed",
              inset: "auto",
              left: flight.origin.left,
              top: flight.origin.top,
              width: flight.origin.width,
              height: flight.origin.height,
              zIndex: 46,
              pointerEvents: "none",
              transformOrigin: "0 0",
            }}
          >
            <Image
              src={flight.src}
              alt=""
              width={320}
              height={320}
              unoptimized
              className="hok-help-flight__image"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
