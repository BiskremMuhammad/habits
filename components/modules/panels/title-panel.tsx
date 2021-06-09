import { MotiView } from "moti";
import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { CONSTANTS } from "../../../utils/constants";
import { Plant, PlantState } from "../../elements/plant";
import { AddIconSvg } from "../../svgs/add-icon";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface TitlePanelProps {
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
}

export const TitlePanel = (props: TitlePanelProps) => {
  const Icon = props.icon;

  return (
    <View style={styles.bgIconContainer}>
      <Icon style={styles.bgIcon} />
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 300, duration: 1000, type: "timing" }}
      >
        <View style={styles.titleWithIcon}>
          {props.showPlant && (
            <Plant state={PlantState.GLOW} extraStyles={styles.plant} />
          )}
          {!!props.title && <Text style={styles.title}>{props.title}</Text>}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  plant: {
    width: "200%",
    transform: [{ scale: 0.5 }],
    left: -2.7 * CONSTANTS.PADDING,
    bottom: -15,
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
    marginLeft: 19,
  },
});
