"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { navItems, site } from "@/data/site";
import { duration, easeOutExpo, stagger } from "@/lib/motion";
import { cn, pad } from "@/lib/utils";
import { StrokeText } from "@/components/ui/StrokeText";
import { useSound } from "./SoundProvider";

type MenuCtx = { open: boolean; setOpen: (open: boolean) => void; triggerRef: React.RefObject<HTMLButtonElement | null> };

const Ctx = createContext<MenuCtx | null>(null);
const MENU_ID = "site-menu";

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpenState] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { play } = useSound();
  const pathname = usePathname();

  // Close whenever the route changes underneath the menu.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenState(false);
  }

  const setOpen = useCallback(
    (next: boolean) => {
      setOpenState(next);
      play(next ? "open" : "close");
    },
    [play],
  );

  return (
    <Ctx.Provider value={{ open, setOpen, triggerRef }}>
      {children}
      <MenuOverlay />
    </Ctx.Provider>
  );
}

function useMenu() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMenu must be used inside <MenuProvider>");
  return ctx;
}

/** The pill "Menu" trigger. `floating` pins it to the top-right corner (homepage). */
export function MenuButton({ floating = false, className }: { floating?: boolean; className?: string }) {
  const { open, setOpen, triggerRef } = useMenu();

  const button = (
    <button
      ref={triggerRef}
      type="button"
      aria-label="Open menu"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={MENU_ID}
      onClick={() => setOpen(true)}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full border border-ink/15 bg-surface/80 px-4 py-2 font-mono text-xs tracking-label text-ink/60 uppercase backdrop-blur-sm transition-colors hover:border-ink/40 hover:text-ink",
        className,
      )}
    >
      <span aria-hidden className="flex flex-col gap-[5px]">
        <span className="block h-px w-4 bg-current transition-all duration-300 group-hover:w-2.5" />
        <span className="block h-px w-2.5 bg-current transition-all duration-300 group-hover:w-4" />
      </span>
      Menu
    </button>
  );

  if (!floating) return button;
  return <div className="fixed top-5 right-5 z-[80] md:top-6 md:right-6">{button}</div>;
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuOverlay() {
  const { open, setOpen, triggerRef } = useMenu();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { play } = useSound();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Scroll lock, Escape to close, focus trap, focus return.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = prevOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [open, setOpen, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={dialogRef}
          id={MENU_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-surface"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.45, ease: easeOutExpo, delay: 0.1 } }}
          transition={{ duration: duration.slow, ease: easeOutExpo }}
        >
          <div className="gutter flex items-start justify-between gap-6 py-6 md:py-8">
            <p className="pt-2 font-mono text-xs tracking-label text-ink/40 uppercase">{site.name} — Pick a page</p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-ink/25 px-4 py-2 font-mono text-xs tracking-label text-ink uppercase transition-colors hover:border-ink/60"
            >
              <X aria-hidden className="h-4 w-4" strokeWidth={1.75} />
              Close
            </button>
          </div>

          <nav aria-label="Primary" className="gutter flex flex-1 flex-col justify-center pb-16 md:justify-start md:pt-10">
            <ul className="border-b border-ink/10">
              {navItems.map((item, i) => {
                const active = !item.external && isActive(pathname, item.href);
                const rowClass = "group flex items-center gap-5 py-5 outline-offset-[-2px] md:gap-12 md:py-6";
                const content = (
                  <>
                    <span className="w-14 shrink-0 font-syne text-xl leading-none font-extrabold md:w-20 md:text-[2rem]">
                      {active ? (
                        <span className="text-ink">{pad(i + 1)}</span>
                      ) : (
                        <StrokeText alpha={0.25} className="group-hover:[--stroke-alpha:0.6]!">
                          {pad(i + 1)}
                        </StrokeText>
                      )}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-syne leading-none uppercase transition-[color,transform] duration-500 ease-[var(--ease-out-expo)]",
                        "text-[clamp(2rem,5.2vw,4rem)]",
                        active
                          ? "font-extrabold text-ink"
                          : "font-normal text-ink/55 italic group-hover:translate-x-2 group-hover:text-ink",
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="hidden shrink-0 items-center gap-2 font-mono text-mini tracking-meta text-ink/40 uppercase transition-colors group-hover:text-ink/70 md:flex">
                      {active ? (
                        <>
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-fill" />
                          You are here
                        </>
                      ) : (
                        item.note
                      )}
                    </span>
                  </>
                );

                return (
                  <m.li
                    key={item.label}
                    className="border-t border-ink/10"
                    initial={reduce ? false : { opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16, transition: { duration: 0.2 } }}
                    transition={{ duration: duration.slow, ease: easeOutExpo, delay: 0.18 + i * stagger.base }}
                    onPointerEnter={() => play("tick")}
                  >
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
                        {content}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={rowClass}
                        onNavigate={() => setOpen(false)}
                        onClick={() => active && setOpen(false)}
                      >
                        {content}
                      </Link>
                    )}
                  </m.li>
                );
              })}
            </ul>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}
