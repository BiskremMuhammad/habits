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
import { TitlePanel } from "../components/modules/panels/title-panel";

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
        <TitlePanel icon={({ style }) => <AddIconSvg style={style} />} />
        <MotiView
          style={{ alignSelf: "stretch", marginTop: 96 }}
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
});
