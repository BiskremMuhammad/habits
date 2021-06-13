/**
 * @author Muhammad Omran
 * @date 12-06-2021
 * @description Implement the Graph Component
 */

import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Svg, { Line } from "react-native-svg";
import { CommonStyles } from "../../../styles/common";

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

export const Graph = ({ labels, data }: GraphProps) => {
  const yLabelMinValue: number = Math.floor(Math.min(...data) / 30.00001) * 30;
  const yLabelMaxValue: number = Math.ceil(Math.max(...data) / 30) * 30;
  const yLabelsData: number[] = [];
  for (let i = yLabelMinValue + 30; i < yLabelMaxValue; i += 30) {
    yLabelsData.push(i);
  }
  const yAxisLabels: number[] = [
    yLabelMinValue,
    ...yLabelsData,
    yLabelMaxValue,
  ].reverse();
  const graphHeight: number = 158;
  const margin: number = 56;
  return (
    <View style={styles.container}>
      <View
        style={[
          CommonStyles.rowContainer,
          {
            paddingHorizontal: margin,
          },
        ]}
      >
        <View
          style={[
            styles.yAxisContainer,
            {
              height: 1.3 * graphHeight,
              left: margin,
            },
          ]}
        >
          {yAxisLabels.map((v, i) => (
            <Text key={i} style={styles.yAxisLabel}>
              {Number(v) >= 60
                ? Number(v) % 60 === 0
                  ? `${Math.floor(Number(v) / 60)}h`
                  : `${Math.floor(Number(v) / 60)}h ${Number(v) % 60}m`
                : `${Number(v) % 60}m`}
            </Text>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          <LineChart
            data={{
              labels,
              datasets: [
                {
                  data: data,
                },
              ],
            }}
            width={screenWidth - 1.25 * margin} // from react-native
            withInnerLines={false}
            withOuterLines={false}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            withShadow={false}
            height={graphHeight}
            fromZero={true}
            segments={yLabelsData.length}
            yAxisInterval={30}
            transparent={true}
            renderDotContent={({ x }) => (
              <View
                key={x}
                style={[
                  styles.heighPeakHeighlighter,
                  {
                    left: x - 17,
                    height: graphHeight,
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
                <Svg width={x} height={graphHeight}>
                  <Line
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={graphHeight}
                    stroke="#fff"
                    strokeDasharray={8}
                  />
                </Svg>
              </View>
            )}
            // formatYLabel={(v) => ""}
            // formatXLabel={(v) => ""}
            hidePointsAtIndex={data.map((d, i) =>
              d === Math.max(...data) ? -1 : i
            )}
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
              style: {
                borderRadius: 16,
                backgroundColor: "rgba(0,0,0,0)",
              },
            }}
            bezier
            style={{
              borderRadius: 16,
              paddingTop: (0.95 / yAxisLabels.length) * graphHeight,
              paddingBottom: 20,
              marginLeft: 0.15 * margin,
            }}
          />
          <View
            style={[
              styles.xAxisContainer,
              {
                marginLeft: 0.7 * margin,
                marginRight: -0.25 * margin,
              },
            ]}
          >
            {labels.map((l, i) => (
              <Text
                style={[
                  styles.xAxisLabel,
                  i === data.findIndex((d) => d >= Math.max(...data)) &&
                    styles.xAxisLabelHeighest,
                ]}
                key={i}
              >
                {l}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  yAxisContainer: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
  },
  yAxisLabel: {
    flex: 1,
    fontFamily: "Rubik-Regular",
    textAlignVertical: "bottom",
    fontSize: 14,
    lineHeight: 18,
    color: "#fff",
    opacity: 0.4,
  },
  heighPeakHeighlighter: {
    position: "relative",
    top: 0,
    width: 34,
    display: "flex",
    alignItems: "center",
  },
  xAxisContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  xAxisLabel: {
    flex: 1,
    fontFamily: "Rubik-Regular",
    textAlign: "right",
    fontSize: 14,
    lineHeight: 20,
    color: "#fff",
    opacity: 0.4,
  },
  xAxisLabelHeighest: {
    opacity: 1,
  },
});
