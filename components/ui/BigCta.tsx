import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "./LinkButton";
import { StrokeText } from "./StrokeText";

/** Closing call-to-action: outlined backdrop word, thin/bold headline, two buttons. */
export function BigCta({
  backdrop,
  thin,
  bold,
  body,
  primary,
  secondary,
  className = "",
}: {
  backdrop: string;
  thin: string;
  bold: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  className?: string;
}) {
  return (
    <section
      className={`relative flex flex-col items-center justify-center overflow-hidden border-t border-ink/10 px-6 text-center ${className}`}
    >
      <StrokeText
        alpha={0.18}
        width={1.5}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-syne text-[32vw] leading-none font-extrabold whitespace-nowrap md:text-[20rem]"
      >
        {backdrop}
      </StrokeText>
      <Reveal className="relative z-10">
        <h2 className="mb-4 font-syne text-4xl text-ink/80 uppercase md:text-7xl">
          <span className="font-normal italic">{thin} </span>
          <span className="font-extrabold text-ink not-italic">{bold}</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-base text-ink/60 md:text-lg">{body}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <LinkButton href={primary.href} size="lg">
            {primary.label}
          </LinkButton>
          {secondary && (
            <LinkButton href={secondary.href} size="lg" variant="outline" icon="none">
              {secondary.label}
            </LinkButton>
          )}
        </div>
      </Reveal>
    </section>
  );
}
