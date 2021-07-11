/**
 * @author Muhammad Omran
 * @date 19-05-2021
 * @description implement a reusable modal container
 */

import React from "react";
import { StyleSheet, Dimensions, Pressable } from "react-native";
import { MotiView } from "@motify/components";

const { width, height } = Dimensions.get("screen");

export const Modal = ({ children }: { children: React.ReactChild }) => {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      exitTransition={{ type: "timing", duration: 100 }}
      style={ModalStyles.container}
    >
      {children}
    </MotiView>
  );
};

const ModalStyles = StyleSheet.create({
  container: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});
