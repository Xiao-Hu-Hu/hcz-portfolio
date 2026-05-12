import { useEffect, useRef, useState } from 'react';

const nodeLabels = ['Gin', 'Gorm', 'Redis', 'RabbitMQ', 'Eino', 'RAG', 'SSE', 'ONNX'];

export function SignalMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const nodesRef = useRef<Array<{ label: string; x: number; y: number }>>([]);
  const selectedRef = useRef('Eino');
  const [selectedLabel, setSelectedLabel] = useState('Eino');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const cnv = canvas;
    const ctx = context;

    let frame = 0;
    let raf = 0;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const rect = cnv.getBoundingClientRect();
      cnv.width = Math.floor(rect.width * dpr);
      cnv.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const rect = cnv.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width * 0.5;
      const centerY = height * 0.52;
      const isLight = document.documentElement.dataset.theme === 'light';
      frame += 0.0035;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = isLight ? 'rgba(248, 250, 252, 0.78)' : 'rgba(9, 9, 9, 0.55)';
      ctx.fillRect(0, 0, width, height);

      const nodes = nodeLabels.map((label, index) => {
        const angle = (Math.PI * 2 * index) / nodeLabels.length + frame;
        const radiusX = width * (0.3 + (index % 2) * 0.05);
        const radiusY = height * (0.24 + (index % 3) * 0.025);
        let x = centerX + Math.cos(angle) * radiusX;
        let y = centerY + Math.sin(angle) * radiusY;

        if (pointerRef.current.active) {
          const dx = pointerRef.current.x - x;
          const dy = pointerRef.current.y - y;
          const distance = Math.max(Math.hypot(dx, dy), 1);
          const influence = Math.max(0, 1 - distance / 210);
          x += dx * 0.08 * influence;
          y += dy * 0.08 * influence;
        }

        return {
          label,
          x,
          y,
          hue: index % 4,
        };
      });
      nodesRef.current = nodes.map(({ label, x, y }) => ({ label, x, y }));

      const hovered = pointerRef.current.active
        ? nodes.find((node) => Math.abs(pointerRef.current.x - node.x) < 46 && Math.abs(pointerRef.current.y - node.y) < 24)
        : undefined;
      const activeLabel = hovered?.label ?? selectedRef.current;

      ctx.lineWidth = 1;
      nodes.forEach((node, index) => {
        const next = nodes[(index + 2) % nodes.length];
        const opacity = 0.15 + Math.sin(frame * 3 + index) * 0.06;
        ctx.strokeStyle = `rgba(94, 234, 212, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      });

      ctx.strokeStyle = isLight ? 'rgba(13, 148, 136, 0.38)' : 'rgba(190, 242, 100, 0.38)';
      ctx.fillStyle = isLight ? 'rgba(13, 148, 136, 0.09)' : 'rgba(190, 242, 100, 0.08)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 46 + Math.sin(frame * 2.4) * 4 + (pointerRef.current.active ? 6 : 0), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isLight ? 'rgba(15,23,42,0.88)' : 'rgba(255,255,255,0.88)';
      ctx.fillText('AI Agent', centerX, centerY - 8);
      ctx.fillStyle = isLight ? 'rgba(15,23,42,0.5)' : 'rgba(255,255,255,0.5)';
      ctx.fillText('Service Mesh', centerX, centerY + 10);

      nodes.forEach((node) => {
        const color =
          node.hue === 0 ? '94, 234, 212' : node.hue === 1 ? '190, 242, 100' : node.hue === 2 ? '251, 191, 36' : '251, 113, 133';
        const active = node.label === activeLabel;
        ctx.fillStyle = `rgba(${color}, ${active ? 0.24 : 0.13})`;
        ctx.strokeStyle = `rgba(${color}, ${active ? 0.92 : 0.62})`;
        ctx.lineWidth = active ? 1.6 : 1;
        ctx.beginPath();
        ctx.roundRect(node.x - (active ? 43 : 38), node.y - (active ? 18 : 16), active ? 86 : 76, active ? 36 : 32, 8);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = isLight ? 'rgba(15,23,42,0.86)' : 'rgba(255,255,255,0.86)';
        ctx.fillText(node.label, node.x, node.y + 1);
      });

      raf = window.requestAnimationFrame(draw);
    }

    resize();
    draw();

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

    function selectNearestNode(event: PointerEvent) {
      updatePointer(event);
      const nearest = nodesRef.current
        .map((node) => ({ ...node, distance: Math.hypot(node.x - pointerRef.current.x, node.y - pointerRef.current.y) }))
        .sort((a, b) => a.distance - b.distance)[0];
      if (nearest && nearest.distance < 72) {
        selectedRef.current = nearest.label;
        setSelectedLabel(nearest.label);
      }
    }

    cnv.addEventListener('pointermove', updatePointer);
    cnv.addEventListener('pointerleave', clearPointer);
    cnv.addEventListener('pointerdown', selectNearestNode);
    window.addEventListener('resize', resize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          raf = window.requestAnimationFrame(draw);
        } else {
          window.cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(cnv);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      cnv.removeEventListener('pointermove', updatePointer);
      cnv.removeEventListener('pointerleave', clearPointer);
      cnv.removeEventListener('pointerdown', selectNearestNode);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="signal-shell" aria-label="AI 应用工程能力图">
      <div className="signal-meta">
        <span>Hover nodes</span>
        <strong>{selectedLabel}</strong>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
}
