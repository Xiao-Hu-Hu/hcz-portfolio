import type { PropsWithChildren } from 'react';

interface SurfaceCardProps extends PropsWithChildren {
  className?: string;
}

export function SurfaceCard({ children, className = '' }: SurfaceCardProps) {
  return <div className={`surface-card ${className}`}>{children}</div>;
}
