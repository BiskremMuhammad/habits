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
  ASYNC_SEND_LOAD_HABITS_FROM_STORAGE = "ASYNC_SEND_LOAD_HABITS_FROM_STORAGE",
  LOAD_HABITS_FROM_STORAGE = "LOAD_HABITS_FROM_STORAGE",
  INTRODUCTION_CLEAR_UP = "INTRODUCTION_CLEAR_UP",
  SEND_ADD_NEW_HABIT = "SEND_ADD_NEW_HABIT",
  SEND_ADD_NEW_HABIT_FAILED = "SEND_ADD_NEW_HABIT_FAILED",
  ADD_NEW_HABIT = "ADD_NEW_HABIT",
  UPDATE_HABIT = "UPDATE_HABIT",
  DELETE_HABIT = "DELETE_HABIT",
  SAVE_DAY_PROGRESS = "SAVE_DAY_PROGRESS",
}

/**
 * interface that defines the payload type of Submittin time Progress action
 *
 * @interface
 * @exports
 */
export interface ProgressPayload {
  /**
   * the id of the habit
   *
   * @type {string}
   */
  habitId: string;

  /**
   * the time tracked
   *
   * @type {number}
   */
  time: number;
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
  payload?: Habit[] | Habit | string | ProgressPayload;
}
