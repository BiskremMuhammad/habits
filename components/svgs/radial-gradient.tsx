import React from "react";
import Svg, { Defs, Stop, Ellipse, RadialGradient } from "react-native-svg";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface Props {
  /**
   * the with of the gradient
   *
   * @type {number}
   */
  width: number;

  /**
   * the height of the gradient
   *
   * @type {number}
   */
  height: number;

  /**
   * colors array
   *
   * @type {string[]}
   */
  colors: string[];

  /**
   * offset of each color, populated in decimal value to 1 percentage
   *
   * @type {number[]}
   */
  offsets?: number[];

  /**
   * flag to transition to transparent at the end
   *
   * @type {boolean}
   */
  translateToTransparent?: boolean;
}

export const RadialGradientShape = (props: Props) => {
  return (
    <Svg height={props.height} width={props.width}>
      <Defs>
        <RadialGradient
          id="grad"
          rx={props.width / 2}
          ry={props.height / 2}
          gradientUnits="userSpaceOnUse"
        >
          {props.colors.map((c: string, i: number) => (
            <Stop
              key={i}
              offset={
                props.offsets && props.offsets.length >= i + 1
                  ? props.offsets[i]
                  : i / (props.colors.length - 1)
              }
              stopColor={c}
              stopOpacity={
                i === props.colors.length - 1 && props.translateToTransparent
                  ? 0
                  : 1
              }
            />
          ))}
        </RadialGradient>
      </Defs>
      <Ellipse
        cx={props.width / 2}
        cy={props.height / 2}
        rx={props.width / 2}
        ry={props.height / 2}
        fill="url(#grad)"
      />
    </Svg>
  );
};
