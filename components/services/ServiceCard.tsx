import type { Service } from "@/data/services";

/** Expanded body of a service: pitch on the left, deliverables grid on the right. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="mx-auto grid max-w-site items-start gap-10 px-6 pt-2 pb-12 md:px-12 md:pb-16 lg:grid-cols-2 lg:gap-16">
      <div className="lg:pl-20">
        <div aria-hidden className="h-[3px] w-11 bg-accent-fill" />
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 md:text-lg">{service.description}</p>
        <p className="mt-7 font-mono text-xs tracking-meta text-ink/40 uppercase">{service.path}</p>
      </div>
      <ul className="grid grid-cols-1 border-t border-l border-ink/14 sm:grid-cols-2">
        {service.features.map((f, i) => (
          <li key={f} className="flex flex-col gap-3 border-r border-b border-ink/14 px-5 py-6 transition-colors hover:bg-ink/3">
            <span className="font-mono text-micro text-accent">A{i + 1}</span>
            <span className="text-body font-medium text-ink/85">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
