/**
 * @author Muhammad Omran
 * @date 11-07-2021
 * @description implement the fasting stage info modal
 */

import { MotiView } from "@motify/components";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
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
import { StartFastingIcon } from "../../svgs/fasting/start-fasting-icon";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface FastingStageInfoModalProps {
  /**
   * current index of durations itteration
   *
   * @type {number}
   */
  index: number;

  /**
   * handler callback when cancel button "Keep Going" is clicked
   *
   * @type {() => void}
   */
  onDismiss: () => void;

  /**
   * the stage to display the info for
   *
   * @type {string}
   */
  stage: FastingStages;
}

export const FastingStageInfoModal = ({
  index,
  onDismiss,
  stage,
}: FastingStageInfoModalProps) => {
  let info: string[] = [""];
  let icon: JSX.Element = <LoweringIcon />;

  switch (stage) {
    case FastingStages.LOWERING:
      icon = <LoweringIcon width={24} height={24} />;
      info = [""];
      break;
    case FastingStages.STABILIZING:
      icon = <StabilizingIcon width={24} height={24} />;
      info = [""];
      break;
    case FastingStages.BURN:
      icon = <BurnIcon width={24} height={24} />;
      info = [""];
      break;
    case FastingStages.KETOSOS:
      icon = <KetosisIcon width={30} height={30} />;
      info = [
        "Ketosis happens when your carbohydrate intake is low. As your body breaks down fat, it produces an acid called ketones or ketone bodies, which becomes your body and brain’s main source of energy.",
        "Because ketosis shifts your metabolism and relies on fat for energy, your body can burn fat at a higher rate. ",
      ];
      break;
    case FastingStages.AUTOPHAGY:
      icon = <AutophagyIcon width={24} height={24} />;
      info = [""];
      break;
    case FastingStages.AUTOPHAGY_TWO:
      icon = <AutophagyIcon width={24} height={24} />;
      info = [""];
      break;
    case FastingStages.FULL_DAY:
      icon = <FullDayIcon width={24} height={24} />;
      info = [""];
      break;
    default:
      icon = <StartFastingIcon width={24} height={24} />;
      info = [""];
  }

  return (
    <MotiView
      from={{ opacity: 0, translateY: 600 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 600 }}
      transition={{
        type: "timing",
        duration: 100,
        translateY: {
          type: "spring",
        },
      }}
      exitTransition={{ type: "timing", duration: 100 }}
      style={styles.container}
    >
      <View style={styles.header}>
        {icon}
        <Text style={styles.headerTitle}>{FastingStagesLabels[stage]}</Text>
        <Text style={styles.duration}>- {FASTING_HABIT_DURATIONS[index]}</Text>
      </View>
      <View style={styles.body}>
        {info.map((paragraph: string, i: number) => (
          <Text
            key={i}
            style={[
              styles.paragraph,
              i < info.length - 1 && styles.withParagraphSpace,
            ]}
          >
            {paragraph}
          </Text>
        ))}
      </View>
      <View style={styles.footer}>
        <Pressable onPress={onDismiss}>
          <Text style={styles.dismiss}>Close</Text>
        </Pressable>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(12, 8, 52, 0.8)",
    borderRadius: 16,
    marginBottom: 137,
    width: "80%",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#120E30",
    paddingTop: 34,
    paddingBottom: 29,
    paddingHorizontal: 31,
  },
  headerTitle: {
    fontFamily: "Rubik-Medium",
    flex: 1,
    fontSize: 16,
    lineHeight: 28,
    color: "#fff",
    marginLeft: 21,
  },
  duration: {
    fontFamily: "Rubik-Light",
    fontSize: 14,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.5,
  },
  body: {
    paddingVertical: 23,
    paddingLeft: 32,
    paddingHorizontal: 46,
  },
  paragraph: {
    fontFamily: "Rubik-Light",
    fontSize: 14,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.66,
  },
  withParagraphSpace: {
    marginBottom: 42,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
  },
  dismiss: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Rubik-Medium",
    fontSize: 12,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.66,
    letterSpacing: 2,
  },
});
