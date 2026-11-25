"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
  footerContent,
  footerServices,
  footerCompany,
  footerLegalLinks,
  footerSocialLinks,
} from "@/lib/footerItems";

type Props = {
  brand?: string;
  description?: string;
  address?: string;
  wordmark?: string;
};

const year = new Date().getFullYear();

const linkClass = "text-sm text-white/60 hover:text-white transition-colors";

export function Footer({
  brand = footerContent.brand,
  description = footerContent.description,
  address = footerContent.address,
  wordmark = footerContent.wordmark,
}: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <footer className="flex flex-col justify-end overflow-hidden w-full section-style horizontal-padding-style">
      <div className="">
        <div className="flex flex-wrap justify-between gap-y-12 gap-x-8">
          {/* Brand, description and follow us */}
          <div className="w-full md:w-[calc(50%-1rem)] lg:w-auto lg:flex-[1.5] flex flex-col items-start text-left">
            <Link
              href="/"
              className="text-white font-semibold tracking-tight leading-none text-2xl"
            >
              {brand}
            </Link>
            <div className="w-full max-w-52 h-0.5 mt-8 bg-linear-to-r from-[#252525] to-[#252525]/0" />
            <p className="text-sm text-white/60 mt-6 max-w-87.5 leading-relaxed">
              {description}
            </p>

            <h3 className="text-sm text-white font-medium mt-8">
              {footerContent.followTitle}
            </h3>

            <div className="flex flex-wrap items-center gap-2.5 mt-4">
              {footerSocialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/50 hover:text-white transition-colors duration-300"
                >
                  <Icon strokeWidth={1.75} className="size-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="w-[calc(50%-1rem)] lg:w-auto lg:flex-1 flex flex-col items-start text-left">
            <h3 className="text-sm text-white font-medium">
              {footerContent.servicesTitle}
            </h3>
            <div className="flex flex-col gap-2 mt-6">
              {footerServices.map((link) => (
                <Link key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="w-[calc(50%-1rem)] lg:w-auto lg:flex-1 flex flex-col items-start text-left">
            <h3 className="text-sm text-white font-medium">
              {footerContent.companyTitle}
            </h3>
            <div className="flex flex-col gap-2 mt-6">
              {footerCompany.map((link) => (
                <Link key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Visit us and newsletter */}
          <div className="w-full md:w-[calc(50%-1rem)] lg:w-auto lg:flex-1 flex flex-col items-start text-left mt-4 md:mt-0">
            <h3 className="text-sm text-white font-medium">
              {footerContent.visitTitle}
            </h3>
            <p className="text-sm text-white/60 mt-4 leading-relaxed">
              {address}
            </p>

            <h3 className="text-sm text-white font-medium mt-8">
              {footerContent.newsletter.title}
            </h3>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">
              {footerContent.newsletter.description}
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex items-center border-2 gap-2 border-white/20 h-13 w-full rounded-full overflow-hidden mt-4"
            >
              <input
                type="email"
                placeholder={footerContent.newsletter.placeholder}
                required
                className="w-full h-full pl-6 outline-none text-sm bg-transparent text-white placeholder-white/60 placeholder:text-xs"
              />
              <button
                type="submit"
                className="bg-brand-pink hover:opacity-90 active:scale-95 transition w-56 h-10 rounded-full text-sm text-black cursor-pointer mr-1 focus:outline-none font-semibold"
              >
                {footerContent.newsletter.button}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full h-0.5 mt-16 mb-4 bg-linear-to-r from-[#252525]/0 via-[#252525] to-[#252525]/0" />

        {/* Bottom bar */}
        <div className="flex flex-wrap sm:flex-row items-center justify-between gap-y-4 gap-x-2 relative z-10">
          <p className="text-xs text-white/60">
            © {year} {brand}. {footerContent.rights}
          </p>
          <div className="flex items-center gap-6 text-right">
            {footerLegalLinks.map((link, i) => (
              <Fragment key={link.href}>
                {i > 0 && <div className="w-px h-4 bg-white/20" />}
                <Link
                  href={link.href}
                  className="text-xs text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </Fragment>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="w-full mt-6 md:mt-12 overflow-hidden pointer-events-none select-none"
        >
          <svg
            viewBox="0 0 600 110"
            className="w-full h-auto block"
            preserveAspectRatio="xMinYMin meet"
            focusable="false"
          >
            <text
              x="0"
              y="125"
              className="fill-neutral-900 font-extrabold"
              fontSize="170"
              letterSpacing="-8"
            >
              {wordmark}
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}