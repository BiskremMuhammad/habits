/**
 * @author Muhammad Omran
 * @date 11-05-2021
 * @description implement the Week Days Select Panel
 */

import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { WeekDays } from "../../../types/week-days";

/**
 * define the component props
 *
 * @interface
 */
interface WeekDaysSelectProps {
  /**
   * flag if the component is clickable
   *
   * @type {boolean}
   */
  clickable?: boolean;

  /**
   * custom styles for the container
   *
   * @type {StyleProp<ViewStyle>}
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * the selected days array
   *
   * @type {WeekDays[]}
   */
  days: WeekDays[];

  /**
   * dispatch change of the days set
   *
   * @type {(WeekDays[]) => void}
   */
  dispatchDays: (selectedDays: WeekDays[]) => void;

  /**
   * to limit the selection of days to only one day
   * this is only for the case to select the rest day
   *
   * @type {boolean}
   */
  limitOneSelection?: boolean;
}

export const WeekDaysSelect = (props: WeekDaysSelectProps) => {
  const onSelectDay = (d: WeekDays) => {
    if (!props.clickable) return;

    const selectedDays: WeekDays[] = props.limitOneSelection
      ? (Object.keys(WeekDays).filter((key: string) => key !== d) as WeekDays[])
      : props.days.includes(d)
      ? (props.days.filter((day) => day !== d) as WeekDays[])
      : [...props.days, d];

    if (props.dispatchDays) {
      props.dispatchDays(selectedDays);
    }
  };

  return (
    <View style={[WeekDaysSelectStyles.container, props.containerStyle]}>
      {Object.keys(WeekDays).map((key: string) => (
        <Pressable
          key={key}
          onPress={() => onSelectDay(key as WeekDays)}
          style={[
            WeekDaysSelectStyles.day,
            !props.days.includes(key as WeekDays) &&
              WeekDaysSelectStyles.dayDisabled,
          ]}
        >
          <Text
            style={[
              WeekDaysSelectStyles.dayText,
              !props.days.includes(key as WeekDays) &&
                WeekDaysSelectStyles.dayTextDisabled,
            ]}
          >
            {key}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const WeekDaysSelectStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(196, 196, 196, 0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 1,
  },
  dayDisabled: {
    backgroundColor: "#151032",
  },
  dayText: {
    color: "#282536",
    fontFamily: "Rubik-Bold",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  dayTextDisabled: {
    color: "#fff",
  },
});
