import { Colors } from "@blueprintjs/core";

interface GradientBackgroundColorOptions {
  isDarkMode?: boolean;
}

export function getGradientBackgroundColors({
  isDarkMode,
}: GradientBackgroundColorOptions): { startColor: string; endColor: string } {
  if (isDarkMode) {
    return {
      startColor: Colors.DARK_GRAY4,
      endColor: Colors.GRAY1,
    };
  }
  return {
    startColor: Colors.GRAY1,
    endColor: Colors.GRAY2,
  };
}

interface AccentColorOptions {
  isDarkMode?: boolean;
}
export function getAccentColor({ isDarkMode }: AccentColorOptions): string {
  if (isDarkMode) {
    return Colors.GRAY5;
  }
  return Colors.GRAY1;
}

interface AxisColorOptions {
  isDarkMode?: boolean;
}
export function getAxisColor({ isDarkMode }: AxisColorOptions): string {
  if (isDarkMode) {
    return Colors.WHITE;
  }
  return Colors.GRAY1;
}
