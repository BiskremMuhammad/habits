/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the splash screen
 */

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { View as MotiView } from "moti";
import { AddHabit } from "../components/modules/add-habit/add-habit";
import { AddIconSvg } from "../components/svgs/add-icon";
import InfoIcon from "../components/svgs/info-icon";
import { CONSTANTS } from "../utils/constants";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export const SplashScreen = () => {
  return (
    <View style={SplashScreenStyles.container}>
      <View style={SplashScreenStyles.bgIconContainer}>
        <AddIconSvg style={SplashScreenStyles.bgIcon} />
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300, duration: 1000, type: "timing" }}
        >
          <Text style={SplashScreenStyles.welcome}>Welcome</Text>
        </MotiView>
      </View>
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        style={SplashScreenStyles.valueProp}
        transition={{ delay: 300, duration: 1000, type: "timing" }}
      >
        <InfoIcon style={SplashScreenStyles.valuePropInfoIcon} fill="#fff" />
        <Text style={SplashScreenStyles.valuePropDescription}>
          We’ll start with an example session. Select a Habit and tap START to
          begin:
        </Text>
      </MotiView>
      <MotiView
        style={{ alignSelf: "stretch" }}
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 1300, duration: 1000, type: "timing" }}
      >
        <AddHabit enableFrequencySelect={true} />
      </MotiView>
    </View>
  );
};

const SplashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 0.222 * screenHeight,
  },
  bgIconContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bgIcon: {
    width: "100%",
    height: "14.44%",
    opacity: 0.4,
    position: "absolute",
  },
  welcome: {
    fontFamily: "JosefinSans-Medium",
    fontSize: 32,
    letterSpacing: 3,
    color: "#fff",
    lineHeight: 72,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  valueProp: {
    display: "flex",
    flexDirection: "row",
    marginTop: 0.0444 * screenHeight,
    opacity: 0.66,
    paddingHorizontal: 0.06 * screenWidth + CONSTANTS.PADDING,
    marginBottom: 0.044 * screenHeight,
  },
  valuePropInfoIcon: {
    width: 15,
    height: 15,
    marginRight: 6,
    marginTop: 8,
    opacity: 0.5,
  },
  valuePropDescription: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    lineHeight: 32,
    color: "#fff",
    opacity: 0.66,
  },
});
