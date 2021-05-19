/**
 * @author Muhammad Omran
 * @date 19-05-2021
 * @description implement a reusable modal container
 */

import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
// import { BlurView } from "@react-native-community/blur";
import { MotiView } from "@motify/components";

const { width, height } = Dimensions.get("screen");

export const Modal = ({ children }: { children: React.ReactChild }) => {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={ModalStyles.container}
    >
      {/* <BlurView
        style={ModalStyles.backdrop}
        blurRadius={1}
        blurType="dark"
        // overlayColor={'rgba(0, 0, 255, .6)'}   // set a blue overlay
      /> */}
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  backdrop: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
