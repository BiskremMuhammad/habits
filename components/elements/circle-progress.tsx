/**
 * @author Muhammad Omran
 * @date 16-05-2021
 * @description implement a reusable animated circleuar progress for habit timer
 */

import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";
import Animated from "react-native-reanimated";

const { interpolate, multiply } = Animated;
const { width: screenWidth } = Dimensions.get("window");

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface CirclePogressProps {
  /**
   * the progress value
   *
   * @type {number}
   */
  progress: number;

  /**
   * the progress circle width
   *
   * @type {number}
   */
  width?: number;
}

export const CircleProgress = ({ progress, width }: CirclePogressProps) => {
  // Calculate width and circlular attributes based on the given width
  const size = width ? width : screenWidth - 32 - 54;
  const strokeWidth = 5;
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const { PI, cos, sin } = Math;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const A = PI + PI * 0.7;
  const startAngle = PI + PI * 0.3;
  const endAngle = 2 * PI - PI * 0.3;
  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  const x1 = cx - r * cos(startAngle);
  const y1 = -r * sin(startAngle) + cy;
  const x2 = cx - r * cos(endAngle);
  const y2 = -r * sin(endAngle) + cy;
  const d = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;

  const circumference = r * A;
  const α = interpolate(progress, [0, 1], [A, 0]);

  const strokeDashoffset = multiply(α, r);
  return (
    <Svg width={size} height={size}>
      <Path
        stroke="white"
        fill="none"
        strokeOpacity={0.16}
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{ d, strokeWidth }}
      />
      <AnimatedPath
        stroke="white"
        fill="none"
        strokeDasharray={`${circumference}, ${circumference}`}
        {...{ d, strokeDashoffset, strokeWidth }}
      />
    </Svg>
  );
};
