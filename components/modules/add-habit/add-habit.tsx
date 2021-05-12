/**
 * @author Muhammad Omran
 * @date 08-05-2021
 * @description implement the add habit form
 */

import { MotiView } from "@motify/components";
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { CommonStyles } from "../../../styles/common";
import { HabitTypes } from "../../../types/habit";
import { WeekDays } from "../../../types/week-days";
import { CONSTANTS } from "../../../utils/constants";
import { Button } from "../../elements/button";
import { Input } from "../../elements/input";
import { Radio } from "../../elements/radio";
import BookIcon from "../../svgs/book";
import InfoIcon from "../../svgs/info-icon";
import TimerIcon from "../../svgs/timer-icon";
import { WeekDaysSelect } from "./week-days-select";

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
  const [freqChangeOpen, setFreqChangeOpenState] = useState<boolean>(true);
  const [freqSelection, setFreqSelection] = useState<number>(1);
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
      {props.enableFrequencySelect && (
        <View>
          <MotiView
            from={{ backgroundColor: "rgba(12, 8, 52, 0)" }}
            animate={
              freqChangeOpen
                ? {
                    backgroundColor: "rgba(12, 8, 52, 0.6)",
                  }
                : {}
            }
            transition={{ delay: 200 }}
            style={[
              addHabitStyles.frequency,
              freqChangeOpen && addHabitStyles.freqChangeOpened,
            ]}
          >
            <Pressable
              style={addHabitStyles.frequencyButton}
              onPress={() => setFreqChangeOpenState(!freqChangeOpen)}
            >
              <Text style={addHabitStyles.frequencyText}>
                {isEveryday && "everyday"}
              </Text>
              <InfoIcon style={addHabitStyles.frequencyIcon} fill="#fff" />
            </Pressable>
          </MotiView>
          {freqChangeOpen && (
            <MotiView
              from={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100%" }}
              style={addHabitStyles.frequencyChangeContainer}
            >
              <View style={addHabitStyles.frequencyChangeBorder}></View>
              <View style={addHabitStyles.frequencyChangeForm}>
                <Text style={addHabitStyles.frequencyChangeFormText}>
                  Research has shown more consistent change when doing limited
                  amounts every day and scaling the amount instead of the number
                  of days
                </Text>
                <Radio
                  index={1}
                  label="Ok, I’ll do it everyday"
                  selected={freqSelection === 1}
                  onChange={setFreqSelection}
                />
                <Radio
                  index={2}
                  label="I understand. I still want a rest day on:"
                  selected={freqSelection === 2}
                  onChange={setFreqSelection}
                >
                  <WeekDaysSelect />
                </Radio>
                <Radio
                  index={3}
                  label="Let me choose my own schedule"
                  selected={freqSelection === 3}
                  onChange={setFreqSelection}
                />
              </View>
            </MotiView>
          )}
        </View>
      )}
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
    paddingHorizontal: 6,
  },
  addHabitSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    width: "100%",
    paddingHorizontal: CONSTANTS.PADDING,
  },
  label: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    color: "#fff",
    marginRight: 8,
  },
  frequency: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginTop: 4,
    paddingVertical: 0,
    paddingHorizontal: 13,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginLeft: CONSTANTS.PADDING - 13,
  },
  freqChangeOpened: {
    backgroundColor: "rgba(12, 8, 52, 0.6)",
  },
  frequencyButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  frequencyText: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    lineHeight: 32,
    color: "#fff",
  },
  frequencyIcon: {
    width: 15,
    height: 15,
    alignSelf: "flex-end",
    marginLeft: 5,
    marginBottom: 3,
    opacity: 0.5,
  },
  frequencyChangeContainer: {
    position: "relative",
  },
  frequencyChangeBorder: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "10%",
    borderRadius: 56,
    borderColor: "#6F698F",
    borderWidth: 2,
    opacity: 0.47,
  },
  frequencyChangeForm: {
    marginHorizontal: 2,
    marginBottom: 4,
    backgroundColor: "rgba(12, 8, 52, 0.6)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  frequencyChangeFormText: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    lineHeight: 24,
    color: "#fff",
    paddingLeft: 9,
    paddingRight: 38,
    marginBottom: 5,
  },
});
