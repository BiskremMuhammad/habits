/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement a sample saga
 */

import {
  takeLatest,
  call,
  put,
  CallEffect,
  PutEffect,
} from "redux-saga/effects";
import { Habit } from "../../types/habit";
import {
  HabitActions,
  HabitActionTypes,
} from "../reducers/habit/habit-actions";

const simpleAsyncCall = async (newHabit: Habit): Promise<Habit> => {
  return await new Promise((res, rej) => {
    setTimeout(() => {
      res(newHabit);
    }, 3000);
  });
};

function* simpleAsyncHabitAction(
  action: HabitActions
): Generator<CallEffect<Habit> | PutEffect<HabitActions>, void, Habit> {
  try {
    const data: Habit = yield call(simpleAsyncCall, action.payload as Habit);
    yield put({ type: HabitActionTypes.ADD_NEW_HABIT, payload: data });
  } catch (err) {
    yield put({ type: HabitActionTypes.SEND_ADD_NEW_HABIT_FAILED });
  }
}

export function* habitSagaWatcher() {
  yield takeLatest(HabitActionTypes.SEND_ADD_NEW_HABIT, simpleAsyncHabitAction);
}
