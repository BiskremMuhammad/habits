/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the add habit form
 */

import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { CommonStyles } from "../../../styles/common";
import { HabitTypes } from "../../../types/habit";
import { WeekDays } from "../../../types/week-days";
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
   * flag of which to display the habit Duration change
   *
   * @type {boolean}
   */
  enableDurationSelect?: boolean;

  /**
   * flag of which to display the habit frequency change from everyday to specific days
   *
   * @type {boolean}
   */
  enableFrequencySelect?: boolean;
}

export const AddHabit = (props: AddHabitProps) => {
  const [type, setType] = useState<HabitTypes>(HabitTypes.READING);
  const [isEveryday, setEveryday] = useState<boolean>(true);
  const [freq, setFreq] = useState<WeekDays[]>([]);
  const [duration, setDuration] = useState<number>(1);

  return (
    <View style={addHabitStyles.container}>
      <View style={addHabitStyles.addHabitSection}>
        <Text style={addHabitStyles.label}>I will</Text>
        <Input
          text={type.replace(/ing/gi, "")}
          icon={
            <BookIcon width={16} height={21} style={CommonStyles.withIcon} />
          }
          isDropdown={true}
          hasBorder={true}
          hasCircleBorder={true}
        />
      </View>
      {props.enableFrequencySelect && <View></View>}
      <View style={addHabitStyles.addHabitSection}>
        <Text style={addHabitStyles.label}>for</Text>
        <Input
          text={`${duration} min`}
          width={props.enableDurationSelect ? "short" : "minimal"}
          icon={
            <TimerIcon width={24} height={21} style={CommonStyles.withIcon} />
          }
          customTextStyle={{ textTransform: "none" }}
        />
      </View>
      <Button
        shape="circle"
        text="start"
        hasCircleBorder={true}
        extraStyles={{ marginTop: 0.0855 * screenHeight, alignSelf: "center" }}
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
