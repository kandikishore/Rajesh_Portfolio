/**
 * Parenthesised eyebrow label — the source's consistent section-labelling
 * grammar: (ABOUT), (SERVICES), (TESTIMONIALS).
 */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2 ${className ?? ""}`}>
      <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
      {children}
    </span>
  );
}
