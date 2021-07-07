import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const FastIcon = (props: SvgProps) => {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.878 11.63a8.61 8.61 0 116.232 12.065.667.667 0 00-.246 1.31 9.942 9.942 0 10-7.898-7.735.667.667 0 101.305-.273 8.61 8.61 0 01.607-5.366z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.172 24.742a.667.667 0 11-.943-.943l6.176-6.175a3.338 3.338 0 01-.3-3.114c.167-.401.41-.766.716-1.074l.007-.007 1.886-1.886a.667.667 0 11.943.943L13.77 14.37a2.002 2.002 0 00-.39 2.277l3.219-3.22a.667.667 0 01.942.943l-3.219 3.22a2 2 0 002.275-.39l.002-.001 1.885-1.886a.667.667 0 01.943.943l-1.886 1.886-.943-.942V17.2l.943.943a3.333 3.333 0 01-4.195.424l-6.175 6.175z"
        fill="#fff"
      />
    </Svg>
  );
};
