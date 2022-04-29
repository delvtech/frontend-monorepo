import { SVGProps } from "react";

import { Colors } from "@blueprintjs/core";

interface BrushStyleOptions {
  isDarkMode?: boolean;
}
const PATTERN_ID = "brush_pattern";
export function getBrushStyle({
  isDarkMode,
}: BrushStyleOptions): SVGProps<SVGRectElement> {
  if (isDarkMode) {
    return {
      fill: `url(#${PATTERN_ID})`,
      stroke: "white",
    };
  }
  return {
    fill: `url(#${PATTERN_ID})`,
    stroke: Colors.GRAY1,
  };
}
