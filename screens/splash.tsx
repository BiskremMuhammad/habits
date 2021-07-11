/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the splash screen
 */

import { v4 as uuid } from "uuid";
import React, { useReducer, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AnimatePresence, View as MotiView } from "moti";
import { AddHabit } from "../components/modules/add-habit/add-habit";
import { AddIconSvg } from "../components/svgs/add-icon";
import InfoIcon from "../components/svgs/info-icon";
import { CONSTANTS } from "../utils/constants";
import { TitlePanel } from "../components/modules/panels/title-panel";
import {
  addHabitReducer,
  INITIAL_ADD_HABIT_STATE,
} from "../components/modules/add-habit/add-habit-reducer";
import { FastingStageInfoModal } from "../components/modules/modals/fasting-stage-info-modal";
import { FastingStages } from "../types/fasting-stages";
import { Modal } from "../components/modules/modals/modal";
import { FASTING_HABIT_DURATIONS } from "../types/habit";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export const SplashScreen = () => {
  const [state, dispatch] = useReducer(addHabitReducer, {
    ...INITIAL_ADD_HABIT_STATE,
    id: uuid(),
  });

  const [fastingStageInfoModal, toggleFastingStageInfoModal] =
    useState<boolean>(false);

  const { duration } = state;
  const selectedDuration: string = `${
    duration >= 60 ? duration / 60 : duration
  } ${duration >= 60 ? "hr" : "min"}`;

  return (
    <View style={{ flex: 1 }}>
      <View style={SplashScreenStyles.container}>
        <TitlePanel
          icon={({ style }) => <AddIconSvg style={style} />}
          title="welcome"
        />
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={SplashScreenStyles.valueProp}
          transition={{ delay: 300, duration: 1000, type: "timing" }}
        >
          <InfoIcon style={SplashScreenStyles.valuePropInfoIcon} fill="#fff" />
          <Text style={SplashScreenStyles.valuePropDescription}>
            We’ll start with an example session. Select a Habit and tap START to
            begin:
          </Text>
        </MotiView>
        <MotiView
          style={{ alignSelf: "stretch" }}
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 1300, duration: 1000, type: "timing" }}
        >
          <AddHabit
            isIntroduction={true}
            enableChangeHabit={true}
            dispatch={dispatch}
            state={state}
            showFastingStageInfo={() => toggleFastingStageInfoModal(true)}
          />
        </MotiView>
      </View>
      <AnimatePresence>
        {fastingStageInfoModal && (
          <Modal>
            <FastingStageInfoModal
              stage={
                Object.keys(FastingStages)[
                  FASTING_HABIT_DURATIONS.findIndex(
                    (s) => s === selectedDuration
                  ) + 1
                ] as FastingStages
              }
              onDismiss={() => toggleFastingStageInfoModal(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </View>
  );
};

const SplashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: CONSTANTS.SCREEN_CONTAINER_TOP_PADDING,
    paddingBottom: CONSTANTS.SCREEN_CONTAINER_BOTTOM_PADDING,
  },
  valueProp: {
    display: "flex",
    flexDirection: "row",
    marginTop: 0.0444 * screenHeight,
    opacity: 0.66,
    paddingHorizontal: 0.06 * screenWidth + CONSTANTS.PADDING,
    marginBottom: 0.044 * screenHeight,
  },
  valuePropInfoIcon: {
    width: 15,
    height: 15,
    marginRight: 6,
    marginTop: 8,
    opacity: 0.5,
  },
  valuePropDescription: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    lineHeight: 32,
    color: "#fff",
    opacity: 0.66,
  },
});
