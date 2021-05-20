/**
 * @author Muhammad Omran
 * @date 19-05-2021
 * @description implement the success screen
 */

import { useNavigation } from "@react-navigation/core";
import React, { Dispatch } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "../components/elements/button";
import { Plant, PlantState } from "../components/elements/plant";
import { Spoiler } from "../components/elements/spoiler";
import { AddIconSvg } from "../components/svgs/add-icon";
import InfoIcon from "../components/svgs/info-icon";
import {
  HabitActions,
  HabitActionTypes,
} from "../redux/reducers/habit/habit-actions";
import { CommonStyles } from "../styles/common";
import { Routes } from "../types/route-names";
import { CONSTANTS } from "../utils/constants";

const { height: screenHeight } = Dimensions.get("screen");

export const SuccessScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<Dispatch<HabitActions>>();

  const onBegin = () => {
    dispatch({
      type: HabitActionTypes.INTRODUCTION_CLEAR_UP,
    });
    navigation.navigate(Routes.ADD_HABIT);
  };

  return (
    <View style={SuccessScreenStyles.container}>
      <View style={SuccessScreenStyles.bgIconContainer}>
        <AddIconSvg style={SuccessScreenStyles.bgIcon} />
        <View style={SuccessScreenStyles.titleWithIcon}>
          <Plant
            state={PlantState.GLOW}
            extraStyles={SuccessScreenStyles.plant}
          />
          <Text style={SuccessScreenStyles.title}>GREAT!</Text>
        </View>
      </View>
      <Text
        style={[
          CommonStyles.infoTxt,
          { marginVertical: 14, paddingHorizontal: 10 },
        ]}
      >
        You completed a session and have illuminated your Reading plant.
      </Text>
      <Spoiler
        title="Why 1 minute sessions?"
        spoiler="We start with 1 minute habits because studies have shown day-to-day frequency (not duration) is the leading factor long-term habit formation. After your identity and day-to-day frequency have been established, session duration can be expanded."
        icon={<InfoIcon fill="#fff" />}
      />
      <Text
        style={[
          CommonStyles.infoTxt,
          { marginVertical: 14, paddingHorizontal: 10 },
        ]}
      >
        Now set up your daily habit on the next screen.
      </Text>
      <View style={{ flex: 1 }} />
      <Button
        shape="oval"
        text="begin"
        extraStyles={{ marginTop: 14, alignSelf: "center" }}
        onPress={onBegin}
      />
    </View>
  );
};

const SuccessScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingTop: 0.222 * screenHeight,
    paddingBottom: 0.08 * screenHeight,
    paddingHorizontal: 0.8 * CONSTANTS.PADDING,
  },
  bgIconContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bgIcon: {
    width: "100%",
    height: "14.44%",
    opacity: 0.4,
    position: "absolute",
  },
  titleWithIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  plant: {
    transform: [{ scale: 0.5 }],
    left: -2.3 * CONSTANTS.PADDING,
    bottom: -15,
  },
  title: {
    fontFamily: "JosefinSans-Medium",
    fontSize: 32,
    letterSpacing: 3,
    color: "#fff",
    lineHeight: 72,
    textTransform: "uppercase",
    marginBottom: 16,
    marginLeft: 19,
  },
});
