import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        ink: '#070707',
        panel: '#111111',
        line: 'rgba(255,255,255,0.12)',
        cyanx: '#5eead4',
        limex: '#bef264',
        amberx: '#fbbf24',
        rosex: '#fb7185',
      },
      boxShadow: {
        glow: '0 0 46px rgba(94, 234, 212, 0.18)',
        card: '0 18px 70px rgba(0, 0, 0, 0.38)',
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
} satisfies Config;
