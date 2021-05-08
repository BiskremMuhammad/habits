/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description defines the base redux store
 */

import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import { Habit } from "../types/habit";
import { habitReducer } from "./reducers/habit/habit-reducer";
import { habitSagaWatcher } from "./sagas/habit-saga";

/**
 * interface that defines the glabal store
 *
 * @interface
 * @exports
 */
export interface GlobalStore {
  /**
   * the habits part of the stare
   *
   * @type {Habit[]}
   * @memberof GlobalStore
   */
  habits: Habit[];
}

const sagaWorker = createSagaMiddleWare();

const reducers = combineReducers({
  habits: habitReducer,
});

export const store = createStore(reducers, applyMiddleware(sagaWorker));

sagaWorker.run(habitSagaWatcher);
