import { useMedia } from "react-use";

/**
 * 'sm' breakpoint from tailwind.
 */
export const SMALL_BREAKPOINT = 640;
/**
 * 'md' breakpoint from tailwind.
 */
export const MEDIUM_BREAKPOINT = 768;
/**
 * 'lg' breakpoint from tailwind.
 */
export const LARGE_BREAKPOINT = 1024;

/**
 * 'xl' breakpoint from tailwind.
 */
export const EXTRA_LARGE_BREAKPOINT = 1280;

export function useIsTailwindSmallScreen(): boolean {
  const isSm = useIsTailwindSm();
  const isMd = useIsTailwindMd();
  return isSm || isMd;
}

export function useIsTailwindLargeScreen(): boolean {
  const isLg = useIsTailwindLg();
  const isXl = useIsTailwindXl();
  return isLg || isXl;
}

export function useIsTailwindSm(): boolean {
  const isLessThanMd = useMedia(`(max-width: ${MEDIUM_BREAKPOINT}px)`);
  return isLessThanMd;
}
export function useIsTailwindMd(): boolean {
  const isBetweenMdAndLg = useMedia(
    `(min-width: ${MEDIUM_BREAKPOINT}px) and (max-width: ${
      LARGE_BREAKPOINT - 1
    }px)`,
  );
  return isBetweenMdAndLg;
}

export function useIsTailwindLg(): boolean {
  const isBetweenLgAndXL = useMedia(
    `(min-width: ${LARGE_BREAKPOINT}px) and (max-width: ${
      EXTRA_LARGE_BREAKPOINT - 1
    }px)`,
  );
  return isBetweenLgAndXL;
}

export function useIsTailwindXl(): boolean {
  return useMedia(`(min-width: ${EXTRA_LARGE_BREAKPOINT - 1}px)`);
}
