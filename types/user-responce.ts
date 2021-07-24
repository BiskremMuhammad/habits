/**
 * @author Muhammad Omran
 * @date 23-07-2021
 * @description Define Firebase user data document responce type
 */

import { Habit, HabitTypes } from "./habit";

/**
 * interface that defines Firebase Reponce of the single User Document query
 *
 * @interface
 * @exports
 */
export interface UserResponce {
  /**
   * user Habits Data
   *
   * @type {Habit[]}
   */
  habits: Habit[];

  /**
   * user currently practicing a ahabit
   *
   * @type {HabitTypes | "none"}
   */
  practicing: HabitTypes | "none";
}