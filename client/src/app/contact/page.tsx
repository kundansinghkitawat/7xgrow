"use client";

import { useState, type ComponentType, type FormEvent } from "react";
import Link from "next/link";
import {
  AtIcon,
  BoxPointIcon,
  CursorIcon,
  MapPinIcon,
  SmartphoneIcon,
} from "@/components/Icons";
import { BeamBG } from "@/components/BeamBG";
import {
  contactHeader,
  contactInfo,
  contactInfoTitle,
  formContent,
  services,
  type ContactIcon,
} from "@/lib/contactItems";

const ICONS: Record<ContactIcon, ComponentType<{ className?: string }>> = {
  mail: AtIcon,
  call: SmartphoneIcon,
  location: MapPinIcon,
};

// same sizes as HeroAbout
const textMuted = "text-xs md:text-sm lg:text-base tracking-tight";
const iconSize = "size-3.5 md:size-4.5 shrink-0";

// shape is added per element so rounded-full never fights the textarea's radius
const fieldBase =
  "w-full border border-white/10 bg-white/5 py-2.5 text-sm md:text-base tracking-tight text-white outline-none transition placeholder:text-white/40 focus:border-white/80 focus:bg-white/[0.07]";
const inputCls = `${fieldBase} px-4 sm:px-5 rounded-full`;
const iconInputCls = `${fieldBase} pl-10 pr-4 sm:pr-5 rounded-full`;
const textareaCls = `${fieldBase} px-4 sm:px-5 resize-none rounded-3xl`;

const labelCls = "mb-1.5 block text-xs md:text-sm tracking-tight text-white";

export default function Contact() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggleService = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const payload = { ...data, services: selected };
    // TODO: send `payload` to your API route / email service
    console.log(payload);
    setSent(true);
  };

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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="block">
                <span className={labelCls}>{formContent.fullName.label}</span>
                <input
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={formContent.fullName.placeholder}
                  className={inputCls}
                />
              </label>

              <label className="block">
                <span className={labelCls}>{formContent.workEmail.label}</span>
                <input
                  name="workEmail"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={formContent.workEmail.placeholder}
                  className={inputCls}
                />
              </label>

              <label className="block">
                <span className={labelCls}>{formContent.website.label}</span>
                <span className="relative block">
                  <CursorIcon
                    className={`${iconSize} pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 rotate-90 text-[#757575]`}
                  />
                  <input
                    name="website"
                    type="url"
                    autoComplete="url"
                    placeholder={formContent.website.placeholder}
                    className={iconInputCls}
                  />
                </span>
              </label>

              <fieldset>
                <legend className={labelCls}>
                  {formContent.services.label}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => {
                    const on = selected.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleService(s.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.75 md:px-3 md:py-1.5 text-xs md:text-sm tracking-tight font-medium transition focus:outline-none ${
                          on
                            ? "border-white bg-white text-black"
                            : "border-white/15 bg-white/5 text-white/50 hover:border-white/35 hover:text-white"
                        }`}
                      >
                        {on && (
                          <BoxPointIcon fill="#757575" className={iconSize} />
                        )}
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="block">
                <span className={labelCls}>{formContent.goals.label}</span>
                <textarea
                  name="goals"
                  rows={4}
                  placeholder={formContent.goals.placeholder}
                  className={textareaCls}
                />
              </label>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-full bg-white px-4 py-2 sm:px-5 text-sm sm:text-base font-medium tracking-tight text-black transition hover:bg-white/90 focus:outline-none"
              >
                {formContent.submit}
              </button>

              {sent && (
                <p role="status" className={`${textMuted} text-white/70`}>
                  {formContent.success}
                </p>
              )}

              <p className={`text-xs text-white/50`}>
                {formContent.privacyText}{" "}
                <Link
                  href={formContent.privacyHref}
                  className="text-white underline underline-offset-2"
                >
                  {formContent.privacyLabel}
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
