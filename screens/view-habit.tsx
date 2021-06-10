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
import { LinearGradient } from "expo-linear-gradient";
import React, { useLayoutEffect, useMemo, useReducer, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import BookIcon from "../components/svgs/book";
import { GlobalStore } from "../redux/store";
import { CommonStyles } from "../styles/common";
import { Habit } from "../types/habit";
import { Routes } from "../types/route-names";
import { TimerScreenRouteParams } from "./timer-screen";
import { WeekDays } from "../types/week-days";
import { Plant, PlantState } from "../components/elements/plant";
import { Button } from "../components/elements/button";
import { useSharedValue } from "react-native-reanimated";
import { MotiView } from "@motify/components";
import { MonthView } from "../components/modules/view-habit/month-view";
import { HabitDurationInput } from "../components/modules/add-habit/habit-duration";
import { HabitFrequencyInput } from "../components/modules/add-habit/habit-frequency";
import {
  AddHabitActionTypes,
  addHabitReducer,
  INITIAL_ADD_HABIT_STATE,
} from "../components/modules/add-habit/add-habit-reducer";
import { calculateStreak } from "../utils/calendar-utils";
import { Header } from "../components/elements/header";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

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
  const [tab, setTab] = useState<"CALENDAR" | "GRAPH">("CALENDAR");
  const tabs: Array<"CALENDAR" | "GRAPH"> = ["CALENDAR", "GRAPH"];
  const plantHeight = useSharedValue<number>(250);
  const plantPosition = useSharedValue<number>(20);

  const [state, dispatch] = useReducer(
    addHabitReducer,
    habit ? habit : INITIAL_ADD_HABIT_STATE
  );
  const { type, isEveryDay, days, duration } = state;
  const toady: Date = new Date(new Date().setHours(0, 0, 0, 0));
  const [streak, _, __] = useMemo(
    () =>
      calculateStreak(
        toady,
        habit ? habit.progress : [],
        habit ? habit.days : []
      ),
    [habit]
  );

  useLayoutEffect(() => {
    const getHabit = habits.find((h) => h.id === habitId);
    if (getHabit) {
      setHabit(getHabit);
      dispatch({
        type: AddHabitActionTypes.UPDATE_HABIT,
        payload: getHabit,
      });
    } else if (isOnFocus) {
      navigation.navigate(habits.length ? Routes.HOME : Routes.SPLASH);
    }
  }, [isOnFocus, habits, navigation, habitId]);

  const onChangeDuration = (val: string) => {
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_DURATION,
      payload: val,
    });
  };

  const onChangeFreq = (radio: number) => {
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_EVERYDAY_STATE,
      payload:
        radio === 1
          ? true
          : radio === 2
          ? Object.keys(WeekDays)
              .filter((_, i) => i > 0)
              .map<WeekDays>((k) => k as WeekDays)
          : [],
    });
  };

  const dispatchDays = (selectedDays: WeekDays[]) => {
    dispatch({
      type: AddHabitActionTypes.CHANGE_HABIT_FREQUENCY,
      payload: selectedDays,
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgb(13, 9, 39)", "rgb(33, 29, 66)"]}
        style={styles.backgroundOverlay}
      />
      <ScrollView>
        <View style={{ paddingVertical: 65 }}>
          <Header leftAction="back" />
          <View style={styles.habitDetailsContainer}>
            <View style={styles.habitDetails}>
              <Text style={styles.habitDetailsText}>I am a</Text>
              <View
                style={{
                  paddingHorizontal: habitDetailsPadding,
                  paddingLeft: habitDetailsMargin,
                }}
              >
                <View style={CommonStyles.textWithIcon}>
                  <BookIcon
                    width={16}
                    height={21}
                    style={CommonStyles.habitTypeIcon}
                  />
                  <Text
                    style={[
                      CommonStyles.habitTypeText,
                      CommonStyles.habitTypeAccentText,
                    ]}
                  >
                    {habit?.type.replace(/ing/gi, "er")}
                  </Text>
                  <Text style={CommonStyles.habitStreak}>{streak}</Text>
                </View>
              </View>
              {!!habit && (
                <HabitFrequencyInput
                  isEveryDay={isEveryDay}
                  floatingPanel={true}
                  handlerStyle={{
                    marginTop: 0,
                    marginLeft: habitDetailsMargin - 13,
                  }}
                  days={days}
                  dispatchDays={dispatchDays}
                  onChangeFreq={onChangeFreq}
                />
              )}
              {!!habit && (
                <HabitDurationInput
                  extraStyles={styles.habitDurationContainer}
                  disableBorder={true}
                  customWidth="minimal"
                  enableDurationSelect={true}
                  initialDuration={duration}
                  onChangeDuration={onChangeDuration}
                />
              )}
            </View>
            <View style={styles.plantContainer}>
              <Plant
                state={PlantState.GLOW}
                potWidth="20%"
                potGlowTopPosition={6}
                height={plantHeight}
                positionBottom={plantPosition}
                extraStyles={styles.plant}
              />
              <Text style={styles.weekday}>Monday</Text>
              <Button
                shape="circle"
                text="start"
                onPress={() => {}}
                hasCircleBorder={true}
              />
            </View>
          </View>
          <View style={styles.accentSection}>
            <BookIcon width={40} height={53} style={{ opacity: 0.66 }} />
            <View style={styles.lvlContainer}>
              <Text style={styles.lvlLabel}>lvl</Text>
              <Text style={styles.lvlText}>3</Text>
            </View>
            <View style={styles.currentProgressContainer}>
              <View style={styles.progressContainer}>
                <View style={styles.progressbarContainer}>
                  <View style={styles.processBar}></View>
                  <View style={[styles.progress, { width: "40%" }]}></View>
                </View>
                <View style={styles.nextLvlContainer}>
                  <Text style={styles.nextLvlText}>4</Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.progressText, styles.currentProgressText]}>
                  14{" "}
                </Text>
                <Text style={styles.progressText}>/ 21</Text>
              </View>
            </View>
          </View>
          <View style={styles.tabs}>
            {tabs.map((t: "CALENDAR" | "GRAPH", i: number) => (
              <View key={i} style={styles.tabContainer}>
                <Pressable onPress={() => setTab(t)}>
                  <Text
                    style={[styles.tabText, t === tab && styles.tabTextActive]}
                  >
                    {t}
                  </Text>
                </Pressable>
                {t === tab && (
                  <MotiView
                    from={{ width: 0 }}
                    animate={{ width: 24 }}
                    style={styles.tabActiveIndicator}
                  ></MotiView>
                )}
              </View>
            ))}
          </View>
          {tab === "CALENDAR" && !!habit && <MonthView habit={habit} />}
        </View>
      </ScrollView>
    </View>
  );
};

const habitDetailsMargin: number = 56;
const habitDetailsPadding: number = 6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    opacity: 0.6,
  },
  habitDetailsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  habitDetails: {
    display: "flex",
    paddingVertical: 48,
    flex: 1.5,
  },
  habitDetailsText: {
    paddingBottom: 14,
    paddingHorizontal: habitDetailsPadding,
    paddingLeft: habitDetailsMargin,
  },
  habitDurationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    width: "100%",
    paddingHorizontal: habitDetailsPadding,
    paddingLeft: habitDetailsMargin,
  },
  plantContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  plant: {
    position: "absolute",
    width: "175%",
    transform: [
      {
        translateX: -60,
      },
    ],
    height: "100%",
    bottom: 30,
  },
  weekday: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 1.5,
    color: "#fff",
    textTransform: "uppercase",
    opacity: 0.4,
  },
  accentSection: {
    height: 137,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(78, 70, 126, 0.2)",
    paddingHorizontal: 50,
    marginVertical: 35,
  },
  lvlContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 13,
  },
  lvlLabel: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 13,
    lineHeight: 24,
    color: "#fff",
    textTransform: "uppercase",
  },
  lvlText: {
    fontFamily: "Rubik-Regular",
    fontSize: 40,
    lineHeight: 40,
    color: "#fff",
  },
  currentProgressContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  progressbarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    height: 5,
    flex: 1,
  },
  processBar: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.33)",
    height: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  progress: {
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: 5,
    height: 5,
    top: 0,
    left: 0,
  },
  nextLvlContainer: {
    width: 27,
    height: 27,
    borderRadius: 27,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#79758E",
  },
  nextLvlText: {
    fontFamily: "Rubik-Bold",
    fontSize: 18,
    lineHeight: 24,
    color: "#0E0A27",
    opacity: 0.5,
  },
  progressText: {
    fontFamily: "Rubik-Light",
    fontSize: 18,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.33,
  },
  currentProgressText: {
    opacity: 1,
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 42,
    marginBottom: 24,
  },
  tabContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabText: {
    fontFamily: "JosefinSans-SemiBold",
    fontSize: 20,
    lineHeight: 20,
    letterSpacing: 1.5,
    color: "#fff",
    opacity: 0.4,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  tabTextActive: {
    opacity: 1,
  },
  tabActiveIndicator: {
    height: 2,
    borderRadius: 4,
    backgroundColor: "#fff",
    opacity: 0.66,
  },
});
