/**
 * @author Muhammad Omran
 * @date 28-06-2021
 * @description Implement the Drawer Comonent
 */

import { MotiView } from "@motify/components";
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import React from "react";
import {
  StyleSheet,
  I18nManager,
  Dimensions,
  ImageBackground,
  View,
  Pressable,
} from "react-native";
import { Routes } from "../../types/route-names";
import { CONSTANTS } from "../../utils/constants";
import { AnnouncementIcon } from "../svgs/announcement-icon";
import { DashboardIcon } from "../svgs/dashboard-graphic";
import { TimesIcon } from "../svgs/times-icon";
import { DrawerItem } from "./drawer-item";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const width: number = 0.81 * screenWidth;
const height: number = screenHeight - 3 * CONSTANTS.HEADER_TOP_MARGIN;

export const Drawer = ({
  navigation,
}: DrawerContentComponentProps<DrawerContentOptions>) => (
  <MotiView
    from={{ left: -width }}
    animate={{ left: 0 }}
    transition={{ type: "timing" }}
    exit={{ left: -width }}
    style={styles.drawer}
  >
    <ImageBackground
      source={require("../../assets/bg.png")}
      style={styles.background}
      blurRadius={10}
    />
    <View style={styles.backdrop} />
    <Pressable onPress={() => navigation.toggleDrawer()} style={styles.dismiss}>
      <TimesIcon />
    </Pressable>
    <DrawerItem
      route={Routes.HOME}
      text="My Habits"
      icon={<DashboardIcon width={48} height={48} />}
    />
    <DrawerItem
      route={Routes.ANNOUNCEMENTS}
      text="Announcments"
      icon={<AnnouncementIcon width={48} height={56.73} />}
    />
  </MotiView>
);

const styles = StyleSheet.create({
  drawer: {
    width,
    height,
    marginTop: CONSTANTS.HEADER_TOP_MARGIN,
    marginBottom: 2 * CONSTANTS.HEADER_TOP_MARGIN,
    position: "absolute",
    top: 0,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 0.5 * screenWidth,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },
  background: {
    width,
    height,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.8,
  },
  backdrop: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(22, 17, 54, 0.72)",
  },
  dismiss: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});
