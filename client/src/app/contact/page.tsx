"use client";

import type { ComponentType } from "react";
import {
  AtIcon,
  BoxPointIcon,
  MapPinIcon,
  SmartphoneIcon,
} from "@/components/Icons";
import { BeamBG } from "@/components/BeamBG";
import ContactForm from "@/components/ContactForm";
import {
  contactHeader,
  contactInfo,
  contactInfoTitle,
  services,
  type ContactIcon,
} from "@/lib/contactItems";

const ICONS: Record<ContactIcon, ComponentType<{ className?: string }>> = {
  mail: AtIcon,
  call: SmartphoneIcon,
  location: MapPinIcon,
};

// same sizes as HeroAbout
const iconSize = "size-3.5 md:size-4.5 shrink-0";

export default function Contact() {
  return (
    <>
      <h1 className="hero-h1-single-word-style hero-txt-top-margin-style">
        Contacts
      </h1>
      <section className="section-style horizontal-padding-style vertical-margin-style !mt-0 flex flex-col justify-center items-center">
        <div className="p-5 lg:p-10 border-4 border-[#212121] rounded-4xl overflow-hidden relative flex w-fit items-center justify-center bg-[#111111] text-white mx-auto">
          {/* background effect */}
          <div className="absolute inset-0 overflow-hidden">
            <BeamBG beamPosition="top-center" />
          </div>

          {/* content */}
          <div className="relative z-10 grid w-full max-w-5xl gap-10 md:gap-5 md:grid-cols-2">
            {/* left */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-semibold tracking-tighter leading-none">
                {contactHeader.title}
              </h2>
              <p className="mt-4 max-w-sm text-sm md:text-base tracking-tight leading-none text-white/50">
                {contactHeader.description}
              </p>

              {/* checklist */}
              <ul className="mt-6 flex flex-col gap-1">
                {services.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center gap-1.5 text-white/50 text-xs md:text-sm lg:text-base"
                  >
                    <BoxPointIcon fill="#757575" className={iconSize} />
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>

              {/* contact info */}
              <h2 className="mt-10 text-sm md:text-base lg:text-lg font-semibold tracking-tight leading-none text-white/50">
                {contactInfoTitle}
              </h2>
              <ul className="mt-3 flex flex-col gap-3">
                {contactInfo.map((item) => {
                  const Icon = ICONS[item.icon];
                  return (
                    <li key={item.id} className="flex items-center gap-2.5">
                      <Icon className={`${iconSize} text-[#757575]`} />
                      <div className="text-xs md:text-sm tracking-tight leading-none">
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-white font-medium hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-white font-medium">{item.value}</p>
                        )}
                        {item.extraLines?.map((line) => (
                          <p key={line} className="text-white">
                            {line}
                          </p>
                        ))}
                        <p className="text-white/50 text-xs">{item.label}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* right: form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}