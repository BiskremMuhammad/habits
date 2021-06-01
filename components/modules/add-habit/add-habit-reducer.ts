/**
 * @author Muhammad Omran
 * @date 12-05-2021
 * @description implement a reducer for the add habit form
 */

import { v4 as uuid } from "uuid";
import { Habit, HabitTypes } from "../../../types/habit";
import { WeekDays } from "../../../types/week-days";

const today = new Date(new Date().setHours(0, 0, 0, 0));
const testProgress: Date[] = [
  today,
  new Date(today.getTime() - 24 * 60 * 60 * 1000),
  new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
  new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000),
  new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
  new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000),
  new Date(today.getTime() - 9 * 24 * 60 * 60 * 1000),
  new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000),
  new Date(today.getTime() - 13 * 24 * 60 * 60 * 1000),
  new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000),
  new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000),
  new Date(today.getTime() - 16 * 24 * 60 * 60 * 1000),
  new Date(today.getTime() - 17 * 24 * 60 * 60 * 1000),
];

export const INITIAL_ADD_HABIT_STATE: Habit = {
  id: uuid(),
  type: HabitTypes.READING,
  isEveryDay: true,
  days: Object.keys(WeekDays).map<WeekDays>((k) => k as WeekDays),
  duration: 1,
  progress: [...testProgress],
};

/**
 * enum that defines different actions for the add habit form
 *
 * @enum
 */
export enum AddHabitActionTypes {
  CHANGE_HABIT_TYPE = "CHANGE_HABIT_TYPE",
  CHANGE_HABIT_EVERYDAY_STATE = "CHANGE_HABIT_EVERYDAY_STATE",
  CHANGE_HABIT_FREQUENCY = "CHANGE_HABIT_FREQUENCY",
  CHANGE_HABIT_DURATION = "CHANGE_HABIT_DURATION",
  UPDATE_HABIT = "UPDATE_HABIT",
}

/**
 * interface that defines the type of the action
 *
 * @interface
 */
export interface AddHabitAction {
  /**
   * the type of the action
   *
   * @type {AddHabitActionTypes}
   */
  type: AddHabitActionTypes;

  /**
   * action payload
   *
   * @type {any}
   */
  payload: any;
}

export const addHabitReducer = (
  state: Habit = INITIAL_ADD_HABIT_STATE,
  action: AddHabitAction
): Habit => {
  switch (action.type) {
    case AddHabitActionTypes.CHANGE_HABIT_TYPE:
      return { ...state, type: action.payload };

    case AddHabitActionTypes.CHANGE_HABIT_EVERYDAY_STATE:
      return {
        ...state,
        isEveryDay: typeof action.payload === "boolean" && action.payload,
        days:
          typeof action.payload === "boolean" && action.payload
            ? Object.keys(WeekDays).map<WeekDays>((k) => k as WeekDays)
            : action.payload,
      };
    case AddHabitActionTypes.CHANGE_HABIT_FREQUENCY:
      // if custom schedule is all 7 days of the week are selected >> so turn on the everyday flag
      if (action.payload.length === 7)
        return {
          ...state,
          isEveryDay: true,
          days: Object.keys(WeekDays).map<WeekDays>((k) => k as WeekDays),
        };
      else return { ...state, isEveryDay: false, days: action.payload };

    case AddHabitActionTypes.CHANGE_HABIT_DURATION:
      return {
        ...state,
        duration:
          Number(action.payload.match(/\d+/g)[0]) *
          (action.payload.includes("h") ? 60 : 1),
      };

    case AddHabitActionTypes.UPDATE_HABIT:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};
