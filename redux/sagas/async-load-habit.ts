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
import fb from "firebase/app";
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
import { PushNotification } from "../../utils/push-notification";

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
  const reset: boolean = !!userData && userData.resetData;
  const useFirebaseData: boolean = !!userData && userData.useFirebaseData;

  if (userData && (!habits.length || useFirebaseData) && !reset) {
    habitsFetchedFromFirebase = true;
    habits = userData.habits.reduce<Habit[]>((acc: Habit[], v: Habit) => {
      return acc.concat({
        ...v,
        progress: v.progress.map((p) => ({
          ...p,
          date: new Date((p.date as any).toDate()),
        })),
      });
    }, []);
  }

  // check for unnotified habit.
  habits = reset
    ? []
    : await Promise.all(
        habits
          .filter((h: Habit) => Object.keys(HabitTypes).includes(h.type))
          .map(async (h: Habit): Promise<Habit> => {
            // generate a scheduled notification for the habit if there is no notification
            let notificationId: string | HabitNotEveryDayNotificationId =
              h.notification;
            if (
              !notificationId ||
              (typeof notificationId !== "string" &&
                !Object.keys(notificationId).length)
            ) {
              habitsFetchedFromFirebase = false; // to update firebase with notification ids
              notificationId = await HabitUtils.scheduleHabitNotificationAsync(
                h
              );
            }
            return {
              ...h,
              notification: notificationId,
            };
          })
      );
  if (!habitsFetchedFromFirebase) {
    let userPushNotificationsToken: string =
      userData && userData.pushToken ? userData.pushToken : "";
    if (!userPushNotificationsToken) {
      userPushNotificationsToken =
        (await AsyncStorage.getItem(CONSTANTS.EXPO_PUSH_TOKEN)) || "";
    }
    await firebase.saveDocument(
      CONSTANTS.FIREBASE_HABITS_COLLECTION,
      {
        createdAt:
          userData && userData.createdAt
            ? userData.createdAt
            : new Date(Date.now()),
        habits,
        practicing: "none",
        pushToken: userPushNotificationsToken,
        resetData: false,
        useFirebaseData: false,
        version: userData && userData.version ? userData.version : 1,
      } as UserResponce,
      userDeviceUniqueId
    );
  }
  if (reset || useFirebaseData) {
    AsyncStorage.setItem(
      CONSTANTS.ASYNC_STORAGE_HABITS,
      JSON.stringify(habits)
    );
    if (reset) {
      PushNotification.cancelAllNotifications();
    }
    firebase
      .updateDocument(
        CONSTANTS.FIREBASE_HABITS_COLLECTION,
        {
          habits,
          practicing: "none",
          resetData: false,
          useFirebaseData: false,
          version: reset
            ? 1
            : userData && userData.version
            ? userData.version
            : 1,
        } as UserResponce,
        userDeviceUniqueId
      )
      .catch((er) => console.log("error when saving data to firebase", er));
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
