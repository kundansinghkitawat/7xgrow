import type { CSSProperties } from "react";
import { type BannerItem } from "@/lib/bannerItems";

type Props = {
  items: BannerItem[];
};

type ChevronProps = {
  className?: string;
};

function Chevron({ className }: ChevronProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 10 Q18 10 21 14 L58 50 L21 86 Q18 90 22 90 L40 90 Q44 90 47 87 L86 52 Q89 50 86 48 L47 13 Q44 10 40 10 Z" />
    </svg>
  );
}

const MOBILE_MAX_COLS = 2;
const DESKTOP_MAX_COLS = 4;

export function Banner({ items }: Props) {
  const count = items.length;
  if (count === 0) return null;

  // mobile layout
  const colsMobile = Math.min(count, MOBILE_MAX_COLS);
  const rowsMobile = Math.ceil(count / colsMobile);

  // desktop layout
  const colsDesktop = Math.min(count, DESKTOP_MAX_COLS);
  const rowsDesktop = Math.ceil(count / colsDesktop);

  return (
    <div
      style={
        {
          "--cols-m": colsMobile,
          "--rows-m": rowsMobile,
          "--cols-d": colsDesktop,
          "--rows-d": rowsDesktop,
        } as CSSProperties
      }
      className="w-full h-[calc(var(--rows-m)*5rem)] sm:h-[calc(var(--rows-d)*7.5rem)] py-2.5"
    >
      <div className="section-style h-full">
        <ul className="grid grid-cols-[repeat(var(--cols-m),minmax(0,1fr))] grid-rows-[repeat(var(--rows-m),minmax(0,1fr))] sm:grid-cols-[repeat(var(--cols-d),minmax(0,1fr))] sm:grid-rows-[repeat(var(--rows-d),minmax(0,1fr))] gap-(--gap) [--gap:6px] md:[--gap:10px] px-7.5 h-full">
          {items.map(({ value, suffix, label }, index) => (
            <li
              key={label}
              style={
                {
                  "--col-mobile": index % colsMobile,
                  "--row-mobile": Math.floor(index / colsMobile),
                  "--col-desktop": index % colsDesktop,
                  "--row-desktop": Math.floor(index / colsDesktop),
                } as CSSProperties
              }
              className="group relative flex flex-col justify-end items-start text-left bg-sec-bg min-h-0 rounded-xl md:rounded-2xl p-1.5 md:p-3 overflow-hidden -skew-x-12"
            >
              <div
                aria-hidden="true"
                style={{
                  left: "calc(var(--col) * -1 * (100% + var(--gap)))",
                  top: "calc(var(--row) * -1 * (100% + var(--gap)))",
                  width:
                    "calc(var(--cols) * 100% + (var(--cols) - 1) * var(--gap))",
                  height:
                    "calc(var(--rows) * 100% + (var(--rows) - 1) * var(--gap))",
                  transform: "skewX(12deg)",
                  transformOrigin:
                    "calc((var(--col) + 0.5) / var(--cols) * (100% - (var(--cols) - 1) * var(--gap)) + var(--col) * var(--gap)) calc((var(--row) + 0.5) / var(--rows) * (100% - (var(--rows) - 1) * var(--gap)) + var(--row) * var(--gap))",
                }}
                className="pointer-events-none absolute flex items-center justify-end -space-x-10 md:-space-x-16 pr-3 md:pr-6 [--col:var(--col-mobile)] [--cols:var(--cols-m)] [--row:var(--row-mobile)] [--rows:var(--rows-m)] sm:[--col:var(--col-desktop)] sm:[--cols:var(--cols-d)] sm:[--row:var(--row-desktop)] sm:[--rows:var(--rows-d)]"
              >
                <Chevron className="h-[60%] sm:h-[110%] shrink-0 text-white/4" />
                <Chevron className="h-[90%] sm:h-[160%] shrink-0 text-white/5" />
                <Chevron className="h-[125%] sm:h-[220%] shrink-0 text-white/6" />
              </div>

              <div className="relative flex flex-col gap-0 skew-x-12 -ml-1 md:-ml-2">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-number italic-skew text-white text-3xl md:text-5xl font-medium tracking-normal leading-none ml-1.5">
                    {value}
                  </span>
                  <span className="font-number italic-skew text-white/35 text-xl md:text-2xl leading-none font-semibold">
                    {suffix}
                  </span>
                </div>
                <span className="text-white/50 font-medium text-xs md:text-sm tracking-tight leading-none">
                  {label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}