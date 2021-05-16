/**
 * @author Muhammad Omran
 * @date 11-05-2021
 * @description implement a global constants
 */

import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export const CONSTANTS = {
  PADDING: 0.17 * width,
  ASYNC_STORAGE_HABITS: "ASYNC_STORAGE_HABITS",
};
