/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description define the Habit type
 */

import { WeekDays } from "./week-days";

/**
 * enum that defines the several types of habit
 *
 * @enum
 * @exports
 */
export enum HabitTypes {
  READING = "READING",
  JOURNALING = "JOURNALING",
  MEDITATING = "MEDITATING",
  FASTING = "FASTING",
}

/**
 * enum that defines the several types of habit
 *
 * @enum
 * @exports
 */
export enum HabitTypesVerbale {
  READING = "Read",
  JOURNALING = "Write",
  MEDITATING = "Meditate",
  FASTING = "Fast",
}

/**
 * enum that defines the several types of habit
 *
 * @enum
 * @exports
 */
export enum HabitTypesIdentity {
  READING = "Reader",
  JOURNALING = "Writer",
  MEDITATING = "Meditater",
  FASTING = "Faster",
}

/**
 * define constant habit durations
 *
 * @type {string[]}
 */
export const HABIT_DURATIONS: string[] = [
  "1 min",
  "5 min",
  "10 min",
  "15 min",
  "30 min",
  "1 hr",
  "2 hr",
];

/**
 * define constant habit durations for fasting habit type
 *
 * @type {string[]}
 */
export const FASTING_HABIT_DURATIONS: string[] = [
  "3 hr",
  "9 hr",
  "11 hr",
  "12 hr",
  "14 hr",
  "18 hr",
  "24 hr",
];

/**
 * interface that defines the Progress data object
 *
 * @interface
 * @exports
 */
export interface HabitProgressData {
  /**
   * the tracked date info
   *
   * @type {Date}
   */
  date: Date;

  /**
   * the tracked duration
   *
   * @type {number}
   */
  duration: number;
}

/**
 * interface that defines the object type for the
 * array of notifications ids specified for habit days if habit is not for everyday
 *
 * @interface
 * @exports
 */
export type HabitNotEveryDayNotificationId = {
  /**
   * object indecies are weeks days
   *
   * @type {string}
   */
  [index in WeekDays]?: string;
};

/**
 * interface that defines the habit object
 *
 * @interface
 * @exports
 */
export interface Habit {
  /**
   * habit id
   *
   * @type {string}
   */
  id: string;

  /**
   * the type of the habit
   *
   * @type {HabitTypes}
   */
  type: HabitTypes;

  /**
   * flag is the habit frequency in a week is everyday or not
   *
   * @type {boolean}
   */
  isEveryDay: boolean;

  /**
   * if the habit frequency is set to not to be everyday, this has the days array
   *
   * @type {WeekDays[]}
   */
  days: WeekDays[];

  /**
   * the duration of the habit in minutes
   *
   * @type {number}
   */
  duration: number;

  /**
   * daily notification specified for this habit
   *
   * @type {string}
   */
  notification: string | HabitNotEveryDayNotificationId;

  /**
   * habit tracker daily progress array
   *
   * @type {HabitProgressData[]}
   */
  progress: HabitProgressData[];
}
