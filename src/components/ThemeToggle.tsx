import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isLight ? '切换到夜晚模式' : '切换到白天模式'}
      title={isLight ? '切换到夜晚模式' : '切换到白天模式'}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">{isLight ? <Sun size={16} /> : <Moon size={16} />}</span>
      </span>
      <span className="theme-toggle-text">{isLight ? '白天' : '夜晚'}</span>
    </button>
  );
}
