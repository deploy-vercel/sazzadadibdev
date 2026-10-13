import { pad } from "@/lib/utils";

/** "01 / The story" — accent mono label that opens every About section. */
export function SectionNumber({ n, label, id }: { n: number; label: string; id?: string }) {
  return (
    <h2 id={id} className="font-mono text-mini tracking-label text-accent uppercase">
      {pad(n)} / {label}
    </h2>
  );
}
