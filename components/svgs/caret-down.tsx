/**
 * @author Muhammad Omran
 * @date 10-05-2021
 * @description implement the caret down icon svg
 */

import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function CaretDown(props: SvgProps) {
  return (
    <Svg width={10} height={6} viewBox="0 0 10 6" fill="none" {...props}>
      <Path d="M5 5.5l5-5H0l5 5z" fill="#fff" />
    </Svg>
  );
}

export default CaretDown;
