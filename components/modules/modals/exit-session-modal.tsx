/**
 * @author Muhammad Omran
 * @date 19-05-2021
 * @description implement the modal that will appear when timer screen exit session button is clicked
 */

import { MotiView } from "@motify/components";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CommonStyles } from "../../../styles/common";
import { Button } from "../../elements/button";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface ExitSessionModalProps {
  /**
   * custom message for the modal
   *
   * @type {string}
   */
  message?: string;

  /**
   * handler callback when cancel button "Keep Going" is clicked
   *
   * @type {() => void}
   */
  onCancel: () => void;

  /**
   * handler callback when Confirm exit button is clicked
   *
   * @type {() => void}
   */
  onExit: () => void;

  /**
   * custom text for the submit button
   *
   * @type {string}
   */
  submitText?: string;

  /**
   * custom title for the modal
   *
   * @type {string}
   */
  title?: string;
}

export const ExitSessionModal = ({
  message,
  onCancel,
  onExit,
  submitText,
  title,
}: ExitSessionModalProps) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 200 }}
      animate={{ opacity: 1, translateY: -103 }}
      exit={{ opacity: 0, translateY: 200 }}
      transition={{
        type: "timing",
        duration: 100,
        translateY: {
          type: "spring",
        },
      }}
      exitTransition={{ type: "timing", duration: 100 }}
      style={styles.container}
    >
      <Text style={styles.headerTitle}>{title ? title : "Exit Session?"}</Text>
      <Text
        style={[
          CommonStyles.infoTxtSmaller,
          { marginTop: 16, marginBottom: 36 },
        ]}
      >
        {message
          ? message
          : "Are you sure you want to end this session, you will lose your progress?"}
      </Text>
      <View style={styles.buttons}>
        <Button
          shape="oval"
          hasBackground={true}
          hasCircleBorder={true}
          text="Keep Going"
          onPress={onCancel}
        />
        <Button
          shape="oval"
          hasBackground={true}
          noBorder={true}
          text={submitText ? submitText : "Exit"}
          onPress={onExit}
        />
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(22, 17, 54, 0.72)",
    borderRadius: 40,
    paddingTop: 47,
    paddingBottom: 33,
    paddingLeft: 22,
    paddingRight: 29,
    marginHorizontal: 40,
  },
  headerTitle: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    lineHeight: 32,
    color: "#fff",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
