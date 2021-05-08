/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement actions and action type definitions related to the habit
 */

import { Habit } from "../../../types/habit";

/**
 * enum that defines all action types
 *
 * @enum
 * @exports
 */
export enum HabitActionTypes {
  SEND_ADD_NEW_HABIT = "SEND_ADD_NEW_HABIT",
  SEND_ADD_NEW_HABIT_FAILED = "SEND_ADD_NEW_HABIT_FAILED",
  ADD_NEW_HABIT = "ADD_NEW_HABIT",
  UPDATE_HABIT = "UPDATE_HABIT",
  DELETE_HABIT = "DELETE_HABIT",
}

/**
 * interface that definse the Action structure
 *
 * @interface
 * @exports
 */
export interface HabitActions {
  /**
   * the type of the action
   *
   * @type {HabitActionTypes}
   * @memberof HabitActions
   */
  type: HabitActionTypes;

  /**
   * the payload of action
   *  - of type Habit when to add a new Habit
   *  - of type string when delete >> represents the id of the habit
   *
   * @type {Habit | string}
   * @memberof HabitActions
   */
  payload?: Habit | string;
}
