"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { BoxPointIcon, CursorIcon } from "@/components/Icons";
import { formContent, services } from "@/lib/contactItems";

const textMuted = "text-xs md:text-sm lg:text-base tracking-tight";
const iconSize = "size-3.5 md:size-4.5 shrink-0";

// shape is added per element so rounded-full never fights the textarea's radius
const fieldBase =
  "w-full border border-white/10 bg-white/5 py-2.5 text-sm md:text-base tracking-tight text-white outline-none transition placeholder:text-white/40 focus:border-white/80 focus:bg-white/[0.07]";
const inputCls = `${fieldBase} px-4 sm:px-5 rounded-full`;
const iconInputCls = `${fieldBase} pl-10 pr-4 sm:pr-5 rounded-full`;
const textareaCls = `${fieldBase} px-4 sm:px-5 resize-none rounded-3xl`;

const labelCls = "mb-1.5 block text-xs md:text-sm tracking-tight text-white";

export default function ContactForm() {
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
        <legend className={labelCls}>{formContent.services.label}</legend>
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
                {on && <BoxPointIcon fill="#757575" className={iconSize} />}
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

      <p className="text-xs text-white/50">
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
  );
}