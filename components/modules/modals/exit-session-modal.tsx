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
}

export const ExitSessionModal = ({
  onCancel,
  onExit,
}: ExitSessionModalProps) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 200 }}
      animate={{ opacity: 1, translateY: -103 }}
      exit={{ opacity: 0, translateY: 200 }}
      style={styles.container}
    >
      <Text style={styles.headerTitle}>Exit Session?</Text>
      <Text style={[CommonStyles.infoTxtSmaller, { marginVertical: 16 }]}>
        Are you sure you want to end this session, you will lose your progress?
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
          text="Exit"
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
