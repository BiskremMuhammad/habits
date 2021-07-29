/**
 * @author Muhammad Omran
 * @date 26-07-2021
 * @description implement utility functions to handle notifications
 */

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * interface that defines the input for a notification that will trigger at some hour
 *
 * @interface
 * @exports
 */
export interface NotificationHourInput {
  /**
   * the hour from 1 to 24
   *
   * @type {number}
   */
  hour: number;

  /**
   * the minute
   *
   * @type {number}
   */
  minute: number;
}

/**
 * interface that defines the input for a notification that will trigger at weekly at specific week day
 *
 * @interface
 * @exports
 */
export interface NotificationWeeklyInput extends NotificationHourInput {
  /**
   * the day of the week will trigger the notification
   *
   * @type {number}
   */
  weekday: number;
}

/**
 * class to manage push notitifications in the app
 *
 * @class
 * @exports
 */
export class PushNotification {
  /**
   * to ask user's permission to allow push notifications
   *
   * @param {boolean} requestPermission to request permission, if not provided this will only checks if the permission is granded or not
   *
   * @returns {Promise<string>} user's device expo push notification token
   */
  static registerForPushNotificationsAsync = async (
    requestPermission: boolean = true
  ): Promise<string | undefined> => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (requestPermission && existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Warning. You won't recieve notifications about your habits!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#f9b5ea",
      });
    }

    return token;
  };

  /**
   * to schedule a notification at particular time
   *
   * @param {string} title notification title
   * @param {string} body notification message
   * @param {Date | NotificationHourInput} date notification date and time
   * @param {boolean} repeats notification Does repeat state?
   * @param {any} data (optional) pass data along with the notification
   *
   * @returns {Promise<string>} the created notification id
   */
  static scheduleNotification = async (
    title: string,
    body: string,
    date: Date | NotificationHourInput | NotificationWeeklyInput,
    repeats?: boolean,
    data?: any
  ): Promise<string> => {
    const notificationTime: number =
      "hour" in date ? 0 : (date.getTime() - Date.now()) / 1000;
    const triggerTime: Notifications.NotificationTriggerInput =
      "weekday" in date
        ? {
            weekday: date.weekday,
            hour: date.hour,
            minute: date.minute,
            repeats,
          }
        : "hour" in date
        ? {
            hour: date.hour,
            minute: date.minute,
            repeats,
          }
        : { seconds: notificationTime, repeats };
    const notificationId: string =
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
        },
        trigger: triggerTime,
      });

    return notificationId;
  };

  /**
   * to delete a scheduled notification
   *
   * @param id the notification id to delete
   */
  static cancelNotification = async (id: string) => {
    await Notifications.cancelScheduledNotificationAsync(id);
  };
  static cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };
}
