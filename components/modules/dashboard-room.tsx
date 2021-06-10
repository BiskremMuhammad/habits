import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Habit, HabitTypes } from "../../types/habit";
import { CONSTANTS } from "../../utils/constants";
import { Button } from "../elements/button";
import { AddIconSvg } from "../svgs/add-icon";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface DashboardRoomProps {
  /**
   * the habit to display
   *
   * @type {Habit}
   */
  habit?: Habit;
}

export const DashboardRoom = ({ habit }: DashboardRoomProps) => {
  let roomGraphic = habit
    ? require("../../assets/rooms/reading-room.png")
    : require("../../assets/rooms/add-room.png");
  if (habit) {
    switch (habit.type) {
      case HabitTypes.READING:
        roomGraphic = require("../../assets/rooms/reading-room.png");
        break;
      default:
        roomGraphic = require("../../assets/rooms/reading-room.png");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.roomContainer}>
        <Image source={roomGraphic} style={styles.room} />
      </View>
      <View style={styles.infoContianer}>
        {habit ? (
          <View style={styles.info}>
            <View style={styles.habitDetails}>
              <Text>Habit details</Text>
            </View>
            <Button
              shape="circle"
              text="start"
              onPress={() => {}}
              hasCircleBorder={true}
            />
          </View>
        ) : (
          <View style={styles.addHabitContainer}>
            <AddIconSvg style={styles.addIcon} width={73} height={73} />
            <View style={styles.addTextContainer}>
              <Text style={styles.addHabitText}>Add a habit</Text>
              <Text style={styles.addHabitDescription}>
                21 days practicing your habit will unlock a new habit slot
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width:
      CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE - CONSTANTS.DASHBOARD_ROOM_SPACING * 2,
  },
  roomContainer: {
    position: "relative",
    width:
      CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE - CONSTANTS.DASHBOARD_ROOM_SPACING * 2,
    height:
      CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE - CONSTANTS.DASHBOARD_ROOM_SPACING * 2,
  },
  room: {
    width:
      CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE - CONSTANTS.DASHBOARD_ROOM_SPACING * 2,
    height:
      1.1 * CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE -
      CONSTANTS.DASHBOARD_ROOM_SPACING * 2,
    resizeMode: "contain",
  },
  infoContianer: {
    marginTop: 22,
  },
  addHabitContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  addIcon: {
    marginRight: 15,
  },
  addTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  addHabitText: {
    fontFamily: "JosefinSans-SemiBold",
    fontSize: 18,
    lineHeight: 26,
    color: "#fff",
  },
  addHabitDescription: {
    fontFamily: "Rubik-Medium",
    fontSize: 13,
    lineHeight: 21,
    color: "#fff",
    opacity: 0.8,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 0.1 * CONSTANTS.DASHBOARD_ROOM_ITEM_SIZE,
  },
  habitDetails: {
    flex: 1,
    marginTop: 2,
  },
});
