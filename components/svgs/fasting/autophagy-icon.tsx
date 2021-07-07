import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const AutophagyIcon = (props: SvgProps) => {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.333.667c.369 0 .667.298.667.666v2.45a7.335 7.335 0 0113.277 3.301.667.667 0 01-1.323.165A6.001 6.001 0 002.903 4.833H5.5a.667.667 0 010 1.333H1.333A.667.667 0 01.667 5.5V1.333c0-.368.298-.666.666-.666zm-.03 7.505a.667.667 0 01.743.579 6.001 6.001 0 0011.052 2.415H10.5a.667.667 0 010-1.333h4.167c.368 0 .666.299.666.667v4.166a.667.667 0 01-1.333 0v-2.449A7.335 7.335 0 01.723 8.916a.667.667 0 01.58-.744z"
        fill="#fff"
      />
    </Svg>
  );
};
