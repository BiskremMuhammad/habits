/**
 * @author Muhammad Omran
 * @date 29-06-2021
 * @description implement a panel for titles
 */

import { MotiView } from "moti";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  I18nManager,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Plant, PlantStage } from "../../elements/plant";
import { INITIAL_ADD_HABIT_STATE } from "../add-habit/add-habit-reducer";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface TitlePanelProps {
  /**
   * to give the component extra styles
   *
   * @type {StyleProp<ViewStyle>}
   */
  extraStyles?: StyleProp<ViewStyle>;

  /**
   * the icon to use as a background
   *
   * @type {(style = {style: StyleProp<ViewStyle>}) => JSX.Element}
   */
  icon: (style: { style: StyleProp<ViewStyle> }) => JSX.Element;

  /**
   * to show the plant beside the title
   *
   * @type {boolean}
   */
  showPlant?: boolean;

  /**
   * the title of the panel
   *
   * @type {string}
   */
  title?: string;

  /**
   * extra styles for the title
   *
   * @type {StyleProp<TextStyle>}
   */
  titleStyles?: StyleProp<TextStyle>;
}

export const TitlePanel = (props: TitlePanelProps) => {
  const Icon = props.icon;

  return (
    <View
      style={[styles.bgIconContainer, !!props.extraStyles && props.extraStyles]}
    >
      <Icon style={styles.bgIcon} />
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 300, duration: 1000, type: "timing" }}
      >
        <View style={styles.titleWithIcon}>
          {props.showPlant && (
            <Plant
              habit={INITIAL_ADD_HABIT_STATE}
              isActiveSession={true}
              forceGlow={true}
              forceStage={PlantStage.STAGE_8}
              extraStyles={styles.plant}
            />
          )}
          {!!props.title && (
            <Text style={[styles.title, props.titleStyles]}>{props.title}</Text>
          )}
        </View>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
  },
  plant: {
    position: "absolute",
    left: "-80%",
    bottom: "30%",
    zIndex: 1,
  },
  title: {
    fontFamily: "JosefinSans-Medium",
    fontSize: 32,
    letterSpacing: 3,
    color: "#fff",
    lineHeight: 72,
    textTransform: "uppercase",
    marginBottom: 16,
  },
});
