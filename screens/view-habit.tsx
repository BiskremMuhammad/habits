/**
 * @author Muhammad Omran
 * @date 25-05-2021
 * @description Implement the view habit screen
 */

import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { GlobalStore } from "../redux/store";
import { Habit } from "../types/habit";
import { Routes } from "../types/route-names";
import { TimerScreenRouteParams } from "./timer-screen";

export const ViewHabitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isOnFocus = useIsFocused();
  const params = route.params as TimerScreenRouteParams;
  const habitId: string = params ? params.habitId : "";
  const habits: Habit[] = useSelector<GlobalStore, Habit[]>(
    (store: GlobalStore): Habit[] => store.habits
  );
  const [habit, setHabit] = useState<Habit>();

  useLayoutEffect(() => {
    const getHabit = habits.find((h) => h.id === habitId);
    if (getHabit) {
      setHabit(getHabit);
    } else if (isOnFocus) {
      navigation.navigate(habits.length ? Routes.HOME : Routes.SPLASH);
    }
  }, [isOnFocus, habits, navigation, habitId]);

  return (
    <View>
      <Text>View Habit Screen, my habit type is {habit?.type}</Text>
    </View>
  );
};
