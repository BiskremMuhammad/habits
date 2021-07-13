/**
 * @author Muhammad Omran
 * @date 10-05-2021
 * @description define some common styles will be globaly available for the app
 */

import { Platform, StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
  textWithIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  withIcon: {
    marginTop: Platform.OS === "ios" ? 0 : 4,
    marginRight: 8,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoIcon: {
    width: 15,
    height: 15,
    alignSelf: "flex-end",
    marginLeft: 5,
    marginBottom: Platform.OS === "ios" ? 6 : 3,
    opacity: 0.5,
  },
  infoTxt: {
    fontFamily: "Rubik-Light",
    fontSize: 16,
    lineHeight: 26,
    color: "#fff",
  },
  infoTxtSmaller: {
    fontFamily: "Rubik-Light",
    fontSize: 14,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.66,
  },
  infoTxtBolder: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    lineHeight: 26,
    color: "#fff",
  },
  habitTypeIcon: {
    marginRight: 8,
    marginTop: Platform.OS === "ios" ? -8 : 0,
  },
  habitTypeText: {
    fontFamily: "JosefinSans-Regular",
    fontSize: 24,
    lineHeight: 32,
    color: "#fff",
    opacity: 0.5,
    paddingBottom: 14,
  },
  habitTypeAccentText: {
    fontFamily: "JosefinSans-Bold",
    opacity: 1,
    textTransform: "capitalize",
  },
  habitStreak: {
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    lineHeight: 24,
    alignSelf: "flex-start",
    marginLeft: 5,
    color: "#fff",
    opacity: 0.5,
    marginTop: Platform.OS === "ios" ? -4 : 0,
  },
});
