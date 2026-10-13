import { ViewTransition } from "react";

/**
 * Route transitions via the browser View Transitions API (React <ViewTransition>).
 * Navigations are React transitions, so the page group cross-fades and lifts in
 * (see the ".page" rules in globals.css). Unsupported browsers just swap instantly,
 * and reduced-motion users get no animation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <ViewTransition default="page">{children}</ViewTransition>;
}
