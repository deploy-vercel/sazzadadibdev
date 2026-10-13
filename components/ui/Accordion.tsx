"use client";

import { createContext, useContext, useId, useState } from "react";
import { cn } from "@/lib/utils";

type AccordionCtx = {
  open: number | null;
  toggle: (index: number) => void;
};

const Ctx = createContext<AccordionCtx | null>(null);

/** Single-open accordion group. Items read and toggle the open index from context. */
export function Accordion({
  children,
  defaultOpen = 0,
  className,
}: {
  children: React.ReactNode;
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const toggle = (index: number) => setOpen((cur) => (cur === index ? null : index));

  return (
    <Ctx.Provider value={{ open, toggle }}>
      <div className={className}>{children}</div>
    </Ctx.Provider>
  );
}

/** Returns open state and wiring for one accordion item. */
export function useAccordionItem(index: number) {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAccordionItem must be used inside <Accordion>");
  const id = useId();
  const isOpen = ctx.open === index;
  return {
    isOpen,
    buttonProps: {
      type: "button" as const,
      "aria-expanded": isOpen,
      "aria-controls": `${id}-panel`,
      id: `${id}-button`,
      onClick: () => ctx.toggle(index),
    },
    panelProps: {
      id: `${id}-panel`,
      role: "region" as const,
      "aria-labelledby": `${id}-button`,
    },
  };
}

/**
 * Height animation without measuring: the grid row transitions from 0fr to 1fr,
 * so content never jumps and nothing is computed in JS.
 */
export function AccordionPanel({
  isOpen,
  children,
  className,
  ...panelProps
}: {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
} & ReturnType<typeof useAccordionItem>["panelProps"]) {
  return (
    <div
      {...panelProps}
      className={cn(
        "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
      inert={!isOpen}
    >
      <div className={cn("overflow-hidden", className)}>{children}</div>
    </div>
  );
}
