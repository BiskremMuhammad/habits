/**
 * @author Muhammad Omran
 * @date 24-05-2021
 * @description Implement the Identity Reinforcement screen
 */

import { MotiView } from "@motify/components";
import { useNavigation } from "@react-navigation/core";
import { useRoute, useIsFocused } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { useSelector } from "react-redux";
import { TitlePanel } from "../components/modules/panels/title-panel";
import { AddIconSvg } from "../components/svgs/add-icon";
import BookIcon from "../components/svgs/book";
import { RadialGradientShape } from "../components/svgs/radial-gradient";
import { GlobalStore } from "../redux/store";
import { CommonStyles } from "../styles/common";
import { Habit } from "../types/habit";
import { Routes } from "../types/route-names";
import { CONSTANTS } from "../utils/constants";
import { TimerScreenRouteParams } from "./timer-screen";

const { width, height } = Dimensions.get("screen");

export const IdentityReinforcement = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isOnFocus = useIsFocused();
  const params = route.params as TimerScreenRouteParams;
  const habitId: string = params ? params.habitId : "";
  const habits: Habit[] = useSelector<GlobalStore, Habit[]>(
    (store: GlobalStore): Habit[] => store.habits
  );
  const [habit, setHabit] = useState<Habit>();

  const [_, setTransitionFrame] = useState<number>(0);
  const line1_dx = useSharedValue<number>(28);
  const line1_dy = useSharedValue<number>(-19.5);
  const line2_dx = useSharedValue<number>(0);
  const line2_dy = useSharedValue<number>(0);
  const circleRadius = useSharedValue<number>(4);
  const circle1_xPosition = useSharedValue<number>(0.5 * width);
  const circle2_xPosition = useSharedValue<number>(0.5 * width);
  const circle2_yPosition = useSharedValue<number>(81 + line1_dy.value);

  const line1_dxAnimation = useRef(new Animated.Value(28)).current;
  const line1_dyAnimation = useRef(new Animated.Value(-19.5)).current;
  const line2_dxAnimation = useRef(new Animated.Value(0)).current;
  const line2_dyAnimation = useRef(new Animated.Value(0)).current;
  const circleRadiusAnimation = useRef(new Animated.Value(4)).current;
  const circle1_xPositionAnimation = useRef(
    new Animated.Value(0.5 * width)
  ).current;
  const circle2_xPositionAnimation = useRef(
    new Animated.Value(0.5 * width)
  ).current;
  const circle2_yPositionAnimation = useRef(
    new Animated.Value(81 + line1_dy.value)
  ).current;

  /**
   * Disable user from going back
   */
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        return;
      }),
    [navigation]
  );

  useEffect(() => {
    Animated.timing(line1_dxAnimation, {
      toValue: 11,
      duration: 3000,
      delay: 2000,
      useNativeDriver: true,
    }).start();
    line1_dxAnimation.addListener((val) => {
      line1_dx.value = val.value;
      setTransitionFrame((frame) => frame + 1);
    });

    Animated.timing(line1_dyAnimation, {
      toValue: -74,
      duration: 3000,
      delay: 2000,
      useNativeDriver: true,
    }).start();
    line1_dyAnimation.addListener((val) => {
      line1_dy.value = val.value;
    });

    Animated.timing(line2_dxAnimation, {
      toValue: 38,
      duration: 3000,
      delay: 2000,
      useNativeDriver: true,
    }).start();
    line2_dxAnimation.addListener((val) => {
      line2_dx.value = val.value;
    });

    Animated.timing(line2_dyAnimation, {
      toValue: 9,
      duration: 3000,
      delay: 2000,
      useNativeDriver: true,
    }).start();
    line2_dyAnimation.addListener((val) => {
      line2_dy.value = val.value;
    });

    Animated.timing(circleRadiusAnimation, {
      toValue: 6,
      duration: 3000,
      delay: 2000,
      useNativeDriver: true,
    }).start();
    circleRadiusAnimation.addListener((val) => {
      circleRadius.value = val.value;
    });

    Animated.timing(circle1_xPositionAnimation, {
      toValue: 0.5 * width - 12,
      duration: 3000,
      delay: 2000,
      useNativeDriver: true,
    }).start();
    circle1_xPositionAnimation.addListener((val) => {
      circle1_xPosition.value = val.value;
    });

    Animated.timing(circle2_xPositionAnimation, {
      toValue: 0.5 * width + 36,
      duration: 3000,
      delay: 2000,
      useNativeDriver: true,
    }).start();
    circle2_xPositionAnimation.addListener((val) => {
      circle2_xPosition.value = val.value;
    });

    Animated.timing(circle2_yPositionAnimation, {
      toValue: 62,
      duration: 3000,
      delay: 2000,
      useNativeDriver: true,
    }).start();
    circle2_yPositionAnimation.addListener((val) => {
      circle2_yPosition.value = val.value;
    });

    // after all delays and animations and another 2 seconds navigate to view the created habit
    const automaticNavigateDuration: number = 2000 + 3000 + 2000;
    const autoNavigate = setTimeout(() => {
      navigation.navigate(Routes.VIEW_HABIT, {
        habitId,
      } as TimerScreenRouteParams);
    }, automaticNavigateDuration);

    return () => {
      clearTimeout(autoNavigate);
    };
  }, []);

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
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ type: "timing", delay: 1000, duration: 3000 }}
        style={styles.background}
      >
        <RadialGradientShape
          width={width * 0.85}
          height={height * 0.85}
          colors={["#8a7dea", "#594AA9"]}
          translateToTransparent={true}
        />
      </MotiView>
      <TitlePanel
        icon={({ style }) => <AddIconSvg style={style} />}
        extraStyles={{
          width,
          position: "absolute",
          paddingTop: 0.54 * height,
        }}
      />
      <View style={styles.identityContainer}>
        <Text style={styles.title}>I am a</Text>
        <View style={styles.identityTextContainer}>
          <View style={CommonStyles.textWithIcon}>
            <BookIcon
              width={18}
              height={23}
              style={[
                CommonStyles.withIcon,
                Platform.OS === "ios" && { marginTop: -8 },
              ]}
            />
            <Text style={styles.identityText}>
              {habit?.type.replace(/ing/gi, "er")}
            </Text>
          </View>
          <View style={styles.identityBorderContainer}>
            <Svg height={78} width={0.5 * width + 56}>
              <Line
                x1={0}
                x2={0.5 * width - 28}
                y1={77}
                y2={77}
                stroke="#88849D"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <Path
                d={`M${0.5 * width - 28} 77 a 39 39 0 0 0 ${line1_dx.value} ${
                  line1_dy.value
                }`} // dx, dy will change from 28 -19.5 to 11 -74
                stroke="#88849D"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <Path
                d={`M${0.5 * width + 1} 57.5 a 24 24 45 0 1  ${
                  line2_dx.value
                } ${line2_dy.value}`} // (dx = the last x position, dy = the last y position) will move to 38 9
                stroke="#88849D"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <Circle
                x={circle1_xPosition.value} // will move 6 -77 the same as dx, dy for the first path
                y={81 + line1_dy.value}
                r={circleRadius.value}
                fill="#4C4281"
                stroke="#C2C9D1"
                strokeWidth={2}
              />
              <Circle
                x={circle2_xPosition.value}
                y={circle2_yPosition.value}
                r={circleRadius.value}
                fill="#4C4281"
                stroke="#C2C9D1"
                strokeWidth={2}
              />
            </Svg>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    paddingHorizontal: 0.85 * CONSTANTS.PADDING,
    paddingTop: 1.6 * CONSTANTS.PADDING,
    paddingBottom: 2 * CONSTANTS.PADDING,
  },
  background: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  identityContainer: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 36,
    lineHeight: 48,
    opacity: 0.7,
    color: "#fff",
  },
  identityTextContainer: {
    position: "relative",
    paddingVertical: 18,
  },
  identityText: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 36,
    lineHeight: 48,
    color: "#fff",
    marginLeft: 4,
    textTransform: "capitalize",
  },
  identityBorderContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 0.5 * width,
  },
});
