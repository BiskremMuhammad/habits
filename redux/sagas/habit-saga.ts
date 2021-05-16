/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement a sample saga
 */

import { all } from "redux-saga/effects";
import { watchForLoadHabitsFromAsyncStorage } from "./async-load-habit";
import { watchForSampleSaga } from "./sample-saga";

export function* habitSagaWatcher() {
  yield all([watchForSampleSaga(), watchForLoadHabitsFromAsyncStorage()]);
}
