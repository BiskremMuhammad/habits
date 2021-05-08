/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the splash screen
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const SplashScreen = () => {
  return (
    <View style={SplashScreenStyles.container}>
      <Text>Welcome</Text>
    </View>
  );
};

const SplashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
