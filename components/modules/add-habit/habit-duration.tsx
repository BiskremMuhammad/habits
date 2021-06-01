/**
 * @author Muhammad Omran
 * @date 31-05-2021
 * @description Implement a reusable habit duration input component
 */

import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { CommonStyles } from "../../../styles/common";
import { Input } from "../../elements/input";
import TimerIcon from "../../svgs/timer-icon";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface HabitDurationInputProps {
  /**
   * custom width for the input
   *
   * @type {"short"  "minimal"}
   */
  customWidth?: "short" | "minimal";

  /**
   * flag to disable the input border
   *
   * @type {boolean}
   */
  disableBorder?: boolean;

  /**
   * flag of which to display the habit Duration change
   *
   * @type {boolean}
   */
  enableDurationSelect?: boolean;

  /**
   * extra styles for the component
   *
   * @type {StyleProp<ViewStyle>}
   */
  extraStyles?: StyleProp<ViewStyle>;

  /**
   * the initial duration to be displayed when the component is loaded
   *
   * @type {number}
   */
  initialDuration: number;

  /**
   * on change duration callback
   *
   * @type {(val: string) => void}
   */
  onChangeDuration: (val: string) => void;
}

export const HabitDurationInput = (props: HabitDurationInputProps) => {
  return (
    <View style={props.extraStyles}>
      <Text style={styles.label}>for</Text>
      <Input
        text={`${
          props.initialDuration >= 60
            ? props.initialDuration / 60
            : props.initialDuration
        } ${props.initialDuration >= 60 ? "hr" : "min"}`}
        width={
          props.customWidth
            ? props.customWidth
            : props.enableDurationSelect
            ? "short"
            : "minimal"
        }
        icon={
          <TimerIcon width={24} height={21} style={CommonStyles.withIcon} />
        }
        onChange={props.onChangeDuration}
        isDropdown={props.enableDurationSelect}
        dropdownOptions={[
          "1 min",
          "5 min",
          "10 min",
          "15 min",
          "30 min",
          "1 hr",
          "2 hr",
        ]}
        hasBorder={props.enableDurationSelect && !props.disableBorder}
        customTextStyle={{ textTransform: "none" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    color: "#fff",
    marginRight: 8,
  },
});
