/**
 * @author Muhammad Omran
 * @date 15-05-2021
 * @description implement the timer Screen
 */

import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BookIcon from "../components/svgs/book";
import { CommonStyles } from "../styles/common";

export const TimerScreen = () => {
  return (
    <View style={TimeScreenStyles.container}>
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
    </View>
  );
};

const TimeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(43, 38, 69, 0.6)",
    paddingVertical: 65,
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
  timerContainer: {},
});
