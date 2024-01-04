/**
 * @author Muhammad Omran
 * @date 08-07-2021
 * @description define spreaded fasting stages icons on the timer screen
 */

import React from "react";
import { View, StyleSheet, I18nManager } from "react-native";
import { FastingStages } from "../../types/fasting-stages";
import { AutophagyIcon } from "../svgs/fasting/autophagy-icon";
import { AutophagyTwoIcon } from "../svgs/fasting/autophagy-two-icon";
import { BurnIcon } from "../svgs/fasting/burn-icon";
import { FullDayIcon } from "../svgs/fasting/full-day-icon";
import { KetosisIcon } from "../svgs/fasting/ketosis-icon";
import { LoweringIcon } from "../svgs/fasting/lowering-icon";
import { StabilizingIcon } from "../svgs/fasting/stabilizing-icon";
import { StartFastingIcon } from "../svgs/fasting/start-fasting-icon";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface FastingProgressStageProps {
  /**
   * if the user filled up this stage
   *
   * @type {boolean}
   */
  active?: boolean;

  /**
   * the progreess arc rotation
   *
   * @type {number}
   */
  arcRotation: number;

  /**
   * the circle radius
   *
   * @type {number}
   */
  circleRadius: number;

  /**
   * if the current stage is the committed one
   *
   * @type {boolean}
   */
  selected?: boolean;

  /**
   * current stage to display
   *
   * @type {FastingStages}
   */
  stage: FastingStages;
}

export const FastingProgressStage = ({
  active,
  arcRotation,
  circleRadius,
  selected,
  stage,
}: FastingProgressStageProps) => {
  let angle: number = 0;
  const iconFill: string = active ? "#120E30" : "rgba(255,255,255,0.5)";
  let icon: JSX.Element = <LoweringIcon />;
  switch (stage) {
    case FastingStages.STARTING:
      icon = <StartFastingIcon fill={iconFill} />;
      angle = arcRotation;
      break;
    case FastingStages.LOWERING:
      icon = <LoweringIcon fill={iconFill} />;
      angle =
        arcRotation + ((3 * 360) / 24) * ((300 + ((24 - 3) / 24) * 30) / 360);
      break;
    case FastingStages.STABILIZING:
      icon = <StabilizingIcon fill={iconFill} />;
      angle =
        arcRotation + ((9 * 360) / 24) * ((300 + ((24 - 9) / 24) * 30) / 360);
      break;
    case FastingStages.BURN:
      icon = <BurnIcon fill={iconFill} />;
      angle =
        arcRotation + ((11 * 360) / 24) * ((300 + ((24 - 11) / 24) * 30) / 360);
      break;
    case FastingStages.KETOSOS:
      icon = (
        <KetosisIcon
          fill={iconFill}
          width={20}
          height={20}
          style={{ marginTop: 1, marginLeft: 3 }}
        />
      );
      angle =
        arcRotation + ((12 * 360) / 24) * ((300 + ((24 - 12) / 24) * 30) / 360);
      break;
    case FastingStages.AUTOPHAGY:
      icon = <AutophagyIcon fill={iconFill} />;
      angle =
        arcRotation + ((14 * 360) / 24) * ((300 + ((24 - 14) / 24) * 30) / 360);
      break;
    case FastingStages.AUTOPHAGY_TWO:
      icon = (
        <AutophagyTwoIcon
          width={34}
          height={34}
          fill={iconFill}
          style={{ marginTop: -1, marginLeft: 2 }}
        />
      );
      angle =
        arcRotation + ((18 * 360) / 24) * ((300 + ((24 - 18) / 24) * 30) / 360);
      break;
    case FastingStages.FULL_DAY:
      icon = <FullDayIcon fill={iconFill} />;
      angle = arcRotation + ((24 * 360) / 24) * (300 / 360);
      break;
    default:
      icon = <StartFastingIcon fill={iconFill} />;
      angle = arcRotation;
      break;
  }

  const x: number = circleRadius * Math.cos((angle * Math.PI) / 180);
  const y: number = circleRadius * Math.sin((angle * Math.PI) / 180);
  return (
    <View
      style={[
        styles.stage,
        {
          backgroundColor: active ? "#fff" : "#4E4B6C",
          transform: [{ translateX: x }, { translateY: y }],
        },
      ]}
    >
      {selected && <View style={styles.selectedStage}></View>}
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  stage: {
    position: "absolute",
    width: 25,
    height: 25,
    borderRadius: 25,
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedStage: {
    position: "absolute",
    width: 33,
    height: 33,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 33,
  },
});
