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
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useLayoutEffect, useState } from "react";
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
import { NotificationIcon } from "../components/svgs/notification-icon";
import { WeekDaysFullName, WeekDays } from "../types/week-days";
import { getEnumKeyByEnumValue } from "../utils/enum-type-utils";
import TimerIcon from "../components/svgs/timer-icon";
import { Plant, PlantState } from "../components/elements/plant";
import { Button } from "../components/elements/button";
import { useSharedValue } from "react-native-reanimated";
import { MotiView } from "@motify/components";

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

  useLayoutEffect(() => {
    const getHabit = habits.find((h) => h.id === habitId);
    if (getHabit) {
      setHabit(getHabit);
    } else if (isOnFocus) {
      navigation.navigate(habits.length ? Routes.HOME : Routes.SPLASH);
    }
  }, [isOnFocus, habits, navigation, habitId]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgb(13, 9, 39)", "rgb(33, 29, 66)"]}
        style={styles.backgroundOverlay}
      />
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
        <View style={styles.notificationContainer}>
          <NotificationIcon />
          <View style={styles.notificationBadge}>
            <Text style={styles.NotificationBadgeText}>3</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.habitDetailsContainer}>
          <View style={styles.habitDetails}>
            <Text style={styles.habitDetailsText}>I am a</Text>
            <View style={CommonStyles.textWithIcon}>
              <BookIcon
                width={16}
                height={21}
                style={{ marginTop: -12, marginRight: 8 }}
              />
              <Text
                style={[styles.habitDetailsText, styles.habitDetailsAccentText]}
              >
                {habit?.type.replace(/ing/gi, "er")}
              </Text>
              <Text style={styles.streak}>3</Text>
            </View>
            <Text style={styles.habitDetailsText}>
              {habit?.isEveryDay
                ? "everyday"
                : habit?.days?.length === 6
                ? `everyday day but ${
                    WeekDaysFullName[
                      getEnumKeyByEnumValue(
                        WeekDays,
                        Object.keys(WeekDays).find(
                          (d) => !habit.days?.includes(d as WeekDays)
                        )!
                      )!
                    ]
                  }`
                : habit?.days?.length
                ? habit?.days.join(", ")
                : "everyday"}
            </Text>
            <View style={CommonStyles.textWithIcon}>
              <Text style={styles.habitDetailsText}>for</Text>
              <TimerIcon
                width={24}
                height={21}
                style={{ marginTop: -8, marginLeft: 8, marginRight: 2 }}
              />
              <Text
                style={[styles.habitDetailsText, styles.habitDetailsAccentText]}
              >
                {`${
                  habit && habit.duration >= 60
                    ? habit.duration / 60
                    : habit?.duration
                } ${habit && habit.duration >= 60 ? "hr" : "min"}`}
              </Text>
            </View>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 65,
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    opacity: 0.6,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 21,
    marginBottom: 26,
  },
  notificationContainer: {
    position: "relative",
    opacity: 0.66,
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -2,
    width: 14,
    height: 14,
    backgroundColor: "#FAFAFB",
    borderWidth: 2,
    borderColor: "#0E0928",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  NotificationBadgeText: {
    fontFamily: "Rubik-Bold",
    fontSize: 10,
    lineHeight: 11,
    color: "#2B2645",
  },
  habitDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingLeft: 56,
  },
  habitDetails: {
    display: "flex",
    paddingVertical: 48,
    flex: 1,
  },
  habitDetailsText: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    lineHeight: 32,
    color: "#fff",
    opacity: 0.5,
    paddingBottom: 14,
  },
  habitDetailsAccentText: {
    fontFamily: "JosefinSans-Bold",
    opacity: 1,
    textTransform: "capitalize",
  },
  streak: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    lineHeight: 24,
    alignSelf: "flex-start",
    marginLeft: 5,
    color: "#fff",
    opacity: 0.5,
  },
  plantContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  plant: {
    position: "absolute",
    width: "165%",
    transform: [
      {
        translateX: -55,
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
