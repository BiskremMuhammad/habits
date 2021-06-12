import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Svg, { Line } from "react-native-svg";

const { width: screenWidth } = Dimensions.get("screen");

export const Graph = () => {
  const labels: string[] = ["5/14", "5/15", "5/16", "5/17", "5/18"];
  const data: number[] = [30, 50, 80, 40, 70];
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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Bezier Line Chart</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: margin,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            height: 1.3 * graphHeight,
            left: margin,
          }}
        >
          {yAxisLabels.map((v, i) => (
            <Text
              key={i}
              style={{
                flex: 1,
                textAlignVertical: "bottom",
                fontSize: 14,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {Number(v) >= 60
                ? Number(v) % 60 === 0
                  ? `${Math.floor(Number(v) / 60)}h`
                  : `${Math.floor(Number(v) / 60)}h ${Number(v) % 60}m`
                : `${Number(v) % 60}m`}
            </Text>
          ))}
        </View>
        <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
                style={{
                  position: "relative",
                  top: 0,
                  left: x - 17,
                  width: 34,
                  height: graphHeight,
                  display: "flex",
                  alignItems: "center",
                }}
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
                borderColor: "green",
                borderWidth: 1,
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
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              marginLeft: 0.7 * margin,
              marginRight: -0.25 * margin,
              bottom: 0,
            }}
          >
            {labels.map((l, i) => (
              <Text
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#fff",
                }}
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
