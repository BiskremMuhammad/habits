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
  input: {
    paddingVertical: 10,
    borderRadius: 56,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputChevron: {
    width: 10,
    height: 5,
    alignSelf: "flex-end",
  },
  inputCircleBorderStart: {
    position: "absolute",
    bottom: -7,
    left: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#88849D",
    backgroundColor: "#231E3C",
    opacity: 0.3,
  },
  inputBorderBottom: {
    marginTop: "60%",
    marginLeft: 16,
    position: "absolute",
    width: "100%",
    height: "100%",
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "#6F698F",
    opacity: 0.47,
    borderRadius: 56,
  },
});
