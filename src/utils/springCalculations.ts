/**
 * Utility functions for Spring Physics calculations and UI/UX Pro design math.
 */

export interface SpringMetrics {
  naturalFrequency: number; // omega_n in rad/s
  dampingRatio: number;      // zeta (dimensionless)
  isCriticallyDamped: boolean;
  isUnderdamped: boolean;
  isOverdamped: boolean;
  settlingTimeMs: number;    // estimated time to settle within 2%
  overshootPercent: number;  // 0 if overdamped or critically damped
}

/**
 * Calculates physics parameters for a damped harmonic oscillator (Framer Motion spring).
 * Formula: m * x'' + c * x' + k * x = 0
 * natural_frequency = sqrt(k / m)
 * damping_ratio = c / (2 * sqrt(k * m))
 */
export function calculateSpringPhysics(
  stiffness: number,
  damping: number,
  mass: number = 1
): SpringMetrics {
  const safeStiffness = Math.max(1, stiffness);
  const safeDamping = Math.max(0.1, damping);
  const safeMass = Math.max(0.1, mass);

  const naturalFrequency = Math.sqrt(safeStiffness / safeMass);
  const criticalDamping = 2 * Math.sqrt(safeStiffness * safeMass);
  const dampingRatio = safeDamping / criticalDamping;

  let overshootPercent = 0;
  if (dampingRatio < 1) {
    // Underdamped: overshoot occurs
    overshootPercent =
      Math.exp((-dampingRatio * Math.PI) / Math.sqrt(1 - dampingRatio * dampingRatio)) * 100;
  }

  // Settling time approximation (time to 2% envelope)
  // t_s ~ 4 / (zeta * omega_n) for underdamped, or similar for overdamped
  const settlingTimeSec = dampingRatio < 1
    ? 4 / (dampingRatio * naturalFrequency)
    : (4 * dampingRatio) / naturalFrequency;

  return {
    naturalFrequency: Math.round(naturalFrequency * 100) / 100,
    dampingRatio: Math.round(dampingRatio * 100) / 100,
    isCriticallyDamped: Math.abs(dampingRatio - 1) < 0.05,
    isUnderdamped: dampingRatio < 0.95,
    isOverdamped: dampingRatio > 1.05,
    settlingTimeMs: Math.round(settlingTimeSec * 1000),
    overshootPercent: Math.round(overshootPercent * 10) / 10,
  };
}

/**
 * WCAG AA & AAA contrast calculation between two 6-digit hex colors.
 */
function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  return [r, g, b];
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const brighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  const ratio = (brighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

/**
 * Nested border radius rule: r_inner = max(0, r_outer - padding)
 * Ensures smooth concentric curves without optical clipping.
 */
export function getNestedBorderRadius(outerRadius: number, padding: number): number {
  return Math.max(0, outerRadius - padding);
}
