/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement add icon SVG
 */

import React from "react";
import Svg, { SvgProps, G, Path, Circle } from "react-native-svg";

export const AddIconSvg = (props: SvgProps) => {
  return (
    <Svg width={134} height={151} viewBox="0 0 134 151" fill="none" {...props}>
      <G>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M70.855 14h1.658c19.528 0 36.756 9.845 46.992 24.842l2.236-.256C111.224 22.573 93.103 12 72.513 12h-1.658C38.35 12 12 38.35 12 70.855c0 29.624 21.886 54.136 50.37 58.248l.427-1.959C35.213 123.23 14 99.52 14 70.855 14 39.455 39.455 14 70.855 14z"
          fill="#A299CD"
        />
        <Circle
          cx={71.414}
          cy={128.053}
          r={9.947}
          stroke="#A299CD"
          strokeWidth={2}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M71.64 33.79a1 1 0 00-.978 0l-18.85 10.554c.458.497.882 1.026 1.269 1.582l18.07-10.117 31.479 17.624v35.195l-31.48 17.624-31.478-17.624V69.072a14.75 14.75 0 01-2-.31v20.452a1 1 0 00.511.873l32.48 18.183a1 1 0 00.976 0l32.48-18.183c.315-.177.511-.511.511-.873V52.847c0-.362-.196-.696-.511-.873l-32.48-18.183z"
          fill="#A299CD"
        />
        <Circle cx={40.898} cy={52.82} r={7.944} fill="#A299CD" />
      </G>
    </Svg>
  );
};
