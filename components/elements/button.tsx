/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the Button element with our pre-defined styles
 */

import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface ButtonProps {
  /**
   * extra custom styles to the button
   *
   * @type {StyleProp<ViewStyle>}
   */
  extraStyles?: StyleProp<ViewStyle>;

  /**
   * flag wheather the border has a circle decorator
   *
   * @type {boolean}
   */
  hasCircleBorder?: boolean;

  /**
   * the shape of the button
   *
   * @type {"circle" | "oval"}
   */
  shape?: "circle" | "oval";

  /**
   * button text
   *
   * @type {string}
   */
  text: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <Pressable
      style={[
        ButtonStyles.base,
        props.shape === "circle" ? ButtonStyles.circle : ButtonStyles.oval,
        props.extraStyles,
      ]}
    >
      <View
        style={[
          ButtonStyles.borderContainer,
          props.shape === "oval" && ButtonStyles.ovalBorderContainer,
        ]}
      >
        {props.shape === "circle" && (
          <View style={ButtonStyles.circleBorderContainer}>
            <View
              style={[ButtonStyles.circleBorder, ButtonStyles.circleBorder01]}
            ></View>
            <View
              style={[ButtonStyles.circleBorder, ButtonStyles.circleBorder02]}
            ></View>
          </View>
        )}
        {props.hasCircleBorder && (
          <View
            style={[
              ButtonStyles.borderCircle,
              props.shape === "oval" && ButtonStyles.ovalBorderCircle,
            ]}
          ></View>
        )}
      </View>
      <Text
        style={[
          ButtonStyles.text,
          props.shape === "oval" && ButtonStyles.ovalText,
        ]}
      >
        {props.text}
      </Text>
    </Pressable>
  );
};

const ButtonStyles = StyleSheet.create({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  circle: {
    width: 60,
    height: 60,
  },
  oval: {
    paddingVertical: 15,
    paddingHorizontal: 35,
  },
  text: {
    fontFamily: "Rubik-Medium",
    fontSize: 13,
    textTransform: "uppercase",
    color: "#fff",
  },
  ovalText: {
    color: "#C2C9D1",
  },
  borderContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  ovalBorderContainer: {
    opacity: 0.5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  circleBorderContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  circleBorder: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 30,
    borderWidth: 2,
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderBottomColor: "#fff",
    borderRightColor: "transparent",
  },
  circleBorder01: {
    transform: [
      {
        rotate: "-49deg",
      },
    ],
  },
  circleBorder02: {
    transform: [
      {
        rotate: "10deg",
      },
    ],
  },
  borderCircle: {
    width: 8.84,
    height: 8.84,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 7,
    position: "absolute",
    top: 8,
    right: 3,
    backgroundColor: "#1A1539",
  },
  ovalBorderCircle: {
    width: 14.58,
    height: 14.58,
    top: 0,
    right: 0,
  },
});
