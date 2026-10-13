/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Zero-pad a number: 1 -> "01". */
export function pad(n: number, width = 2) {
  return String(n).padStart(width, "0");
}

/** True for absolute http(s) links. */
export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}
