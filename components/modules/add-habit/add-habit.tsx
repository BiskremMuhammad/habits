/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the add habit form
 */

import { StackActions, useNavigation } from "@react-navigation/core";
import React, { Dispatch, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import {
  HabitActions,
  HabitActionTypes,
} from "../../../redux/reducers/habit/habit-actions";
import { TimerScreenRouteParams } from "../../../screens/timer-screen";
import { CommonStyles } from "../../../styles/common";
import { Habit, HabitTypes, HabitTypesVerbale } from "../../../types/habit";
import { Routes } from "../../../types/route-names";
import { WeekDays } from "../../../types/week-days";
import { CONSTANTS } from "../../../utils/constants";
import { Button } from "../../elements/button";
import { Input } from "../../elements/input";
import { AddHabitAction, AddHabitActionTypes } from "./add-habit-reducer";
import { HabitDurationInput } from "./habit-duration";
import { HabitFrequencyInput } from "./habit-frequency";
import { HabitIcon } from "../../elements/habit-icon";
import { getEnumKeyByEnumValue } from "../../../utils/enum-type-utils";
import { useDispatch } from "react-redux";
import { PushNotification } from "../../../utils/push-notification";

const { height: screenHeight } = Dimensions.get("screen");

export enum OpenedDropDown {
  NONE = "NONE",
  HABIT_TYPE = "HABIT_TYPE",
  HABIT_FREQUENCY = "HABIT_FREQUENCY",
  HABIT_DURATION = "HABIT_DURATION",
}

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface AddHabitProps {
  /**
   * dispatch the action for the add habit screen add habit reducer
   *
   * @type {React.Dispatch<AddHabitAction>}
   */
  dispatch: React.Dispatch<AddHabitAction>;

  /**
   * flag to enable change the habit type
   *
   * @type {boolean}
   */
  enableChangeHabit?: boolean;

  /**
   * flag of which to display the habit Duration change
   *
   * @type {boolean}
   */
  enableDurationSelect?: boolean;

  /**
   * flag of which to display the habit frequency change from everyday to specific days
   *
   * @type {boolean}
   */
  enableFrequencySelect?: boolean;

  /**
   * flag if app state is still playing the introduction
   *
   * @type {boolean}
   */
  isIntroduction?: boolean;

  /**
   * to open the selected fasting stage info modal
   *
   * @type {() => void}
   */
  showFastingStageInfo: () => void;

  /**
   * state of the habit to add
   *
   * @type {Habit}
   */
  state: Habit;
}

export const AddHabit = (props: AddHabitProps) => {
  const { dispatch } = props;
  const { type, isEveryDay, days, duration } = props.state;
  const navigation = useNavigation();
  const [currentOpenInput, setCurrentOpenInput] = useState(OpenedDropDown.NONE);
  const storeDispatch = useDispatch<Dispatch<HabitActions>>();

  const onChangeOpenedDropdown = (state: boolean, input: OpenedDropDown) => {
    setCurrentOpenInput(state ? input : OpenedDropDown.NONE);
  };

  const onChangeHabit = (val: string) => {
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_TYPE,
      payload: getEnumKeyByEnumValue(HabitTypesVerbale, val),
    });
  };

  const onChangeDuration = (val: string) => {
    if (!props.enableDurationSelect) return;

    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_DURATION,
      payload: val,
    });
  };

  const onChangeFreq = (radio: number) => {
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_EVERYDAY_STATE,
      payload:
        radio === 1
          ? true
          : radio === 2
          ? Object.keys(WeekDays)
              .filter((_, i) => i > 0)
              .map<WeekDays>((k) => k as WeekDays)
          : [],
    });
  };

  const dispatchDays = (selectedDays: WeekDays[]) => {
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_FREQUENCY,
      payload: selectedDays,
    });
  };

  const onCallToActionPress = async () => {
    let notificationId: string = "";
    if (!props.isIntroduction) {
      // get the next 6pm datetime
      const today6pm: Date = new Date(
        new Date(Date.now()).setHours(18, 0, 0, 0)
      );
      const notificationNextAlarm: Date =
        today6pm.getTime() > Date.now()
          ? today6pm
          : new Date(
              new Date(Date.now()).setHours(18, 0, 0, 0) + 24 * 60 * 60 * 1000
            );
      const habitDuration: string = `${
        duration >= 60 ? duration / 60 : duration
      } ${duration >= 60 ? "hour" : "minute"}${duration > 1 && "s"}`;

      notificationId = await PushNotification.scheduleNotification(
        `Time for your ${HabitTypesVerbale[type]} Habit`,
        `Building habits is about building momentum day over day. Perform your habit for ${habitDuration} now.`,
        notificationNextAlarm,
        true
      );
    }

    const habit: Habit = { ...props.state, notification: notificationId };
    storeDispatch({
      type: HabitActionTypes.ADD_NEW_HABIT,
      payload: habit,
    });
    if (props.isIntroduction) {
      navigation.navigate(Routes.TIMER, {
        habitId: habit.id,
      } as TimerScreenRouteParams);
    } else {
      navigation.dispatch(
        StackActions.push(Routes.IDENTITY_REINFORCEMENT, {
          habitId: habit.id,
        } as TimerScreenRouteParams)
      );
    }
  };

  return (
    <View style={addHabitStyles.container}>
      <View
        style={[
          addHabitStyles.addHabitSection,
          Platform.OS === "ios" && { zIndex: 5 },
        ]}
      >
        <Text style={addHabitStyles.label}>I will</Text>
        <Input
          forceState={currentOpenInput === OpenedDropDown.HABIT_TYPE}
          toggleCallback={(state: boolean) =>
            onChangeOpenedDropdown(state, OpenedDropDown.HABIT_TYPE)
          }
          text={HabitTypesVerbale[type]}
          width="long"
          icon={
            <HabitIcon
              type={type}
              style={[
                CommonStyles.withIcon,
                Platform.OS === "ios" && { marginTop: -8 },
              ]}
            />
          }
          onChange={onChangeHabit}
          isDropdown={true}
          dropdownOptions={
            props.enableChangeHabit
              ? Object.values(HabitTypesVerbale).map((k) => k)
              : undefined
          }
          hasBorder={true}
          hasCircleBorder={true}
        />
      </View>
      {props.enableFrequencySelect && (
        <HabitFrequencyInput
          forceState={currentOpenInput === OpenedDropDown.HABIT_FREQUENCY}
          toggleCallback={(state: boolean) =>
            onChangeOpenedDropdown(state, OpenedDropDown.HABIT_FREQUENCY)
          }
          isEveryDay={isEveryDay}
          days={days}
          dispatchDays={dispatchDays}
          onChangeFreq={onChangeFreq}
        />
      )}
      <HabitDurationInput
        forceState={currentOpenInput === OpenedDropDown.HABIT_DURATION}
        toggleCallback={(state: boolean) =>
          onChangeOpenedDropdown(state, OpenedDropDown.HABIT_DURATION)
        }
        enableDurationSelect={props.enableDurationSelect}
        extraStyles={[
          addHabitStyles.addHabitSection,
          Platform.OS === "ios" && { zIndex: 3 },
        ]}
        source="ADD"
        initialDuration={duration}
        useFastingDurations={type === HabitTypes.FASTING}
        onInfoIconClicked={props.showFastingStageInfo}
        onChangeDuration={onChangeDuration}
      />
      <View style={addHabitStyles.buttonContainer}>
        <Button
          shape={props.isIntroduction ? "circle" : "oval"}
          text={!props.isIntroduction ? "commit" : "start"}
          onPress={onCallToActionPress}
          hasCircleBorder={true}
        />
      </View>
    </View>
  );
};

const addHabitStyles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    alignItems: "flex-start",
    paddingHorizontal: 6,
    paddingBottom: 0.15 * screenHeight,
  },
  addHabitSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    width: "100%",
    paddingHorizontal: CONSTANTS.PADDING,
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
});
