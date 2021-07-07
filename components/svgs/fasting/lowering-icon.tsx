import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const LoweringIcon = (props: SvgProps) => {
  return (
    <Svg width={14} height={18} viewBox="0 0 14 18" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.252 14.278c2.078 2.296 5.418 2.296 7.496 0 2.114-2.334 2.114-6.143 0-8.477L7 1.66 3.252 5.8c-2.114 2.334-2.114 6.143 0 8.477zM7 .667l.494-.448 4.243 4.687c2.573 2.842 2.573 7.425 0 10.267-2.608 2.88-6.866 2.88-9.474 0-2.573-2.842-2.573-7.425 0-10.267L6.505.22 7 .667zm0 0L6.505.22a.669.669 0 01.99 0L7 .666z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.333 10.667a.667.667 0 01-.666.667H4.333a.667.667 0 010-1.334h5.334c.368 0 .666.299.666.667z"
        fill="#fff"
      />
    </Svg>
  );
};
