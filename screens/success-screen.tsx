/**
 * @author Muhammad Omran
 * @date 19-05-2021
 * @description implement the success screen
 */

import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import React, { Dispatch, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/elements/button";
import { Spoiler } from "../components/elements/spoiler";
import { Modal } from "../components/modules/modals/modal";
import { RequestNotificationAccessModal } from "../components/modules/modals/request-notification-access-modal";
import { TitlePanel } from "../components/modules/panels/title-panel";
import { AddIconSvg } from "../components/svgs/add-icon";
import InfoIcon from "../components/svgs/info-icon";
import {
  HabitActions,
  HabitActionTypes,
} from "../redux/reducers/habit/habit-actions";
import { GlobalStore } from "../redux/store";
import { CommonStyles } from "../styles/common";
import { Habit } from "../types/habit";
import { Routes } from "../types/route-names";
import { CONSTANTS } from "../utils/constants";
import { TimerScreenRouteParams } from "./timer-screen";

const { height: screenHeight } = Dimensions.get("screen");

export const SuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as TimerScreenRouteParams;
  const habitId: string = params ? params.habitId : "";

  const [notificationModalOpened, setNotificationModalVisibility] =
    useState<boolean>(false);

  /**
   * Disable user from going back
   */
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        if (e.data.action.type === "GO_BACK") {
          e.preventDefault();
          return;
        }
      }),
    [navigation]
  );

  const onBegin = () => {
    navigation.navigate(Routes.VIEW_HABIT, {
      habitId: habitId,
    } as TimerScreenRouteParams);
  };

  return (
    <View style={SuccessScreenStyles.container}>
      <TitlePanel
        icon={({ style }) => <AddIconSvg style={style} />}
        showPlant={true}
        title="GREAT!"
      />
      <Text style={[CommonStyles.infoTxt, SuccessScreenStyles.headDescription]}>
        You completed a session and have illuminated your Reading plant.
      </Text>
      <Spoiler
        title="Why 1 minute sessions?"
        spoiler="We start with 1 minute habits because studies have shown day-to-day frequency (not duration) is the leading factor long-term habit formation. After your identity and day-to-day frequency have been established, session duration can be expanded."
        icon={<InfoIcon fill="#fff" />}
      />
      <Text style={[CommonStyles.infoTxt, SuccessScreenStyles.oneMinuteInfo]}>
        Now set up your daily habit on the next screen.
      </Text>
      <View style={{ flex: 1 }} />
      <Button
        shape="oval"
        text="begin"
        extraStyles={{ marginTop: 14, alignSelf: "center" }}
        onPress={() => setNotificationModalVisibility(true)}
      />
      {notificationModalOpened && (
        <Modal>
          <RequestNotificationAccessModal callback={onBegin} />
        </Modal>
      )}
    </View>
  );
};

const SuccessScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingTop: CONSTANTS.SCREEN_CONTAINER_TOP_PADDING,
    paddingBottom: CONSTANTS.SCREEN_CONTAINER_BOTTOM_PADDING,
    paddingHorizontal: 0.8 * CONSTANTS.PADDING,
  },
  headDescription: {
    marginBottom: screenHeight < 800 ? 0 : 14,
    marginTop: screenHeight < 800 ? 8 : 32,
    paddingHorizontal: 10,
  },
  oneMinuteInfo: {
    marginTop: screenHeight < 800 ? 0 : 14,
    marginBottom: 14,
    paddingHorizontal: 10,
  },
});
