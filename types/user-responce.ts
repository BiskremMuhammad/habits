/**
 * @author Muhammad Omran
 * @date 23-07-2021
 * @description Define Firebase user data document responce type
 */

import { Habit, HabitTypes } from "./habit";

/**
 * interface that defines Firebase Reponce of the single User Document query
 *
 * @interface
 * @exports
 */
export interface UserResponce {
  /**
   * user's firestore entry created at timestamp
   *
   * @type {Date}
   */
  createdAt: Date;

  /**
   * user Habits Data
   *
   * @type {Habit[]}
   */
  habits: Habit[];

  /**
   * user currently practicing a ahabit
   *
   * @type {HabitTypes | "none"}
   */
  practicing: HabitTypes | "none";

  /**
   * user unique expo push token for notifications
   *
   * @type {string}
   */
  pushToken: string;

  /**
   * to force reset all data flag from firebase
   *
   * @type {boolean}
   */
  resetData: boolean;

  /**
   * to force use firebase data to load user data instead of async storage
   *
   * @type  {boolean}
   */
  useFirebaseData: boolean;

  /**
   * update version of user's data
   *
   * @type {number}
   */
  version: number;
}
