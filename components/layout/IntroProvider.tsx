"use client";

import { createContext, useContext, useState } from "react";

type IntroCtx = { done: boolean; finish: () => void };

const Ctx = createContext<IntroCtx>({ done: true, finish: () => {} });

/** Lets the homepage hero wait for the "hello" intro before it animates in. */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  return <Ctx.Provider value={{ done, finish: () => setDone(true) }}>{children}</Ctx.Provider>;
}

export const useIntro = () => useContext(Ctx);
