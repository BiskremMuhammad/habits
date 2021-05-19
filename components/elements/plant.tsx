/**
 * @author Muhammad Omran
 * @date 18-05-2021
 * @description implement a reusable plant component
 */

import React from "react";
import { MotiView } from "moti";
import { View, Image, StyleSheet, StyleProp, ViewProps } from "react-native";
import Animated from "react-native-reanimated";

/**
 * define the defferent states of the plant
 *
 * @enum
 * @exports
 */
export enum PlantState {
  DARK,
  SMALL,
  NORMAL,
  GLOW,
}

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface PlantProps {
  /**
   * pass some extra custom styles for the plant
   *
   * @type {StyleProp<ViewProps>}
   */
  extraStyles?: StyleProp<ViewProps>;

  /**
   * custom plant top height
   *
   * @type {Animated.SharedValue<number>}
   */
  height?: Animated.SharedValue<number>;

  /**
   * custom x position for the plant top
   *
   * @type {Animated.SharedValue<number>}
   */
  positionX?: Animated.SharedValue<number>;

  /**
   * custom bottom position for the plant top
   *
   * @type {Animated.SharedValue<number>}
   */
  positionBottom?: Animated.SharedValue<number>;

  /**
   * the state of the plant
   *
   * @type {PlantState}
   */
  state: PlantState;
}

export const Plant = (props: PlantProps) => {
  let plantResource = require("../../assets/plant/plant_dark.png");
  switch (props.state) {
    case PlantState.DARK:
      plantResource = require("../../assets/plant/plant_dark.png");
      break;
    case PlantState.SMALL:
      plantResource = require("../../assets/plant/plant_small.png");
      break;
    case PlantState.NORMAL:
      plantResource = require("../../assets/plant/plant_normal.png");
      break;
    case PlantState.GLOW:
      plantResource = require("../../assets/plant/plant_glow.png");
      break;
    default:
  }

  return (
    <View style={PlantStyles.plantContainer}>
      <View style={PlantStyles.potContainer}>
        <Image
          source={require("../../assets/pot.png")}
          style={PlantStyles.pot}
        />
      </View>
      <MotiView
        from={{
          height: 0,
          bottom: 24,
          translateX: props.positionX
            ? props.positionX.value
            : props.state === PlantState.SMALL
            ? 9
            : 6,
        }}
        animate={{
          height: props.height
            ? props.height.value
            : props.state === PlantState.SMALL
            ? 48.35
            : 255.4,
          translateX: props.positionX
            ? props.positionX.value
            : props.state === PlantState.SMALL
            ? 9
            : 6,
          bottom: props.positionBottom
            ? props.positionBottom.value
            : props.state === PlantState.SMALL
            ? 75
            : 24,
        }}
        transition={{
          type: "timing",
          duration:
            props.state !== PlantState.DARK && props.state !== PlantState.SMALL
              ? 3000
              : 100,
          translateX: {
            type: "timing",
            duration: 100,
          },
          bottom: {
            type: "timing",
            duration:
              props.state !== PlantState.DARK &&
              props.state !== PlantState.SMALL
                ? 2000
                : 100,
          },
        }}
        style={PlantStyles.thePlant}
      >
        <Image source={plantResource} style={PlantStyles.plantImage} />
      </MotiView>
    </View>
  );
};

const PlantStyles = StyleSheet.create({
  plantContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: -46,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  potContainer: {
    width: "50%",
    height: 92.3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pot: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  potGlowFeedBack: {},
  thePlant: {
    width: "60%",
    position: "absolute",
  },
  plantImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
