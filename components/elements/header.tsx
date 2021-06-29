/**
 * @author Muhammad Omran
 * @date 16-06-2021
 * @description implement the reusable header component
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { MaterialIcons } from "@expo/vector-icons";
import { NotificationIcon } from "../svgs/notification-icon";
import { Routes } from "../../types/route-names";
import { DrawerIcon } from "../svgs/drawer-icon";
import { DrawerActions, StackActions } from "@react-navigation/native";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface HeaderProps {
  /**
   * extra styles to pass to the component
   *
   * @type {StyleProp<ViewStyle>}
   */
  extraStyles?: StyleProp<ViewStyle>;

  /**
   * flag to hide the nofication ability
   *
   * @type {boolean}
   */
  hideNotification?: boolean;

  /**
   * the action of the left button
   *
   * @type {"back" | "announcement"}
   */
  leftAction: "back" | "announcement";

  /**
   * flag for the back button to normally go back instead of the custom navigation
   *
   * @type {boolean}
   */
  normalGoBack?: boolean;
}

export const Header = ({
  extraStyles,
  hideNotification,
  leftAction,
  normalGoBack,
}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, extraStyles]}>
      {leftAction === "back" ? (
        <Pressable
          onPress={() =>
            normalGoBack
              ? navigation.goBack()
              : navigation.dispatch(StackActions.push(Routes.HOME_ROUTE))
          }
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <DrawerIcon />
        </Pressable>
      )}
      {!hideNotification && (
        <View style={styles.notificationContainer}>
          <NotificationIcon />
          <View style={styles.notificationBadge}>
            <Text style={styles.NotificationBadgeText}>3</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 21,
    marginBottom: 26,
  },
  notificationContainer: {
    position: "relative",
    opacity: 0.66,
    padding: 4,
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 2,
    width: 14,
    height: 14,
    backgroundColor: "#FAFAFB",
    borderWidth: 2,
    borderColor: "#0E0928",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  NotificationBadgeText: {
    fontFamily: "Rubik-Bold",
    fontSize: 10,
    lineHeight: 11,
    color: "#2B2645",
  },
});
