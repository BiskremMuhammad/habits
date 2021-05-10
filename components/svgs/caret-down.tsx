/**
 * @author Muhammad Omran
 * @date 10-05-2021
 * @description implement the caret down icon svg
 */

import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function CaretDown(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M12 14.5l5-5H7l5 5z" fill="#fff" />
    </Svg>
  );
}

export default CaretDown;
