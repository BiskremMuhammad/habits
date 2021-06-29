/**
 * @author Muhammad Omran
 * @date 20-05-2021
 * @description Implement the Dashboard screen
 */

import { MotiView } from "@motify/components";
import { DrawerActions, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { Header, HeaderActions } from "../components/elements/header";
import { INITIAL_ADD_HABIT_STATE } from "../components/modules/add-habit/add-habit-reducer";
import { DashboardRoom } from "../components/modules/dashboard-room";
import { TitlePanel } from "../components/modules/panels/title-panel";
import { DashboardIcon } from "../components/svgs/dashboard-graphic";
import { GlobalStore } from "../redux/store";
import { Habit } from "../types/habit";
import { CONSTANTS } from "../utils/constants";

const { height: screenHeight } = Dimensions.get("screen");

export const DashboardScreen = () => {
  const navigation = useNavigation();
  const habits: Habit[] = useSelector<GlobalStore, Habit[]>(
    (store: GlobalStore): Habit[] => store.habits
  );
  const [rooms, setRooms] = useState<Habit[]>(habits);
  const scrollX = React.useRef(new Animated.Value(0)).current;

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
    setRooms([
      { ...INITIAL_ADD_HABIT_STATE, id: "empty-Left" },
      ...habits,
      { ...INITIAL_ADD_HABIT_STATE, id: "ADD_HABIT" },
      { ...INITIAL_ADD_HABIT_STATE, id: "empty-right" },
    ]);
  }, [habits]);

  return (
    <View style={styles.container}>
      <Header
        leftAction="announcement"
        toggleDrawer={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <TitlePanel
        extraStyles={{ flex: 1 }}
        icon={({ style }) => <DashboardIcon style={style} />}
        title="My Habits"
      />
      <View
        style={{
          flex: screenHeight < 800 ? 5 : screenHeight < 846 ? 4 : 2.5,
        }}
      >
        <MotiView
          style={{ flex: 1 }}
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: "spring", delay: 300 }}
        >
          <Animated.FlatList
            showsHorizontalScrollIndicator={false}
            data={rooms}
            keyExtractor={(item: Habit) => item.id}
            horizontal={true}
            bounces={false}
            decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
            renderToHardwareTextureAndroid
            contentContainerStyle={{ alignItems: "center" }}
            snapToInterval={CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE}
            snapToAlignment="start"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={48}
            renderItem={({ item, index }) => {
              if (item.id.includes("empty")) {
                return (
                  <View
                    style={{ width: CONSTANTS.DASHBOARD_ROOM_EMPTY_ITEM_SIZE }}
                  />
                );
              }

              const inputRange = [
                (index - 2) * CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE,
                (index - 1) * CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE,
                index * CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE,
              ];

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [-20, -50, -20],
                extrapolate: "clamp",
              });

              return (
                <View
                  style={{
                    width: CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE,
                    paddingTop: screenHeight < 800 ? 50 : 0,
                  }}
                >
                  <Animated.View
                    style={{
                      marginHorizontal: CONSTANTS.DASHBOARD_ROOM_SPACING,
                      padding: CONSTANTS.DASHBOARD_ROOM_SPACING * 2,
                      alignItems: "center",
                      transform: [{ translateY }],
                    }}
                  >
                    <DashboardRoom
                      habit={item.id.includes("ADD_HABIT") ? undefined : item}
                    />
                  </Animated.View>
                </View>
              );
            }}
          />
        </MotiView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingVertical: CONSTANTS.HEADER_TOP_MARGIN,
  },
});
