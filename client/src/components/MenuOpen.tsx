import { navItems } from "@/lib/navItems";
import Link from "next/link";

type Props = {
  isOpen: boolean;
};

export function MenuOpen({ isOpen }: Props) {
  return (
    <section
      className={`fixed top-0 left-0 w-full h-svh bg-white z-40 transition-transform duration-700 ease-out ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="h-full flex items-center justify-center">
        <ul className="flex flex-col items-center gap-6 text-xl text-black font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
