import { Banner } from "@/components/Banner";
import Journey from "@/components/Journey";
import { aboutBannerItems } from "@/lib/bannerItems";
import Image from "next/image";

export default function About() {
  return (
    <>
      <h1 className="hero-h1-single-word-style hero-txt-top-margin-style absolute top-0 left-1/2 -translate-x-1/2">
        About Us
      </h1>
      <section className="w-full h-svh relative overflow-clip">
        <Image 
        src="/skate.webp"
        alt=""
        width={2000}
        height={1333}
        loading="eager"
        unoptimized
        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 object-cover h-[85%] w-auto object-center mask-[linear-gradient(to_bottom,white_75%,transparent)]"
        />
        <div className="w-full absolute bottom-5 left-1/2 -translate-x-1/2 text-center section-style horizontal-padding-style max-w-3xl">
          <p className="text-center text-white/50 leading-none tracking-tight text-[min(4.5vw,1.25rem)] font-medium">
            Your partner in growth, driving real results through innovation,
            data-driven strategies, and a passion for digital excellence.
          </p>
        </div>
      </section>

      <Banner items={aboutBannerItems}/>
      <Journey />
    </>
  );
}
