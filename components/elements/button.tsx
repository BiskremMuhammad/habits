/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the Button element with our pre-defined styles
 */

import { MotiView } from "moti";
import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Easing } from "react-native-reanimated";

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
   * extra custom styles to the button
   *
   * @type {StyleProp<TextStyle>}
   */
  extraTextStyles?: StyleProp<TextStyle>;

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
   * specific styles for "start" button
   *
   * @type {boolean}
   */
  isStatic?: boolean;

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
        props.shape === "circle" &&
          props.hasBackground &&
          props.noBorder && { width: 77, height: 77 },
        props.shape === "circle" &&
          props.hasBackground &&
          !props.noBorder && { width: 83.77, height: 83.77 },
        props.hasBackground &&
          props.noBorder && {
            backgroundColor: "#342F58",
          },
        props.isAccentButton && ButtonStyles.accentButton,
        props.extraStyles,
      ]}
      onPress={props.onPress}
    >
      {!props.noBorder && (
        <MotiView
          from={
            props.shape === "circle" &&
            props.hasBackground && { rotate: "0deg" }
          }
          animate={
            props.shape === "circle" && props.hasBackground
              ? {
                  rotate: props.isStatic
                    ? "220deg"
                    : props.darkBorder
                    ? "80deg"
                    : "0deg",
                }
              : {}
          }
          transition={{
            type: "timing",
            duration: 200,
            easing: Easing.out(Easing.exp),
          }}
          style={[
            ButtonStyles.borderContainer,
            props.isStatic && props.dim && { opacity: 0.78 },
            props.shape === "oval" && ButtonStyles.ovalBorderContainer,
          ]}
        >
          {props.shape === "circle" && (
            <View style={ButtonStyles.circleBorderContainer}>
              <View
                style={[
                  ButtonStyles.circleBorder,
                  ButtonStyles.circleBorder01,
                  props.hasBackground &&
                    !props.isStatic &&
                    ButtonStyles.violetBorder,
                  props.darkBorder &&
                    !props.isStatic &&
                    ButtonStyles.darkBorder,
                  props.hasBackground && { transform: [{ rotate: "114deg" }] },
                  // props.darkBorder && { transform: [{ rotate: "150deg" }] },
                ]}
              />
              <View
                style={[
                  ButtonStyles.circleBorder,
                  ButtonStyles.circleBorder02,
                  props.hasBackground &&
                    !props.isStatic &&
                    ButtonStyles.violetBorder,
                  props.darkBorder &&
                    !props.isStatic &&
                    ButtonStyles.darkBorder,
                  props.hasBackground && { transform: [{ rotate: "64deg" }] },
                  // props.darkBorder && { transform: [{ rotate: "200deg" }] },
                ]}
              />
            </View>
          )}
          {props.hasCircleBorder && (
            <View
              style={[
                ButtonStyles.borderCircle,
                props.shape === "oval" && ButtonStyles.ovalBorderCircle,
                props.hasBackground &&
                  props.shape === "circle" && {
                    borderColor: props.isStatic ? "#fff" : "#564B93",
                    right: "30%",
                    top: "90%",
                    width: 12.35,
                    height: 12.35,
                  },
                props.darkBorder && {
                  borderColor: "#575272",
                },
              ]}
            />
          )}
        </MotiView>
      )}
      {props.shape === "circle" && props.hasBackground && !props.noBorder && (
        <View
          style={[
            ButtonStyles.circleInnerBackground,
            {
              backgroundColor: props.isStatic
                ? "#fff"
                : props.dim
                ? "#575272"
                : "#564B93",
            },
            props.isStatic && props.dim && { opacity: 0.78 },
          ]}
        />
      )}
      <Text
        style={[
          ButtonStyles.text,
          props.shape === "oval" && ButtonStyles.ovalText,
          props.isStatic && { color: "#120E30" },
          props.darkText && { color: "#0E0A27" },
          props.isAccentButton && ButtonStyles.accentText,
          props.extraTextStyles,
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
    borderRadius: 99,
    position: "relative",
  },
  circle: {
    width: 60,
    height: 60,
  },
  circleInnerBackground: {
    width: 72,
    height: 72,
    position: "absolute",
    borderRadius: 99,
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
    borderRadius: 99,
  },
  ovalBorderContainer: {
    alignSelf: "center",
    display: "flex",
    width: "auto",
    top: 0,
    left: 0,
    right: 0,
    flex: 0,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    paddingVertical: 22,
    paddingHorizontal: 0,
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
    borderRadius: 99,
    borderWidth: 2,
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderBottomColor: "#fff",
    borderRightColor: "transparent",
  },
  violetBorder: {
    borderTopColor: "#564B93",
    borderLeftColor: "#564B93",
    borderBottomColor: "#564B93",
  },
  darkBorder: {
    borderTopColor: "#575272",
    borderLeftColor: "#575272",
    borderBottomColor: "#575272",
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
