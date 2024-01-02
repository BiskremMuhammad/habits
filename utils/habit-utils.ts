/**
 * @author Muhammad Omran
 * @date 27-07-2021
 * @description implement utility functions that related to habit
 */

import {
  Habit,
  HabitNotEveryDayNotificationId,
  HabitTypes,
} from "../types/habit";
import { WeekDays } from "../types/week-days";
import {
  NotificationHourInput,
  NotificationWeeklyInput,
  PushNotification,
} from "./push-notification";

export class HabitUtils {
  /**
   * to check if today is a rest day
   *
   * @param {Habit} habit the habit to check it's frequency
   *
   * @returns {boolean} is today is a rest day
   */
  static isHabitRestDay = (habit: Habit): boolean => {
    if (habit.isEveryDay) return false;

    const today: Date = new Date(new Date().setHours(0, 0, 0, 0));
    const weekDay: WeekDays =
      WeekDays[
        Object.keys(WeekDays).find(
          (d: string, i: number) => i === today.getDay()
        ) as WeekDays
      ];
    return !habit.days.includes(weekDay);
  };

  /**
   * to schedule a daily notification for the habit
   *
   * @param {Habit} habit the habit to schedule the notification for
   * @param {WeekDays} skipToday (Optional) to skip today's notification
   *
   * @returns {Promise<string | HabitNotEveryDayNotificationId>} habit notification reference id
   */
  static scheduleHabitNotificationAsync = async (
    habit: Habit,
    skipToday?: WeekDays
  ): Promise<string | HabitNotEveryDayNotificationId> => {
    const habitDuration: string = `${
      habit.duration >= 60 ? habit.duration / 60 : habit.duration
    } ${habit.duration >= 60 ? "hour" : "minute"}${
      habit.duration > 1 ? "s" : ""
    }`;

    let habitNotificationId: string | HabitNotEveryDayNotificationId =
      habit.isEveryDay
        ? ""
        : { ...(habit.notification as HabitNotEveryDayNotificationId) };
    const notification = {
      title: `Time for your ${habit.title} Habit`,
      message: `Building habits is about building momentum day over day. Perform your habit for ${habitDuration} now.`,
      date: {
        hour: habit.datetime.hour,
        minute: habit.datetime.minute,
      } as NotificationHourInput,
    };

    if (habit.isEveryDay) {
      habitNotificationId = await PushNotification.scheduleNotification(
        notification.title,
        notification.message,
        skipToday
          ? new Date(Date.now() + 24 * 60 * 60 * 1000)
          : notification.date,
        true
      );
    } else {
      await Promise.all(
        habit.days.map(async (d: WeekDays): Promise<void> => {
          if (!skipToday || (skipToday && d === skipToday)) {
            const dayNotificationId: string =
              await PushNotification.scheduleNotification(
                notification.title,
                notification.message,
                skipToday
                  ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                  : ({
                      ...notification.date,
                      weekday:
                        Object.keys(WeekDays).findIndex((day) => day === d) + 1,
                    } as NotificationWeeklyInput),
                true
              );
            (habitNotificationId as HabitNotEveryDayNotificationId)[d] =
              dayNotificationId;
          }
        })
      );
    }
    return habitNotificationId;
  };

  /**
   * cancel Habit notification or if it's not everyday cancel all notifications
   *
   * @param {Habit} habit the habit to cancel it's notifications
   *
   * @returns {Promise<void>} a Promise to resolve after every tasks are done
   */
  static cancelAllHabitNotifications = async (habit: Habit): Promise<void> => {
    // cancel habit existing scheduled notifications
    if (habit.isEveryDay) {
      await PushNotification.cancelNotification(habit.notification as string);
    } else {
      await Promise.all(
        Object.keys(habit.notification as HabitNotEveryDayNotificationId).map(
          async (d: string): Promise<void> =>
            await PushNotification.cancelNotification(
              (habit.notification as HabitNotEveryDayNotificationId)[
                d as WeekDays
              ]!
            )
        )
      );
    }
  };

  /**
   * cancel today's habit notification
   *
   * @param {Habit} habit the habit to cancel it's notifications
   *
   * @returns {Promise<string | HabitNotEveryDayNotificationId>} newly updated notifications for the habit
   */
  static cancelHabitTodaysNotification = async (
    habit: Habit
  ): Promise<string | HabitNotEveryDayNotificationId> => {
    // cancel habit existing scheduled notification
    const today: Date = new Date(
      new Date().setHours(habit.datetime.hour, habit.datetime.minute, 0, 0)
    );
    const weekDay: WeekDays =
      WeekDays[
        Object.keys(WeekDays).find(
          (d: string, i: number) => i === today.getDay()
        ) as WeekDays
      ];
    if (habit.isEveryDay) {
      await PushNotification.cancelNotification(habit.notification as string);
    } else {
      if (weekDay in (habit.notification as HabitNotEveryDayNotificationId)) {
        await PushNotification.cancelNotification(
          (habit.notification as HabitNotEveryDayNotificationId)[weekDay]!
        );
      }
    }
    return this.scheduleHabitNotificationAsync(habit, weekDay);
  };
}
