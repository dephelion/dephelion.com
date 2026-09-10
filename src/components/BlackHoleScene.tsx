'use client';

import { useEffect, useRef } from 'react';
import { initBlackHoleScene } from '@/lib/space';

export default function BlackHoleScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return initBlackHoleScene(canvas);
  }, []);

  return <canvas id="space" aria-hidden="true" ref={canvasRef} />;
}
