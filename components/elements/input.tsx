/**
 * @author Muhammad Omran
 * @date 10-05-2021
 * @description implement reusable input component
 */

import React from "react";
import { View, Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { CommonStyles } from "../../styles/common";
import CaretDown from "../svgs/caret-down";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface InputProps {
  /**
   * define some specific styles fot the input text
   *
   * @type {StyleProp<TextStyle>}
   */
  customTextStyle?: StyleProp<TextStyle>;

  /**
   * flag wheather the input has a bottom border or not
   *
   * @type {boolean}
   */
  hasBorder?: boolean;

  /**
   * flag if the input has a circle in the bottom border
   *
   * @type {boolean}
   */
  hasCircleBorder?: boolean;

  /**
   * an icon to display with the text
   *
   * @type {JSX.Element}
   */
  icon?: JSX.Element;

  /**
   * flag if the input is a dropdown to display a chevron down
   *
   * @type {boolean}
   */
  isDropdown?: boolean;

  /**
   * the text displayed in the input
   *
   * @type {string}
   */
  text: string;

  /**
   * width of the input, is it long or short
   *
   * @type {"long" | "short"}
   */
  width?: "long" | "short" | "minimal";
}

export const Input = (props: InputProps) => {
  return (
    <View style={CommonStyles.input}>
      {props.hasBorder && (
        <View style={CommonStyles.inputBorderContainer}>
          {props.hasCircleBorder && (
            <View style={CommonStyles.inputCircleBorderStart}></View>
          )}
          <View
            style={[
              CommonStyles.inputBorderBottom,
              props.hasCircleBorder
                ? CommonStyles.inputBorderBottomWithCircle
                : {},
            ]}
          ></View>
        </View>
      )}
      <View
        style={[
          CommonStyles.textWithIcon,
          props.width !== "minimal" && { marginLeft: 12 },
        ]}
      >
        {props.icon}
        <Text
          style={[
            InputStyles.text,
            props.customTextStyle,
            props.width === "short" && InputStyles.short,
          ]}
        >
          {props.text}
        </Text>
      </View>
      {props.isDropdown && <CaretDown style={CommonStyles.inputChevron} />}
    </View>
  );
};

const InputStyles = StyleSheet.create({
  text: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 24,
    color: "#fff",
    marginRight: 64,
    textTransform: "capitalize",
  },
  short: {
    marginRight: 27,
  },
});
