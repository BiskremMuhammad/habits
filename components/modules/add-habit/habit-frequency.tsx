/**
 * @author Muhammad Omran
 * @date 31-05-2021
 * @description Implement a reusable habit frequency controller component
 */

import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import { CommonStyles } from "../../../styles/common";
import { WeekDaysFullName, WeekDays } from "../../../types/week-days";
import { CONSTANTS } from "../../../utils/constants";
import { getEnumKeyByEnumValue } from "../../../utils/enum-type-utils";
import { Radio } from "../../elements/radio";
import InfoIcon from "../../svgs/info-icon";
import { WeekDaysSelect } from "./week-days-select";

const { width: screenWidth } = Dimensions.get("screen");

interface HabitFrequencyInputProps {
  /**
   * habit selected week days
   *
   * @type {WeekDays[]}
   */
  days: WeekDays[];

  /**
   * dispatch change of the days set
   *
   * @type {(WeekDays[]) => void}
   */
  dispatchDays: (selectedDays: WeekDays[]) => void;

  /**
   * flag to display the frequency change panel as absolute floating panel
   *
   * @type {boolean}
   */
  floatingPanel?: boolean;

  /**
   * to force open the dropdown state from parent
   *
   * @type {boolean}
   */
  forceState?: boolean;

  /**
   * if the state of the habit is set to everyday
   *
   * @type {boolean}
   */
  isEveryDay: boolean;

  /**
   * custom styles for the handler toggler
   *
   * @type {StyleProp<ViewStyle>}
   */
  handlerStyle?: StyleProp<ViewStyle>;

  /**
   * on change the frequency callback
   *
   * @type {(radio: number) => void}
   */
  onChangeFreq: (radio: number) => void;

  /**
   * to send a callback to parent of state changing
   *
   * @type {(state: boolean) => void}
   */
  toggleCallback?: (state: boolean) => void;
}

export const HabitFrequencyInput = (props: HabitFrequencyInputProps) => {
  const [freqChangeOpen, setFreqChangeOpenState] = useState<boolean>(false);
  const [freqSelection, setFreqSelection] = useState<number>(1);

  useEffect(() => {
    setFreqChangeOpenState(!!props.forceState);
  }, [props.forceState]);

  const toggleChangeState = (state: boolean) => {
    setFreqChangeOpenState(state);
    if (props.toggleCallback) {
      props.toggleCallback(state);
    }
  };

  const onChangeFreq = (radio: number) => {
    if (radio === freqSelection) return;

    setFreqSelection(radio);
    props.onChangeFreq(radio);
  };

  return (
    <View style={Platform.OS === "ios" && { zIndex: 4 }}>
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
          styles.frequency,
          freqChangeOpen && styles.freqChangeOpened,
          freqChangeOpen &&
            props.floatingPanel && { backgroundColor: "rgba(12, 8, 52, 1)" },
          props.handlerStyle,
        ]}
      >
        <Pressable
          style={styles.frequencyButton}
          onPress={() => toggleChangeState(!freqChangeOpen)}
        >
          <Text
            numberOfLines={1}
            style={[
              styles.frequencyText,
              !props.isEveryDay && styles.frequencyTextNotEveryday,
              !props.isEveryDay &&
                freqSelection === 3 &&
                props.days!.length > 5 &&
                styles.frequencyTextCustomScheduleTooLong,
            ]}
          >
            {props.isEveryDay
              ? "every day"
              : freqSelection === 2 || props.days.length === 6
              ? `every day but ${
                  WeekDaysFullName[
                    getEnumKeyByEnumValue(
                      WeekDays,
                      Object.keys(WeekDays).find(
                        (d) => !props.days?.includes(d as WeekDays)
                      )!
                    )!
                  ]
                }`
              : props.days?.length
              ? props.days.join(", ")
              : "select your schedule"}
          </Text>
          <InfoIcon
            style={[
              CommonStyles.infoIcon,
              freqSelection === 3 && {
                marginBottom: Platform.OS === "ios" ? 8 : 5,
              },
            ]}
            fill="#fff"
          />
        </Pressable>
      </MotiView>
      {freqChangeOpen && (
        <View style={props.floatingPanel && styles.floatingPanelContainer}>
          <MotiView
            from={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            style={styles.frequencyChangeContainer}
          >
            <View style={styles.frequencyChangeBorderContainer}>
              <View style={styles.frequencyChangeBorder}></View>
            </View>
            <View
              style={[
                styles.frequencyChangeForm,
                props.floatingPanel && {
                  backgroundColor: "rgba(12, 8, 52, 1)",
                },
              ]}
            >
              <Text style={styles.frequencyChangeFormText}>
                Research has shown more consistent change when doing limited
                amounts every day and scaling the amount instead of the number
                of days
              </Text>
              <Radio
                index={1}
                label="Ok, I’ll do it every day"
                selected={freqSelection === 1}
                onChange={() => onChangeFreq(1)}
              />
              <Radio
                index={2}
                label={
                  <View style={styles.frequencyCustomRadioLabelContainer}>
                    <Text style={styles.frequencyCustomRadioText}>
                      I understand. I still want a
                    </Text>
                    <Text
                      style={[
                        styles.frequencyCustomRadioText,
                        styles.frequencyCustomRadioTextAccent,
                      ]}
                    >
                      {"  "}
                      rest day{"  "}
                    </Text>
                    <Text style={styles.frequencyCustomRadioText}>on:</Text>
                  </View>
                }
                selected={freqSelection === 2}
                onChange={() => onChangeFreq(2)}
              >
                <WeekDaysSelect
                  days={props.days!}
                  clickable={true}
                  limitOneSelection={true}
                  dispatchDays={props.dispatchDays}
                  containerStyle={{ marginTop: 15, marginBottom: 2 }}
                />
              </Radio>
              <Radio
                index={3}
                label="Let me choose my own schedule"
                selected={freqSelection === 3}
                onChange={() => onChangeFreq(3)}
              >
                <WeekDaysSelect
                  days={props.days!}
                  clickable={true}
                  dispatchDays={props.dispatchDays}
                  containerStyle={{ marginTop: 15, marginBottom: 2 }}
                />
              </Radio>
            </View>
          </MotiView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  frequencyTextNotEveryday: {
    fontSize: 20,
  },
  frequencyTextCustomScheduleTooLong: {
    fontSize: 16,
  },
  floatingPanelContainer: {
    position: "absolute",
    width: screenWidth,
    left: 0,
    top: 32,
    zIndex: 11,
  },
  frequencyChangeContainer: {
    position: "relative",
  },
  frequencyChangeBorderContainer: {
    position: "absolute",
    bottom: -1,
    right: -2,
    width: "45%",
    height: 53,
    overflow: "hidden",
  },
  frequencyChangeBorder: {
    position: "absolute",
    bottom: 0,
    right: -4,
    width: "200%",
    height: "200%",
    borderRadius: 28,
    borderColor: "#6F698F",
    borderBottomWidth: 2,
    borderRightWidth: 2,
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
  frequencyCustomRadioLabelContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  frequencyCustomRadioText: {
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    lineHeight: 23,
    color: "#fff",
  },
  frequencyCustomRadioTextAccent: {
    backgroundColor: "#151032",
    borderRadius: 20,
    marginHorizontal: 2,
  },
});
