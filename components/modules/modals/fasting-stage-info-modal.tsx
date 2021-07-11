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

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface FastingStageInfoModalProps {
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
  onDismiss,
  stage,
}: FastingStageInfoModalProps) => {
  let info: string[] = [""];
  switch (stage) {
    case FastingStages.LOWERING:
      info = [""];
      break;
    case FastingStages.STABILIZING:
      info = [""];
      break;
    case FastingStages.BURN:
      info = [""];
      break;
    case FastingStages.KETOSOS:
      info = [
        "Ketosis happens when your carbohydrate intake is low. As your body breaks down fat, it produces an acid called ketones or ketone bodies, which becomes your body and brain’s main source of energy.",
        "Because ketosis shifts your metabolism and relies on fat for energy, your body can burn fat at a higher rate. ",
      ];
      break;
    case FastingStages.AUTOPHAGY:
    case FastingStages.AUTOPHAGY_TWO:
      info = [""];
      break;
    case FastingStages.FULL_DAY:
      info = [""];
      break;
    default:
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
        <Text style={styles.headerTitle}>{FastingStagesLabels[stage]}</Text>
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
    backgroundColor: "rgba(22, 17, 54, 0.72)",
    borderRadius: 16,
    marginBottom: 87,
    width: "80%",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#120E30",
    paddingTop: 34,
    paddingBottom: 29,
    paddingHorizontal: 31,
  },
  headerTitle: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    lineHeight: 32,
    color: "#fff",
  },
  body: {
    paddingVertical: 23,
    paddingLeft: 30,
    paddingRight: 37,
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
    paddingVertical: 22,
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
