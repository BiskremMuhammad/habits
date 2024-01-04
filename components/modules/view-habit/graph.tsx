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
  I18nManager,
  Pressable,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Svg, { Line } from "react-native-svg";
import { CommonStyles } from "../../../styles/common";
import { useState } from "react";
import { MotiView } from "moti";
import { HabitProgressData } from "../../../types/habit";
import { useMemo } from "react";

const { width: screenWidth } = Dimensions.get("screen");

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface GraphProps {
  /**
   * data points
   *
   * @type {HabitProgressData[]}
   */
  data: HabitProgressData[];
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

export const Graph = ({ data }: GraphProps) => {
  const [timespan, setTimespan] = useState<Timespans>(Timespans.FIVE_DAYS);
  const [dot, setDot] = useState<number>();

  const today: Date = new Date(new Date().setHours(0, 0, 0, 0));
  const recentDays = useMemo((): { day: string; duration: number }[] => {
    if (!data.length) return [];

    let timespanDays: number[] = [];
    switch (timespan) {
      case Timespans.FIVE_DAYS:
        timespanDays = Array(5).fill(0);
        break;
      case Timespans.TWO_WEEKS:
        timespanDays = Array(14).fill(0);
        break;
      case Timespans.ONE_MONTH:
        timespanDays = Array(
          new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
        ).fill(0);
        break;
      case Timespans.THREE_MONTHS:
        timespanDays = Array(
          Array(3)
            .fill(0)
            .map((_, i) =>
              new Date(
                today.getFullYear(),
                today.getMonth() + 1 - i,
                0
              ).getDate()
            )
            .reduce((a, b) => a + b)
        ).fill(0);
        break;
      default:
        timespanDays = Array(5).fill(0);
    }

    return timespanDays
      .map((_, i: number) => {
        const day: Date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        let dayProgress: number = 0;
        if (data.find((d, _) => d.date.getTime() === day.getTime())) {
          dayProgress = data.find(
            (d, _) => d.date.getTime() === day.getTime()
          )!.duration;
        }
        return {
          day: `${day.getMonth() + 1}/${day.getDate()}`,
          duration: dayProgress,
        };
      })
      .reverse();
  }, [data, timespan]);

  /**
   * populate the labels of xAxis
   *
   * @type {string[]}
   */
  const xAxisLabels: string[] = recentDays
    .reduce<string[]>((a, v) => a.concat(v.day), [])
    .map((d: string, i: number) =>
      i === 0 ||
      i === recentDays.length - 1 ||
      timespan === Timespans.FIVE_DAYS ||
      (timespan === Timespans.TWO_WEEKS && i === 6) ||
      ((timespan === Timespans.ONE_MONTH ||
        timespan === Timespans.THREE_MONTHS) &&
        (i === Math.floor(recentDays.length * 0.3333) ||
          i === Math.floor(recentDays.length * 0.666667)))
        ? `${d}${
            timespan === Timespans.ONE_MONTH && i === recentDays.length - 1
              ? "     "
              : ""
          }${
            timespan === Timespans.THREE_MONTHS && i === recentDays.length - 1
              ? "        "
              : ""
          }`
        : ""
    );

  /**
   * populate the graph points dataset
   *
   * @type {number[]}
   */
  let graphData: number[] = recentDays.reduce<number[]>(
    (a, v) => a.concat(v.duration),
    []
  );

  let yLabelMaxValue: number =
    Math.ceil(Math.max(...graphData) / (29.99999 * 60)) * 30 * 60;
  yLabelMaxValue = yLabelMaxValue > 0 ? yLabelMaxValue : 30 * 60;

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
            <Pressable
              onPress={() => {
                setDot(undefined);
                setTimespan(t as Timespans);
              }}
            >
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
              labels: xAxisLabels,
              datasets: [
                {
                  data: [yLabelMaxValue], // <=== adding a max value
                  color: () => `rgba(0, 0, 0, 0)`, // <=== hide the point
                },
                {
                  data: graphData,
                },
              ],
            }}
            width={
              screenWidth -
              margin -
              (timespan === Timespans.TWO_WEEKS
                ? 0.7 * margin
                : timespan === Timespans.ONE_MONTH
                ? 1.1 * margin
                : timespan === Timespans.THREE_MONTHS
                ? 1.25 * margin
                : 0)
            }
            withInnerLines={false}
            withOuterLines={false}
            withShadow={false}
            height={graphHeight}
            fromZero={true}
            transparent={true}
            getDotColor={(d, i) =>
              d !== yLabelMaxValue && i === dot ? "#fff" : "rgba(255,255,255,0)"
            }
            onDataPointClick={({ index }) => setDot(index)}
            renderDotContent={({ x, y, indexData, index }) =>
              indexData !== yLabelMaxValue &&
              index === dot && (
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
                    style={[
                      styles.dotTextContainer,
                      {
                        top: y - 72,
                      },
                    ]}
                  >
                    <Text style={styles.dotTextDate}>
                      {recentDays[index].day}
                    </Text>
                    <Text style={styles.dotTextDuration}>
                      {Number(graphData[index]) < 60
                        ? `${Math.floor(Number(graphData[index]))}s`
                        : Number(graphData[index]) >= 60 * 60
                        ? Number(graphData[index]) % (60 * 60) === 0
                          ? `${Math.floor(
                              Number(graphData[index]) / (60 * 60)
                            )}h`
                          : `${Math.floor(
                              Number(graphData[index]) / (60 * 60)
                            )}h ${Math.floor(
                              (Number(graphData[index]) / 60) % 60
                            )}m`
                        : `${Math.floor(
                            (Number(graphData[index]) / 60) % 60
                          )}m`}
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
              Number(v) >= 60 * 60
                ? Number(v) % (60 * 60) === 0
                  ? `${Math.floor(Number(v) / (60 * 60))}h`
                  : `${Math.floor(Number(v) / (60 * 60))}h ${Math.floor(
                      (Number(v) / 60) % 60
                    )}m`
                : `${Math.floor((Number(v) / 60) % 60)}m`
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
  dotTextContainer: {
    position: "absolute",
    zIndex: 2,
    width: "200%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(52, 48, 91, 0.9)",
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  dotTextDate: {
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    color: "#fff",
    lineHeight: 20,
    textAlign: "center",
  },
  dotTextDuration: {
    fontFamily: "Rubik-Light",
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
    textAlign: "center",
  },
});
