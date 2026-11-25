"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { heroServiceItems, type ServiceItem } from "@/lib/serviceItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  services?: ServiceItem[];
};

export function HeroService({ services = heroServiceItems }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const items = cardRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      const total = items.length;
      if (total === 0) return;

      const render = (p: number) => {
        items.forEach((item, i) => {
          const d = i - p;
          const ad = Math.abs(d);

          const scale =
            ad <= 1 ? 1 - 0.2 * ad : Math.max(0.6, 0.8 - 0.2 * (ad - 1));

          const opacity =
            ad <= 1 ? 1 - 0.5 * ad : Math.max(0, 0.5 - 0.5 * (ad - 1));

          gsap.set(item, {
            xPercent: d * 95,
            scale,
            opacity,
            zIndex: Math.round(100 - ad * 10),
          });
        });
      };

      render(0);

      const state = { p: 0 };

      gsap.to(state, {
        p: total - 1,
        ease: "none",
        onUpdate: () => render(state.p),
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: `+=${window.innerHeight * (total - 1)}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="flex w-full items-center justify-center overflow-hidden horizontal-padding-style vertical-margin-style !mb-0"
    >
      <div className="relative h-[65svh] aspect-2/3">
        {services.map((service, i) => (
          <div
            key={service.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="@container absolute inset-0 overflow-hidden rounded-[2.5rem] bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,#2a2a2a_0%,#252525_25%,#202020_45%,#181818_65%,#0c0c0c_85%,#000000_100%)] text-white will-change-transform"
          >
            {service.imageUrl && (
              <Image
                src={service.imageUrl}
                alt=""
                fill
                // sizes="(min-width: 768px) 320px, 60vw"
                loading="eager"
                unoptimized
                className="object-cover object-center"
              />
            )}

            <div
              className="relative flex h-full flex-col justify-end gap-3 p-6"
              style={
                service.textColor ? { color: service.textColor } : undefined
              }
            >
              {!service.imageUrl && (
                <span className="pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 select-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12)_60%,transparent)] bg-clip-text text-center text-[100cqw] font-thin leading-none tracking-tighter text-transparent">
                  {i + 1}
                </span>
              )}

              <h3 className="relative text-2xl font-semibold leading-none tracking-tighter">
                {service.title}
              </h3>
              <p className="relative text-sm leading-none tracking-tight opacity-70">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}