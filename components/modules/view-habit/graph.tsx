/**
 * @author Muhammad Omran
 * @date 12-06-2021
 * @description Implement the Graph Component
 */

import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Svg, { Line, TextProps } from "react-native-svg";
import { CommonStyles } from "../../../styles/common";
import { useState } from "react";
import { MotiView } from "moti";
import { getEnumKeyByEnumValue } from "../../../utils/enum-type-utils";

const { width: screenWidth } = Dimensions.get("screen");

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface GraphProps {
  /**
   * x axis labels
   *
   * @type {string[]}
   */
  labels: string[];

  /**
   * data points
   *
   * @type {number[]}
   */
  data: number[];
}

/**
 * enum that defines the available graph timespans
 *
 * @enum
 */
enum Timespans {
  FIVE_DAYS = "5D",
  TWO_WEEKS = "2W",
  ONE_MONTH = "1M",
  THREE_MONTHS = "3M",
}

export const Graph = ({ labels, data }: GraphProps) => {
  const [timespan, setTimespan] = useState<Timespans>(Timespans.FIVE_DAYS);

  let yLabelMaxValue: number = Math.ceil(Math.max(...data) / 29.99999) * 30;
  yLabelMaxValue = yLabelMaxValue > 0 ? yLabelMaxValue : 30;

  const graphHeight: number = 197;
  const margin: number = 56;

  return !data.length ? (
    <View
      style={[
        CommonStyles.rowContainer,
        CommonStyles.centerContent,
        {
          marginHorizontal: margin,
          width: screenWidth - 2 * margin,
          height: graphHeight,
        },
      ]}
    >
      <Text style={CommonStyles.infoTxt}>No progress tracked</Text>
    </View>
  ) : (
    <View>
      <View
        style={[
          CommonStyles.rowContainer,
          {
            alignItems: "center",
            marginHorizontal: margin,
            marginBottom: margin / 2,
          },
        ]}
      >
        {Object.values(Timespans).map((t: string, i: number) => (
          <MotiView
            key={i}
            from={{ backgroundColor: "rgba(12, 8, 52, 0)" }}
            animate={{
              backgroundColor:
                (t as Timespans) === timespan
                  ? "rgba(12, 8, 52, 0.8)"
                  : "rgba(12, 8, 52, 0)",
            }}
            style={[
              styles.timespanItem,
              i === Object.keys(Timespans).length - 1 && { marginRight: 0 },
            ]}
          >
            <Pressable onPress={() => setTimespan(t as Timespans)}>
              <Text
                style={[
                  styles.timspanItemText,
                  (t as Timespans) === timespan && styles.timspanItemTextActive,
                ]}
              >
                {t}
              </Text>
            </Pressable>
          </MotiView>
        ))}
      </View>
      <View
        style={[
          CommonStyles.rowContainer,
          {
            paddingHorizontal: margin,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <LineChart
            data={{
              labels,
              datasets: [
                {
                  data: [yLabelMaxValue], // <=== adding a max value
                  color: () => `rgba(0, 0, 0, 0)`, // <=== hide the point
                },
                {
                  data: data,
                },
              ],
            }}
            width={screenWidth - margin}
            withInnerLines={false}
            withOuterLines={false}
            withShadow={false}
            height={graphHeight}
            fromZero={true}
            transparent={true}
            getDotColor={(d) =>
              d !== 0 && d === Math.max(...data)
                ? "#fff"
                : "rgba(255,255,255,0)"
            }
            renderDotContent={({ x, indexData, index }) =>
              indexData !== 0 &&
              indexData === Math.max(...data) && (
                <View
                  key={x}
                  style={[
                    styles.heighPeakHeighlighter,
                    {
                      left: x - 17,
                      height: graphHeight - 32,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={[
                      "rgba(233, 233, 255, 0)",
                      "rgba(233, 233, 255, 0.4)",
                    ]}
                    style={{ width: "100%", height: "100%" }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: graphHeight - 13,
                      width: "200%",
                    }}
                  >
                    <Text
                      style={[styles.xAxisLabel, styles.xAxisLabelHeighest]}
                    >
                      {labels[index]}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      top: (graphHeight - 34) / 2,
                      left: -((graphHeight - 32) / 2) + 18,
                      zIndex: 1,
                      transform: [{ rotate: "-90deg" }],
                    }}
                  >
                    <Svg width={graphHeight - 32} height={2}>
                      <Line
                        x1={0}
                        y1={0}
                        x2={graphHeight - 32}
                        y2={0}
                        strokeWidth={2}
                        stroke="#fff"
                        strokeDasharray="8, 11"
                      />
                    </Svg>
                  </View>
                </View>
              )
            }
            formatYLabel={(v) =>
              Number(v) >= 60
                ? Number(v) % 60 === 0
                  ? `${Math.floor(Number(v) / 60)}h`
                  : `${Math.floor(Number(v) / 60)}h ${Number(v) % 60}m`
                : `${Number(v) % 60}m`
            }
            chartConfig={{
              backgroundGradientFrom: "#1E2923",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#08130D",
              backgroundGradientToOpacity: 0,
              color: () => `rgba(255, 255, 255, 1)`,
              decimalPlaces: 0,
              strokeWidth: 4,
              propsForDots: {
                r: 10,
              },
              propsForLabels: {
                fontFamily: "Rubik-Regular",
                fontSize: 14,
              },
              propsForHorizontalLabels: {
                textAnchor: "start",
                x: 0,
                opacity: 0.4,
              },
              propsForVerticalLabels: {
                opacity: 0.4,
                y: graphHeight,
              },
              style: {
                backgroundColor: "rgba(0,0,0,0)",
              },
            }}
            bezier={true}
            style={{
              borderRadius: 16,
              padding: 0,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timespanItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingHorizontal: 11,
    marginRight: 20,
    paddingVertical: 5,
  },
  timspanItemText: {
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    lineHeight: 20,
    color: "#fff",
    opacity: 0.5,
    textTransform: "uppercase",
  },
  timspanItemTextActive: {
    opacity: 1,
  },
  heighPeakHeighlighter: {
    position: "relative",
    top: 0,
    width: 34,
    display: "flex",
    alignItems: "center",
  },
  xAxisLabel: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#fff",
    opacity: 0.4,
  },
  xAxisLabelHeighest: {
    opacity: 1,
    fontFamily: "Rubik-SemiBold",
    letterSpacing: -0.5,
    textAlign: "center",
  },
});
