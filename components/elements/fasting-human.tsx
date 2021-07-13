/**
 * @author Muhammad Omran
 * @date 13-07-2021
 * @description implement the human body component for the fasting habit
 */

import React from "react";
import { View, Image, StyleSheet } from "react-native";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface FastingHumanProps {
  /**
   * the progress info to fill the human body
   *
   * @type {number}
   */
  fill: number;

  /**
   * the display width and height of the human body
   *
   * @type {number}
   */
  size: number;
}

export const FastingHuman = ({ fill, size }: FastingHumanProps) => {
  console.log("fill human body: ", fill * size);
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.humanProgress,
          {
            width: size,
            height: fill * size,
          },
        ]}
      >
        <Image
          source={require("../../assets/human-filled.png")}
          width={size}
          height={size}
          style={[styles.human]}
        />
      </View>
      <Image
        source={require("../../assets/human.png")}
        width={size}
        height={size}
        style={styles.human}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: -36,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  human: {
    resizeMode: "cover",
  },
  humanProgress: {
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
