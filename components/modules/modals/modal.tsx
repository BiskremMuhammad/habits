/**
 * @author Muhammad Omran
 * @date 19-05-2021
 * @description implement a reusable modal container
 */

import React from "react";
import { StyleSheet, I18nManager, Dimensions, Pressable } from "react-native";
import { MotiView } from "@motify/components";

const { width, height } = Dimensions.get("screen");

export const Modal = ({
  children,
  delayAnimation,
  fadeDuration,
}: {
  children: React.ReactChild;
  delayAnimation?: number;
  fadeDuration?: number;
}) => {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "timing",
        duration: fadeDuration ? fadeDuration : 300,
        delay: delayAnimation,
      }}
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
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});
