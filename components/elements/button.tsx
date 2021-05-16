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
   * flag to darken the border
   *
   * @type {boolean}
   */
  darkBorder?: boolean;

  /**
   * to display the text in black instead of white
   *
   * @type {boolean}
   */
  darkText?: boolean;

  /**
   * flag to dim the button
   *
   * @type {boolean}
   */
  dim?: boolean;

  /**
   * extra custom styles to the button
   *
   * @type {StyleProp<ViewStyle>}
   */
  extraStyles?: StyleProp<ViewStyle>;

  /**
   * flag if the button has a background
   *
   * @type {boolean}
   */
  hasBackground?: boolean;

  /**
   * flag wheather the border has a circle decorator
   *
   * @type {boolean}
   */
  hasCircleBorder?: boolean;

  /**
   * is the Button is noticable call to action button, white bg uppercase letters
   *
   * @type {boolean}
   */
  isAccentButton?: boolean;

  /**
   * fag to disable border
   *
   * @type {boolean}
   */
  noBorder?: boolean;

  /**
   * the button on press callback
   *
   * @type {() => void}
   */
  onPress: () => void;

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
        props.hasBackground && {
          backgroundColor: props.noBorder
            ? "#342F58"
            : props.dim
            ? props.darkBorder
              ? "#575272"
              : "#524A7B"
            : "rgba(107, 97, 154, 0.5)",
        },
        props.isAccentButton && ButtonStyles.accentButton,
        props.extraStyles,
      ]}
      onPress={props.onPress}
    >
      {!props.noBorder && (
        <View
          style={[
            ButtonStyles.borderContainer,
            props.shape === "oval" && ButtonStyles.ovalBorderContainer,
          ]}
        >
          {props.shape === "circle" && (
            <View
              style={[
                ButtonStyles.circleBorderContainer,
                props.darkBorder && { transform: [{ rotate: "180deg" }] },
              ]}
            >
              <View
                style={[
                  ButtonStyles.circleBorder,
                  ButtonStyles.circleBorder01,
                  props.darkBorder && ButtonStyles.darkBorder,
                  props.darkBorder && { transform: [{ rotate: "0deg" }] },
                ]}
              ></View>
              <View
                style={[
                  ButtonStyles.circleBorder,
                  ButtonStyles.circleBorder02,
                  props.darkBorder && ButtonStyles.darkBorder,
                  props.darkBorder && { transform: [{ rotate: "90deg" }] },
                ]}
              ></View>
            </View>
          )}
          {props.hasCircleBorder && (
            <View
              style={[
                ButtonStyles.borderCircle,
                props.shape === "oval" && ButtonStyles.ovalBorderCircle,
                props.darkBorder && { borderColor: "#292441" },
              ]}
            ></View>
          )}
        </View>
      )}
      <Text
        style={[
          ButtonStyles.text,
          props.shape === "oval" && ButtonStyles.ovalText,
          props.darkText && { color: "#0E0A27" },
          props.isAccentButton && ButtonStyles.accentText,
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
    position: "relative",
  },
  circle: {
    width: 60,
    height: 60,
  },
  oval: {
    paddingVertical: 15,
    paddingHorizontal: 35,
  },
  accentButton: {
    backgroundColor: "#fff",
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
  accentText: {
    color: "#0E0A27",
  },
  borderContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  ovalBorderContainer: {
    width: "80%",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    paddingVertical: 22,
    paddingHorizontal: 35,
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
  darkBorder: {
    borderTopColor: "#292441",
    borderLeftColor: "#292441",
    borderBottomColor: "#292441",
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
    right: -2,
    borderColor: "rgba(255,255,255,0.5)",
  },
});
