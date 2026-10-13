import { cn } from "@/lib/utils";

export type ButtonVariant = "solid" | "outline" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  solid: "bg-ink text-surface hover:bg-ink/85",
  outline: "border border-ink/20 text-ink hover:bg-ink/10",
  // Solid at rest, flips to the accent fill on hover (used for the main CTAs).
  accent: "bg-ink text-surface hover:bg-accent-fill hover:text-on-accent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export function buttonClasses(variant: ButtonVariant = "solid", size: ButtonSize = "md", className?: string) {
  return cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-300",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
