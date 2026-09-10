// Shared scene tunables. `initBlackHoleScene` overrides starCount / drift at
// startup based on the viewer's reduced-motion preference; bodies read live.
export const CONFIG = {
  starCount: 7000,
  near: 10,
  depth: 260,
  margin: 1.4,
  drift: 0.18,
  fov: 60,
  camShift: 1.1,
  lookShift: 10,
  ease: 5,
  idleReturn: 0.5,
  idleAfter: 2.0,
  maxDpr: 2,
};
