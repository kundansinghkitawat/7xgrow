"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { BoxPointIcon } from "./Icons";

gsap.registerPlugin(ScrollTrigger);

export function HeroAbout() {
  const boxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: 0 },
        {
          yPercent: -33,
          ease: "none",
          scrollTrigger: {
            trigger: boxRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const features = [
    "Data-driven strategies",
    "Full-service approach",
    "Proven track record",
    "Dedicated team",
  ];

  const highlights = [
    {
      title: "Results-Driven",
      text: "Every strategy is designed with clear, measurable goals and ROI in mind.",
    },
    {
      title: "Client-Focused",
      text: "Your success is our success. We work as an extension of your internal team.",
    },
    {
      title: "Industry Expertise",
      text: "Stay ahead with cutting-edge strategies and proven growth methodologies.",
    },
  ];

  return (
    <section className="w-full section-style horizontal-padding-style vertical-margin-style relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-3 gap-2.5 sm:min-h-200">
        <div
          ref={boxRef}
          className="h-96 order-1 sm:order-0 sm:h-auto sm:row-span-2 relative overflow-hidden rounded-[2.5rem]"
        >
          <div
            ref={imageRef}
            className="absolute top-0 left-0 w-full h-[150%] select-none transition-transform duration-700 ease-out"
          >
            <Image
              src="/floating_window.webp"
              alt=""
              fill
              loading="eager"
              className="object-cover object-top select-none"
              sizes="50vw"
            />
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end gap-2.5">
            <h2 className="relative text-left text-2xl sm:text-3xl text-[#d3d3d3] mix-blend-difference font-semibold tracking-tighter leading-none">
              Your Strategic Partner in <br /> Digital Growth
            </h2>

            <Link
              href="/about"
              className="relative rounded-full px-4 py-1.5 sm:px-5 sm:py-2 cursor-pointer"
            >
              <span className="absolute inset-0 rounded-full bg-white mix-blend-difference" />

              <span className="relative text-white font-medium tracking-tight leading-0 text-nowrap text-sm sm:text-base">
                Learn More
              </span>
            </Link>
          </div>
        </div>

        <div className="order-3 sm:order-0 overflow-hidden min-h-fit sm:h-auto flex flex-col pt-2.5 sm:pt-0">
          <div className="w-[75%] flex-1 flex flex-col justify-end">
            <div className="p-2.5">
              <p className="leading-none mb-3.5 text-white/50">
                {highlights[0].text}
              </p>
              <span className="text-white font-semibold text-nowrap leading-0">
                {highlights[0].title}
              </span>
            </div>
          </div>
        </div>

        <div className="order-2 sm:order-0 sm:col-start-1 sm:row-start-3 overflow-hidden text-lg text-left tracking-tight leading-none w-full lg:w-[85%] flex flex-col justify-between items-start p-2.5 gap-6">
          <p className="text-sm md:text-base lg:text-lg tracking-tight leading-none">
            Most B2B companies fear wasting time and money on digital strategies
            that never deliver. We replace guesswork with data-driven
            engineering to bring you high-quality traffic and predictable
            expansion.
          </p>

          <ul className="flex flex-col gap-1">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-1.5 text-white/50 text-xs md:text-sm lg:text-base"
              >
                <BoxPointIcon
                  fill="#757575"
                  className="size-3.5 md:size-4.5 shrink-0"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className=" order-3 sm:order-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 overflow-hidden sm:h-auto flex flex-col gap-y-2.5">
          <div className="w-[75%] flex-1 min-h-fit self-end flex flex-col justify-end">
            <div className="text-right p-2.5">
              <p className="leading-none mb-3.5 text-white/50">
                {highlights[1].text}
              </p>
              <span className="text-white font-semibold text-nowrap leading-0">
                {highlights[1].title}
              </span>
            </div>
          </div>
          <div className="w-[75%] flex-1 flex min-h-fit flex-col justify-end">
            <div className="p-2.5">
              <p className="leading-none mb-3.5 text-white/50">
                {highlights[2].text}
              </p>
              <span className="text-white font-semibold text-nowrap leading-0">
                {highlights[2].title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
