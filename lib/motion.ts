/**
 * The site's motion language. Every animated component pulls its timing
 * from here so the whole site moves as one system.
 */

/** Long, soft deceleration — the default for reveals and entrances. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Gentle symmetric curve for things that loop or cross-fade. */
export const easeInOut = [0.45, 0.05, 0.55, 0.95] as const;

/** Plain ease-out for small UI feedback. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.3,
  base: 0.5,
  slow: 0.8,
  hero: 0.9,
} as const;

export const stagger = {
  tight: 0.035,
  base: 0.08,
  loose: 0.12,
} as const;

/** Distance (px) that content travels while revealing. */
export const revealOffset = 24;

/** Viewport options shared by every scroll-triggered reveal. */
export const viewportOnce = { once: true, margin: "0px 0px -10% 0px" } as const;
