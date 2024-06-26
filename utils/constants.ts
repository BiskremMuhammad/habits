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
  HEADER_TOP_MARGIN: Platform.OS === "ios" ? 72 : 56,
  HEADER_HORIZONTAL_MARGIN: 21,
  SCREEN_CONTAINER_TOP_PADDING:
    height < 800
      ? Platform.OS === "ios"
        ? 0.11 * height
        : 0.12 * height
      : height < 846
      ? Platform.OS === "ios"
        ? 0.14 * height
        : 0.15 * height
      : Platform.OS === "ios"
      ? 0.18 * height
      : 0.21 * height,
  SCREEN_CONTAINER_BOTTOM_PADDING: 0.08 * height,
  ASYNC_STORAGE_HABITS: "ASYNC_STORAGE_HABITS",
  PLAY_INTRODUCTION_ASYNC_STORAGE_KEY: "PLAY_INTRODUCTION_ASYNC_STORAGE_KEY",
  DASHBOARD_ROOM_ITEM_SIZE,
  DASHBOARD_ROOM_EMPTY_ITEM_SIZE: (width - DASHBOARD_ROOM_ITEM_SIZE) / 2,
  DASHBOARD_ROOM_SPACING: 4,
  BACKGROUND_TIMER_KEY: "HABIT_BACKGROUND_TIMER_KEY",
  UUID_NAMESPACE: "29cc8a0d-747c-5f85-9ff9-f2f16636d963",
  FIREBASE_HABITS_COLLECTION: "user_data",
  NOTIFICATION_MODAL_DISMISSED_STORAGE_KEY:
    "NOTIFICATION_MODAL_DISMISSED_STORAGE_KEY",
  EXPO_PUSH_TOKEN: "EXPO_PUSH_TOKEN",
};
