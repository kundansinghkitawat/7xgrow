import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function SubHeadings({ children, className }: Props) {
  return (
    <p
      className={`relative mt-5 md:mt-2.5 w-full md:mx-auto md:max-w-lg text-left md:text-center text-sm sm:text-base lg:text-lg leading-snug tracking-tight text-white mix-blend-difference ${className}`}
    >
      {children}
    </p>
  );
}
