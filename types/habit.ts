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
  SKETCHING = "SKETCHING",
  MEDITATING = "MEDITATING",
}

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
  days?: WeekDays[];

  /**
   * the duration of the habit in minutes
   *
   * @type {number}
   */
  duration: number;
}