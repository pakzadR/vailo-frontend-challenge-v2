import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...props }: IconProps) {
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

export function SparkleIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, strokeWidth: 2, ...props })}>
      <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z" />
    </svg>
  );
}

export function WandIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M15 9h.01M17.8 6.2L19 5M3 21l9-9M12.2 6.2L11 5" />
    </svg>
  );
}

export function GridIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function MoonIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
    </svg>
  );
}

export function SunIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function ShuffleIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
    </svg>
  );
}

export function InfoIcon({ size = 13, ...props }: IconProps) {
  return (
    <svg {...base({ size, strokeWidth: 2, ...props })}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 15, ...props }: IconProps) {
  return (
    <svg {...base({ size, strokeWidth: 2, ...props })}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function CheckIcon({ size = 15, ...props }: IconProps) {
  return (
    <svg {...base({ size, strokeWidth: 2.4, ...props })}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function DownloadIcon({ size = 15, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

export function ExpandIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M15 3h6v6M14 10l7-7M9 21H3v-6M10 14l-7 7" />
    </svg>
  );
}

export function RetryIcon({ size = 15, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
    </svg>
  );
}

export function TrashIcon({ size = 14, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6" />
    </svg>
  );
}

export function SearchIcon({ size = 15, ...props }: IconProps) {
  return (
    <svg {...base({ size, strokeWidth: 2, ...props })}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" />
    </svg>
  );
}

export function AlertIcon({ size = 14, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M10.3 3.9l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 14, ...props }: IconProps) {
  return (
    <svg {...base({ size, strokeWidth: 2, ...props })}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CloseIcon({ size = 15, ...props }: IconProps) {
  return (
    <svg {...base({ size, strokeWidth: 2, ...props })}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function HistoryIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
