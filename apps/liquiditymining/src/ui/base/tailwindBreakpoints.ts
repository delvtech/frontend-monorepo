import { useMedia } from "react-use";

/**
 * breakpoints from tailwind
 */
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Takes a minimum breakpoint (`gte`) and optional maximum breakpoint (`lt`) and
 * returns true if the screen width is greater than or equal to the min and less
 * than the max.
 *
 * @param gte The breakpoint that the screen must be greater than *or equal to*.
 * @param lt The breakpoint that the screen must be less than.
 */
export function useBreakpoint(
  gte: 0 | keyof typeof breakpoints,
  lt?: keyof typeof breakpoints,
): boolean {
  let query = `(min-width: ${gte === 0 ? 0 : breakpoints[gte]}px)`;
  if (lt) {
    query += `(max-width: ${breakpoints[lt] - 1}px)`;
  }
  return useMedia(query);
}

export function useIsTailwindSmallScreen(): boolean {
  return useBreakpoint(0, "lg");
}

export function useIsTailwindLargeScreen(): boolean {
  return useBreakpoint("lg");
}
