import Image from "next/image";

export function CTA() {
  return (
    <section className="section-style horizontal-padding-style vertical-margin-style flex flex-col">
      <div className="relative w-full flex-1 rounded-[2.5rem] overflow-hidden">
        <Image
          src="/cta.webp"
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover object-top opacity-40"
        />

        <div className="relative flex flex-col justify-center items-center horizontal-padding-style vertical-padding-style text-center">
          <h2 className="text-2xl leading-none tracking-tighter font-semibold">Ready to 7x Your Growth?</h2>
          <p className="mt-4 opacity-70 text-center text-base leading-none">Join 100+ businesses that trust 7xGrow for data-driven digital marketing. Let&#39;s build your growth engine together.</p>
        </div>
      </div>
    </section>
  );
}