/**
 * @author Muhammad Omran
 * @date 31-05-2021
 * @description Implement a reusable habit duration input component
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import { CommonStyles } from "../../../styles/common";
import { FastingStages } from "../../../types/fasting-stages";
import {
  FASTING_HABIT_DURATIONS,
  HABIT_DURATIONS,
  PERIOD_DURATIONS,
} from "../../../types/habit";
import { getEnumKeyByEnumValue } from "../../../utils/enum-type-utils";
import { Input } from "../../elements/input";
import InfoIcon from "../../svgs/info-icon";
import TimerIcon from "../../svgs/timer-icon";
import { FastingStageDuration } from "./fasting-stage-duration";

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
   * to force open the dropdown state from parent
   *
   * @type {boolean}
   */
  forceState?: boolean;

  /**
   * flag to gray out the input label
   *
   * @type {boolean}
   */
  grayedLabel?: boolean;

  /**
   * flag to hide the info icon when useFastingHabit flag is active
   *
   * @type {boolean}
   */
  hideInfoIcon?: boolean;

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

  /**
   * callback when the info button icon clicked
   *
   * @type {() => void}
   */
  onInfoIconClicked?: () => void;

  /**
   * the source of the component which upon it's called
   *
   * @type {"VIEW" | "ADD"}
   */
  source: "VIEW" | "ADD";

  /**
   * to send a callback to parent of state changing
   *
   * @type {(state: boolean) => void}
   */
  toggleCallback?: (state: boolean) => void;

  /**
   * flag to tell the component to use the fasting habit durations
   *
   * @type {boolean}
   */
  useFastingDurations?: boolean;

  /**
   * flag to tell the component to use shorter habit durations
   *
   * @type {boolean}
   */
  useShorterDurations?: boolean;
}

export const HabitDurationInput = (props: HabitDurationInputProps) => {
  const selectedDuration: string = `${
    props.initialDuration >= 60
      ? props.initialDuration / 60
      : props.initialDuration
  } ${props.initialDuration >= 60 ? "hr" : "min"}`;

  return (
    <View style={props.extraStyles}>
      <Text style={[styles.label, props.grayedLabel && { opacity: 0.5 }]}>
        {props.source === "VIEW" && props.useFastingDurations
          ? "my goal is"
          : "for"}
      </Text>
      <Input
        forceState={props.forceState}
        toggleCallback={props.toggleCallback}
        text={selectedDuration}
        width={
          props.useFastingDurations
            ? "full"
            : props.customWidth
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
        hideIcon={props.useFastingDurations}
        isCustomDropDown={props.useFastingDurations}
        dropdownOptions={
          !props.useFastingDurations && !props.useShorterDurations
            ? HABIT_DURATIONS
            : props.useShorterDurations
            ? PERIOD_DURATIONS
            : Object.keys(FastingStages)
                .filter((_, i: number) => i > 0)
                .map((s: string, i: number) => (
                  <FastingStageDuration
                    stage={
                      getEnumKeyByEnumValue(FastingStages, s) as FastingStages
                    }
                    index={i}
                    selected={selectedDuration === FASTING_HABIT_DURATIONS[i]}
                    onSelect={(v: string) => {
                      props.onChangeDuration(v);
                      if (props.toggleCallback) props.toggleCallback(false);
                    }}
                  />
                ))
        }
        minimizedData={props.source === "VIEW" && props.useFastingDurations}
        hasBorder={props.enableDurationSelect && !props.disableBorder}
        customTextStyle={{ textTransform: "none" }}
      />
      {props.useFastingDurations && !props.hideInfoIcon && (
        <Pressable
          onPress={() => !!props.onInfoIconClicked && props.onInfoIconClicked()}
        >
          <InfoIcon style={styles.infoIcon} fill="#fff" />
        </Pressable>
      )}
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
  infoIcon: {
    width: 15,
    height: 15,
    marginTop: 4,
    marginLeft: 12,
    opacity: 0.5,
  },
});
