"use client";

import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="absolute top-5 left-1/2 -translate-x-1/2 z-50 w-fit flex justify-center items-center gap-32 text-white/50">
      <Link href="/" className="text-white font-medium">7xGrow</Link>
      <nav className="section-style">
        <ul className="flex items-center justify-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-white transition-colors duration-300 ease-in-out"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link href="/" className="text-nowrap">Book demo</Link>
    </header>
  );
}
