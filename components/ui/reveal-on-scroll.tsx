"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export function RevealOnScroll({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = element.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={element}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        className,
        "transition-[opacity,transform] duration-700 ease-out",
        "motion-reduce:transform-none motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
