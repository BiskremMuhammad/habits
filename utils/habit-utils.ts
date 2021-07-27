/**
 * @author Muhammad Omran
 * @date 27-07-2021
 * @description implement utility functions that related to habit
 */

import { Habit, HabitTypesVerbale } from "../types/habit";
import { PushNotification } from "./push-notification";

/**
 * to schedule a daily notification for the habit
 *
 * @param {Habit} habit the habit to schedule the notification for
 *
 * @returns {Promise<string>} habit notification reference id
 */
export const scheduleHabitNotificationAsync = async (
  habit: Habit,
  rescheduleForTomrrow: boolean = false
): Promise<string> => {
  // get the next 6pm datetime
  const today6pm: Date = new Date(new Date(Date.now()).setHours(18, 0, 0, 0));
  const notificationNextAlarm: Date =
    today6pm.getTime() > Date.now() && !rescheduleForTomrrow
      ? today6pm
      : new Date(
          new Date(Date.now()).setHours(18, 0, 0, 0) + 24 * 60 * 60 * 1000
        );
  const habitDuration: string = `${
    habit.duration >= 60 ? habit.duration / 60 : habit.duration
  } ${habit.duration >= 60 ? "hour" : "minute"}${habit.duration > 1 && "s"}`;

  const notificationId = await PushNotification.scheduleNotification(
    `Time for your ${HabitTypesVerbale[habit.type]} Habit`,
    `Building habits is about building momentum day over day. Perform your habit for ${habitDuration} now.`,
    notificationNextAlarm,
    true
  );
  return notificationId;
};
