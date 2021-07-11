/**
 * @author Muhammad Omran
 * @date 20-05-2021
 * @description implement the Add Habit Screen
 */

import { v4 as uuid } from "uuid";
import React, { Dispatch, useEffect, useReducer, useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { AnimatePresence, View as MotiView } from "moti";
import { AddHabit } from "../components/modules/add-habit/add-habit";
import { AddIconSvg } from "../components/svgs/add-icon";
import { useNavigation } from "@react-navigation/native";
import { TitlePanel } from "../components/modules/panels/title-panel";
import { Header } from "../components/elements/header";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStore } from "../redux/store";
import { Habit } from "../types/habit";
import { CONSTANTS } from "../utils/constants";
import { FastingStageInfoModal } from "../components/modules/modals/fasting-stage-info-modal";
import { FastingStages } from "../types/fasting-stages";
import { getEnumKeyByEnumValue } from "../utils/enum-type-utils";
import { Modal } from "../components/modules/modals/modal";
import {
  addHabitReducer,
  INITIAL_ADD_HABIT_STATE,
} from "../components/modules/add-habit/add-habit-reducer";
import { HabitActions } from "../redux/reducers/habit/habit-actions";

const { height: screenHeight } = Dimensions.get("screen");

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface AddHabitScreenProps {
  /**
   * flag if app state is still playing the introduction
   *
   * @type {boolean}
   */
  isIntroduction: boolean;
}

export const AddHabitScreen = ({ isIntroduction }: AddHabitScreenProps) => {
  const navigation = useNavigation();
  const habits: Habit[] = useSelector<GlobalStore, Habit[]>(
    (store: GlobalStore): Habit[] => store.habits
  );

  const [state, dispatch] = useReducer(addHabitReducer, {
    ...INITIAL_ADD_HABIT_STATE,
    id: uuid(),
  });

  const [fastingStageInfoModal, toggleFastingStageInfoModal] =
    useState<boolean>(false);

  /**
   * Disable user from going back when this is the first time to prevent going back to the introduction success screen
   */
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        if (isIntroduction || !habits.length) {
          return;
        } else {
          navigation.dispatch(e.data.action);
        }
        return;
      }),
    [navigation, isIntroduction]
  );

  const { duration } = state;
  const selectedDuration: string = `${
    duration >= 60 ? duration / 60 : duration
  } ${duration >= 60 ? "hr" : "min"}`;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        {!isIntroduction && !!habits.length && (
          <Header
            leftAction="back"
            hideNotification={true}
            extraStyles={styles.header}
            normalGoBack={true}
          />
        )}
        <View style={styles.container}>
          <TitlePanel icon={({ style }) => <AddIconSvg style={style} />} />
          <MotiView
            style={{ alignSelf: "stretch", marginTop: 96 }}
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1000, type: "timing" }}
          >
            <AddHabit
              enableChangeHabit={true}
              enableDurationSelect={true}
              enableFrequencySelect={true}
              dispatch={dispatch}
              state={state}
              showFastingStageInfo={() => toggleFastingStageInfoModal(true)}
            />
          </MotiView>
        </View>
      </ScrollView>
      <AnimatePresence>
        {fastingStageInfoModal && (
          <Modal>
            <FastingStageInfoModal
              stage={
                getEnumKeyByEnumValue(
                  FastingStages,
                  selectedDuration
                ) as FastingStages
              }
              onDismiss={() => toggleFastingStageInfoModal(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop:
      (screenHeight < 846 ? 1.6 : 1.2) * CONSTANTS.SCREEN_CONTAINER_TOP_PADDING,
    paddingBottom: CONSTANTS.SCREEN_CONTAINER_BOTTOM_PADDING,
  },
  header: {
    position: "absolute",
    alignSelf: "stretch",
    top: CONSTANTS.HEADER_TOP_MARGIN,
  },
});
