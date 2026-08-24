import Link from "next/link";

/**
 * Pill CTA with a sliding arrow, matching the source's primary button.
 */
export function ArrowButton({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-3 rounded-full px-7 py-4 text-xs font-medium uppercase tracking-wider transition-colors duration-300 ease-framer";
  const styles =
    variant === "solid"
      ? "bg-accent text-paper hover:bg-accent-dark"
      : "border border-line text-paper hover:border-accent hover:text-accent";

  return (
    <Link href={href} className={`${base} ${styles} ${className ?? ""}`}>
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 ease-framer group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}
