/**
 * @author Muhammad Omran
 * @date 20-05-2021
 * @description implement the Add Habit Screen
 */

import React, { useEffect } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { View as MotiView } from "moti";
import { AddHabit } from "../components/modules/add-habit/add-habit";
import { AddIconSvg } from "../components/svgs/add-icon";
import { useNavigation } from "@react-navigation/native";

const { height: screenHeight } = Dimensions.get("screen");

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface AddHabitScreenProps {
  /**
   * flag if app state is still playing the introduction
   *
   * @type {boolean}
   */
  isIntroduction: boolean;
}

export const AddHabitScreen = ({ isIntroduction }: AddHabitScreenProps) => {
  const navigation = useNavigation();

  /**
   * Disable user from going back when this is the first time to prevent going back to the introduction success screen
   */
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        if (isIntroduction) {
          return;
        } else {
          navigation.dispatch(e.data.action);
        }
      }),
    [navigation, isIntroduction]
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.bgIconContainer}>
          <AddIconSvg style={styles.bgIcon} />
        </View>
        <MotiView
          style={{ alignSelf: "stretch" }}
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 1000, type: "timing" }}
        >
          <AddHabit
            enableChangeHabit={true}
            enableDurationSelect={true}
            enableFrequencySelect={true}
          />
        </MotiView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 0.26 * screenHeight,
    paddingBottom: 0.08 * screenHeight,
  },
  bgIconContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 92,
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
});
