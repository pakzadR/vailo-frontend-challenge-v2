import type { ReactElement, SVGProps } from 'react';

export type IconName = 'sparkle' | 'zap' | 'sparkles' | 'grid';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  };
}

export function SparkleIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base({ size, strokeWidth: 2, ...props })}>
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base({ size, strokeWidth: 2, ...props })}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlayIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function CheckIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base({ size, strokeWidth: 2.4, ...props })}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function MoonIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
    </svg>
  );
}

export function SunIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function ZapIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

export function SparklesIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5L19 19M19 5l-2.5 2.5M7.5 16.5L5 19" />
    </svg>
  );
}

export function GridIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

const FEATURE_ICONS: Record<IconName, (props: IconProps) => ReactElement> = {
  sparkle: SparkleIcon,
  zap: ZapIcon,
  sparkles: SparklesIcon,
  grid: GridIcon,
};

export function FeatureIcon({ name, ...props }: IconProps & { name: IconName }) {
  const Cmp = FEATURE_ICONS[name];
  return <Cmp {...props} />;
}
