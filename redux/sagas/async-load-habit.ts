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
import { Habit, HabitTypes } from "../../types/habit";
import { CONSTANTS } from "../../utils/constants";
import { getInstallationIdManually } from "../../utils/user";
import {
  HabitActions,
  HabitActionTypes,
} from "../reducers/habit/habit-actions";
import firebase from "../../utils/firebase";
import { UserResponce } from "../../types/user-responce";

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
  const userDeviceUniqueId: string = await getInstallationIdManually();
  let habitsFetchedFromFirebase: boolean = false;
  if (!habits.length) {
    try {
      const userData = await firebase.readDocument(
        CONSTANTS.FIREBASE_HABITS_COLLECTION,
        userDeviceUniqueId
      );
      habitsFetchedFromFirebase = true;
      habits = userData.habits.reduce<Habit[]>(
        (acc: Habit[], v: Habit) =>
          acc.concat({
            ...v,
            progress: v.progress.map((p) => ({ ...p, date: new Date(p.date) })),
          }),
        []
      );
    } catch (er) {
      console.log("firebase no data for the user");
    }
  }
  if (!habitsFetchedFromFirebase) {
    firebase.saveDocument(
      CONSTANTS.FIREBASE_HABITS_COLLECTION,
      { habits, practicing: "none" } as UserResponce,
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
