import React from "react";

type Props = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export default function Section({ children, id, className = "" }: Props) {
  return (
    <section
      id={id}
      className={`px-6 md:px-12 py-20 md:py-24 max-w-[1400px] mx-auto ${className}`}
    >
      {children}
    </section>
  );
}
