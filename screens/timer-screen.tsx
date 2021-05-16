/**
 * @author Muhammad Omran
 * @date 15-05-2021
 * @description implement the timer Screen
 */

import React from "react";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import { MotiView, Image as MotiImage } from "moti";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import BookIcon from "../components/svgs/book";
import { CommonStyles } from "../styles/common";
import { CircleProgress } from "../components/elements/circle-progress";
import { Button } from "../components/elements/button";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

let plantFill: "small" | "dark" | "normal" | "glow" = "dark";

export const TimerScreen = () => {
  return (
    <View style={TimeScreenStyles.container}>
      <LinearGradient
        colors={["rgb(13, 9, 39)", "rgb(33, 29, 66)"]}
        style={TimeScreenStyles.backgroundOverlay}
      />
      <Image
        source={require("../assets/illustration.png")}
        style={TimeScreenStyles.illustrationBackground}
      />
      <View style={TimeScreenStyles.header}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
        <Text style={TimeScreenStyles.identity}>I am a</Text>
        <BookIcon width={16} height={21} style={CommonStyles.withIcon} />
        <Text style={TimeScreenStyles.habit}>Reader</Text>
        <Text style={TimeScreenStyles.streak}>3</Text>
      </View>
      <View style={TimeScreenStyles.peers}>
        <Text style={TimeScreenStyles.peersNum}>2K</Text>
        <Text style={TimeScreenStyles.peersText}>are reading now</Text>
      </View>
      <View style={TimeScreenStyles.timerContainer}>
        <View style={TimeScreenStyles.progressContainer}>
          <CircleProgress progress={0.6} />
          <View style={TimeScreenStyles.plantContainer}>
            <Image
              source={require("../assets/pot.png")}
              style={TimeScreenStyles.pot}
            />
            <MotiView
              from={{ height: 0, translateX: /*small*/ false ? 9 : 6 }}
              animate={{
                height: /*small*/ false ? 48.35 : 255.4,
                translateX: /*small*/ false ? 9 : 6,
              }}
              transition={{ type: "timing" }}
              style={[
                TimeScreenStyles.thePlant,
                {
                  bottom: /*small*/ false ? 75 : 24,
                },
              ]}
            >
              <Image
                source={require(`../assets/plant/plant_${plantFill}.png`)}
                style={TimeScreenStyles.plantImage}
              />
            </MotiView>
          </View>
          <View style={TimeScreenStyles.timer}>
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: true ? 0.2 : 0 }}
              style={TimeScreenStyles.timerEta}
            >
              <Text style={TimeScreenStyles.timerEtaText}>Eta </Text>
              <Text style={TimeScreenStyles.timerEtaText}>11:32 pm</Text>
            </MotiView>
            <Text style={TimeScreenStyles.timerText}>00:00</Text>
          </View>
        </View>
        <View style={TimeScreenStyles.timerControls}>
          <Button
            text="cancel"
            shape="circle"
            noBorder={true}
            hasBackground={true}
            onPress={() => {}}
          />
          <Button
            text="Start"
            shape="circle"
            hasBackground={true}
            hasCircleBorder={true}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

const TimeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 65,
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    opacity: 0.6,
  },
  illustrationBackground: {
    width: "100%",
    height: "60%",
    resizeMode: "contain",
    position: "absolute",
    alignSelf: "flex-start",
    top: 0,
    opacity: 0.3,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 21,
  },
  identity: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 24,
    lineHeight: 32,
    color: "#fff",
    marginLeft: 21,
    marginRight: 13,
    opacity: 0.7,
  },
  habit: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 24,
    lineHeight: 32,
    color: "#fff",
  },
  streak: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    lineHeight: 24,
    alignSelf: "flex-start",
    marginLeft: 5,
    color: "#fff",
    opacity: 0.5,
  },
  peers: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    marginVertical: 46,
  },
  peersNum: {
    fontFamily: "Rubik-Regular",
    fontSize: 24,
    marginRight: 6,
    color: "#fff",
  },
  peersText: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#BDBDBD",
  },
  timerContainer: {
    flex: 1,
    display: "flex",
    paddingHorizontal: 27,
  },
  progressContainer: {
    alignItems: "center",
    transform: [{ scaleX: -1 }],
  },
  plantContainer: {
    transform: [{ scaleX: -1 }],
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: -46,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  pot: {
    width: "50%",
    height: 92.3,
    resizeMode: "contain",
  },
  thePlant: {
    width: "60%",
    position: "absolute",
  },
  plantImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  timer: {
    transform: [{ scaleX: -1 }],
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingBottom: 18,
  },
  timerEta: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.2,
  },
  timerEtaText: {
    fontFamily: "Rubik-Light",
    fontSize: 18,
    lineHeight: 32,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#fff",
  },
  timerText: {
    fontFamily: "Rubik-Light",
    fontSize: 69,
    textAlign: "center",
    letterSpacing: 2,
    color: "#fff",
  },
  timerControls: {
    marginTop: 36.5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
