import { Banner } from "@/components/Banner";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HeroAbout } from "@/components/HeroAbout";
import { heroBannerItems } from "@/lib/bannerItems";
import { heroFaqs } from "@/lib/faqItems";

export default function Home() {
  return (
    <>
      <Hero />
      <Banner items={heroBannerItems}/>
      <HeroAbout />
      <FAQ items={heroFaqs} />
      <CTA />
    </>
  );
}
