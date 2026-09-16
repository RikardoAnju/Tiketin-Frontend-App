"use client";

import { ReactNode } from "react";

export function ScrollFade({ children, animation }: { children: ReactNode; animation?: string }) {
  return <div className={`animate-${animation || "fade"}-view in-view`}>{children}</div>;
}
