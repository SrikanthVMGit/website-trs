import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScoopCanvasProps {
  src: string;
  size?: number;
  scrollContainer: HTMLElement | null;
  direction?: 1 | -1; // 1 = clockwise, -1 = counter-clockwise
}

export default function ScoopCanvas({
  src,
  size = 150,
  scrollContainer,
  direction = 1,
}: ScoopCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef({ deg: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !scrollContainer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    img.src = src;

    function draw(angle: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.beginPath();
      ctx.arc(0, 0, canvas.width / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
      ctx.restore();
    }

    img.onload = () => draw(0);

    // Find the scoopSection ancestor
    const section = canvas.closest('[data-scoop-section]') as HTMLElement;
    const trigger = section ?? scrollContainer;

    const anim = gsap.to(angleRef.current, {
      deg: direction * 120, // Reduced from 360 to 120 for a very slow, premium twist
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5, // Increased scrub smoothing from 1 to 1.5
        scroller: scrollContainer,
        onUpdate: () => {
          draw(angleRef.current.deg);
        },
      },
    });

    return () => {
      anim.kill();
    };
  }, [src, size, scrollContainer, direction]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: 'block', borderRadius: '50%' }}
    />
  );
}
