const REDUCED_MOTION_MEDIA_QUERY = '(prefers-reduced-motion: reduce)';

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_MEDIA_QUERY).matches;
};
