"use client";

import { useState } from "react";
import { type FaqItem } from "@/lib/faqItems";
import { ChevronIcon } from "./Icons";

type Props = {
  items: FaqItem[];
};

function Divider() {
  return (
    <div className="w-full shrink-0 border-t-[0.15rem] border-solid [border-image:linear-gradient(to_right,transparent,#252525,transparent)_1]" />
  );
}

export function FAQ({ items }: Props) {
  const [openId, setOpenId] = useState<number | null>(items[0]?.id ?? null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const visibleItems = items.slice(0, 4);

  return (
    <section className="section-style horizontal-padding-style vertical-padding-style max-w-3xl text-center">
      <h2 className="mb-6 text-3xl font-semibold tracking-tighter leading-none">
        FAQs
      </h2>

      <div className="flex flex-col">
        {visibleItems.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id}>
              <Divider />

              <button
                type="button"
                onClick={() => handleToggle(item.id)}
                aria-expanded={isOpen}
                className="relative flex w-full items-center justify-center px-10 py-4 font-medium"
              >
                <span
                  className={`${isOpen ? "text-white" : "text-white/30"} transition-colors duration-500 ease-out font-medium tracking-tight leading-snug`}
                >
                  {item.question}
                </span>
                <ChevronIcon
                  className={`absolute right-0 size-5 shrink-0 transition-transform duration-500 ease-out ${
                    isOpen
                      ? "-rotate-90 text-white/65"
                      : "rotate-90 text-white/35"
                  }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-white/50 leading-snug tracking-tight">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <Divider />
      </div>
    </section>
  );
}
