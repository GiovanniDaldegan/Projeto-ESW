// Ícones simples em SVG (herdam a cor do texto via currentColor)
type IconeProps = { className?: string };

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

export function IconeMais({ className = 'h-4 w-4' }: IconeProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconeLapis({ className = 'h-4 w-4' }: IconeProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export function IconeLixeira({ className = 'h-4 w-4' }: IconeProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
    </svg>
  );
}

export function IconeVoltar({ className = 'h-4 w-4' }: IconeProps) {
  return (
    <svg {...base} className={className}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export function IconeRaio({ className = 'h-6 w-6' }: IconeProps) {
  return (
    <svg {...base} className={className}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </svg>
  );
}
