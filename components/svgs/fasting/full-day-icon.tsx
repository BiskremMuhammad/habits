import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const FullDayIcon = (props: SvgProps) => {
  return (
    <Svg width={25} height={27} viewBox="0 0 25 27" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.832 15.653a8.61 8.61 0 10-12.937 4.125.667.667 0 11-.753 1.1 9.943 9.943 0 1111.055.115.667.667 0 11-.73-1.116 8.61 8.61 0 003.366-4.224z"
        fill={props.fill ? props.fill : "#fff"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.061 25.424a.667.667 0 001.333 0V16.69a3.34 3.34 0 002.413-1.99c.166-.401.253-.831.254-1.265v-2.678a.667.667 0 10-1.333 0v2.667a2 2 0 01-1.334 1.886v-4.553a.667.667 0 00-1.333 0v4.553a2 2 0 01-1.333-1.885v-2.667a.667.667 0 10-1.334 0v2.666l1.334.001H9.394a3.333 3.333 0 002.667 3.265v8.734z"
        fill={props.fill ? props.fill : "#fff"}
      />
    </Svg>
  );
};
