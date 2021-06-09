import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

export function AnnouncementIcon(props: SvgProps) {
  return (
    <Svg width={28} height={28} viewBox="0 0 34 34" fill="none" {...props}>
      <G opacity={0.66} fillRule="evenodd" clipRule="evenodd" fill="#C2C9D1">
        <Path d="M4.25 12.75c0-.782.634-1.417 1.417-1.417h22.666a1.417 1.417 0 010 2.834H5.667A1.417 1.417 0 014.25 12.75zM4.25 21.25c0-.782.634-1.417 1.417-1.417h14.166a1.417 1.417 0 010 2.834H5.667A1.417 1.417 0 014.25 21.25z" />
      </G>
    </Svg>
  );
}
