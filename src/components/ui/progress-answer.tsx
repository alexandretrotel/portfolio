"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface ExtendedProgressProps extends ProgressPrimitive.ProgressProps {
  isCorrect: boolean;
}

const ProgressAnswer = React.forwardRef<HTMLDivElement, ExtendedProgressProps>(
  ({ className, isCorrect, value, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full",
        isCorrect ? "bg-green-200" : "bg-red-200",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          isCorrect ? "bg-green-600" : "bg-red-600"
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
);
ProgressAnswer.displayName = ProgressPrimitive.Root.displayName;

export { ProgressAnswer };
