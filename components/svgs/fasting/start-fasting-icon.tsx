import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const StartFastingIcon = (props: SvgProps) => {
  return (
    <Svg width={10} height={13} viewBox="0 0 10 13" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.189 10.709c1.559 1.722 4.063 1.722 5.622 0 1.585-1.751 1.585-4.608 0-6.359L5 1.245 2.189 4.35C.604 6.1.604 8.958 2.189 10.71zM5 .5l.37-.336L8.554 3.68c1.93 2.132 1.93 5.57 0 7.7-1.956 2.161-5.15 2.161-7.106 0-1.93-2.13-1.93-5.568 0-7.7L4.63.165 5 .5zm0 0L4.629.165a.501.501 0 01.742 0L5 .5z"
        fill="#120E30"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 8a.5.5 0 01-.5.5H3a.5.5 0 010-1h4a.5.5 0 01.5.5z"
        fill="#120E30"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 5.5a.5.5 0 01.5.5v4a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z"
        fill="#120E30"
      />
    </Svg>
  );
};
