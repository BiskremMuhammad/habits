import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export function DashboardIcon(props: SvgProps) {
  return (
    <Svg width={170} height={141} viewBox="0 0 170 141" fill="none" {...props}>
      <G
        opacity={0.6}
        stroke="#fff"
        strokeOpacity={0.7}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M100.231 2l-60.42 34.25v68.5L100.23 139l60.422-34.25v-68.5L100.231 2z" />
        <Path d="M69.787 2L9.366 36.25v68.5L69.787 139l60.421-34.25v-68.5L69.787 2zM157.814 36.93L86.867 76.073M128.91 103.957L85.801 77.614M41.109 103.956l43.107-26.343M83.152 76.073L12.205 36.93" />
      </G>
    </Svg>
  );
}
