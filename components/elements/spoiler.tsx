/**
 * @author Muhammad Omran
 * @date 19-05-2021
 * @description implement a reusable spoiler widget
 */

import { MotiView } from "moti";
import React, { useState } from "react";
import { StyleSheet, I18nManager, View, Text, Pressable } from "react-native";
import { CommonStyles } from "../../styles/common";
import CaretDown from "../svgs/caret-down";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface SpoilerProps {
  /**
   * an icon to display with the title
   *
   * @type {JSX.Element}
   */
  icon?: JSX.Element;

  /**
   * flag if the the spoiler is opened at start
   *
   * @type {boolean}
   */
  opened?: boolean;

  /**
   * the spoiler text
   *
   * @type {string}
   */
  spoiler: string;

  /**
   * the title
   *
   * @type {string}
   */
  title: string;
}

export const Spoiler = (props: SpoilerProps) => {
  const [opened, setOpened] = useState<boolean>(props.opened || false);

  return (
    <View style={SpoilerStyles.container}>
      <Pressable
        style={SpoilerStyles.titleContainer}
        onPress={() => setOpened(!opened)}
      >
        {!!props.icon && (
          <View style={[CommonStyles.withIcon, SpoilerStyles.titleIcon]}>
            {props.icon}
          </View>
        )}
        <Text style={SpoilerStyles.title}>{props.title}</Text>
        <View style={SpoilerStyles.caretDown}>
          <MotiView
            animate={{ rotate: opened ? "0deg" : "-90deg" }}
            transition={{ type: "timing" }}
          >
            <CaretDown />
          </MotiView>
        </View>
      </Pressable>
      {opened && (
        <View style={SpoilerStyles.spoilerTextContainer}>
          <Text style={[CommonStyles.infoTxtSmaller, { opacity: 0.66 }]}>
            {props.spoiler}
          </Text>
        </View>
      )}
    </View>
  );
};

const SpoilerStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(12, 8, 52, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 12,
  },
  titleContainer: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
  },
  titleIcon: {
    width: 15,
    height: 15,
    opacity: 0.5,
    marginTop: 0,
  },
  title: {
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.66,
    flex: 1,
  },
  caretDown: {
    width: 10,
    height: 5,
    marginTop: -6,
    marginRight: 4,
    transform: [
      {
        translateY: 3,
      },
    ],
  },
  spoilerTextContainer: {
    paddingLeft: 23,
    paddingRight: 6,
    marginTop: 12,
  },
});
