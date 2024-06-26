/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the add habit form
 */

import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  I18nManager,
  Text,
  View,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  HabitActions,
  HabitActionTypes,
} from "../../../redux/reducers/habit/habit-actions";
import { TimerScreenRouteParams } from "../../../screens/timer-screen";
import { CommonStyles } from "../../../styles/common";
import {
  Habit,
  HabitNotEveryDayNotificationId,
  HabitTypes,
  HabitTypesVerbale,
} from "../../../types/habit";
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
import { useDispatch, useSelector } from "react-redux";
import { HabitUtils } from "../../../utils/habit-utils";
import { GlobalStore } from "../../../redux/store";
import { Radio } from "../../elements/radio";
import { Time24Prettify, mapToHabitTime } from "../../../utils/calendar-utils";

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
  const habits: Habit[] = useSelector<GlobalStore, Habit[]>(
    (store: GlobalStore): Habit[] => store.habits
  );
  const { type, isEveryDay, days, duration, title, isRoutine, datetime } =
    props.state;
  const navigation = useNavigation();
  const [currentOpenInput, setCurrentOpenInput] = useState(OpenedDropDown.NONE);
  const storeDispatch = useDispatch();

  // to limit the habit creation to only one usage of habit type
  useLayoutEffect(() => {
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_TYPE,
      payload:
        Object.values(HabitTypes)[
          Math.floor(Math.random() * (Object.values(HabitTypes).length - 1))
        ],
    });
  }, [habits]);

  const onChangeOpenedDropdown = (state: boolean, input: OpenedDropDown) => {
    setCurrentOpenInput(state ? input : OpenedDropDown.NONE);
  };

  const onToggleRoutine = (val: boolean) => {
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_TO_ROUTINE,
      payload: val,
    });
  };

  const onShowAndroidTimePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(0, 0, 0, datetime.hour, datetime.minute),
      onChange: onChangeRoutineTime,
      mode: "time",
      is24Hour: false,
    });
  };

  const onChangeHabit = (val: string) => {
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_TYPE,
      payload: getEnumKeyByEnumValue(HabitTypesVerbale, val) || val,
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

  const onChangeRoutineTime = (d: DateTimePickerEvent) => {
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_TIME,
      payload: mapToHabitTime(new Date(d.nativeEvent.timestamp)),
    });
  };

  const onCallToActionPress = async () => {
    if (!days.length) return;

    let notificationId: string | HabitNotEveryDayNotificationId = isEveryDay
      ? ""
      : {};
    if (!props.isIntroduction) {
      notificationId = await HabitUtils.scheduleHabitNotificationAsync(
        props.state
      );
    }

    const habit: Habit = { ...props.state, notification: notificationId };
    if (props.isIntroduction && habit.isRoutine) {
      habit.routineHabits = [
        {
          title: "Example Period",
          duration: 1,
        },
      ];
    }
    storeDispatch({
      type: HabitActionTypes.ADD_NEW_HABIT,
      payload: habit,
    });
    if (props.isIntroduction) {
      navigation.navigate(Routes.TIMER, {
        habitId: habit.id,
      } as TimerScreenRouteParams);
    } else {
      navigation.navigate(Routes.IDENTITY_REINFORCEMENT, {
        habitId: habit.id,
      } as TimerScreenRouteParams);
    }
  };

  return (
    <View style={addHabitStyles.container}>
      {type !== HabitTypes.FASTING && (
        <View
          style={{
            marginBottom: 16,
            display: "flex",
            flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
            paddingHorizontal: CONSTANTS.PADDING - 14,
          }}
        >
          <Radio
            index={1}
            label="Habit"
            selected={!isRoutine}
            onChange={() => onToggleRoutine(false)}
          />
          <Radio
            index={2}
            label="Routine"
            selected={isRoutine}
            onChange={() => onToggleRoutine(true)}
          />
        </View>
      )}
      <View
        style={[
          addHabitStyles.addHabitSection,
          Platform.OS === "ios" && { zIndex: 5 },
        ]}
      >
        <Text style={addHabitStyles.label}>I will{isRoutine ? " Do" : ""}</Text>
        <Input
          text={title}
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
          isTextInput={true}
          onChange={onChangeHabit}
          // isDropdown={true}
          // dropdownOptions={
          //   props.enableChangeHabit
          //     ? Object.values(HabitTypesVerbale)
          //         .filter(
          //           (habitType) =>
          //             !habits.length ||
          //             !!!habits.find(
          //               (h) =>
          //                 h.type ===
          //                 getEnumKeyByEnumValue(HabitTypesVerbale, habitType)
          //             )
          //         )
          //         .map((k) => k)
          //     : undefined
          // }
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
      <View
        style={[
          addHabitStyles.addHabitSection,
          // { marginBottom: 16 },
          Platform.OS === "ios" && { zIndex: 5 },
        ]}
      >
        <Text style={addHabitStyles.label}>at</Text>
        {Platform.OS === "android" ? (
          <Pressable onPress={onShowAndroidTimePicker}>
            <Input
              text={Time24Prettify(datetime)}
              width="long"
              hideIcon={true}
              onChange={onShowAndroidTimePicker}
              hasBorder={true}
              hasCircleBorder={true}
            />
          </Pressable>
        ) : (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(0, 0, 0, datetime.hour, datetime.minute)}
            mode="time"
            onChange={onChangeRoutineTime}
            display="inline"
            style={{ ...addHabitStyles.label, marginTop: 8 }}
          />
        )}
      </View>
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
          hasBackground={props.isIntroduction}
          isStatic={props.isIntroduction}
          extraTextStyles={
            props.isIntroduction && { textTransform: "capitalize" }
          }
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
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
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
