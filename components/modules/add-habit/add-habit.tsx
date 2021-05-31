/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the add habit form
 */

import { useNavigation } from "@react-navigation/core";
import React, { Dispatch, useReducer } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  HabitActions,
  HabitActionTypes,
} from "../../../redux/reducers/habit/habit-actions";
import { GlobalStore } from "../../../redux/store";
import { TimerScreenRouteParams } from "../../../screens/timer-screen";
import { CommonStyles } from "../../../styles/common";
import { Habit, HabitTypes } from "../../../types/habit";
import { Routes } from "../../../types/route-names";
import { WeekDays } from "../../../types/week-days";
import { CONSTANTS } from "../../../utils/constants";
import { Button } from "../../elements/button";
import { Input } from "../../elements/input";
import BookIcon from "../../svgs/book";
import {
  AddHabitActionTypes,
  addHabitReducer,
  INITIAL_ADD_HABIT_STATE,
} from "./add-habit-reducer";
import { HabitDurationInput } from "./habit-duration";
import { HabitFrequencyInput } from "./habit-frequency";

const { height: screenHeight } = Dimensions.get("screen");

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface AddHabitProps {
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
}

export const AddHabit = (props: AddHabitProps) => {
  const habits: Habit[] = useSelector<GlobalStore, Habit[]>(
    (store: GlobalStore): Habit[] => store.habits
  );
  const storeDispatch = useDispatch<Dispatch<HabitActions>>();

  const [state, dispatch] = useReducer(
    addHabitReducer,
    INITIAL_ADD_HABIT_STATE
  );
  const { type, isEveryDay, days, duration } = state;
  const navigation = useNavigation();

  const onChangeHabit = (val: string) => {
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_TYPE,
      payload: `${val}ING`,
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

  const onCallToActionPress = () => {
    if (props.isIntroduction) {
      navigation.navigate(Routes.TIMER, {
        habitId: state.id,
      } as TimerScreenRouteParams);
    } else {
      navigation.navigate(Routes.IDENTITY_REINFORCEMENT, {
        habitId: state.id,
      } as TimerScreenRouteParams);
    }
    storeDispatch({
      type: HabitActionTypes.ADD_NEW_HABIT,
      payload: state,
    });
  };

  return (
    <View style={addHabitStyles.container}>
      <View style={addHabitStyles.addHabitSection}>
        <Text style={addHabitStyles.label}>I will</Text>
        <Input
          text={type.replace(/ing/gi, "")}
          width="long"
          icon={
            <BookIcon width={16} height={21} style={CommonStyles.withIcon} />
          }
          onChange={onChangeHabit}
          isDropdown={true}
          dropdownOptions={
            props.enableChangeHabit
              ? Object.keys(HabitTypes).map((k) => k.replace(/ing/gi, ""))
              : undefined
          }
          hasBorder={true}
          hasCircleBorder={true}
        />
      </View>
      {props.enableFrequencySelect && (
        <HabitFrequencyInput
          isEveryDay={isEveryDay}
          days={days}
          dispatchDays={dispatchDays}
          onChangeFreq={onChangeFreq}
        />
      )}
      <HabitDurationInput
        enableDurationSelect={props.enableDurationSelect}
        extraStyles={addHabitStyles.addHabitSection}
        initialDuration={duration}
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
    paddingBottom: 0.0855 * screenHeight,
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
