import { useEffect, useRef } from 'react';

type ThreadPoint = {
  x: number;
  y: number;
  speed: number;
  phase: number;
  amp: number;
  hue: number;
};

export function ThreadsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const cnv = canvas;
    const ctx = context;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let width = 0;
    let height = 0;
    let time = 0;
    let threads: ThreadPoint[] = [];

    function createThreads() {
      const count = Math.max(22, Math.floor(width / 52));
      threads = Array.from({ length: count }, (_, index) => ({
        x: (index / Math.max(count - 1, 1)) * width,
        y: height * (0.18 + ((index * 37) % 64) / 100),
        speed: 0.22 + (index % 5) * 0.035,
        phase: index * 0.72,
        amp: 18 + (index % 4) * 9,
        hue: index % 3,
      }));
    }

    function resize() {
      const rect = cnv.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cnv.width = Math.floor(width * dpr);
      cnv.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createThreads();
    }

    function drawThread(thread: ThreadPoint, isLight: boolean) {
      const points = 12;
      const color =
        thread.hue === 0
          ? isLight
            ? '13, 148, 136'
            : '94, 234, 212'
          : thread.hue === 1
            ? isLight
              ? '217, 119, 6'
              : '251, 191, 36'
            : isLight
              ? '71, 85, 105'
              : '251, 113, 133';

      ctx.beginPath();
      for (let i = 0; i <= points; i += 1) {
        const progress = i / points;
        const x = thread.x + (progress - 0.5) * width * 0.46;
        const wave = Math.sin(progress * Math.PI * 2 + thread.phase + time * thread.speed) * thread.amp;
        const drift = Math.cos(time * 0.28 + thread.phase) * 22;
        let y = thread.y + wave + drift;

        if (pointerRef.current.active) {
          const dx = pointerRef.current.x - x;
          const dy = pointerRef.current.y - y;
          const distance = Math.max(Math.hypot(dx, dy), 1);
          const pull = Math.max(0, 1 - distance / 260);
          y += dy * 0.12 * pull;
        }

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = `rgba(${color}, ${isLight ? 0.13 : 0.18})`;
      ctx.lineWidth = isLight ? 0.9 : 1.05;
      ctx.stroke();
    }

    function drawDots(isLight: boolean) {
      const spacing = 44;
      ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)';
      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          const pulse = Math.sin(time * 0.5 + x * 0.02 + y * 0.018) * 0.6 + 0.8;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.55, pulse), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function draw() {
      time += 0.012;
      const isLight = document.documentElement.dataset.theme === 'light';
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = isLight ? 'rgba(247, 248, 251, 0.96)' : 'rgba(7, 7, 7, 0.96)';
      ctx.fillRect(0, 0, width, height);
      drawDots(isLight);
      threads.forEach((thread) => drawThread(thread, isLight));
      raf = window.requestAnimationFrame(draw);
    }

    function updatePointer(event: PointerEvent) {
      const rect = cnv.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    }

    function clearPointer() {
      pointerRef.current.active = false;
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', updatePointer);
    window.addEventListener('pointerleave', clearPointer);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', clearPointer);
    };
  }, []);

  return (
    <div className="threads-background" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="threads-vignette" />
    </div>
  );
}
