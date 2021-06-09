import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Text,
} from "react-native";
import { Habit } from "../../types/habit";
import { Button } from "../elements/button";

const { width } = Dimensions.get("screen");
const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

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
  habit: Habit;
}

export const DashboardRoom = () => {
  return (
    <View style={styles.container}>
      <View style={styles.roomContainer}>
        <Image
          source={require("../../assets/rooms/reading-room.png")}
          style={styles.room}
        />
      </View>
      <View style={styles.infoContianer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: ITEM_SIZE,
  },
  roomContainer: {
    position: "relative",
    width: ITEM_SIZE,
    height: ITEM_SIZE,
  },
  room: {
    width: ITEM_SIZE,
    height: 1.1 * ITEM_SIZE,
    resizeMode: "contain",
  },
  infoContianer: {
    marginTop: 22,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 0.1 * ITEM_SIZE,
  },
  habitDetails: {
    flex: 1,
    marginTop: 2,
  },
});
