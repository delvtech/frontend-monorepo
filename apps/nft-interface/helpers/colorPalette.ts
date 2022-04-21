export const COLOR_BLACK = "#000006";
export const COLOR_BLACK_DARK = "#000";
export const COLOR_WHITE = "#F7FFF7";
export const COLOR_WHITE_LIGHT = "#fff";
export const COLOR_GREEN = "#8FD8E7";
export const COLOR_GREEN_LIGHT = "#14DFBA";
export const COLOR_GREEN_DARK = "rgba(0, 255, 250, 0.3)";
export const COLOR_GREEN_DARKEST = "#1A535C";
export const COLOR_YELLOW = "#FFE66D";
export const COLOR_INHERIT = "inherit";
export const COLOR_TRANSPARENT = "transparent";
export const COLOR_SEMI_TRANSPARENT = "rgba(0, 0, 0, 0.2)";
export const COLOR_LIGHT_GRAY = "#999EA1";
export const COLOR_GRAY_LIGHT = "#D9DBE9";
export const COLOR_JADE = "#1A535C";

export const COLORS = {
  black: COLOR_BLACK,
  blackDark: COLOR_BLACK_DARK,
  green: COLOR_GREEN,
  greenDark: COLOR_GREEN_DARK,
  greenDarkest: COLOR_GREEN_DARKEST,
  greenLight: COLOR_GREEN_LIGHT,
  inherit: COLOR_INHERIT,
  lightGray: COLOR_LIGHT_GRAY,
  transparent: COLOR_TRANSPARENT,
  white: COLOR_WHITE,
  whiteLight: COLOR_WHITE_LIGHT,
  yellow: COLOR_YELLOW,
  semiTransparent: COLOR_SEMI_TRANSPARENT,
  grayLight: COLOR_GRAY_LIGHT,
  jade: COLOR_JADE,
} as const;

export type Color = keyof typeof COLORS;
