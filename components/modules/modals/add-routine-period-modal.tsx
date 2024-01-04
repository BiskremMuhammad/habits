/**
 * @author Muhammad Omran
 * @date 01-01-2024
 * @description implement the add routine period modal
 */

import { MotiView } from "@motify/components";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  I18nManager,
  Pressable,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Input } from "../../elements/input";
import { HabitDurationInput } from "../add-habit/habit-duration";
import { CONSTANTS } from "../../../utils/constants";
import { HabitActionTypes } from "../../../redux/reducers/habit/habit-actions";
import {
  Habit,
  HabitNotEveryDayNotificationId,
  RoutineHabit,
} from "../../../types/habit";
import { HabitUtils } from "../../../utils/habit-utils";

const { height: screenHeight } = Dimensions.get("screen");

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface AddRoutinePeriodModalProps {
  /**
   * handler callback when confirm button is clicked
   *
   * @type {() => void}
   */
  onConfirm: (period: RoutineHabit) => void;

  /**
   * handler callback when cancel button is clicked
   *
   * @type {() => void}
   */
  onDismiss: () => void;
}

export const AddRoutinePeriodModal = ({
  onConfirm,
  onDismiss,
}: AddRoutinePeriodModalProps) => {
  const [label, setLabel] = useState<string>("");
  const [duration, setDuration] = useState<number>(1);

  const onChangeDuration = (val: string) => {
    setDuration(
      Number((val.match(/\d+/g) || [1])[0]) * (val.includes("hr") ? 60 : 1)
    );
  };

  const onConfirmHandler = () => {
    onConfirm({ title: label, duration });
  };

  return (
    <KeyboardAvoidingView
      behavior={"position"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      style={{
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
      }}
    >
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
          <Text style={styles.headerTitle}>Add Routine Period</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.label}>label</Text>
          <Input
            text={label}
            width="long"
            isTextInput={true}
            onChange={setLabel}
            hasBorder={true}
            hasCircleBorder={true}
          />
          <HabitDurationInput
            enableDurationSelect={true}
            extraStyles={[
              styles.addHabitSection,
              Platform.OS === "ios" && { zIndex: 3 },
            ]}
            source="ADD"
            initialDuration={duration}
            useFastingDurations={false}
            useShorterDurations={true}
            onChangeDuration={onChangeDuration}
          />
        </View>
        <View style={styles.footer}>
          <Pressable onPress={onDismiss} style={{ flex: 1 }}>
            <Text style={styles.dismiss}>Close</Text>
          </Pressable>
          <Pressable onPress={onConfirmHandler} style={{ flex: 1 }}>
            <Text style={styles.dismiss}>Add</Text>
          </Pressable>
        </View>
      </MotiView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "rgba(12, 8, 52, 0.82)",
    borderRadius: 16,
    marginBottom: 230,
    width: "80%",
    flexGrow: 0,
    flexShrink: 0,
    overflow: "visible",
  },
  header: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    backgroundColor: "#120E30",
    paddingTop: 34,
    paddingBottom: 29,
    paddingHorizontal: 31,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  headerTitle: {
    fontFamily: "Rubik-Medium",
    flex: 1,
    fontSize: 16,
    lineHeight: 28,
    color: "#fff",
    marginLeft: 21,
  },
  body: {
    paddingVertical: 23,
    paddingLeft: 32,
    paddingHorizontal: 46,
    zIndex: 2,
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
  addHabitSection: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    width: "100%",
    marginTop: 13,
    zIndex: 4,
    paddingLeft: CONSTANTS.PADDING - 12,
  },
  label: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    color: "#fff",
    marginRight: 8,
  },
  buttonContainer: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0.0855 * screenHeight,
  },
  footer: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
    zIndex: 1,
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
