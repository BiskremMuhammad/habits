/**
 * @author Muhammad Omran
 * @date 20-05-2021
 * @description implement the Add Habit Screen
 */

import React, { useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { View as MotiView } from "moti";
import { AddHabit } from "../components/modules/add-habit/add-habit";
import { AddIconSvg } from "../components/svgs/add-icon";
import { useNavigation } from "@react-navigation/native";
import { TitlePanel } from "../components/modules/panels/title-panel";
import { Header } from "../components/elements/header";
import { useSelector } from "react-redux";
import { GlobalStore } from "../redux/store";
import { Habit } from "../types/habit";
import { CONSTANTS } from "../utils/constants";

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
  const habits: Habit[] = useSelector<GlobalStore, Habit[]>(
    (store: GlobalStore): Habit[] => store.habits
  );

  /**
   * Disable user from going back when this is the first time to prevent going back to the introduction success screen
   */
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        if (isIntroduction || !habits.length) {
          return;
        } else {
          navigation.dispatch(e.data.action);
        }
        return;
      }),
    [navigation, isIntroduction]
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      {!isIntroduction && !!habits.length && (
        <Header
          leftAction="back"
          hideNotification={true}
          extraStyles={styles.header}
          normalGoBack={true}
        />
      )}
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
    position: "relative",
    flex: 1,
    alignItems: "center",
    paddingTop: 1.2 * CONSTANTS.SCREEN_CONTAINER_TOP_PADDING,
    paddingBottom: CONSTANTS.SCREEN_CONTAINER_BOTTOM_PADDING,
  },
  header: {
    position: "absolute",
    alignSelf: "stretch",
    top: CONSTANTS.HEADER_TOP_MARGIN,
  },
});
