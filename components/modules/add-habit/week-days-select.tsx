/**
 * @author Muhammad Omran
 * @date 11-05-2021
 * @description implement the Week Days Select Panel
 */

import React from "react";
import { View, Text } from "react-native";

/**
 * define the component props
 *
 * @interface
 */
interface WeekDaysSelectProps {
  /**
   * flag if the component is clickable
   *
   * @type {boolean}
   */
  clickable?: boolean;

  /**
   * flag to set the behaviour of the component on press function
   * which will disable the item that is being clicked
   * this is only for the case to select the rest day
   *
   * @type {boolean}
   */
  clickToDisable?: boolean;

  /**
   * to limit the selection of days to only one day
   * this is only for the case to select the rest day
   *
   * @type {boolean}
   */
  limitOneSelection?: boolean;
}

export const WeekDaysSelect = (porps: WeekDaysSelectProps) => {
  return <Text>Select you week days</Text>;
};
