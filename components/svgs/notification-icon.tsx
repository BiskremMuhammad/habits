/**
 * @author Muhammad Omran
 * @date 25-05-2021
 * @description Implement the notification svg icon
 */

import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

export function NotificationIcon(props: SvgProps) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M26.027 20.134l-1.666-2.398a1.95 1.95 0 01-.351-1.11v-6.88a9.745 9.745 0 10-19.49 0v6.88c-.002.397-.124.784-.351 1.11l-1.667 2.398a1.949 1.949 0 001.442 3.255H9.49a4.872 4.872 0 009.55 0h5.545a1.95 1.95 0 001.442-3.255zm-11.762 5.204a2.923 2.923 0 01-2.748-1.95h5.496a2.924 2.924 0 01-2.748 1.95zM3.945 21.44a.785.785 0 00.116-.137l1.706-2.456c.455-.651.7-1.427.701-2.222v-6.88a7.796 7.796 0 1115.593 0v6.88c.002.795.247 1.57.702 2.222l1.705 2.456c.034.05.073.096.117.137H3.945z"
          fill="#C2C9D1"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h28v28H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
