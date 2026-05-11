import type { PropsWithChildren } from 'react';
import { useRef } from 'react';

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
}

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const target = ref.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    target.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}
