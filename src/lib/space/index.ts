import * as THREE from 'three';
import { createFpsMeter } from '../fps';
import { CONFIG } from './config';
import { createInput } from './input';
import type { SceneBody } from './types';
import { buildStarField } from './bodies/star-field';
import { buildGalaxy } from './bodies/galaxy';
import { buildNebula } from './bodies/nebula';
import { buildBlackHole } from './bodies/black-hole';
import { buildMeteorField } from './bodies/meteor-field';

export interface BlackHoleSceneOptions {
  onFps?: (fps: number) => void;
}

// Builds the WebGL scene onto `canvas` and starts its loop; returns a cleanup
// that stops it and frees GPU resources. No-ops without WebGL (CSS fallback).
export function initBlackHoleScene(
  canvas: HTMLCanvasElement,
  options: BlackHoleSceneOptions = {},
): () => void {
  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  CONFIG.starCount = reduceMotion ? 3500 : 7000;
  CONFIG.drift = reduceMotion ? 0 : 0.18;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
  } catch {
    return () => {};
  }
  document.body.classList.add('space-active');

  const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDpr);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 1);

  const camera = new THREE.PerspectiveCamera(CONFIG.fov, 1, 0.1, CONFIG.depth + 160);

  const layers = buildLayers(reduceMotion);
  for (const layer of layers) {
    for (const body of layer.bodies) body.setPixelRatio?.(dpr);
  }
  const allBodies = layers.flatMap((l) => l.bodies);

  // Precess the whole system slowly, on top of the disk's own shader rotation.
  // The black hole is the sole body of the last (frontmost) layer.
  const blackHole = layers[layers.length - 1].bodies[0].object;
  const blackHoleSpin = reduceMotion ? 0.008 : 0.045;

  const input = createInput();

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const fpsMeter = options.onFps ? createFpsMeter({ onSample: options.onFps }) : null;

  let running = false;
  let last = 0;
  let rafId = 0;

  function frame(now: number) {
    if (!running) return;
    fpsMeter?.tick(now);
    const t = now / 1000;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    input.update(dt, t);
    camera.position.x = input.view.x * CONFIG.camShift;
    camera.position.y = -input.view.y * CONFIG.camShift;
    camera.lookAt(input.view.x * CONFIG.lookShift, -input.view.y * CONFIG.lookShift, -100);

    blackHole.rotation.z += dt * blackHoleSpin;
    for (const body of allBodies) body.update(dt, t);

    // Composite the layers back-to-front so the background never punches through.
    renderer.autoClear = false;
    renderer.clear();
    layers.forEach((layer, i) => {
      if (i > 0) renderer.clearDepth();
      renderer.render(layer.scene, camera);
    });
    renderer.autoClear = true;
    rafId = window.requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    rafId = window.requestAnimationFrame(frame);
  }

  const onVisibility = () => {
    if (document.hidden) running = false;
    else {
      fpsMeter?.reset();
      start();
    }
  };
  document.addEventListener('visibilitychange', onVisibility);
  start();

  return () => {
    running = false;
    window.cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibility);
    input.dispose();
    for (const body of allBodies) body.dispose();
    renderer.dispose();
    document.body.classList.remove('space-active');
  };
}

interface Layer {
  scene: THREE.Scene;
  bodies: SceneBody[];
}

function buildLayers(reduceMotion: boolean): Layer[] {
  const far: SceneBody[] = [
    buildStarField(),
    buildGalaxy({
      position: [-96, 54, -172],
      radius: 28,
      arms: 2,
      count: 2600,
      twist: 0.9,
      randomness: 0.22,
      spin: 0.015,
      tiltX: 1.15,
      tiltZ: -0.55,
      coreColor: '#ffe7c4',
      armColor: '#7ba7ff',
      brightness: 0.85,
    }),
    buildNebula({
      position: [82, -44, -176],
      radius: 20,
      gasCount: 5000,
      starCount: 55,
      spin: 0.005,
      tilt: 0.3,
      clumps: [
        { color: '#ffb066', offset: [0, 0, 0], scale: [1.0, 0.8, 0.7], spread: 1.0, weight: 0.36 },
        {
          color: '#ff5f7a',
          offset: [-6, 4, -2],
          scale: [1.1, 0.9, 0.7],
          spread: 1.1,
          weight: 0.28,
        },
        { color: '#8a63d8', offset: [8, -5, 2], scale: [0.9, 0.9, 0.7], spread: 0.9, weight: 0.22 },
        { color: '#f0c885', offset: [2, 1, 1], scale: [0.5, 0.45, 0.4], spread: 0.5, weight: 0.14 },
      ],
    }),
  ];

  const meteors: SceneBody[] = reduceMotion
    ? []
    : [buildMeteorField({ count: 6, speed: 7, brightness: 0.7, scale: [0.12, 0.42], detail: 3 })];

  // Frontmost layer: composited last so it sits over the stars and meteors,
  // with only the DOM text on top of it.
  const front: SceneBody[] = [
    buildBlackHole({
      position: [0, 16, -85],
      radius: 13,
      diskOuter: 26,
      intensity: 1.0,
      roll: -0.08,
      tilt: 0.46,
    }),
  ];

  return [far, meteors, front].map((bodies) => {
    const scene = new THREE.Scene();
    for (const body of bodies) scene.add(body.object);
    return { scene, bodies };
  });
}
