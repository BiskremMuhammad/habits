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
import { Habit } from "../../types/habit";
import { CONSTANTS } from "../../utils/constants";
import {
  HabitActions,
  HabitActionTypes,
} from "../reducers/habit/habit-actions";

const fetchHabitsFromAsyncStorage = async (): Promise<Habit[]> => {
  return await new Promise((res, _) => {
    AsyncStorage.getItem(CONSTANTS.ASYNC_STORAGE_HABITS).then((data) => {
      res(JSON.parse(data ? data : "[]"));
    });
  });
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
