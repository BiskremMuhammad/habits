/**
 * @author Muhammad Omran
 * @date 10-05-2021
 * @description implement the timer icon svg
 */

import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function TimerIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6a1 1 0 011 1v4.884l2.664 2.369a1 1 0 01-1.328 1.494l-3-2.666a1 1 0 01-.336-.748V7a1 1 0 011-1z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4a8 8 0 00-4.444 14.653 1 1 0 01-1.112 1.663A9.991 9.991 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.992 9.992 0 01-4.444 8.316 1 1 0 01-1.112-1.663A8 8 0 0012 4z"
        fill="#fff"
      />
    </Svg>
  );
}

export default TimerIcon;
