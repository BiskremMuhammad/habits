/**
 * @author Muhammad Omran
 * @date 28-06-2021
 * @description Implement the Drawer item
 */

import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { CommonStyles } from "../../styles/common";
import { Routes } from "../../types/route-names";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface DrawerItemProps {
  /**
   * the icon to display with the text
   *
   * @type {JSX.Element}
   */
  icon: JSX.Element;

  /**
   * if the current drawer iten is the active one
   *
   * @type {boolean}
   */
  isActive?: boolean;

  /**
   * the route of the drawer item to avigate to
   *
   * @type {Routes}
   */
  route: Routes;

  /**
   * the text of the item
   *
   * @type {string}
   */
  text: string;
}

export const DrawerItem = (props: DrawerItemProps) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(props.route)}
      style={[
        CommonStyles.textWithIcon,
        styles.item,
        props.isActive && styles.activeItem,
      ]}
    >
      {props.icon}
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 19,
    opacity: 0.66,
  },
  activeItem: {
    opacity: 1,
  },
  text: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 18,
    lineHeight: 48,
    letterSpacing: 2,
    marginLeft: 23,
    color: "#fff",
  },
});
