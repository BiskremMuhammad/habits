/**
 * @author Muhammad Omran
 * @date 20-05-2021
 * @description Implement the Dashboard screen
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "../components/elements/header";
import { DashboardRoom } from "../components/modules/dashboard-room";
import { TitlePanel } from "../components/modules/panels/title-panel";
import { DashboardIcon } from "../components/svgs/dashboard-graphic";

export const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Header leftAction="announcement" />
      <TitlePanel
        extraStyles={{ flex: 1 }}
        icon={({ style }) => <DashboardIcon style={style} />}
        title="My Habits"
      />
      <View
        style={{
          flex: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 65,
        }}
      >
        <DashboardRoom />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingVertical: 65,
  },
});
