/**
 * @author Muhammad Omran
 * @date 30-12-2023
 * @description implement generic habit icon svg
 */

import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const GenericHabitIcon = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 512 512" {...props}>
    <Path
      fill="#fff"
      d="M512 32c0 113.6-84.6 207.5-194.2 222-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96c0-17.7 14.3-32 32-32h32c123.7 0 224 100.3 224 224v192c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"
    />
  </Svg>
);
