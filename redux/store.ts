/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description defines the base redux store
 */

import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import { Habit } from "../types/habit";
import { HabitActionTypes } from "./reducers/habit/habit-actions";
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

export const store = createStore<GlobalStore, any, any, any>(
  reducers,
  applyMiddleware(sagaWorker)
);

sagaWorker.run(habitSagaWatcher);

// Initially load habits from async storage
store.dispatch({ type: HabitActionTypes.ASYNC_SEND_LOAD_HABITS_FROM_STORAGE });
