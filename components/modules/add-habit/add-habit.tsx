/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the add habit form
 */

import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { CommonStyles } from "../../../styles/common";
import { Button } from "../../elements/button";
import { Input } from "../../elements/input";
import BookIcon from "../../svgs/book";
import TimerIcon from "../../svgs/timer-icon";

const { height: screenHeight } = Dimensions.get("screen");

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface AddHabitProps {
  /**
   * flag of which to display the habit frequency change from everyday to specific days
   *
   * @type {boolean}
   */
  enableFrequencySelect?: boolean;
}

export const AddHabit = ({ enableFrequencySelect }: AddHabitProps) => {
  return (
    <View style={addHabitStyles.container}>
      <View style={addHabitStyles.addHabitSection}>
        <Text style={addHabitStyles.label}>I will</Text>
        <Input
          text="Read"
          icon={
            <BookIcon width={16} height={21} style={CommonStyles.withIcon} />
          }
          isDropdown={true}
          hasBorder={true}
          hasCircleBorder={true}
        />
      </View>
      <View style={addHabitStyles.addHabitSection}>
        <Text style={addHabitStyles.label}>for</Text>
        <Input
          text="1 min"
          width="minimal"
          icon={
            <TimerIcon width={24} height={21} style={CommonStyles.withIcon} />
          }
        />
      </View>
      <Button
        shape="circle"
        text="start"
        hasCircleBorder={true}
        extraStyles={{ marginTop: 0.1055 * screenHeight, alignSelf: "center" }}
      />
    </View>
  );
};

const addHabitStyles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    alignItems: "flex-start",
  },
  addHabitSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    width: "100%",
  },
  label: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    color: "#fff",
    marginRight: 8,
  },
});
