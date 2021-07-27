/**
 * @author Muhammad Omran
 * @date 26-07-2021
 * @description implement the modal that will request notification access from the user
 */

import { MotiView } from "@motify/components";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { PushNotification } from "../../../utils/push-notification";
import { Button } from "../../elements/button";

const { height: screenHeight } = Dimensions.get("screen");

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface RequestNotificationAccessModalProps {
  /**
   * callback after the modal goes away
   *
   * @type {() => void}
   */
  callback: () => void;
}

export const RequestNotificationAccessModal = ({
  callback,
}: RequestNotificationAccessModalProps) => {
  const requestAccess = async () => {
    await PushNotification.registerForPushNotificationsAsync();
    callback();
  };

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "timing",
        duration: 1000,
        delay: 1000,
      }}
      exitTransition={{ type: "timing", duration: 300 }}
      style={styles.container}
    >
      <ImageBackground
        source={require("../../../assets/notification-modal-bg.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.body}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={[styles.message, { marginBottom: 14 }]}>
            {
              "We utilize your phone’s notification system to let you know when you have completed your session."
            }
          </Text>
          <Text style={[styles.message, { marginTop: 0, marginBottom: 0 }]}>
            {"Please enable notifications"}
          </Text>
          <Text style={[styles.message, { marginTop: 0 }]}>
            {"from this app."}
          </Text>
          <Button
            shape="oval"
            text="Let's Do This"
            onPress={requestAccess}
            extraStyles={styles.button}
          />
        </View>
      </ImageBackground>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    borderRadius: 24,
    marginHorizontal: 20,
    overflow: "hidden",
    height: "84%",
    marginBottom: 0.064 * screenHeight,
  },
  background: {
    flex: 1,
    borderRadius: 24,
    justifyContent: "flex-end",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 26,
    marginRight: 40,
    marginBottom: 32,
  },
  title: {
    fontFamily: "Rubik-Medium",
    fontSize: 20,
    lineHeight: 28,
    color: "#fff",
    textTransform: "capitalize",
  },
  message: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.66,
    marginTop: 9,
    marginBottom: 31,
  },
  button: {
    alignSelf: "center",
  },
});
