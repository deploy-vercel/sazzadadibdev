"use client";

import Image from "next/image";
import { m, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { heroCopy, introCopy } from "@/data/home";
import { site } from "@/data/site";
import { useIntro } from "@/components/layout/IntroProvider";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { StatusDot } from "@/components/ui/Badge";
import { easeOutExpo } from "@/lib/motion";
import { HeroDecor } from "./HeroDecor";

const PORTRAIT = "/images/portrait.webp";

type Geometry = { dx: number; dy: number; scale: number };

/** Clamped linear map from [i0, i1] to [o0, o1]. */
function mapRange(v: number, i0: number, i1: number, o0: number, o1: number) {
  const t = Math.min(1, Math.max(0, (v - i0) / (i1 - i0)));
  return o0 + (o1 - o0) * t;
}

/**
 * Desktop hero (lg+). A 220vh section with a sticky stage:
 *  1. The headline builds itself letter by letter once the intro finishes.
 *  2. Scrolling lifts the headline away while the tiny portrait inside
 *     "AI DEVEL[■]OPER" travels to the centre and grows into the intro card.
 *  3. "Hey!" and the bio fade in on either side of the portrait.
 */
export function Hero({ ticker }: { ticker: React.ReactNode }) {
  const { done: play } = useIntro();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // Geometry lives in a MotionValue so updating it re-drives the transforms without a re-render.
  const geo = useMotionValue<Geometry | null>(null);
  const [measured, setMeasured] = useState(false);
  const [slotIn, setSlotIn] = useState(false);
  // The travelling portrait takes over from the slot image once both are ready.
  const handoff = measured && (slotIn || Boolean(reduce));

  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const heroOpacity = useTransform(p, [0, 0.3], [1, 0]);
  const heroY = useTransform(p, [0, 0.3], [0, -40]);
  const decorOpacity = useTransform(p, [0, 0.22], [1, 0]);
  const introOpacity = useTransform(p, [0.45, 0.75], [0, 1]);
  const introY = useTransform(p, [0.45, 0.75], [54, 0]);
  const portraitRef = useRef<HTMLDivElement>(null);

  // The portrait's path depends on geometry measured after mount, so it's written
  // straight to the element whenever scroll progress or geometry changes.
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    const apply = () => {
      const g = geo.get();
      if (!g) return;
      const v = p.get();
      const x = mapRange(v, 0.04, 0.55, g.dx, 0);
      const y = mapRange(v, 0.04, 0.55, g.dy, 0);
      const s = mapRange(v, 0.04, 0.55, g.scale, 1);
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
    };
    apply();
    const offProgress = p.on("change", apply);
    const offGeo = geo.on("change", apply);
    return () => {
      offProgress();
      offGeo();
    };
  }, [p, geo]);

  // Measure where the inline slot sits relative to the centred portrait card.
  useLayoutEffect(() => {
    function measure() {
      const stage = stageRef.current;
      const slot = slotRef.current;
      const card = cardRef.current;
      if (!stage || !slot || !card || stage.offsetParent === null) return;
      const s = stage.getBoundingClientRect();
      const r = slot.getBoundingClientRect();
      const lift = heroY.get();
      geo.set({
        dx: r.left + r.width / 2 - (s.left + s.width / 2),
        dy: r.top - lift + r.height / 2 - (s.top + s.height / 2),
        // offsetWidth ignores the slot's own entrance scale; the rect centre is scale-invariant.
        scale: slot.offsetWidth / card.offsetWidth,
      });
      setMeasured(true);
    }
    measure();
    void document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [geo, heroY]);

  const fadeUp = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 14 } as const),
    animate: play ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: easeOutExpo, delay },
  });

  return (
    <section ref={sectionRef} className="relative hidden h-[220vh] bg-surface-2 lg:block" aria-labelledby="hero-title">
      <div ref={stageRef} className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />

        {/* 1 — headline */}
        <m.div className="absolute inset-0 z-10 flex flex-col" style={{ opacity: heroOpacity, y: heroY }}>
          <h1 id="hero-title" className="sr-only">
            {site.title}
          </h1>
          <div className="flex min-h-0 flex-1 flex-col justify-center px-10 xl:px-14">
            <m.div
              data-reveal
              className="flex flex-wrap items-baseline justify-between gap-6 px-1 font-mono text-xs text-ink/50 uppercase"
              initial={reduce ? false : { opacity: 0 }}
              animate={play ? { opacity: 1 } : undefined}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="tracking-[0.32em]">{heroCopy.eyebrowLeft}</span>
              <span className="flex items-center gap-2.5 tracking-[0.24em]">
                <StatusDot />
                {heroCopy.eyebrowRight}
              </span>
            </m.div>

            <div
              aria-hidden
              className="mt-7 w-full font-syne leading-[0.86] font-extrabold uppercase"
              style={{ fontKerning: "none", letterSpacing: "0.005em" }}
            >
              <TextReveal
                text={heroCopy.lineOne}
                split="chars"
                trigger="manual"
                play={play}
                delay={0.2}
                className="flex text-[min(9vw,150px)] text-ink"
                unitClassName="pb-[0.04em]"
              />
              <span className="flex items-center text-[min(6.6vw,113px)]" style={{ columnGap: "1.5vw" }}>
                <TextReveal
                  text={heroCopy.lineTwoPre}
                  split="chars"
                  trigger="manual"
                  play={play}
                  delay={0.4}
                  className="text-stroke inline-flex [--stroke-alpha:0.6] [--stroke-width:1.5px]"
                />
                <TextReveal
                  text={heroCopy.lineTwoA}
                  split="chars"
                  trigger="manual"
                  play={play}
                  delay={0.45}
                  className="text-stroke inline-flex [--stroke-alpha:0.6] [--stroke-width:1.5px]"
                />
                <m.span
                  data-reveal
                  ref={slotRef}
                  className="relative block h-[6vw] w-[6vw] flex-none overflow-hidden rounded-[0.6vw] border border-ink/15"
                  initial={reduce ? false : { scale: 0 }}
                  animate={play ? { scale: 1 } : undefined}
                  transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.7 }}
                  onAnimationComplete={() => setSlotIn(true)}
                >
                  <Image
                    src={PORTRAIT}
                    alt=""
                    fill
                    sizes="6vw"
                    className="object-cover grayscale transition-opacity duration-300"
                    style={{ opacity: handoff ? 0 : 1 }}
                  />
                </m.span>
                <span className="inline-flex items-baseline">
                  <TextReveal
                    text={heroCopy.lineTwoB}
                    split="chars"
                    trigger="manual"
                    play={play}
                    delay={0.75}
                    className="text-stroke inline-flex [--stroke-alpha:0.6] [--stroke-width:1.5px]"
                  />
                  <m.span
                    data-reveal
                    className="inline-block text-accent"
                    initial={reduce ? false : { scale: 0 }}
                    animate={play ? { scale: 1 } : undefined}
                    transition={{ duration: 0.6, ease: easeOutExpo, delay: 1.05 }}
                  >
                    .
                  </m.span>
                </span>
              </span>
            </div>
            <p className="sr-only">{site.role}</p>

            <div className="mt-[clamp(28px,3.5vh,52px)] flex flex-wrap items-end justify-between gap-10 px-1">
              <m.p data-reveal className="max-w-md text-[clamp(15px,1.2vw,18px)] leading-relaxed text-ink/60" {...fadeUp(1.0)}>
                {heroCopy.lead}
              </m.p>
              <m.div data-reveal {...fadeUp(1.1)}>
                <a href="#projects" className="group flex items-center gap-4 font-mono text-xs tracking-[0.22em] text-ink uppercase">
                  <span className="border-b border-ink/40 pb-1.5 transition-colors group-hover:border-ink">{heroCopy.cta}</span>
                  <Magnetic>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 text-[15px] text-accent transition-colors group-hover:border-ink/60">
                      ↓
                    </span>
                  </Magnetic>
                </a>
              </m.div>
            </div>
          </div>
          <m.div
            data-reveal
            initial={reduce ? false : { opacity: 0 }}
            animate={play ? { opacity: 1 } : undefined}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {ticker}
          </m.div>
        </m.div>

        {/* 2 — draggable objects */}
        <m.div className="pointer-events-none absolute inset-0 z-20" style={{ opacity: decorOpacity }}>
          <HeroDecor play={play} />
        </m.div>

        {/* 3 — intro copy around the portrait */}
        <m.div className="absolute inset-0 z-10" style={{ opacity: introOpacity, y: introY }}>
          <div className="absolute top-1/2 left-[7%] max-w-[18rem] -translate-y-1/2">
            <h2 className="font-syne text-7xl leading-none font-extrabold text-ink">{introCopy.hello}</h2>
            <p className="mt-10 text-lg leading-snug font-semibold text-ink">{introCopy.lead}</p>
          </div>
          <div className="absolute top-1/2 right-[7%] max-w-[19rem] -translate-y-1/2">
            <p className="text-base leading-relaxed text-ink/70">{introCopy.body}</p>
            <p className="mt-4 text-sm font-medium tracking-wide text-ink/50">{introCopy.stack}</p>
            <a href="#contact" className="group mt-6 inline-flex items-center gap-2 text-base font-semibold text-ink">
              {introCopy.cta}
              <span
                aria-hidden
                className="grid h-7 w-7 place-items-center rounded-full border border-ink/20 transition group-hover:bg-ink group-hover:text-surface"
              >
                ↗
              </span>
            </a>
          </div>
        </m.div>

        {/* 4 — the travelling portrait */}
        <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center">
          <div ref={portraitRef} className="will-change-transform" style={{ opacity: handoff ? 1 : 0 }}>
            <div
              ref={cardRef}
              className="relative h-[min(74vh,380px)] w-[min(74vh,380px)] overflow-hidden rounded-[1.5rem] border border-ink/15"
            >
              <Image
                src={PORTRAIT}
                alt={`Portrait of ${site.name}`}
                fill
                sizes="380px"
                loading="eager"
                fetchPriority="high"
                className="object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
