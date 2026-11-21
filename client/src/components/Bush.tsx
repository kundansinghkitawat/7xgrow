"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Bush() {
  // show: controls when the image is added to the DOM
  const [show, setShow] = useState(false);
  
  // loaded: controls the fade-in
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // add the image only after the whole page has loaded
  useEffect(() => {
    let timer = 0;

    const start = () => {
      // Small extra delay so the page settles first
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

  // after the image is in the DOM, fade it in once it has loaded
  useEffect(() => {
    if (!show) return;
    const img = imgRef.current;
    if (!img) return;

    let raf1 = 0;
    let raf2 = 0;

    const reveal = () => {
      
      // Wait two frames so opacity-0 is painted first and the transition always plays
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setLoaded(true));
      });
    };

    if (img.complete) {
      reveal();
    } else {
      img.addEventListener("load", reveal, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      img.removeEventListener("load", reveal);
    };
  }, [show]);

  
  const maskStyle = loaded
    ? {
        WebkitMaskImage: "url(/bush.webp)",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: "url(/bush.webp)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }
    : undefined;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full sm:w-[90%] h-auto md:h-[65%] md:w-auto isolate select-none">
      {show && (
        <Image
          ref={imgRef}
          src="/bush.webp"
          alt=""
          width={1896}
          height={1722}
          loading="eager"
          fetchPriority="low"
          unoptimized
          className={`w-auto h-full object-contain object-center transition-opacity duration-500 ease-in-out ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div
        className={`absolute inset-0 bg-brand-violet/40 mix-blend-multiply transition-opacity duration-500 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={maskStyle}
      />
    </div>
  );
}
