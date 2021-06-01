/**
 * @author Muhammad Omran
 * @date 26-05-2021
 * @description implement util functions that is related to dealing with date and time
 */

import { WeekDays } from "../types/week-days";
import { getEnumKeyByEnumValue } from "./enum-type-utils";

/**
 * enum the defines the different states of the day regarding the habit progress
 *
 * @enum
 * @exports
 */
export enum DayState {
  REST,
  REST_BETWEEN_STREAK,
  REST_BETWEEN_INACTIVE_STREAK,
  INACTIVE_STREAK_START,
  INACTIVE_STREAK,
  INACTIVE_STREAK_END,
  STREAK_START,
  STREAK,
  LOGGED_DAY,
  TODAY,
  TODAY_REST,
  TODAY_LOGGED,
  TODAY_STREAK,
  NORMAL,
}

/**
 * helper function that returns month total number of days
 *
 * @param {number} month the month to get total number of days to 31, 30, 29, or 28
 * @param {number} year the year of the month
 * @returns {number} the number of the days in the month
 */
export function getDaysInMonth(month: number, year: number) {
  // 0 = last day of the previous month
  return new Date(year, month + 1, 0).getDate();
}

/**
 * to get the week day name of a date
 *
 * @param {Date} day the Day to get the Week Day Name for it
 * @returns {WeekDays} Week Day
 */
export function getTheWeekDay(day: Date): WeekDays {
  const daysOfWeek: string[] = Object.keys(WeekDays);
  const weekDay = getEnumKeyByEnumValue(WeekDays, daysOfWeek[day.getDay()]);
  return WeekDays[weekDay!];
}

/**
 * to calculate the State of a given day
 *
 * @param {Date} day the day to get the state for
 * @param {Date[]} habitProgress the habit dates progress array
 * @param {WeekDays[]} habitFrequency the habit active days (frequency)
 * @returns {DayState} the state of the day
 */
export function stateOfTheDay(
  day: Date,
  habitProgress: Date[],
  habitFrequency: WeekDays[]
): DayState {
  day.setHours(0, 0, 0, 0);
  const today: Date = new Date(new Date().setHours(0, 0, 0, 0));

  // get the streak data of the day
  const [streak, start, end] = calculateStreak(
    day,
    habitProgress,
    habitFrequency
  );

  // if date is today >> there is gonna be one of 4 cases TODAY, TODAY_REST, TODAY_LOGGED, TODAY_STREAK
  if (day.getTime() === today.getTime()) {
    if (!habitFrequency.includes(getTheWeekDay(day))) {
      return DayState.TODAY_REST;
    }
    if (
      streak > 0 &&
      habitProgress.find((d: Date, _) => d.getTime() === day.getTime())
    ) {
      return DayState.TODAY_STREAK;
    } else if (
      habitProgress.find((d: Date, _) => d.getTime() === day.getTime())
    ) {
      return DayState.TODAY_LOGGED;
    } else {
      return DayState.TODAY;
    }
  } else {
    // date is not today >>
    ////    so the active streak is a streak that has it's end date is today
    ////    and inactive streak the one that it doesn't
    if (
      streak > 0 &&
      end &&
      end.getTime() === today.getTime() &&
      start &&
      start.getTime() === day.getTime()
    ) {
      return DayState.STREAK_START;
    } else if (
      streak > 0 &&
      end &&
      end.getTime() === today.getTime() &&
      habitProgress.find((d: Date, _) => d.getTime() === day.getTime())
    ) {
      return DayState.STREAK;
    } else if (streak > 0 && end && end.getTime() === today.getTime()) {
      return DayState.REST_BETWEEN_STREAK;
    } else if (streak > 1 && start && start.getTime() === day.getTime()) {
      return DayState.INACTIVE_STREAK_START;
    } else if (streak > 0 && start && start.getTime() === day.getTime()) {
      return DayState.LOGGED_DAY;
    } else if (streak > 0 && end && end.getTime() === day.getTime()) {
      return DayState.INACTIVE_STREAK_END;
    } else if (
      streak > 0 &&
      habitProgress.find((d: Date, _) => d.getTime() === day.getTime())
    ) {
      return DayState.INACTIVE_STREAK;
    } else if (streak > 0) {
      return DayState.REST_BETWEEN_INACTIVE_STREAK;
    } else if (!habitFrequency.includes(getTheWeekDay(day))) {
      return DayState.REST;
    } else {
      return DayState.NORMAL;
    }
  }
}

/**
 * To Calculate Streak data of a day
 *
 * @param {Date} day the day to calculate it's streak data
 * @param {Date[]} habitProgress the habit tracked progress days
 * @param {WeekDays[]} habitFrequency the habit active days (frequency)
 * @returns {[number, Date | undefined, Date | undefined]} the streak data, 1st index represents the number of streak days, 2nd index is the starting day of the streak, 3rd index is last day of the streak
 */
export function calculateStreak(
  day: Date,
  habitProgress: Date[],
  habitFrequency: WeekDays[]
): [number, Date | undefined, Date | undefined] {
  if (!habitProgress.length || !habitFrequency.length) {
    return [0, undefined, undefined];
  }
  day.setHours(0, 0, 0, 0);
  let streak: number = 0;
  // streak will be calculated starting of today or yesterday if no progress stil not committed for today
  // and by yesterday i mean the last active day if yesterday is a rest
  const today: Date = new Date(new Date().setHours(0, 0, 0, 0));

  // if day is not today and it's not a rest day & no progress committed in that day
  // this will return empty array >> no streak for that day
  if (
    day.getTime() !== today.getTime() &&
    habitFrequency.includes(getTheWeekDay(day)) &&
    !habitProgress.find((d: Date, _) => d.getTime() === day.getTime())
  ) {
    return [streak, undefined, undefined];
  }

  /// >> now this day is maybe a rest or today or in a streak, get streak data >
  let firstStreakDay: Date = new Date(day.getTime());
  while (
    firstStreakDay.getTime() === today.getTime() ||
    !habitFrequency.includes(getTheWeekDay(firstStreakDay)) ||
    habitProgress.find((d: Date, _) => d.getTime() === firstStreakDay.getTime())
  ) {
    if (
      habitProgress.find(
        (d: Date, _) => d.getTime() === firstStreakDay.getTime()
      )
    ) {
      streak++;
    }
    firstStreakDay = new Date(firstStreakDay.getTime() - 24 * 60 * 60 * 1000);
  }
  // after the loop is done >> firstStreakDay value will be the day before because the day before is one of which is gonna break the loop
  firstStreakDay = new Date(firstStreakDay.getTime() + 24 * 60 * 60 * 1000);

  let lastStreakDay: Date = new Date(day.getTime() + 24 * 60 * 60 * 1000);
  while (
    !habitFrequency.includes(getTheWeekDay(lastStreakDay)) ||
    habitProgress.find((d: Date, _) => d.getTime() === lastStreakDay.getTime())
  ) {
    if (
      habitProgress.find(
        (d: Date, _) => d.getTime() === lastStreakDay.getTime()
      )
    ) {
      streak++;
    }
    lastStreakDay = new Date(lastStreakDay.getTime() + 24 * 60 * 60 * 1000);
  }
  // after the loop is done >> lastStreakDay value will be the day next because the day next is one of which is gonna break the loop
  lastStreakDay =
    lastStreakDay.getTime() === today.getTime()
      ? lastStreakDay
      : new Date(lastStreakDay.getTime() - 24 * 60 * 60 * 1000);

  return [streak, firstStreakDay, lastStreakDay];
}
