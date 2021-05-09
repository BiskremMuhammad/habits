/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the splash screen
 */

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { AddIconSvg } from "../components/svgs/add-icon";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export const SplashScreen = () => {
  return (
    <View style={SplashScreenStyles.container}>
      <View style={SplashScreenStyles.bgIconContainer}>
        <AddIconSvg style={SplashScreenStyles.bgIcon} />
        <Text style={SplashScreenStyles.welcome}>Welcome</Text>
      </View>
    </View>
  );
};

const SplashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 0.23896 * screenHeight,
    paddingHorizontal: 0.177 * screenWidth,
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
    letterSpacing: 3.5,
    color: "#fff",
    lineHeight: 72,
    textTransform: "uppercase",
    marginBottom: 16,
  },
});
