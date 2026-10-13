import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn, isExternal } from "@/lib/utils";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./Button";

type Icon = "up-right" | "right" | "none";

function ArrowIcon({ icon, className }: { icon: Icon; className?: string }) {
  if (icon === "none") return null;
  const Comp = icon === "right" ? ArrowRight : ArrowUpRight;
  return (
    <Comp
      aria-hidden
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-300",
        icon === "right" ? "group-hover:translate-x-0.5" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
        className,
      )}
    />
  );
}

/** Smart anchor: next/link for internal routes, new tab for external URLs. */
export function SmartLink({
  href,
  children,
  className,
  ...rest
}: { href: string; children: React.ReactNode; className?: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (isExternal(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    const external = isExternal(href);
    return (
      <a href={href} className={className} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

/** Pill-shaped link styled as a button. */
export function LinkButton({
  href,
  children,
  variant = "solid",
  size = "md",
  icon = "up-right",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: Icon;
  className?: string;
}) {
  return (
    <SmartLink href={href} className={buttonClasses(variant, size, className)}>
      {children}
      <ArrowIcon icon={icon} />
    </SmartLink>
  );
}

/** Small mono uppercase text link ("Visit live ↗"). */
export function MonoLink({
  href,
  children,
  icon = "up-right",
  className,
}: {
  href: string;
  children: React.ReactNode;
  icon?: Icon;
  className?: string;
}) {
  return (
    <SmartLink
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 font-mono text-xs tracking-meta text-ink/50 uppercase transition-colors hover:text-ink",
        className,
      )}
    >
      {children}
      <ArrowIcon icon={icon} className="h-3.5 w-3.5" />
    </SmartLink>
  );
}
