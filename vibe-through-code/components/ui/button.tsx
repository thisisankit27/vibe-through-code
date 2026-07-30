import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Four variants, three sizes. The previous version had 6 × 9 and zero
 * imports, so every button on the site was hand-rolled — /admin alone
 * reimplemented the same style four ways.
 *
 * Rules from DESIGN.md this encodes:
 *   - exactly one `primary` per viewport
 *   - buttons never lift, scale, or shadow; border and surface shift
 *   - focus comes from the global :focus-visible, so there is one ring
 */
const buttonVariants = cva(
  cn(
    "group/button inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-md border bg-clip-padding font-medium whitespace-nowrap select-none",
    "transition-colors duration-100 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        /** The single most important action in a view. */
        primary:
          "border-transparent bg-accent text-ink-on-accent hover:bg-accent/90",
        /** Default for everything else. A ruled rectangle. */
        ruled:
          "border-rule-standard bg-surface-raised text-ink-primary hover:border-accent/40 hover:bg-surface-hover",
        /** No container until hovered. */
        ghost:
          "border-transparent bg-transparent text-ink-secondary hover:bg-surface-hover hover:text-ink-primary",
        /** Inline, reads as text. */
        link: "border-transparent bg-transparent px-0 text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-meta [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-10 px-4 text-meta [&_svg:not([class*='size-'])]:size-4",
        lg: "h-12 px-6 text-body [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "ruled",
      size: "md",
    },
  }
)

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ButtonPrimitive> &
  VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
