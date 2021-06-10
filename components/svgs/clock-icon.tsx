import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export function ClockIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c-.006 5.52-4.48 9.994-10 10zm0-18a8 8 0 108 8 8.009 8.009 0 00-8-8zm5 9h-6V7h2v4h4v2z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}
