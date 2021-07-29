/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement a saga to async load habits from async storage at initial load
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CallEffect,
  PutEffect,
  put,
  call,
  takeLatest,
} from "redux-saga/effects";
import {
  Habit,
  HabitNotEveryDayNotificationId,
  HabitTypes,
} from "../../types/habit";
import { CONSTANTS } from "../../utils/constants";
import { getUserDeviceIdAsync } from "../../utils/user";
import {
  HabitActions,
  HabitActionTypes,
} from "../reducers/habit/habit-actions";
import firebase from "../../utils/firebase";
import { UserResponce } from "../../types/user-responce";
import { HabitUtils } from "../../utils/habit-utils";

const fetchHabitsFromAsyncStorage = async (): Promise<Habit[]> => {
  let habits: Habit[] = await AsyncStorage.getItem(
    CONSTANTS.ASYNC_STORAGE_HABITS
  ).then((data) => {
    const results: Array<any> = JSON.parse(data ? data : "[]");
    const formattedResults: Habit[] = results.reduce<Habit[]>(
      (acc: Habit[], v: Habit) =>
        acc.concat({
          ...v,
          progress: v.progress.map((p) => ({ ...p, date: new Date(p.date) })),
        }),
      []
    );
    return formattedResults;
  });

  // if no habits check firebase
  const userDeviceUniqueId: string = await getUserDeviceIdAsync();
  let habitsFetchedFromFirebase: boolean = false;
  let userData;
  try {
    userData = await firebase.readDocument(
      CONSTANTS.FIREBASE_HABITS_COLLECTION,
      userDeviceUniqueId
    );
  } catch (er) {
    console.log("firebase no data for the user");
  }
  if (userData && !habits.length) {
    habitsFetchedFromFirebase = true;
    habits = userData.habits.reduce<Habit[]>(
      (acc: Habit[], v: Habit) =>
        acc.concat({
          ...v,
          progress: v.progress.map((p) => ({ ...p, date: new Date(p.date) })),
        }),
      []
    );
  }

  // check for unnotified habit.
  habits = await Promise.all(
    habits
      .filter((h: Habit) => Object.keys(HabitTypes).includes(h.type))
      .map(async (h: Habit): Promise<Habit> => {
        // generate a scheduled notification for the habit if there is no notification
        let notificationId: string | HabitNotEveryDayNotificationId =
          h.notification;
        if (!notificationId) {
          habitsFetchedFromFirebase = false; // to update firebase with notification ids
          notificationId = await HabitUtils.scheduleHabitNotificationAsync(h);
        }
        return {
          ...h,
          notification: notificationId,
        };
      })
  );
  if (!habitsFetchedFromFirebase) {
    firebase.saveDocument(
      CONSTANTS.FIREBASE_HABITS_COLLECTION,
      {
        habits,
        practicing: "none",
        pushToken: userData && userData.pushToken ? userData.pushToken : "",
      } as UserResponce,
      userDeviceUniqueId
    );
  }
  return habits;
};

function* loadHabitsFromAsyncStorage(): Generator<
  CallEffect<Habit[]> | PutEffect<HabitActions>,
  void,
  Habit[]
> {
  try {
    const data = yield call(fetchHabitsFromAsyncStorage);
    yield put({
      type: HabitActionTypes.LOAD_HABITS_FROM_STORAGE,
      payload: data,
    });
  } catch (err) {
    yield put({ type: HabitActionTypes.LOAD_HABITS_FROM_STORAGE, payload: [] });
  }
}

export function* watchForLoadHabitsFromAsyncStorage() {
  yield takeLatest(
    HabitActionTypes.ASYNC_SEND_LOAD_HABITS_FROM_STORAGE,
    loadHabitsFromAsyncStorage
  );
}
