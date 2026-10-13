import { sayHello } from "@/data/about";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/LinkButton";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { SectionNumber } from "./SectionNumber";

export function SayHello() {
  return (
    <section
      id="sec-hello"
      className="relative scroll-mt-6 px-6 pt-24 pb-28 md:px-12 lg:px-16 lg:pt-32 lg:pb-36"
      aria-labelledby="sec-hello-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_30%_100%,rgb(var(--c-accent-fill)/0.06),transparent_70%)]"
      />
      <Reveal className="relative">
        <SectionNumber n={5} label="Say hello" />
        <SplitHeading
          id="sec-hello-title"
          thin={sayHello.thin}
          bold={sayHello.bold}
          stacked
          accentDot
          className="mt-10 text-[clamp(2.25rem,4.2vw,4.5rem)]"
        />
        <p className="mt-7 max-w-lg text-base leading-relaxed text-ink/60 md:text-[16.5px]">{sayHello.body}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <LinkButton href="/contact" variant="accent" size="lg">
            Say hello
          </LinkButton>
          <LinkButton href="/projects" variant="outline" size="lg" icon="none">
            See the projects
          </LinkButton>
        </div>
      </Reveal>
    </section>
  );
}
