import { Banner } from "@/components/Banner";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HeroAbout } from "@/components/HeroAbout";
import HeroDashboard from "@/components/HeroDashboard";
import { HeroReview } from "@/components/HeroReview";
import { HeroService } from "@/components/HeroService";
import { heroBannerItems } from "@/lib/bannerItems";
import { heroFaqsItems } from "@/lib/faqItems";

export default function Home() {
  return (
    <>
      <Hero />
      <Banner items={heroBannerItems}/>
      <HeroAbout />
      <HeroService />
      <HeroDashboard />
      <HeroReview />
      <FAQ items={heroFaqsItems} />
      <CTA />
    </>
  );
}
