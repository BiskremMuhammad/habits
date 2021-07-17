/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement Habit reducer
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "../../../types/habit";
import { CONSTANTS } from "../../../utils/constants";
import {
  HabitActions,
  HabitActionTypes,
  ProgressPayload,
} from "./habit-actions";

export const habitReducer = (
  state: Habit[] = [],
  action: HabitActions
): Habit[] => {
  let newState: Habit[] = [];

  switch (action.type) {
    case HabitActionTypes.LOAD_HABITS_FROM_STORAGE:
      return [...(action.payload as Habit[])];

    case HabitActionTypes.SAVE_DAY_PROGRESS:
      const today: Date = new Date(new Date().setHours(0, 0, 0, 0));
      const { habitId, time } = action.payload as ProgressPayload;
      const timeRounded: number =
        time % 60 !== 0 ? Math.ceil(time / 60) * 60 : time;
      newState = state.map((h: Habit, i: number) => {
        if (
          h.id === habitId &&
          !h.progress.find((data, i) => data.date.getTime() === today.getTime())
        ) {
          return {
            ...h,
            progress: h.progress.concat({
              date: today,
              duration: timeRounded,
            }),
          };
        } else if (h.id === habitId) {
          return {
            ...h,
            progress: h.progress.map((data, i) => ({
              date: data.date,
              duration:
                data.date.getTime() === today.getTime()
                  ? data.duration + timeRounded
                  : data.duration,
            })),
          };
        }
        return h;
      });
      AsyncStorage.setItem(
        CONSTANTS.ASYNC_STORAGE_HABITS,
        JSON.stringify(newState)
      );
      return newState;

    case HabitActionTypes.ADD_NEW_HABIT:
      newState = [...state, action.payload as Habit];
      AsyncStorage.setItem(
        CONSTANTS.ASYNC_STORAGE_HABITS,
        JSON.stringify(newState)
      );
      return newState;

    case HabitActionTypes.UPDATE_HABIT:
      newState = state.map((h: Habit, _) =>
        h.id === (action.payload as Habit).id ? (action.payload as Habit) : h
      );
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

    case HabitActionTypes.INTRODUCTION_CLEAR_UP:
      newState = [];
      AsyncStorage.setItem(
        CONSTANTS.ASYNC_STORAGE_HABITS,
        JSON.stringify(newState)
      );
      return newState;
    default:
      return state;
  }
};
