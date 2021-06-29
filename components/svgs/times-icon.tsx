import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export function TimesIcon(props: SvgProps) {
  return (
    <Svg width={21} height={20} viewBox="0 0 21 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.983 17.427a1.417 1.417 0 002.003 2.004l7.306-7.306 7.305 7.306a1.417 1.417 0 002.004-2.004l-7.306-7.305 6.719-6.72A1.417 1.417 0 1017.011 1.4l-6.72 6.72-6.718-6.72A1.417 1.417 0 101.57 3.403l6.718 6.719-7.305 7.305z"
        fill="#2B2645"
      />
    </Svg>
  );
}
