import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function InfoIcon(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="#fff" {...props}>
      <Path
        d="M8 15.5A7.5 7.5 0 1115.5 8 7.508 7.508 0 018 15.5zM2 8.129A6 6 0 102 8v.129zM9.5 11a.75.75 0 01-.75.75h-.5a1 1 0 01-1-1V9.125a.375.375 0 00-.375-.375.375.375 0 01-.375-.375V8a.75.75 0 01.75-.75h.5a1 1 0 011 1v1.625c0 .207.168.375.375.375s.375.168.375.375V11zm-.75-6a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        fill="#fff"
      />
    </Svg>
  );
}

export default InfoIcon;
