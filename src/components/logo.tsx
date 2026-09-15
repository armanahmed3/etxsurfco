import { cn } from "@/lib/utils";

export function Logo({
  className,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    <span className={cn("flex items-center", className)}>
      <img
        src="/images/brand/etx-logo.png"
        alt="ETX Surf Co — Whitehouse, TX"
        className="h-16 sm:h-20 w-auto"
        width={80}
        height={80}
      />
    </span>
  );
}
