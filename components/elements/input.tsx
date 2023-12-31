/**
 * @author Muhammad Omran
 * @date 10-05-2021
 * @description implement reusable input component
 */

import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  Pressable,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import { CommonStyles } from "../../styles/common";
import { FastingStages } from "../../types/fasting-stages";
import { FASTING_HABIT_DURATIONS } from "../../types/habit";
import { FastingStageDuration } from "../modules/add-habit/fasting-stage-duration";
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
   * if input is dropdown this is the list of options
   *
   * @type {string[] | JSX.Element[]}
   */
  dropdownOptions?: string[] | JSX.Element[];

  /**
   * to force open the dropdown state from parent
   *
   * @type {boolean}
   */
  forceState?: boolean;

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
   * flag to hide the icon of the input
   *
   * @type {boolean}
   */
  hideIcon?: boolean;

  /**
   * an icon to display with the text
   *
   * @type {JSX.Element}
   */
  icon?: JSX.Element;

  isTextInput?: boolean;

  /**
   * if the dropdown options are custom jsx elements
   *
   * @type {boolean}
   */
  isCustomDropDown?: boolean;

  /**
   * flag if the input is a dropdown to display a chevron down
   *
   * @type {boolean}
   */
  isDropdown?: boolean;

  /**
   * to hide some data when selected to fit the container
   *
   * @type {boolean}
   */
  minimizedData?: boolean;

  /**
   * fire an on change callback
   *
   * @type {(val: string) => void}
   */
  onChange: (val: string) => void;

  /**
   * the text displayed in the input
   *
   * @type {string}
   */
  text: string;

  /**
   * to send a callback to parent of state changing
   *
   * @type {(state: boolean) => void}
   */
  toggleCallback?: (state: boolean) => void;

  /**
   * width of the input, is it long or short
   *
   * @type {"long" | "short"}
   */
  width?: "full" | "long" | "short" | "minimal";
}

export const Input = (props: InputProps) => {
  const [dropdownOpen, setDropdownState] = useState<boolean>(false);

  useEffect(() => {
    setDropdownState(!!props.forceState);
  }, [props.forceState]);

  const onInputPress = () => {
    if (
      !props.isDropdown ||
      !props.dropdownOptions ||
      props.dropdownOptions.length <= 1
    )
      return;
    setDropdownState(!dropdownOpen);
    if (props.toggleCallback) {
      props.toggleCallback(!dropdownOpen);
    }
  };

  const onChange = (val: string) => {
    setDropdownState(false);
    if (props.toggleCallback) {
      props.toggleCallback(false);
    }
    props.onChange(val);
  };

  return (
    <View
      style={[
        InputStyles.input,
        Platform.OS === "ios" && { zIndex: 2 },
        props.width === "full" && { flex: 1, justifyContent: "flex-start" },
      ]}
    >
      {props.hasBorder && (
        <View style={InputStyles.inputBorderContainer}>
          {props.hasCircleBorder && (
            <View style={InputStyles.inputCircleBorderStart}></View>
          )}
          <View
            style={[
              InputStyles.inputBorderBottom,
              props.hasCircleBorder
                ? InputStyles.inputBorderBottomWithCircle
                : {},
            ]}
          ></View>
        </View>
      )}
      <Pressable
        onPress={onInputPress}
        style={[
          CommonStyles.textWithIcon,
          props.width !== "minimal" && { marginLeft: 12 },
          props.width === "full" && { marginLeft: 0 },
        ]}
      >
        {!props.hideIcon && props.icon}
        {props.isCustomDropDown ? (
          <FastingStageDuration
            stage={
              Object.keys(FastingStages)[
                FASTING_HABIT_DURATIONS.findIndex((s) => s === props.text) + 1
              ] as FastingStages
            }
            hideDuration={props.minimizedData}
            index={FASTING_HABIT_DURATIONS.findIndex((s) => s === props.text)}
            extraStyles={{ marginBottom: 0 }}
            selected={true}
            onSelect={(v: string) => onInputPress()}
          />
        ) : props.isTextInput ? (
          <TextInput
            style={[
              InputStyles.text,
              props.customTextStyle,
              props.width !== "long" && InputStyles.short,
              props.width === "minimal" && { marginRight: 22 },
            ]}
            onChangeText={onChange}
            value={props.text}
          />
        ) : (
          <Text
            style={[
              InputStyles.text,
              props.customTextStyle,
              props.width !== "long" && InputStyles.short,
              props.width === "minimal" && { marginRight: 22 },
            ]}
          >
            {props.text}
          </Text>
        )}
      </Pressable>
      {props.isDropdown &&
        !!props.dropdownOptions &&
        props.dropdownOptions.length > 1 && (
          <View
            style={[
              InputStyles.inputChevron,
              dropdownOpen && { zIndex: 20 },
              dropdownOpen && props.width === "full" && { right: -30 },
            ]}
          >
            <MotiView
              animate={{ rotate: dropdownOpen ? "180deg" : "0deg" }}
              transition={{ type: "timing" }}
            >
              <CaretDown />
            </MotiView>
          </View>
        )}
      {dropdownOpen &&
        !!props.dropdownOptions &&
        props.dropdownOptions.length > 1 && (
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={[
              InputStyles.dropdownContainer,
              props.width === "full" && { width: "125%" },
            ]}
          >
            <View style={InputStyles.dropdownBorderContainer}>
              <View style={InputStyles.dropdownBorder}></View>
            </View>
            <ScrollView>
              <View
                style={[
                  InputStyles.dropdownList,
                  props.width === "full" && {
                    paddingTop: 12,
                    paddingLeft: 16.5,
                  },
                ]}
              >
                {props.isCustomDropDown &&
                  (props.dropdownOptions as JSX.Element[]).map(
                    (i: JSX.Element, index: number) => (
                      <View
                        key={index}
                        style={[
                          CommonStyles.rowContainer,
                          { alignItems: "center" },
                        ]}
                      >
                        {i}
                      </View>
                    )
                  )}
                {!props.isCustomDropDown &&
                  (props.dropdownOptions as string[]).map(
                    (o: string, i: number) => (
                      <Pressable key={i} onPress={() => onChange(o)}>
                        <Text
                          style={[
                            InputStyles.dropdownListText,
                            props.customTextStyle,
                            i === props.dropdownOptions!.length - 1 && {
                              marginBottom: 0,
                            },
                            o === props.text &&
                              InputStyles.dropdownOptionSelected,
                          ]}
                        >
                          {o}
                        </Text>
                      </Pressable>
                    )
                  )}
              </View>
            </ScrollView>
          </MotiView>
        )}
    </View>
  );
};

const InputStyles = StyleSheet.create({
  input: {
    paddingVertical: 16,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputChevron: {
    width: 10,
    height: 5,
    position: "absolute",
    right: -1,
    transform: [
      {
        translateY: 3,
      },
    ],
  },
  inputBorderContainer: {
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "97%",
    height: "100%",
  },
  inputCircleBorderStart: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#88849D",
    backgroundColor: "#231E3C",
    opacity: 0.3,
  },
  inputBorderBottom: {
    position: "absolute",
    bottom: 6,
    left: 0,
    width: "104%",
    height: "100%",
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "#6F698F",
    opacity: 0.47,
    borderBottomRightRadius: 140,
  },
  inputBorderBottomWithCircle: {
    left: 14,
    width: "95%",
  },
  text: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 24,
    color: "#fff",
    marginRight: 64,
    textTransform: "capitalize",
    minWidth: 64,
  },
  short: {
    marginRight: 36,
  },
  dropdownContainer: {
    position: "absolute",
    zIndex: 10,
    width: "120%",
    top: 5,
    left: 0,
  },
  dropdownBorderContainer: {
    position: "absolute",
    bottom: -3,
    right: -2,
    width: "90%",
    height: 53,
    overflow: "hidden",
  },
  dropdownBorder: {
    position: "absolute",
    bottom: 0,
    right: -4,
    width: "200%",
    height: "200%",
    borderRadius: 28,
    borderColor: "#6F698F",
    borderBottomWidth: 2,
    borderRightWidth: 2,
    opacity: 0.47,
  },
  dropdownList: {
    marginHorizontal: 2,
    marginBottom: 4,
    backgroundColor: "rgb(12, 8, 52)",
    borderRadius: 16,
    paddingLeft: 22,
    paddingTop: 9,
    paddingBottom: 22,
  },
  dropdownListText: {
    fontFamily: "JosefinSans-SemiBold",
    fontSize: 18,
    lineHeight: 32,
    color: "#fff",
    paddingLeft: 9,
    paddingRight: 38,
    marginBottom: 9,
    opacity: 0.5,
    textTransform: "capitalize",
  },
  dropdownOptionSelected: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 24,
    color: "#fff",
    opacity: 1,
  },
});
