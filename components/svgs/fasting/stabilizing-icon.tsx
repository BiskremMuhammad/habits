import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const StabilizingIcon = (props: SvgProps) => {
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
        d="M9.511 7.761c.282.237.32.657.083.94L7.1 11.678a.667.667 0 01-1.022-.856l2.494-2.978a.667.667 0 01.939-.083z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.805 11.805a.667.667 0 01-.943 0l-1.333-1.333a.667.667 0 11.942-.943l1.334 1.333c.26.26.26.683 0 .943z"
        fill="#fff"
      />
    </Svg>
  );
};
