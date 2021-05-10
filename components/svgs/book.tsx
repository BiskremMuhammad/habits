/**
 * @author Muhammad Omran
 * @date 10-05-2021
 * @description implement book icon svg
 */

import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function BookIcon(props: SvgProps) {
  return (
    <Svg width={17} height={22} viewBox="0 0 17 22" fill="none" {...props}>
      <Path
        d="M.7 18.71a.7.7 0 01-.7-.699V3.218A2.888 2.888 0 012.885.333h12.5a.7.7 0 01.698.7v14.344a.7.7 0 01-1.398 0V1.732h-11.8c-.82 0-1.486.667-1.486 1.486v14.793a.7.7 0 01-.7.7z"
        fill="#fff"
      />
      <Path
        d="M15.384 21.732l-6.119-.065-6.118.065C1.412 21.732 0 20.069 0 18.333 0 16.598 1.412 15 3.147 15h12.237a.7.7 0 010 1.398H3.147c-.964 0-1.748.971-1.748 1.935 0 .964.784 2 1.748 2h12.237a.7.7 0 010 1.399z"
        fill="#fff"
      />
      <Path
        d="M15.316 19H3.35a.675.675 0 01-.683-.666c0-.369.306-.667.683-.667h11.966c.378 0 .684.298.684.667a.675.675 0 01-.684.666zM3.333 16.334a.654.654 0 01-.666-.64V.973c0-.354.298-.64.666-.64.369 0 .667.286.667.64v14.72c0 .353-.298.64-.667.64z"
        fill="#fff"
      />
    </Svg>
  );
}

export default BookIcon;
