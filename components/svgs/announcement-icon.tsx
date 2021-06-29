import * as React from "react";
import Svg, { SvgProps, G, Path, Defs } from "react-native-svg";

export function AnnouncementIcon(props: SvgProps) {
  return (
    <Svg width={152} height={214} viewBox="0 0 152 214" fill="none" {...props}>
      <G
        opacity={0.6}
        stroke="#fff"
        strokeOpacity={0.7}
        strokeWidth={3}
        strokeLinecap="round"
      >
        <Path d="M76 198.547l54.727-91.637H21.273L76 198.547z" />
        <Path d="M76 165.456l54.727-91.637H21.273L76 165.456z" />
        <Path d="M76 134.909l60.622-101.182H15.378L76 134.91z" />
      </G>
    </Svg>
  );
}
