import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "teal",
  className,
}: {
  children: React.ReactNode;
  tone?: "teal" | "navy" | "cream" | "foam";
  className?: string;
}) {
  const tones = {
    teal: "bg-teal text-cream",
    navy: "bg-navy text-cream",
    cream: "bg-cream text-ink",
    foam: "bg-foam text-teal-3",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center h-7 px-2.5 rounded-full text-xs font-semibold tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
