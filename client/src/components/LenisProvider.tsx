'use client';

import { ReactLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisOptions } from 'lenis';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
};

const lenisOptions: LenisOptions = {
  autoRaf: false,
  lerp: 0.07,
  wheelMultiplier: 0.9,
  smoothWheel: true,
};

export function LenisProvider({ children }: Props) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function raf(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
      ScrollTrigger.update();
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(raf);
  }, []);

  return (
    <ReactLenis root options={lenisOptions} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}