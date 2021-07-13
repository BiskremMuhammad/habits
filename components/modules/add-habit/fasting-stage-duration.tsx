/**
 * @author Muhammad Omran
 * @date 07-07-2021
 * @description implement the duration option with stage specifically for the fasting habit
 */

import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { CommonStyles } from "../../../styles/common";
import {
  FastingStages,
  FastingStagesLabels,
} from "../../../types/fasting-stages";
import { FASTING_HABIT_DURATIONS } from "../../../types/habit";
import { AutophagyIcon } from "../../svgs/fasting/autophagy-icon";
import { BurnIcon } from "../../svgs/fasting/burn-icon";
import { FullDayIcon } from "../../svgs/fasting/full-day-icon";
import { KetosisIcon } from "../../svgs/fasting/ketosis-icon";
import { LoweringIcon } from "../../svgs/fasting/lowering-icon";
import { StabilizingIcon } from "../../svgs/fasting/stabilizing-icon";
import InfoIcon from "../../svgs/info-icon";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface FastingStageDurationProps {
  /**
   * extra styles for the component
   *
   * @type {StyleProp<ViewStyle>}
   */
  extraStyles?: StyleProp<ViewStyle>;

  /**
   * to give a space all of the empty space instead of grid aignmenet
   *
   * @type {boolean}
   */
  hasSpacer?: boolean;

  /**
   * flag to hide the duration text
   *
   * @type {boolean}
   */
  hideDuration?: boolean;

  /**
   * current index of durations itteration
   *
   * @type {number}
   */
  index: number;

  /**
   * on select duration option callback
   *
   * @type {(val: string) => void}
   */
  onSelect: (val: string) => void;

  /**
   * selection state of the duration option
   *
   * @type {boolean}
   */
  selected?: boolean;

  /**
   * flag to display the info icon next to the stage title
   *
   * @type {boolean}
   */
  showInfoIcon?: boolean;

  /**
   * the stage of the current duration option
   *
   * @type {FastingStages}
   */
  stage: FastingStages;
}

export const FastingStageDuration = ({
  extraStyles,
  hasSpacer,
  hideDuration,
  index,
  onSelect,
  selected,
  showInfoIcon,
  stage,
}: FastingStageDurationProps) => {
  let Icon: JSX.Element = <LoweringIcon />;
  switch (stage) {
    case FastingStages.LOWERING:
      Icon = <LoweringIcon />;
      break;
    case FastingStages.STABILIZING:
      Icon = <StabilizingIcon />;
      break;
    case FastingStages.BURN:
      Icon = <BurnIcon width={18} height={18} />;
      break;
    case FastingStages.KETOSOS:
      Icon = <KetosisIcon width={22} height={22} />;
      break;
    case FastingStages.AUTOPHAGY:
    case FastingStages.AUTOPHAGY_TWO:
      Icon = <AutophagyIcon />;
      break;
    case FastingStages.FULL_DAY:
      Icon = <FullDayIcon width={22} height={22} />;
      break;
    default:
      Icon = <LoweringIcon />;
  }
  return (
    <Pressable
      key={index}
      style={[
        styles.container,
        index === FASTING_HABIT_DURATIONS.length - 1 && { marginBottom: 0 },
        extraStyles,
      ]}
      onPress={() => onSelect(FASTING_HABIT_DURATIONS[index])}
    >
      <View style={[CommonStyles.textWithIcon, !hasSpacer && { flex: 2.5 }]}>
        <View style={styles.stageIconContainer}>{Icon}</View>
        <Text style={[styles.stageText, selected && styles.stageTextSelected]}>
          {FastingStagesLabels[stage]}
        </Text>
        {showInfoIcon && <InfoIcon style={CommonStyles.infoIcon} />}
      </View>
      {hasSpacer && <View style={{ flex: 1 }}></View>}
      {!hideDuration && (
        <View style={[styles.duration, !hasSpacer && { flex: 1 }]}>
          <Text
            style={[styles.durationText, selected && styles.selectedDuration]}
          >
            {FASTING_HABIT_DURATIONS[index]}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginBottom: 14,
  },
  stage: {
    flex: 2.5,
  },
  stageIconContainer: {
    width: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stageText: {
    fontFamily: "JosefinSans-Medium",
    fontSize: 16,
    lineHeight: 28,
    color: "#fff",
    opacity: 0.5,
    marginLeft: 11,
    marginTop: -2,
  },
  stageTextSelected: {
    fontFamily: "JosefinSans-Bold",
    opacity: 1,
  },
  duration: {
    paddingTop: 2,
  },
  durationText: {
    fontFamily: "Rubik-Light",
    fontSize: 16,
    lineHeight: 28,
    color: "#fff",
    opacity: 0.5,
  },
  selectedDuration: {
    opacity: 1,
  },
});
