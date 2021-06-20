/**
 * @author Muhammad Omran
 * @date 11-05-2021
 * @description implement a global constants
 */

import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("screen");

const DASHBOARD_ROOM_ITEM_SIZE: number =
  Platform.OS === "ios" ? width * 0.72 : width * 0.74;

export const CONSTANTS = {
  PADDING: 0.17 * width,
  SCREEN_CONTAINER_TOP_PADDING:
    height < 800
      ? Platform.OS === "ios"
        ? 0.1 * height
        : 0.11 * height
      : Platform.OS === "ios"
      ? 0.17 * height
      : 0.18 * height,
  SCREEN_CONTAINER_BOTTOM_PADDING: 0.08 * height,
  ASYNC_STORAGE_HABITS: "ASYNC_STORAGE_HABITS",
  PLAY_INTRODUCTION_ASYNC_STORAGE_KEY: "PLAY_INTRODUCTION_ASYNC_STORAGE_KEY",
  DASHBOARD_ROOM_ITEM_SIZE,
  DASHBOARD_ROOM_EMPTY_ITEM_SIZE: (width - DASHBOARD_ROOM_ITEM_SIZE) / 2,
  DASHBOARD_ROOM_SPACING: 4,
};
