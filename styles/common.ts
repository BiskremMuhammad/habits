/**
 * @author Muhammad Omran
 * @date 10-05-2021
 * @description define some common styles will be globaly available for the app
 */

import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
  textWithIcon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  withIcon: {
    marginTop: 4,
    marginRight: 8,
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
});
