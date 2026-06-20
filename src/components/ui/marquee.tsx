"use client";

import * as React from "react";
import { Marquee as ArkMarquee } from "@ark-ui/react/marquee";

export interface MarqueeProps extends React.ComponentPropsWithoutRef<typeof ArkMarquee.Root> {
  orientation?: "horizontal" | "vertical";
  speed?: number;
  spacing?: string;
  showEdges?: boolean;
  autoFill?: boolean;
  pauseOnInteraction?: boolean;
  reverse?: boolean;
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      children,
      orientation = "horizontal",
      speed = 50,
      spacing = "16px",
      showEdges = true,
      autoFill = false,
      pauseOnInteraction = false,
      reverse = false,
      className,
      ...props
    },
    ref
  ) => {
    // Le composant ArkMarquee.Root gère les propriétés sous-jacentes (speed, spacing, etc.)
    return (
      <ArkMarquee.Root
        ref={ref}
        side={(orientation === "vertical" ? "top" : "left") as any}
        speed={speed}
        spacing={spacing}
        autoFill={autoFill}
        pauseOnInteraction={pauseOnInteraction}
        reverse={reverse}
        className={`group relative overflow-hidden flex w-full ${
          showEdges
            ? "[mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]"
            : ""
        } ${className || ""}`}
        {...props}
      >
        <ArkMarquee.Viewport className="flex w-full overflow-hidden">
          {children}
        </ArkMarquee.Viewport>
      </ArkMarquee.Root>
    );
  }
);
Marquee.displayName = "Marquee";

export const MarqueeContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ArkMarquee.Content>
>(({ className, ...props }, ref) => (
  <ArkMarquee.Content
    ref={ref}
    className={`flex shrink-0 min-w-full justify-around gap-[var(--marquee-spacing)] ${
      // L'animation s'applique différemment selon la direction de déplacement
      "animate-marquee-x"
    } [animation-play-state:var(--marquee-play-state)] ${className || ""}`}
    {...props}
  />
));
MarqueeContent.displayName = "MarqueeContent";

export const MarqueeItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ArkMarquee.Item>
>(({ className, ...props }, ref) => (
  <ArkMarquee.Item
    ref={ref}
    className={`flex items-center justify-center shrink-0 ${className || ""}`}
    {...props}
  />
));
MarqueeItem.displayName = "MarqueeItem";
