/**
 * @author Muhammad Omran
 * @date 12-05-2021
 * @description implement a reducer for the add habit form
 */

import { v4 as uuid } from "uuid";
import {
  Habit,
  HabitProgressData,
  HabitTypes,
  HabitTypesVerbale,
} from "../../../types/habit";
import { WeekDays } from "../../../types/week-days";
import { getEnumKeyByEnumValue } from "../../../utils/enum-type-utils";

const today = new Date(new Date().setHours(0, 0, 0, 0));
const testProgress: HabitProgressData[] = [
  // today,
  { date: new Date(today.getTime() - 24 * 60 * 60 * 1000), duration: 30 },
  // { date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), duration: 60 },
  // { date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000), duration: 45 },
  // { date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000), duration: 15 },
  // { date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000), duration: 60 },
  // { date: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000), duration: 15 },
  // { date: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), duration: 20 },
  // { date: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000), duration: 30 },
  // { date: new Date(today.getTime() - 9 * 24 * 60 * 60 * 1000), duration: 60 },
  // { date: new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000), duration: 45 },
  // { date: new Date(today.getTime() - 13 * 24 * 60 * 60 * 1000), duration: 25 },
  // { date: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000), duration: 25 },
  // { date: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000), duration: 30 },
  // { date: new Date(today.getTime() - 16 * 24 * 60 * 60 * 1000), duration: 30 },
  // { date: new Date(today.getTime() - 17 * 24 * 60 * 60 * 1000), duration: 30 },
];

export const INITIAL_ADD_HABIT_STATE: Habit = {
  id: uuid(),
  type: HabitTypes.READING,
  title: HabitTypesVerbale.READING,
  isEveryDay: true,
  days: Object.keys(WeekDays).map<WeekDays>((k) => k as WeekDays),
  duration: 1,
  notification: "",
  progress: [],
  isRoutine: false,
  datetime: {
    hour: 8,
    minute: 30,
  },
  routineHabits: [],
};

/**
 * enum that defines different actions for the add habit form
 *
 * @enum
 */
export enum AddHabitActionTypes {
  CHANGE_HABIT_TYPE = "CHANGE_HABIT_TYPE",
  CHANGE_HABIT_TO_ROUTINE = "CHANGE_HABIT_TO_ROUTINE",
  CHANGE_HABIT_EVERYDAY_STATE = "CHANGE_HABIT_EVERYDAY_STATE",
  CHANGE_HABIT_FREQUENCY = "CHANGE_HABIT_FREQUENCY",
  CHANGE_HABIT_DURATION = "CHANGE_HABIT_DURATION",
  CHANGE_HABIT_TIME = "CHANGE_HABIT_TIME",
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
      return {
        ...state,
        type: Object.values(HabitTypesVerbale)
          .slice(0, 4)
          .some(
            (h) =>
              action.payload
                ?.toLowerCase()
                .includes(
                  h
                    .substring(
                      0,
                      h === HabitTypesVerbale.MEDITATING
                        ? h.length - 1
                        : h.length
                    )
                    .toLowerCase()
                ) || action.payload === HabitTypes.JOURNALING
          )
          ? action.payload
          : HabitTypes.OTHER,
        title: Object.values(HabitTypesVerbale)
          .slice(0, 4)
          .some(
            (h) =>
              action.payload
                ?.toLowerCase()
                .includes(
                  h
                    .substring(
                      0,
                      h === HabitTypesVerbale.MEDITATING
                        ? h.length - 1
                        : h.length
                    )
                    .toLowerCase()
                ) || action.payload === HabitTypes.JOURNALING
          )
          ? Object.entries(HabitTypesVerbale)
              .slice(0, 4)
              .find(
                ([k, _]) => k.toLowerCase() === action.payload?.toLowerCase()
              )?.[1] || ""
          : action.payload,
        duration: action.payload === HabitTypes.FASTING ? 3 * 60 : 1,
      };

    case AddHabitActionTypes.CHANGE_HABIT_TO_ROUTINE:
      return {
        ...state,
        isRoutine: typeof action.payload === "boolean" && action.payload,
      };

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
          (action.payload.includes("hr") ? 60 : 1),
      };

    case AddHabitActionTypes.CHANGE_HABIT_TIME:
      return {
        ...state,
        datetime: action.payload,
      };

    case AddHabitActionTypes.UPDATE_HABIT:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};
