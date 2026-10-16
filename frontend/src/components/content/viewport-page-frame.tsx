"use client";

import { useLayoutEffect, useState, type CSSProperties, type ReactNode } from "react";

type ViewportPageFrameProps = {
  className: string;
  children: ReactNode;
};

type FrameStyle = CSSProperties & { "--hok-content-height"?: string };

export function ViewportPageFrame({ className, children }: ViewportPageFrameProps) {
  const [availableHeight, setAvailableHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const header = document.querySelector<HTMLElement>(".hok-header");
    const footer = document.querySelector<HTMLElement>(".hok-footer");
    let animationFrame = 0;

    function measure() {
      const viewportHeight = Math.min(window.innerHeight, window.visualViewport?.height ?? window.innerHeight);
      const fitsDesktop = window.innerWidth >= 1024 && viewportHeight >= 600;
      const chromeHeight = (header?.getBoundingClientRect().height ?? 0) + (footer?.getBoundingClientRect().height ?? 0);
      const nextHeight = fitsDesktop ? Math.max(0, Math.floor(viewportHeight - chromeHeight - 1)) : null;
      setAvailableHeight((current) => current === nextHeight ? current : nextHeight);
    }

    function scheduleMeasure() {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(measure);
    }

    const observer = new ResizeObserver(scheduleMeasure);
    if (header) observer.observe(header);
    if (footer) observer.observe(footer);
    window.addEventListener("resize", scheduleMeasure);
    window.visualViewport?.addEventListener("resize", scheduleMeasure);
    measure();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", scheduleMeasure);
      window.visualViewport?.removeEventListener("resize", scheduleMeasure);
    };
  }, []);

  const style: FrameStyle | undefined = availableHeight === null ? undefined : {
    height: availableHeight,
    flexShrink: 0,
    "--hok-content-height": `${availableHeight}px`,
  };
  const density = availableHeight === null ? undefined : availableHeight < 460 ? "tight" : availableHeight >= 650 ? "roomy" : undefined;

  return <div className={className} data-fit-viewport={availableHeight === null ? undefined : "true"} data-fit-density={density} style={style}>{children}</div>;
}
