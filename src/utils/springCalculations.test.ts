import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSpringPhysics,
  getContrastRatio,
  getNestedBorderRadius,
} from './springCalculations';

test('calculateSpringPhysics calculates critically damped springs', () => {
  // Critical damping when damping = 2 * sqrt(stiffness * mass)
  // For stiffness=100, mass=1 -> critical damping = 20
  const metrics = calculateSpringPhysics(100, 20, 1);
  assert.equal(metrics.dampingRatio, 1);
  assert.equal(metrics.isCriticallyDamped, true);
  assert.equal(metrics.overshootPercent, 0);
});

test('calculateSpringPhysics calculates underdamped springs with overshoot', () => {
  // Underdamped when damping < 20 (e.g., damping = 10 for stiffness = 100)
  const metrics = calculateSpringPhysics(100, 10, 1);
  assert.equal(metrics.dampingRatio < 1, true);
  assert.equal(metrics.isUnderdamped, true);
  assert.equal(metrics.overshootPercent > 0, true);
});

test('getContrastRatio correctly calculates WCAG values', () => {
  // Pure black (#000000) on pure white (#FFFFFF) is 21:1
  const blackOnWhite = getContrastRatio('#000000', '#ffffff');
  assert.equal(blackOnWhite, 21);

  // Equal colors have contrast 1:1
  const same = getContrastRatio('#333333', '#333333');
  assert.equal(same, 1);

  // Dark slate #0f172a and bright text #f8fafc should pass AA (> 4.5:1)
  const darkThemeContrast = getContrastRatio('#0f172a', '#f8fafc');
  assert.equal(darkThemeContrast > 10, true);
});

test('getNestedBorderRadius enforces concentric curve math', () => {
  // Outer radius 24px with 8px padding => inner radius 16px
  assert.equal(getNestedBorderRadius(24, 8), 16);
  // Outer radius 12px with 16px padding => inner radius 0
  assert.equal(getNestedBorderRadius(12, 16), 0);
});
