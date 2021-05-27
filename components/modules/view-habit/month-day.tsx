/**
 * @author Muhammad Omran
 * @date 26-05-2021
 * @description implement the day component and it's related calculations
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Habit } from "../../../types/habit";
import { DayState, stateOfTheDay } from "../../../utils/calendar-utils";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface MonthDayProps {
  /**
   * the month the day is belonging to, current month to highlight, other to fade
   *
   * @type {"current" | "other"}
   */
  month: "current" | "other";

  /**
   * the full info of the date to get compare with habit progress
   *
   * @type {Date}
   */
  day: Date;

  /**
   * the pretty day number to display
   *
   * @type {number}
   */
  dayNumber: number;

  /**
   * habit to get the day progress
   *
   * @type {Habit}
   */
  habit: Habit;
}

export const MonthDay = (props: MonthDayProps) => {
  const dayState: DayState = stateOfTheDay(
    props.day,
    props.habit.progress,
    props.habit.days
  );
  return (
    <View style={styles.day}>
      <View
        style={[
          styles.dayContainer,
          dayState === DayState.TODAY_LOGGED ||
          dayState === DayState.STREAK ||
          dayState === DayState.STREAK_START ||
          dayState === DayState.TODAY_STREAK
            ? styles.streakDay
            : dayState === DayState.INACTIVE_STREAK ||
              dayState === DayState.INACTIVE_STREAK_END ||
              dayState === DayState.INACTIVE_STREAK_START
            ? styles.inactiveStreakDay
            : dayState === DayState.TODAY || dayState === DayState.TODAY_REST
            ? styles.today
            : {},
        ]}
      >
        <View
          style={[
            styles.dayTextWrapper,
            dayState === DayState.REST ||
            dayState === DayState.REST_BETWEEN_STREAK ||
            dayState === DayState.REST_BETWEEN_INACTIVE_STREAK
              ? styles.restDayTextWrapper
              : {},
          ]}
        >
          <Text
            style={[
              styles.dayText,
              props.month === "other" && styles.otherMonthDay,
            ]}
          >
            {props.dayNumber}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  day: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  dayContainer: {
    width: 32,
    height: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
  },
  streakDay: {
    borderWidth: 2,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderColor: "#fff",
  },
  inactiveStreakDay: {
    borderWidth: 2,
    borderColor: "#8987a3",
    backgroundColor: "#605f84",
  },
  today: {
    borderWidth: 1,
    borderColor: "#fff",
  },
  dayTextWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  restDayTextWrapper: {
    width: 24,
    height: 24,
    backgroundColor: "rgba(12, 8, 52, 0.8)",
    borderRadius: 24,
  },
  dayText: {
    fontFamily: "Rubik-Light",
    fontSize: 14,
    lineHeight: 22,
    color: "#fff",
    opacity: 0.7,
    letterSpacing: 0.22,
  },
  otherMonthDay: {
    opacity: 0.25,
  },
});
