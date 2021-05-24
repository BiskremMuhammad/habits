import { MotiView } from "@motify/components";
import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { AddIconSvg } from "../components/svgs/add-icon";
import { RadialGradientShape } from "../components/svgs/radial-gradient";
import { CONSTANTS } from "../utils/constants";

const { width, height } = Dimensions.get("screen");

export const IdentityReinforcement = () => {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ type: "timing", duration: 3000 }}
        style={styles.background}
      >
        <RadialGradientShape
          width={width * 0.85}
          height={height * 0.85}
          colors={["#8a7dea", "#594AA9"]}
          translateToTransparent={true}
        />
      </MotiView>
      <View style={styles.bgIconContainer}>
        <AddIconSvg style={styles.bgIcon} />
      </View>
      <View style={styles.identityContainer}>
        <Text style={styles.title}>I am a</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    paddingHorizontal: CONSTANTS.PADDING,
    paddingTop: CONSTANTS.PADDING,
    paddingBottom: 2 * CONSTANTS.PADDING,
  },
  background: {
    width,
    height,
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bgIconContainer: {
    width,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    paddingTop: 0.5 * height,
  },
  bgIcon: {
    width: "100%",
    height: "14.44%",
    opacity: 0.4,
    position: "absolute",
  },
  identityContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 36,
    lineHeight: 48,
    opacity: 0.7,
    color: "#fff",
  },
  identity: {},
  bordersContainer: {},
});
