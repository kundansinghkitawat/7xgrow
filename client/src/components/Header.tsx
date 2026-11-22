"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MenuIcon, CloseIcon } from "./Icons";
import { MenuOpen } from "./MenuOpen";
import { navItems } from "@/lib/navItems";

gsap.registerPlugin(ScrollTrigger);

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const isOpenRef = useRef(false);
  const isHiddenRef = useRef(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (isOpenRef.current) return;

        const scrollY = self.scroll();

        if (self.direction === 1 && scrollY > 100 && !isHiddenRef.current) {
          isHiddenRef.current = true;
          gsap.to(headerRef.current, {
            yPercent: -200,
            duration: 0.6,
            delay: 0.3,
            ease: "power3.out",
            overwrite: true,
          });
        }

        if ((self.direction === -1 || scrollY <= 100) && isHiddenRef.current) {
          isHiddenRef.current = false;
          gsap.to(headerRef.current, {
            yPercent: 0,
            duration: 0.4,
            delay: 0,
            ease: "power3.out",
            overwrite: true,
          });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    isOpenRef.current = isOpen;

    if (isOpen && isHiddenRef.current) {
      isHiddenRef.current = false;
      gsap.to(headerRef.current, {
        yPercent: 0,
        duration: 0.4,
        overwrite: true,
      });
    }
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full md:w-fit">
        <header
          ref={headerRef}
          className={`horizontal-padding-style flex justify-between w-full md:w-fit md:justify-center items-center gap-25 lg:gap-36 2xl:gap-72 ${isOpen ? "text-black/50" : "text-white/50"} transition-colors duration-700 ease-out`}
        >
          <Link
            href="/"
            className={`${isOpen ? "text-black" : "text-white"} font-semibold tracking-tight leading-none transition-colors duration-700 ease-out text-xl`}
          >
            7xGrow
          </Link>
          <nav className="section-style md:block hidden">
            <ul className="flex items-center justify-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-700 ease-out"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/" className="text-nowrap md:block hidden">
            Book demo
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className={`md:hidden ${isOpen ? "text-black" : "text-white"} relative w-6 h-6 transition-colors duration-700 ease-out`}
          >
            <MenuIcon
              size={24}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isOpen
                  ? "opacity-0 rotate-90 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <CloseIcon
              size={24}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-0"
              }`}
            />
          </button>
        </header>
      </div>

      <MenuOpen isOpen={isOpen} />
    </>
  );
}
