/**
 * @author Muhammad Omran
 * @date 26-05-2021
 * @description implement Month Calendar View
 */

import React, { useState } from "react";
import { View, Text, StyleSheet, I18nManager, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { getDaysInMonth } from "../../../utils/calendar-utils";
import { Habit } from "../../../types/habit";
import { MonthDay } from "./month-day";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface MonthViewProps {
  /**
   * habit to get month progress
   *
   * @type {Habit}
   */
  habit: Habit;

  /**
   * the month to be displayed
   *
   * @type {number}
   */
  month?: number;

  /**
   * the year of the month
   *
   * @type {number}
   */
  year?: number;
}

export const MonthView = (props: MonthViewProps) => {
  const [month, setMonth] = useState<number>(
    !!props.month ? props.month : new Date().getMonth()
  );
  const [year, setyear] = useState<number>(
    !!props.year ? props.year : new Date().getFullYear()
  );
  const daysLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth: number = getDaysInMonth(month, year);
  const firstDayDate: Date = new Date(year, month, 1);
  const firstDayWeekday: number = firstDayDate.getDay();

  const prevMonth: number = month == 0 ? 11 : month - 1;
  const prevYear: number = prevMonth == 11 ? year - 1 : year;
  const prevDays: number = getDaysInMonth(prevMonth, prevYear);

  const monthCalendarView = (): JSX.Element[] => {
    const weeks: JSX.Element[] = [];
    let weekDays: JSX.Element[] = [];

    let w = 0; // week day
    let n = 1; // next days date
    let c = 1; // current date

    // dates loop
    for (let i = 0; i < 6 * daysLabels.length; i++) {
      let day: JSX.Element;

      if (i < new Date(year, month, 1).getDay()) {
        // previous month's day
        day = (
          <MonthDay
            key={i}
            month="other"
            day={
              new Date(prevYear, prevMonth, prevDays - firstDayWeekday + i + 1)
            }
            dayNumber={prevDays - firstDayWeekday + i + 1}
            habit={props.habit}
          />
        );
      } else if (c > daysInMonth) {
        // next month's day
        day = (
          <MonthDay
            key={i}
            month="other"
            day={
              new Date(
                month === 11 ? year + 1 : year,
                month === 11 ? 0 : month + 1,
                n
              )
            }
            dayNumber={n}
            habit={props.habit}
          />
        );
        n++;
      } else {
        // current month's day
        day = (
          <MonthDay
            key={i}
            month="current"
            day={new Date(year, month, c)}
            dayNumber={c}
            habit={props.habit}
          />
        );
        c++;
      }
      weekDays.push(day);

      if (w === daysLabels.length - 1) {
        // last week's day
        weeks.push(
          <View key={`week${weeks.length + 1}`} style={styles.weekDaysRow}>
            {weekDays}
          </View>
        );
        weekDays = [];
        if (c > daysInMonth) {
          break;
        }
        w = 0;
      } else {
        w++;
      }
    }

    return weeks;
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setyear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setyear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <View style={styles.monthContainer}>
      <View style={styles.headContainer}>
        <Text style={styles.monthText}>{`${monthsLabels[month]} ${year}`}</Text>
        <View style={styles.headButtonsContainer}>
          <Pressable style={styles.headButtons} onPress={previousMonth}>
            <Entypo name="chevron-thin-left" size={16} color="white" />
          </Pressable>
          <Pressable style={styles.headButtons} onPress={nextMonth}>
            <Entypo name="chevron-thin-right" size={16} color="white" />
          </Pressable>
        </View>
      </View>
      <View style={styles.weekDaysRow}>
        {daysLabels.map((d: string, i: number) => (
          <View style={styles.day} key={i}>
            <Text style={styles.weekDayLabel}>{d}</Text>
          </View>
        ))}
      </View>
      {monthCalendarView()}
    </View>
  );
};

const styles = StyleSheet.create({
  monthContainer: {
    paddingHorizontal: 50,
    marginVertical: 10,
  },
  headContainer: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
    paddingHorizontal: 8,
  },
  monthText: {
    fontFamily: "Rubik-Light",
    fontSize: 16,
    lineHeight: 24,
    color: "#EEECF1",
  },
  headButtonsContainer: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
  },
  headButtons: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
  },
  weekDaysRow: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
  },
  day: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  weekDayLabel: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
    opacity: 0.2,
    textTransform: "uppercase",
    color: "#fff",
    marginBottom: 2,
  },
  dayText: {
    fontFamily: "Rubik-Light",
    fontSize: 14,
    lineHeight: 22,
    color: "#fff",
    opacity: 0.7,
    letterSpacing: 0.22,
  },
  otherMonthDay: {
    opacity: 0.25,
  },
});
