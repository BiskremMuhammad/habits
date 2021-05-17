/**
 * @author Muhammad Omran
 * @date 15-05-2021
 * @description implement the timer Screen
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import { MotiView } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/core";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import BookIcon from "../components/svgs/book";
import { CommonStyles } from "../styles/common";
import { Button } from "../components/elements/button";
import { Habit } from "../types/habit";
import { useSelector } from "react-redux";
import { GlobalStore } from "../redux/store";
import { Clock, useDerivedValue } from "react-native-reanimated";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

let plantFill: "small" | "dark" | "normal" | "glow" = "dark";

/**
 * interface that defines the route parameters should be passed to the component
 *
 * @interface
 * @exports
 */
export interface TimerScreenRouteParams {
  /**
   * the habit id
   *
   * @type {string}
   */
  habitId: string;
}

export const TimerScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as TimerScreenRouteParams;
  const habitId: string = params ? params.habitId : "";
  const habits: Habit[] = useSelector<GlobalStore, Habit[]>(
    (store: GlobalStore): Habit[] => store.habits
  );
  const [habit, setHabit] = useState<Habit>();

  const [state, setState] =
    useState<"stopped" | "playing" | "paused" | "ended">("stopped");
  const [timer, setTimer] = useState<number>((habit?.duration || 1) * 60);
  const [eta, setEta] = useState<Date>(new Date());
  let timerCounter = useRef<ReturnType<typeof setInterval> | null>(null);

  useLayoutEffect(() => {
    const getHabit = habits.find((h) => h.id === habitId);
    if (getHabit) {
      setHabit(getHabit);
    } else {
      navigation.navigate(habits.length ? /*home*/ "Splash" : "Splash");
    }
  });

  useEffect(() => {
    if (timer === 0) {
      if (timerCounter.current) {
        clearInterval(timerCounter.current);
        timerCounter.current = null;
        setState("ended");
      }
    }
  }, [timer]);

  const changeState = () => {
    if (state === "stopped" || state === "paused") {
      if (!timerCounter.current) {
        timerCounter.current = setInterval(() => {
          setTimer((t) => t - 1);
        }, 1000);
      }
      setEta(new Date(Date.now() + timer * 1000));
    } else {
      if (timerCounter.current) {
        clearInterval(timerCounter.current);
        timerCounter.current = null;
      }
    }
    setState(state === "stopped" || state === "paused" ? "playing" : "paused");
  };

  return (
    <View style={TimeScreenStyles.container}>
      <LinearGradient
        colors={["rgb(13, 9, 39)", "rgb(33, 29, 66)"]}
        style={TimeScreenStyles.backgroundOverlay}
      />
      <Image
        source={require("../assets/illustration.png")}
        style={TimeScreenStyles.illustrationBackground}
      />
      <View style={TimeScreenStyles.header}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
        <Text style={TimeScreenStyles.identity}>I am a</Text>
        <BookIcon width={16} height={21} style={CommonStyles.withIcon} />
        <Text style={TimeScreenStyles.habit}>Reader</Text>
        <Text style={TimeScreenStyles.streak}>3</Text>
      </View>
      <View style={TimeScreenStyles.peers}>
        <Text style={TimeScreenStyles.peersNum}>2K</Text>
        <Text style={TimeScreenStyles.peersText}>are reading now</Text>
      </View>
      <View style={TimeScreenStyles.timerContainer}>
        <View style={TimeScreenStyles.progressContainer}>
          <AnimatedCircularProgress
            size={screenWidth - 32 - 54}
            width={5}
            fill={
              (((timer - (habit?.duration || 1) * 60) * -1) /
                ((habit?.duration || 1) * 60)) *
              100
            }
            tintColor="#fff"
            lineCap="round"
            rotation={-145}
            arcSweepAngle={290}
            onAnimationComplete={() => console.log("onAnimationComplete")}
            backgroundColor="rgba(255,255,255, 0.16)"
          />
          <View style={TimeScreenStyles.plantContainer}>
            <Image
              source={require("../assets/pot.png")}
              style={TimeScreenStyles.pot}
            />
            <MotiView
              from={{ height: 0, translateX: /*small*/ false ? 9 : 6 }}
              animate={{
                height: /*small*/ false ? 48.35 : 255.4,
                translateX: /*small*/ false ? 9 : 6,
              }}
              transition={{ type: "timing" }}
              style={[
                TimeScreenStyles.thePlant,
                {
                  bottom: /*small*/ false ? 75 : 24,
                },
              ]}
            >
              <Image
                source={require(`../assets/plant/plant_${plantFill}.png`)}
                style={TimeScreenStyles.plantImage}
              />
            </MotiView>
          </View>
          <View style={TimeScreenStyles.timer}>
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: state === "playing" ? 0.2 : 0 }}
              style={TimeScreenStyles.timerEta}
            >
              <Text style={TimeScreenStyles.timerEtaText}>Eta </Text>
              <Text style={TimeScreenStyles.timerEtaText}>{`${
                eta.getHours() > 12 ? eta.getHours() % 12 : eta.getHours()
              }:${
                eta.getMinutes() < 10
                  ? `0${eta.getMinutes()}`
                  : eta.getMinutes()
              } ${eta.getHours() > 12 ? "pm" : "am"}`}</Text>
            </MotiView>
            <Text style={TimeScreenStyles.timerText}>{`${
              timer / 60 < 10
                ? `0${Math.floor(timer / 60)}`
                : Math.floor(timer / 60)
            }:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`}</Text>
          </View>
        </View>
        <View style={TimeScreenStyles.timerControls}>
          <Button
            text="cancel"
            shape="circle"
            noBorder={true}
            hasBackground={true}
            onPress={() => {}}
          />
          {state !== "ended" && (
            <Button
              text={
                state === "stopped"
                  ? "Start"
                  : state === "paused"
                  ? "Resume"
                  : "Pause"
              }
              shape="circle"
              hasBackground={true}
              hasCircleBorder={true}
              darkBorder={state === "playing"}
              dim={state === "playing"}
              darkText={state !== "stopped"}
              onPress={changeState}
            />
          )}
        </View>
        {state === "ended" && (
          <View style={TimeScreenStyles.footer}>
            <Button
              shape="oval"
              text="submit"
              noBorder={true}
              isAccentButton={true}
              onPress={() => {}}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const TimeScreenStyles = StyleSheet.create({
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
  illustrationBackground: {
    width: "100%",
    height: "60%",
    resizeMode: "contain",
    position: "absolute",
    alignSelf: "flex-start",
    top: 0,
    opacity: 0.3,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 21,
  },
  identity: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 24,
    lineHeight: 32,
    color: "#fff",
    marginLeft: 21,
    marginRight: 13,
    opacity: 0.7,
  },
  habit: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 24,
    lineHeight: 32,
    color: "#fff",
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
  peers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    marginVertical: 46,
  },
  peersNum: {
    fontFamily: "Rubik-Regular",
    fontSize: 24,
    marginRight: 6,
    color: "#fff",
  },
  peersText: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#BDBDBD",
  },
  timerContainer: {
    flex: 1,
    display: "flex",
    paddingHorizontal: 27,
  },
  progressContainer: {
    alignItems: "center",
  },
  plantContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: -46,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  pot: {
    width: "50%",
    height: 92.3,
    resizeMode: "contain",
  },
  thePlant: {
    width: "60%",
    position: "absolute",
  },
  plantImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  timer: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingBottom: 18,
  },
  timerEta: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.2,
  },
  timerEtaText: {
    fontFamily: "Rubik-Light",
    fontSize: 18,
    lineHeight: 32,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#fff",
  },
  timerText: {
    fontFamily: "Rubik-Light",
    fontSize: 69,
    textAlign: "center",
    letterSpacing: 2,
    color: "#fff",
  },
  timerControls: {
    marginTop: 36.5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    marginTop: -20,
  },
});
