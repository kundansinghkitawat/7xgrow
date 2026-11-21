import Image from "next/image";
import { SubHeadings } from "./SubHeadings";
import { Bush } from "./Bush";

export function Hero() {
  const heroSubheadings =
    "We help businesses improve visibility, attract the right audience, and convert traffic into measurable growth through SEO, paid media, and data-driven systems.";

  return (
    <section className="section-style horizontal-padding-style vertical-padding-style min-h-svh flex flex-col justify-center items-center relative isolate ">
      
      {/* hero headings */}
      <h1 className="relative flex flex-col select-none w-full md:w-fit">
        <span className="relative z-20 text-xs lg:text-base leading-snug lg:leading-0 self-center text-white font-bold tracking-tight">
          Built for Sustainable Growth
        </span>
        <div className="relative z-0 text-7xl lg:text-8xl leading-[1.15] tracking-tight font-semibold">
          <span className="inline-block text-transparent brand-gradient bg-clip-text mr-[1vw]">
            Digital{" "}
          </span>
          <span className="md:hidden"><br /></span>
          <span className="text-white mix-blend-difference text-right">
            Marketing
          </span>
        </div>
      </h1>

      {/* hero transparent bush image -- comment out if you want colorless hero img */}
      {/* <Image
        src="/bush.png"
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        priority
        unoptimized
        className="w-auto h-[65%] absolute object-contain object-center top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10"
      /> */}

      {/* colorful bush transparent hero */}
      <Bush/>

      {/* hero subheadings */}
      <SubHeadings className="z-30">{heroSubheadings}</SubHeadings>
    </section>
  );
}
