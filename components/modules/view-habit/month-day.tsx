/**
 * @author Muhammad Omran
 * @date 26-05-2021
 * @description implement the day component and it's related calculations
 */

import React, { useMemo } from "react";
import { View, Text, StyleSheet, I18nManager } from "react-native";
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
  const dayState: DayState = useMemo(
    () => stateOfTheDay(props.day, props.habit),
    [props.day, props.habit.progress, props.habit.days]
  );
  return (
    <View style={styles.day}>
      {dayState !== DayState.NORMAL &&
        dayState !== DayState.REST &&
        dayState !== DayState.LOGGED_DAY &&
        dayState !== DayState.TODAY_LOGGED &&
        dayState !== DayState.TODAY &&
        dayState !== DayState.TODAY_REST && (
          <View style={styles.streakDayIndicatorContainer}>
            {dayState !== DayState.INACTIVE_STREAK_START &&
              dayState !== DayState.TODAY_IN_STREAK &&
              dayState !== DayState.STREAK_START && (
                <View
                  style={[
                    styles.streakDayIndicator,
                    styles.streakDayIndicatorLeft,
                    dayState === DayState.INACTIVE_STREAK_END ||
                    dayState === DayState.INACTIVE_STREAK ||
                    dayState === DayState.REST_BETWEEN_INACTIVE_STREAK
                      ? styles.inactiveStreakDayIndicator
                      : {},
                  ]}
                ></View>
              )}
            {dayState === DayState.TODAY_IN_STREAK && (
              <View
                style={[
                  styles.todayWaitingForStreakIndicator,
                  styles.streakDayIndicatorLeft,
                ]}
              ></View>
            )}
            {dayState !== DayState.INACTIVE_STREAK_END &&
              dayState !== DayState.TODAY_STREAK &&
              dayState !== DayState.TODAY_IN_STREAK &&
              dayState !== DayState.TODAY_REST_STREAK && (
                <View
                  style={[
                    styles.streakDayIndicator,
                    styles.streakDayIndicatorRight,
                    dayState === DayState.INACTIVE_STREAK_START ||
                    dayState === DayState.INACTIVE_STREAK ||
                    dayState === DayState.REST_BETWEEN_INACTIVE_STREAK
                      ? styles.inactiveStreakDayIndicator
                      : {},
                  ]}
                ></View>
              )}
          </View>
        )}
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
              dayState === DayState.INACTIVE_STREAK_START ||
              dayState === DayState.LOGGED_DAY
            ? styles.inactiveStreakDay
            : dayState === DayState.TODAY ||
              dayState === DayState.TODAY_IN_STREAK
            ? styles.today
            : dayState === DayState.TODAY_REST
            ? { ...styles.today, backgroundColor: "#120e3a" }
            : {},
        ]}
      >
        {dayState === DayState.TODAY ||
        dayState === DayState.TODAY_IN_STREAK ||
        dayState === DayState.TODAY_LOGGED ||
        dayState === DayState.TODAY_REST ||
        dayState === DayState.TODAY_STREAK ? (
          <View
            style={[
              styles.todayCircle,
              dayState === DayState.TODAY_STREAK ||
              dayState === DayState.TODAY_LOGGED
                ? styles.todayStreakCircle
                : {},
            ]}
          ></View>
        ) : null}
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
              dayState !== DayState.NORMAL &&
                dayState !== DayState.REST &&
                dayState !== DayState.REST_BETWEEN_INACTIVE_STREAK &&
                dayState !== DayState.REST_BETWEEN_STREAK &&
                dayState !== DayState.TODAY &&
                dayState !== DayState.TODAY_IN_STREAK &&
                dayState !== DayState.TODAY_REST &&
                dayState !== DayState.TODAY_REST_STREAK &&
                styles.streakDayText,
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
    position: "relative",
    marginBottom: 10,
  },
  dayContainer: {
    width: 32,
    height: 32,
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
  },
  streakDay: {
    borderWidth: 2,
    backgroundColor: "#a9a7ba",
    borderColor: "#fff",
    borderRadius: 32,
  },
  inactiveStreakDay: {
    borderWidth: 2,
    borderColor: "#8987a3",
    backgroundColor: "#605f84",
    borderRadius: 32,
  },
  streakDayIndicatorContainer: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  todayWaitingForStreakIndicator: {
    position: "absolute",
    width: "20%",
    height: 2,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  streakDayIndicator: {
    position: "absolute",
    width: "50%",
    height: 2,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  inactiveStreakDayIndicator: {
    backgroundColor: "#8D8BA6",
  },
  streakDayIndicatorLeft: {
    left: -2,
  },
  streakDayIndicatorRight: {
    right: -2,
  },
  today: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 32,
  },
  todayCircle: {
    position: "absolute",
    top: 4,
    right: 0,
    width: 5,
    height: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#242154",
  },
  todayStreakCircle: {
    backgroundColor: "#9F9EB4",
    right: -2,
  },
  dayTextWrapper: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
  },
  restDayTextWrapper: {
    width: 24,
    height: 24,
    backgroundColor: "#120e3a",
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
  streakDayText: {
    fontFamily: "Rubik-SemiBold",
    color: "#0C0834",
    opacity: 0.8,
  },
});
