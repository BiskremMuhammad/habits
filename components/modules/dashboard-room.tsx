/**
 * @author Muhammad Omran
 * @date 09-06-2021
 * @description Implement the Dashboard Habit Room Component
 */

import React, { useMemo } from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import Svg, { Line, Path } from "react-native-svg";
import { TimerScreenRouteParams } from "../../screens/timer-screen";
import { CommonStyles } from "../../styles/common";
import { Habit, HabitTypes, HabitTypesIdentity } from "../../types/habit";
import { Routes } from "../../types/route-names";
import {
  calculateStreak,
  DayState,
  stateOfTheDay,
} from "../../utils/calendar-utils";
import { CONSTANTS } from "../../utils/constants";
import { Button } from "../elements/button";
import { AddIconSvg } from "../svgs/add-icon";
import { ClockIcon } from "../svgs/clock-icon";
import { DashboardRoomDay } from "./dashboard/dashboard-room-day";
import { HabitIcon } from "../elements/habit-icon";
import { Plant } from "../elements/plant";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface DashboardRoomProps {
  /**
   * the habit to display
   *
   * @type {Habit}
   */
  habit?: Habit;
}

export const DashboardRoom = ({ habit }: DashboardRoomProps) => {
  const navigation = useNavigation();
  let roomGraphic = habit
    ? require("../../assets/rooms/reading-room.png")
    : require("../../assets/rooms/add-room.png");
  if (habit) {
    switch (habit.type) {
      case HabitTypes.READING:
        roomGraphic = require("../../assets/rooms/reading-room.png");
        break;
      case HabitTypes.FASTING:
        roomGraphic = require("../../assets/rooms/fasting-room.png");
        break;
      case HabitTypes.JOURNALING:
        roomGraphic = require("../../assets/rooms/writing-room.png");
        break;
      case HabitTypes.MEDITATING:
        roomGraphic = require("../../assets/rooms/meditating-room.png");
        break;
      default:
        roomGraphic = require("../../assets/rooms/reading-room.png");
    }
  }

  const daysLabels = ["Su", "Mo", "Tu", "Wd", "Th", "Fr", "Sa"];
  const today: Date = new Date(new Date().setHours(0, 0, 0, 0));
  const recentDays: { day: Date; label: string; state: DayState }[] = [];
  if (habit) {
    Array(6)
      .fill(0)
      .forEach((_, i: number) => {
        const day: Date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        const dayState: DayState = stateOfTheDay(day, habit);
        recentDays.push({
          day,
          label: daysLabels[day.getDay()],
          state: dayState,
        });
      });
    recentDays.reverse();
  }

  const [streak, curStreakStart, __] = useMemo(
    () => (!habit ? [0, undefined, undefined] : calculateStreak(today, habit)),
    [habit]
  );

  const goToAddHabit = () => {
    navigation.navigate(Routes.ADD_HABIT);
    // navigation.dispatch(StackActions.push(Routes.ADD_HABIT));
  };

  const onViewHabit = () => {
    if (!habit) {
      goToAddHabit();
    } else {
      navigation.navigate(Routes.VIEW_HABIT, {
        habitId: habit.id,
      } as TimerScreenRouteParams);
    }
  };

  const onStartHabit = () => {
    if (!habit) return;

    navigation.navigate(Routes.TIMER, {
      habitId: habit.id,
    } as TimerScreenRouteParams);
  };

  const roomBottomBorderWidth: number =
    CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE -
    2 * CONSTANTS.DASHBOARD_ROOM_SPACING -
    16 -
    60;

  return (
    <View style={styles.container}>
      <Pressable onPress={onViewHabit}>
        <View style={styles.roomContainer}>
          <Image source={roomGraphic} style={styles.room} />
          {!!habit && (
            <Plant
              habit={habit}
              extraStyles={[
                styles.roomPlant,
                habit.type === HabitTypes.FASTING
                  ? styles.fastingPlant
                  : habit.type === HabitTypes.JOURNALING
                  ? styles.journalingPlant
                  : habit.type === HabitTypes.MEDITATING
                  ? styles.meditatingPlant
                  : styles.readingPlant,
              ]}
            />
          )}
        </View>
      </Pressable>
      <View style={styles.infoContianer}>
        {habit ? (
          <View style={styles.info}>
            <View style={styles.habitDetails}>
              <View style={CommonStyles.textWithIcon}>
                <HabitIcon
                  type={habit?.type}
                  style={[CommonStyles.habitTypeIcon]}
                />
                <Text
                  style={[
                    CommonStyles.habitTypeText,
                    CommonStyles.habitTypeAccentText,
                    { paddingBottom: 0 },
                  ]}
                >
                  {HabitTypesIdentity[habit.type]}
                </Text>
              </View>
              <View style={styles.habitFrequ}>
                <ClockIcon
                  width={18}
                  height={18}
                  style={[CommonStyles.withIcon, styles.habitFreqIcon]}
                />
                <Text style={styles.habitDuration}>{`${
                  habit.duration >= 60 ? habit.duration / 60 : habit.duration
                } ${habit.duration >= 60 ? "hr" : "min"}`}</Text>
                <Text style={styles.habitFreqText}>
                  {habit.isEveryDay
                    ? "every day"
                    : `${habit.days.length} days/week`}
                </Text>
              </View>
              <View style={styles.habitStreakInGlance}>
                <Svg
                  height={78}
                  width={roomBottomBorderWidth}
                  style={styles.roomBottomBorder}
                >
                  <Line
                    x1={0}
                    x2={roomBottomBorderWidth - 39}
                    y1={77}
                    y2={77}
                    stroke="#88849D"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <Path
                    d={`M${
                      roomBottomBorderWidth - 39
                    } 77 a 39 39 0 0 0 28 -19.5`} // dx, dy will change from 28 -19.5 to 11 -74
                    stroke="#88849D"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </Svg>
                <View style={styles.recentDaysCombo}>
                  {recentDays.slice(0, 3).map((d, i: number) => (
                    <DashboardRoomDay
                      key={i}
                      curStreak={streak}
                      curStreakStartDay={curStreakStart}
                      index={i}
                      isCombo={true}
                      day={d.day}
                      dayLabel={d.label}
                      dayState={d.state}
                      habitProgress={habit.progress}
                      mostRecentDays={recentDays
                        .slice(3)
                        .reduce<Date[]>((a, v) => a.concat(v.day), [])}
                    />
                  ))}
                </View>
                {recentDays.slice(3).map((d, i: number) => (
                  <DashboardRoomDay
                    key={i}
                    curStreak={streak}
                    curStreakStartDay={curStreakStart}
                    index={i}
                    day={d.day}
                    dayLabel={d.label}
                    dayState={d.state}
                    habitProgress={habit.progress}
                    mostRecentDays={recentDays
                      .slice(3)
                      .reduce<Date[]>((a, v) => a.concat(v.day), [])}
                  />
                ))}
              </View>
            </View>
            <Button
              shape="circle"
              text="start"
              onPress={onStartHabit}
              hasCircleBorder={true}
            />
          </View>
        ) : (
          <Pressable onPress={goToAddHabit}>
            <View style={styles.addHabitContainer}>
              <AddIconSvg style={styles.addIcon} width={73} height={73} />
              <View style={styles.addTextContainer}>
                <Text style={styles.addHabitText}>Add a habit</Text>
                <Text style={styles.addHabitDescription}>
                  21 days practicing your habit will unlock a new habit slot
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width:
      CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE - CONSTANTS.DASHBOARD_ROOM_SPACING * 2,
  },
  roomContainer: {
    position: "relative",
    width:
      CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE - CONSTANTS.DASHBOARD_ROOM_SPACING * 2,
    height:
      CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE - CONSTANTS.DASHBOARD_ROOM_SPACING * 2,
  },
  room: {
    width:
      CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE - CONSTANTS.DASHBOARD_ROOM_SPACING * 2,
    height:
      1.1 * CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE -
      CONSTANTS.DASHBOARD_ROOM_SPACING * 2,
    resizeMode: "contain",
  },
  roomPlant: {
    position: "absolute",
    width: 64,
  },
  readingPlant: {
    bottom: "48%",
    left: "31%",
  },
  fastingPlant: {
    bottom: "26%",
    right: "7%",
  },
  journalingPlant: {
    bottom: "27%",
    right: "5%",
  },
  meditatingPlant: {
    bottom: "48%",
    left: "35%",
  },
  roomBottomBorder: {
    position: "absolute",
    bottom: 10,
    left: 11,
    opacity: 0.6,
  },
  infoContianer: {
    marginTop: 22,
  },
  addHabitContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  addIcon: {
    marginRight: 15,
  },
  addTextContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  addHabitText: {
    fontFamily: "JosefinSans-SemiBold",
    fontSize: 18,
    lineHeight: 26,
    color: "#fff",
    marginBottom: 6,
  },
  addHabitDescription: {
    fontFamily: "Rubik-Regular",
    fontSize: 13,
    lineHeight: 21,
    color: "#fff",
    opacity: 0.8,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 0.1 * CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE,
  },
  habitDetails: {
    flex: 1,
    marginTop: 2,
  },
  habitFrequ: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  habitFreqIcon: {
    opacity: 0.6,
    marginRight: 5.5,
  },
  habitDuration: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    lineHeight: 23,
    color: "#fff",
  },
  habitFreqText: {
    marginLeft: 4,
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    lineHeight: 23,
    color: "#fff",
    opacity: 0.5,
  },
  habitStreakInGlance: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginTop: 6,
  },
  recentDaysCombo: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 27,
    height: 22,
  },
});
