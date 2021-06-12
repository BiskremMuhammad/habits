/**
 * @author Muhammad Omran
 * @date 10-06-2021
 * @description Implement the Dashboard Habit Room Day Component
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HabitProgressData } from "../../../types/habit";
import { DayState } from "../../../utils/calendar-utils";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface DashboardRoomDayProps {
  /**
   * current streak number of days
   *
   * @type {number}
   */
  curStreak: number;

  /**
   * current Streak start date
   *
   * @type {Date}
   */
  curStreakStartDay: Date | undefined;

  /**
   * Component Date's Date
   *
   * @type {Date}
   */
  day: Date;

  /**
   * state of current displayed day
   *
   * @type {DayState}
   */
  dayState: DayState;

  /**
   * week label of the day
   *
   * @type {string}
   */
  dayLabel: string;

  /**
   * the habit progress
   *
   * @type {HabitProgressData[]}
   */
  habitProgress: HabitProgressData[];

  /**
   * the index of the displayed item
   *
   * @type {number}
   */
  index: number;

  /**
   * if the displayed day in the combo days
   *
   * @type {boolean}
   */
  isCombo?: boolean;

  /**
   * array of the most recent days = last 3 days
   *
   * @type {Date[]}
   */
  mostRecentDays?: Date[];
}

export const DashboardRoomDay = (props: DashboardRoomDayProps) => {
  return (
    <View
      style={[
        styles.recentDayItem,
        props.isCombo && styles.recentDaysComboItem,
        !props.isCombo && styles.mostRecentDay,
        props.dayState === DayState.TODAY_LOGGED ||
        props.dayState === DayState.STREAK ||
        props.dayState === DayState.STREAK_START ||
        props.dayState === DayState.TODAY_STREAK
          ? styles.recentDayStreak
          : props.dayState === DayState.INACTIVE_STREAK ||
            props.dayState === DayState.INACTIVE_STREAK_END ||
            props.dayState === DayState.INACTIVE_STREAK_START ||
            props.dayState === DayState.LOGGED_DAY
          ? styles.recentDayInactiveStreak
          : props.dayState === DayState.TODAY ||
            props.dayState === DayState.TODAY_REST ||
            props.dayState === DayState.REST ||
            props.dayState === DayState.REST_BETWEEN_STREAK ||
            props.dayState === DayState.REST_BETWEEN_INACTIVE_STREAK ||
            props.dayState === DayState.NORMAL
          ? styles.recentDayRest
          : {},
        props.isCombo && {
          opacity: 0.7 + props.index / 10,
          left: props.index > 1 ? 4 : props.index * 3,
          transform: [{ scale: 0.8 + props.index / 10 }],
        },
      ]}
    >
      {!props.isCombo &&
        styles.mostRecentDay &&
        props.dayState !== DayState.NORMAL &&
        props.dayState !== DayState.REST &&
        props.dayState !== DayState.LOGGED_DAY &&
        props.dayState !== DayState.TODAY_LOGGED &&
        props.dayState !== DayState.INACTIVE_STREAK_START &&
        props.dayState !== DayState.TODAY &&
        props.dayState !== DayState.STREAK_START && (
          <View style={styles.dayStreakIndecator}></View>
        )}
      {((props.isCombo && props.index === 2) || !props.isCombo) && (
        <Text
          style={[
            styles.recentDayText,
            props.dayState !== DayState.NORMAL &&
              props.dayState !== DayState.REST &&
              props.dayState !== DayState.REST_BETWEEN_INACTIVE_STREAK &&
              props.dayState !== DayState.REST_BETWEEN_STREAK &&
              props.dayState !== DayState.TODAY &&
              props.dayState !== DayState.TODAY_REST &&
              styles.loggedDayText,
          ]}
        >
          {props.isCombo &&
          props.mostRecentDays &&
          props.curStreakStartDay &&
          props.day.getTime() > props.curStreakStartDay.getTime()
            ? `+${
                props.curStreak -
                props.mostRecentDays.reduce(
                  (a, v) =>
                    !!props.habitProgress.find(
                      (d, _) => d.date.getTime() === v.getTime()
                    )
                      ? a + 1
                      : a,
                  0
                )
              }`
            : props.dayLabel}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  recentDaysComboItem: {
    position: "absolute",
  },
  recentDayItem: {
    width: 22,
    height: 22,
    borderRadius: 22,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mostRecentDay: {
    position: "relative",
    marginLeft: 5,
  },
  dayStreakIndecator: {
    width: 6,
    height: 2,
    backgroundColor: "#fff",
    position: "absolute",
    left: -6,
  },
  recentDayStreak: {
    backgroundColor: "#fff",
  },
  recentDayInactiveStreak: {
    backgroundColor: "#605f84",
  },
  recentDayRest: {
    backgroundColor: "#120e3a",
  },
  recentDayText: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    opacity: 0.9,
    color: "#fff",
  },
  loggedDayText: {
    color: "#38366A",
  },
});
