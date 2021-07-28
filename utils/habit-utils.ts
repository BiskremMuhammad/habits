/**
 * @author Muhammad Omran
 * @date 27-07-2021
 * @description implement utility functions that related to habit
 */

import { Habit, HabitTypes } from "../types/habit";
import { NotificationHourInput, PushNotification } from "./push-notification";

/**
 * to schedule a daily notification for the habit
 *
 * @param {Habit} habit the habit to schedule the notification for
 *
 * @returns {Promise<string>} habit notification reference id
 */
export const scheduleHabitNotificationAsync = async (
  habit: Habit
): Promise<string> => {
  const habitDuration: string = `${
    habit.duration >= 60 ? habit.duration / 60 : habit.duration
  } ${habit.duration >= 60 ? "hour" : "minute"}${habit.duration > 1 && "s"}`;

  const notificationId = await PushNotification.scheduleNotification(
    `Time for your ${HabitTypes[habit.type].charAt(0)}${HabitTypes[habit.type]
      .substr(1)
      .toLowerCase()} Habit`,
    `Building habits is about building momentum day over day. Perform your habit for ${habitDuration} now.`,
    { hour: 18, minute: 0 } as NotificationHourInput,
    true
  );
  return notificationId;
};
