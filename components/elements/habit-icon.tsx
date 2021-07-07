/**
 * @author Muhammad Omran
 * @date 18-06-2022
 * @description implement the reusable component for displaying the habit icon
 */

import React from "react";
import { SvgProps } from "react-native-svg";
import { HabitTypes } from "../../types/habit";
import BookIcon from "../svgs/book";
import { CandleIcon } from "../svgs/candel-icon";
import { FastIcon } from "../svgs/fast-icon";
import { PencilIcon } from "../svgs/pencil";

/**
 * interface that definse the props of the component
 *
 * @interface
 */
interface HabitIconProps extends SvgProps {
  /**
   * the type of the habit
   *
   * @type {HabitTypes}
   */
  type?: HabitTypes;
}

export const HabitIcon = (props: HabitIconProps) => {
  let Icon: JSX.Element = <BookIcon {...props} />;
  switch (props.type) {
    case HabitTypes.READING:
      Icon = <BookIcon {...props} />;
      break;
    case HabitTypes.JOURNALING:
      Icon = <PencilIcon {...props} />;
      break;
    case HabitTypes.MEDITATING:
      Icon = <CandleIcon {...props} />;
      break;
    case HabitTypes.FASTING:
      Icon = <FastIcon {...props} />;
      break;
    default:
      Icon = <BookIcon {...props} />;
  }

  return Icon;
};
