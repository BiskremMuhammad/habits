/**
 * @author Muhammad Omran
 * @date 18-05-2021
 * @description implement a reusable plant component
 */

import React, { useMemo } from "react";
import { MotiView } from "moti";
import {
  View,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Dimensions,
} from "react-native";
import { Habit, HabitProgressData } from "../../types/habit";
import { calculateStreak } from "../../utils/calendar-utils";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

const screenHeight = Dimensions.get("screen").height;

/**
 * the stage of the seed
 *
 * @enum
 * @exports
 */
export enum PlantStage {
  STAGE_1,
  STAGE_2,
  STAGE_3,
  STAGE_4,
  STAGE_5,
  STAGE_6,
  STAGE_7,
  STAGE_8,
  STAGE_9,
  STAGE_10,
  STAGE_11,
  STAGE_12,
  STAGE_13,
  STAGE_14,
  STAGE_15,
  STAGE_16,
  STAGE_17,
  STAGE_18,
  STAGE_19,
  STAGE_20,
  STAGE_21,
  STAGE_22,
  STAGE_23,
  STAGE_24,
  STAGE_25,
  STAGE_26,
}

/**
 * state of the plant
 *
 * @enum
 */
enum PlantState {
  DIMMED = "DIMMED",
  NORMAL = "NORMAL",
  BRIGHT = "BRIGHT",
}

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface PlantProps {
  /**
   * pass some extra custom styles for the plant
   *
   * @type {StyleProp<ViewStyle>}
   */
  extraStyles?: StyleProp<ViewStyle>;

  /**
   * to force display the glowing version of the plant
   *
   * @type {boolean}
   */
  forceGlow?: boolean;

  /**
   * to force display a specific stage of the plant
   *
   * @type {PlantStage}
   */
  forceStage?: PlantStage;

  /**
   * when it's called on the timer screen, to increase the stage to the next one
   *
   * @type {boolean}
   */
  isActiveSession?: boolean;

  /**
   * the habit to generate a corresponding plant state for
   *
   * @type {Habit}
   */
  habit: Habit;

  /**
   * the percentage number in 2 fixed decimals of the session timer
   *
   * @type {number}
   */
  sessionProgress?: number;

  /**
   * to use set height instead of set width
   *
   * @type {boolean}
   */
  useHeight?: boolean;
}

export const Plant = (props: PlantProps) => {
  const animatedHeight = useDerivedValue(() => {
    if (!props.useHeight) return undefined;
    if (
      props.isActiveSession &&
      props.sessionProgress &&
      props.sessionProgress > 0 &&
      props.sessionProgress < 0.4
    ) {
      return (0.68 + props.sessionProgress / 1.25) * 0.3095833 * screenHeight;
    } else {
      return 0.3095833 * screenHeight;
    }
  }, [props.useHeight, props.isActiveSession, props.sessionProgress]);

  const scalePlantAnimation = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  /**
   * to get the plant image corresponds to the stage and the state
   *
   * @param {PlantStage} stage the stage of the plant
   * @param {PlantState} state the state of the plant brightness
   * @returns {JSX.Element} the plant image comonent
   */
  const getPlantResource = (
    stage: PlantStage,
    state: PlantState
  ): JSX.Element => {
    switch (stage) {
      case PlantStage.STAGE_1:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/1.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/1.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/1.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/1.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_2:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/2.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/2.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/2.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/2.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_3:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/3.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/3.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/3.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/3.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_4:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/4.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/4.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/4.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/4.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_5:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/5.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/5.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/5.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/5.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_6:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/6.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/6.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/6.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/6.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_7:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/7.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/7.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/7.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/7.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_8:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/8.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/8.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/8.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/8.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_9:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/9.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/9.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/9.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/9.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_10:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/10.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/10.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/10.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/10.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_11:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/11.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/11.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/11.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/11.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_12:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/12.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/12.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/12.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/12.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_13:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/13.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/13.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/13.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/13.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_14:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/14.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/14.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/14.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/14.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_15:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/15.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/15.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/15.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/15.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_16:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/16.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/16.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/16.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/16.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_17:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/17.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/17.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/17.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/17.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_18:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/18.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/18.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/18.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/18.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_19:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/19.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/19.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/19.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/19.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_20:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/20.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/20.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/20.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/20.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_21:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/21.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/21.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/21.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/21.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_22:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/22.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/22.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/22.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/22.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_23:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/23.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/23.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/23.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/23.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_24:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/24.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/24.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/24.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/24.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_25:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/25.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/25.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/25.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/25.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      case PlantStage.STAGE_26:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/26.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/26.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/26.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/26.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
      default:
        switch (state) {
          case PlantState.DIMMED:
            return (
              <Image
                source={require("../../assets/plant/dim/1.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.NORMAL:
            return (
              <Image
                source={require("../../assets/plant/medium/1.png")}
                style={PlantStyles.plantImage}
              />
            );
          case PlantState.BRIGHT:
            return (
              <Image
                source={require("../../assets/plant/bright/1.png")}
                style={PlantStyles.plantImage}
              />
            );
          default:
            return (
              <Image
                source={require("../../assets/plant/medium/1.png")}
                style={PlantStyles.plantImage}
              />
            );
        }
    }
  };

  const generatePlant = useMemo((): JSX.Element => {
    let activePlant: boolean = true;
    const today: Date = new Date(new Date().setHours(0, 0, 0, 0));
    const isTodayLogged: boolean =
      (props.habit.progress.find(
        (p: HabitProgressData) => p.date.getTime() === today.getTime()
      )?.duration || 0) /
        60 >=
      props.habit.duration;
    if (!props.isActiveSession) {
      // get yesterday streak data to set inactive plant state when yesterday is not active streak
      const yesterday: Date = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const [yesterdayStreak, _, __] = calculateStreak(
        yesterday,
        props.habit.progress,
        props.habit.days
      );
      if (yesterdayStreak === 0) {
        activePlant = false;
      }
    }

    let plantResource: JSX.Element = getPlantResource(
      PlantStage.STAGE_1,
      PlantState.NORMAL
    );
    const plantState: PlantState = props.isActiveSession
      ? props.forceGlow
        ? PlantState.BRIGHT
        : PlantState.NORMAL
      : isTodayLogged
      ? PlantState.BRIGHT
      : activePlant
      ? PlantState.NORMAL
      : PlantState.DIMMED;

    if (props.forceStage) {
      plantResource = getPlantResource(props.forceStage, plantState);
    }
    // if it's not in the timer and no progress is tracked yet display the first seed medium plant
    else if (
      (props.habit.progress.length === 0 ||
        (props.habit.progress.length === 1 &&
          props.habit.progress.filter(
            (p: HabitProgressData) => p.date.getTime() === today.getTime()
          ).length &&
          !isTodayLogged)) &&
      !props.isActiveSession
    ) {
      plantResource = getPlantResource(PlantStage.STAGE_1, PlantState.NORMAL);
    } else if (props.habit.progress.length < 1) {
      plantResource = getPlantResource(
        props.isActiveSession
          ? !!props.sessionProgress &&
            props.sessionProgress > 0 &&
            props.sessionProgress < 0.4
            ? PlantStage.STAGE_1
            : PlantStage.STAGE_2
          : PlantStage.STAGE_1,
        plantState
      );
    } else if (props.habit.progress.length < 2) {
      plantResource = getPlantResource(
        props.isActiveSession
          ? !!props.sessionProgress &&
            props.sessionProgress > 0 &&
            props.sessionProgress < 0.4
            ? PlantStage.STAGE_3
            : PlantStage.STAGE_4
          : PlantStage.STAGE_2,
        plantState
      );
    } else if (props.habit.progress.length < 3) {
      plantResource = getPlantResource(
        props.isActiveSession
          ? !!props.sessionProgress &&
            props.sessionProgress > 0 &&
            props.sessionProgress < 0.4
            ? PlantStage.STAGE_5
            : PlantStage.STAGE_6
          : PlantStage.STAGE_4,
        plantState
      );
    } else if (props.habit.progress.length < 4) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_7 : PlantStage.STAGE_6,
        plantState
      );
    } else if (props.habit.progress.length < 5) {
      plantResource = getPlantResource(
        props.isActiveSession
          ? !!props.sessionProgress &&
            props.sessionProgress > 0 &&
            props.sessionProgress < 0.4
            ? PlantStage.STAGE_8
            : PlantStage.STAGE_9
          : PlantStage.STAGE_7,
        plantState
      );
    } else if (props.habit.progress.length < 6) {
      plantResource = getPlantResource(
        props.isActiveSession
          ? !!props.sessionProgress &&
            props.sessionProgress > 0 &&
            props.sessionProgress < 0.4
            ? PlantStage.STAGE_10
            : PlantStage.STAGE_11
          : PlantStage.STAGE_9,
        plantState
      );
    } else if (props.habit.progress.length < 9) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_12 : PlantStage.STAGE_11,
        plantState
      );
    } else if (props.habit.progress.length < 13) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_13 : PlantStage.STAGE_12,
        plantState
      );
    } else if (props.habit.progress.length < 16) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_14 : PlantStage.STAGE_13,
        plantState
      );
    } else if (props.habit.progress.length < 18) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_15 : PlantStage.STAGE_14,
        plantState
      );
    } else if (props.habit.progress.length < 20) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_16 : PlantStage.STAGE_15,
        plantState
      );
    } else if (props.habit.progress.length < 23) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_17 : PlantStage.STAGE_16,
        plantState
      );
    } else if (props.habit.progress.length < 28) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_18 : PlantStage.STAGE_17,
        plantState
      );
    } else if (props.habit.progress.length < 38) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_19 : PlantStage.STAGE_18,
        plantState
      );
    } else if (props.habit.progress.length < 48) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_20 : PlantStage.STAGE_19,
        plantState
      );
    } else if (props.habit.progress.length < 52) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_21 : PlantStage.STAGE_20,
        plantState
      );
    } else if (props.habit.progress.length < 58) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_22 : PlantStage.STAGE_21,
        plantState
      );
    } else if (props.habit.progress.length < 68) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_23 : PlantStage.STAGE_22,
        plantState
      );
    } else if (props.habit.progress.length < 77) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_24 : PlantStage.STAGE_23,
        plantState
      );
    } else if (props.habit.progress.length < 81) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_25 : PlantStage.STAGE_24,
        plantState
      );
    } else if (props.habit.progress.length < 89) {
      plantResource = getPlantResource(
        props.isActiveSession ? PlantStage.STAGE_26 : PlantStage.STAGE_25,
        plantState
      );
    } else {
      plantResource = getPlantResource(PlantStage.STAGE_26, plantState);
    }

    return plantResource;
  }, [
    props.habit.progress,
    props.habit.days,
    props.isActiveSession,
    props.sessionProgress,
    props.forceGlow,
  ]);

  return (
    <View
      style={[
        PlantStyles.plantContainer,
        props.useHeight
          ? { height: 0.3095833 * screenHeight }
          : { width: "100%" },
        props.extraStyles,
      ]}
    >
      <View style={PlantStyles.potContainer}>
        <Image
          source={require("../../assets/pot.png")}
          style={PlantStyles.pot}
        />
      </View>
      <MotiView
        from={{
          opacity: 0,
        }}
        animate={{
          opacity:
            props.isActiveSession && props.sessionProgress === 0 ? 0.3 : 1,
        }}
        style={[
          PlantStyles.thePlant,
          props.useHeight && {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
          },
        ]}
      >
        {!props.useHeight ? (
          generatePlant
        ) : (
          <Animated.View style={[{ width: "100%" }, scalePlantAnimation]}>
            {generatePlant}
          </Animated.View>
        )}
      </MotiView>
    </View>
  );
};

const PlantStyles = StyleSheet.create({
  plantContainer: {
    position: "absolute",
    aspectRatio: 1948 / 2615,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  potContainer: {
    position: "absolute",
    bottom: "-18%",
    width: "33.33334%",
    aspectRatio: 192 / 210,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pot: {
    width: "100%",
    resizeMode: "contain",
  },
  thePlant: {
    width: "100%",
    height: "100%",
    left: "2%",
  },
  plantImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
