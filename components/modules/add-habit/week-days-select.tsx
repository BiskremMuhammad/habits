/**
 * @author Muhammad Omran
 * @date 11-05-2021
 * @description implement the Week Days Select Panel
 */

import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { WeekDays } from "../../../types/week-days";

/**
 * define the component props
 *
 * @interface
 */
interface WeekDaysSelectProps {
  /**
   * flag if the component is clickable
   *
   * @type {boolean}
   */
  clickable?: boolean;

  /**
   * flag to set the behaviour of the component on press function
   * which will disable the item that is being clicked
   * this is only for the case to select the rest day
   *
   * @type {boolean}
   */
  clickToDisable?: boolean;

  /**
   * custom styles for the container
   *
   * @type {StyleProp<ViewStyle>}
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * to limit the selection of days to only one day
   * this is only for the case to select the rest day
   *
   * @type {boolean}
   */
  limitOneSelection?: boolean;
}

export const WeekDaysSelect = (porps: WeekDaysSelectProps) => {
  return (
    <View style={[WeekDaysSelectStyles.container, porps.containerStyle]}>
      {Object.keys(WeekDays).map((key: string) => (
        <Pressable key={key} style={WeekDaysSelectStyles.day}>
          <Text style={WeekDaysSelectStyles.dayText}>{key}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const WeekDaysSelectStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(196, 196, 196, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 1,
  },
  dayDisabled: {
    backgroundColor: "#151032",
  },
  dayText: {
    color: "#282536",
    fontFamily: "Rubik-Bold",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  dayTextDisabled: {
    color: "#fff",
  },
});
