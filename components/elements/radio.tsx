/**
 * @author Muhammad Omran
 * @date 11-05-2021
 * @description implement a reusable animated Radion Button
 */

import { MotiView } from "moti";
import React, { Children } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

/**
 * define the props of the component
 *
 * @interface
 */
interface RadioProps {
  /**
   * children to be rendered to the component
   *
   * @type {React.ReactNode}
   */
  children?: React.ReactNode;

  /**
   * radio button index in a radio group
   *
   * @type {number}
   */
  index: number;

  /**
   * the label of the Radio button, could be a simple text or a JSX
   *
   * @type {string | JSX.Element}
   */
  label: string | JSX.Element;

  /**
   * the callback that will fire when the radio button is clicked
   *
   * @type {(index: number) => void}
   */
  onChange: (index: number) => void;

  /**
   * flag if the radio is selected
   */
  selected: boolean;
}

export const Radio = ({
  children,
  index,
  label,
  onChange,
  selected,
}: RadioProps) => {
  return (
    <MotiView
      from={{ backgroundColor: "rgba(151, 151, 151, 0)" }}
      animate={
        selected
          ? {
              backgroundColor: "rgba(151, 151, 151, 0.3)",
            }
          : {}
      }
      style={RadioStyles.freqFormLabelContainer}
    >
      <Pressable
        style={{ display: "flex", flexDirection: "row" }}
        onPress={() => onChange(index)}
      >
        <View
          style={[
            RadioStyles.freqFormLabelRadio,
            selected && RadioStyles.freqFormLabelRadioChecked,
          ]}
        >
          {selected && (
            <MotiView
              from={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={RadioStyles.freqFormLabelRadioDot}
            ></MotiView>
          )}
        </View>
        <Text style={RadioStyles.freqFormLabelText}>{label}</Text>
      </Pressable>
      {selected && children}
    </MotiView>
  );
};

const RadioStyles = StyleSheet.create({
  freqFormLabelContainer: {
    display: "flex",
    paddingHorizontal: 11,
    paddingVertical: 18,
    borderRadius: 16,
  },
  freqFormLabelRadio: {
    marginLeft: 2,
    width: 16,
    height: 16,
    backgroundColor: "rgba(123, 120, 139, 0.5)",
    marginRight: 12,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
    marginTop: 3,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    position: "relative",
  },
  freqFormLabelRadioChecked: {
    borderColor: "#7B788B",
  },
  freqFormLabelRadioDot: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  freqFormLabelText: {
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    lineHeight: 23,
    color: "#fff",
  },
});
