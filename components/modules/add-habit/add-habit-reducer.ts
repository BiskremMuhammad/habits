/**
 * @author Muhammad Omran
 * @date 12-05-2021
 * @description implement a reducer for the add habit form
 */

import { Habit, HabitTypes } from "../../../types/habit";
import { WeekDays } from "../../../types/week-days";

export const INITIAL_ADD_HABIT_STATE: Habit = {
  id: "1",
  type: HabitTypes.READING,
  isEveryDay: true,
  days: Object.keys(WeekDays).map<WeekDays>((k) => k as WeekDays),
  duration: 1,
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

    default:
      return state;
  }
};
