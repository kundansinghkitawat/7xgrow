import { Bush } from "@/components/Bush";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-style horizontal-padding-style vertical-padding-style flex min-h-svh flex-col items-center justify-center text-center relative">
      <Bush />

      <h1 className="text-8xl md:text-9xl font-bold tracking-tighter leading-none brand-gradient bg-clip-text text-transparent">404</h1>
      <h2 className="mt-4 text-xl md:text-2xl font-semibold tracking-tight leading-none relative z-20">Page not found</h2>
      <p className="mt-2 text-sm md:text-base max-w-md text-white/50 tracking-tight leading-none relative z-20">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="mt-6 text-sm md:text-base underline relative z-20">
        Back to home
      </Link>
    </section>
  );
}
