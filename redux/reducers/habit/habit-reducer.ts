/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement Habit reducer
 */

import { Habit } from "../../../types/habit";
import { HabitActions, HabitActionTypes } from "./habit-actions";

export const habitReducer = (
  state: Habit[] = [],
  action: HabitActions
): Habit[] => {
  switch (action.type) {
    case HabitActionTypes.LOAD_HABITS_FROM_STORAGE:
      return [...(action.payload as Habit[])];
    case HabitActionTypes.ADD_NEW_HABIT:
      return [...state, action.payload as Habit];
    case HabitActionTypes.DELETE_HABIT:
      return state.filter((h: Habit, i: number) => h.id !== action.payload);
    default:
      return state;
  }
};
