import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { MaterialIcons } from "@expo/vector-icons";
import { NotificationIcon } from "../svgs/notification-icon";
import { Routes } from "../../types/route-names";
import { AnnouncementIcon } from "../svgs/announcement-icon";

interface HeaderProps {
  leftAction: "back" | "announcement";
}

export const Header = ({ leftAction }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {leftAction === "back" ? (
        <Pressable onPress={() => navigation.navigate(Routes.HOME)}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </Pressable>
      ) : (
        <Pressable>
          <AnnouncementIcon />
        </Pressable>
      )}
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
