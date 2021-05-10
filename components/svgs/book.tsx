/**
 * @author Muhammad Omran
 * @date 10-05-2021
 * @description implement book icon svg
 */

import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function BookIcon(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M8.7 23.71a.7.7 0 01-.7-.699V8.218a2.888 2.888 0 012.884-2.885h12.5a.7.7 0 01.7.7v14.344a.7.7 0 01-1.4 0V6.732h-11.8c-.819 0-1.485.667-1.485 1.486v14.793a.7.7 0 01-.7.7z"
        fill="#fff"
      />
      <Path
        d="M23.384 26.732l-6.119-.065-6.118.065C9.412 26.732 8 25.069 8 23.333 8 21.598 9.412 20 11.147 20h12.237a.7.7 0 010 1.398H11.147c-.964 0-1.748.971-1.748 1.935 0 .964.784 2 1.748 2h12.237a.7.7 0 010 1.399z"
        fill="#fff"
      />
      <Path
        d="M23.316 24H11.35a.675.675 0 01-.683-.666c0-.369.306-.667.683-.667h11.966c.378 0 .684.298.684.667a.675.675 0 01-.684.666zM11.333 21.334a.654.654 0 01-.666-.64V5.973c0-.354.298-.64.666-.64.368 0 .667.286.667.64v14.72c0 .353-.299.64-.667.64z"
        fill="#fff"
      />
    </Svg>
  );
}

export default BookIcon;
