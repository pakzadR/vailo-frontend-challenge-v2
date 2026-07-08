import type { ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

export function Tooltip({
  label,
  side = 'top',
  children,
}: {
  label: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
}) {
  return (
    <RadixTooltip.Root delayDuration={300}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          sideOffset={6}
          className="z-50 max-w-[240px] rounded-lg border border-border bg-elevated px-3 py-1.5 text-xs leading-relaxed text-foreground shadow-lg"
        >
          {label}
          <RadixTooltip.Arrow className="fill-elevated" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}

export const TooltipProvider = RadixTooltip.Provider;
