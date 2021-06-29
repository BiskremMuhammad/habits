/**
 * @author Muhammad Omran
 * @date 28-06-2021
 * @description implement the announcements screen
 */

import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../components/elements/header";
import { TitlePanel } from "../components/modules/panels/title-panel";
import { AnnouncementIcon } from "../components/svgs/announcement-icon";
import { CONSTANTS } from "../utils/constants";

export const AnnouncementsScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Header
        leftAction="announcement"
        toggleDrawer={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <TitlePanel
        extraStyles={{ minHeight: 200 }}
        icon={({ style }) => <AnnouncementIcon style={style} />}
        title="Announcements"
        titleStyles={{ textTransform: "uppercase" }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingVertical: CONSTANTS.HEADER_TOP_MARGIN,
  },
});
