import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-teal text-cream hover:bg-teal-2 active:bg-teal-3",
        invert:
          "bg-cream text-navy hover:bg-foam",
        navy: "bg-navy text-cream hover:bg-navy-2",
        outline:
          "border border-line bg-transparent text-ink hover:bg-paper-2",
        ghost: "text-cream hover:bg-navy-3",
        ghostDark: "text-ink hover:bg-paper-2",
        link: "text-teal underline-offset-4 hover:underline px-0 h-auto",
      },
      size: {
        sm: "h-10 px-4 text-sm rounded-md",
        md: "h-11 px-5 text-sm rounded-md",
        lg: "h-12 px-6 text-base rounded-lg",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
