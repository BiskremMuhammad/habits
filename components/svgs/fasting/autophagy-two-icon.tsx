import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const AutophagyTwoIcon = (props: SvgProps) => {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.667 9.333c.368 0 .666.298.666.667v2.45A7.335 7.335 0 0122.61 15.75a.667.667 0 01-1.323.164A6.001 6.001 0 0010.236 13.5H14a.667.667 0 110 1.333H8.667A.667.667 0 018 14.166V10c0-.369.298-.667.667-.667zm-.031 7.505a.667.667 0 01.744.58 6.001 6.001 0 0011.05 2.415h-3.763a.667.667 0 010-1.333H22c.368 0 .667.298.667.666v4.167a.667.667 0 01-1.334 0v-2.45a7.335 7.335 0 01-13.277-3.301.667.667 0 01.58-.744z"
        fill={props.fill ? props.fill : "#fff"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 13.333c.368 0 .667.299.667.667v5.333a.667.667 0 01-1.334 0V14c0-.368.299-.667.667-.667zM16.667 13.333c.368 0 .666.299.666.667v5.333a.667.667 0 11-1.333 0V14c0-.368.299-.667.667-.667z"
        fill={props.fill ? props.fill : "#fff"}
      />
    </Svg>
  );
};
