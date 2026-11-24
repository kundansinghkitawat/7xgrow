"use client";

import { useEffect, useRef, useState } from "react";

const BUSH_SM = "/bush-sm.webp";
const BUSH_LG = "/bush.webp";

export function Bush() {
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // add the image only after the whole page has loaded
  useEffect(() => {
    let timer = 0;

    const start = () => {
      timer = window.setTimeout(() => setShow(true), 300);
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", start);
    };
  }, []);

  // fade in after the image is loaded and decoded
  useEffect(() => {
    if (!show) return;
    const img = imgRef.current;
    if (!img) return;

    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;

    const reveal = () => {
      if (cancelled) return;
      // wait two frames so opacity-0 is painted first
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setLoaded(true));
      });
    };

    img
      .decode()
      .catch(() => {
        // if decode fails, we still show the image
      })
      .then(reveal);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [show]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full sm:w-[90%] h-auto xl:h-[65%] xl:w-auto isolate select-none">
      {/* tint filter: multiply the color with the image, keep only the image shape */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="bush-tint" colorInterpolationFilters="sRGB">
          <feFlood floodColor="#651ccf" floodOpacity="0.4" result="color" />
          <feBlend in="color" in2="SourceGraphic" mode="multiply" result="blended" />
          <feComposite in="blended" in2="SourceAlpha" operator="in" />
        </filter>
      </svg>

      {show && (
        <picture>
          <source media="(min-width: 1280px)" srcSet={BUSH_LG} />
          <img
            ref={imgRef}
            src={BUSH_SM}
            alt=""
            width={1896}
            height={1722}
            loading="eager"
            fetchPriority="low"
            style={{ filter: "url(#bush-tint)" }}
            className={`w-auto h-full object-contain object-center transition-opacity duration-500 ease-in-out ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
      )}
    </div>
  );
}