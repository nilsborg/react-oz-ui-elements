/**
 * Helper function to clamp the value between min and max
 */
export const clampValue = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * Convert value to pixels
 * @param {int} value
 */
export const convertToPixel = (value, min, max, pxMax) => ((value - min) / (max - min)) * pxMax;
