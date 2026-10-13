import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { LinkButton } from "@/components/ui/LinkButton";
import { StrokeText } from "@/components/ui/StrokeText";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[100svh] flex-col overflow-hidden bg-surface text-ink">
      <Header label="404" />
      <section className="relative flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <StrokeText
          alpha={0.18}
          width={1.5}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-syne text-[38vw] leading-none font-extrabold md:text-[22rem]"
        >
          404
        </StrokeText>
        <div className="relative">
          <h1 className="font-syne text-4xl text-ink/80 uppercase md:text-7xl">
            <span className="font-normal italic">Nothing</span> <span className="font-extrabold text-ink">here</span>
            <span className="text-accent">.</span>
          </h1>
          <p className="mx-auto mt-5 mb-10 max-w-md text-base text-ink/60 md:text-lg">
            The page you&apos;re after moved or never shipped. The work is still one click away.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <LinkButton href="/" size="lg" icon="none">
              Back home
            </LinkButton>
            <LinkButton href="/projects" size="lg" variant="outline">
              See the projects
            </LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}
