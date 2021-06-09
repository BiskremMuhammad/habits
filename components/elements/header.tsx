import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NotificationIcon } from "../svgs/notification-icon";

export const Header = () => {
  return (
    <View style={styles.header}>
      <MaterialIcons name="arrow-back" size={24} color="white" />
      <View style={styles.notificationContainer}>
        <NotificationIcon />
        <View style={styles.notificationBadge}>
          <Text style={styles.NotificationBadgeText}>3</Text>
        </View>
      </View>
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
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -2,
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
