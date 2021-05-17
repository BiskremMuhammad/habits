/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement Habit reducer
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "../../../types/habit";
import { CONSTANTS } from "../../../utils/constants";
import { HabitActions, HabitActionTypes } from "./habit-actions";

export const habitReducer = (
  state: Habit[] = [],
  action: HabitActions
): Habit[] => {
  let newState: Habit[] = [];

  switch (action.type) {
    case HabitActionTypes.LOAD_HABITS_FROM_STORAGE:
      return [...(action.payload as Habit[])];
    case HabitActionTypes.ADD_NEW_HABIT:
      newState = [...state, action.payload as Habit];
      AsyncStorage.setItem(
        CONSTANTS.ASYNC_STORAGE_HABITS,
        JSON.stringify(newState)
      );
      return newState;
    case HabitActionTypes.DELETE_HABIT:
      newState = state.filter((h: Habit, i: number) => h.id !== action.payload);
      AsyncStorage.setItem(
        CONSTANTS.ASYNC_STORAGE_HABITS,
        JSON.stringify(newState)
      );
      return newState;
    default:
      return state;
  }
};
