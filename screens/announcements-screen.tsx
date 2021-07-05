/**
 * @author Muhammad Omran
 * @date 28-06-2021
 * @description implement the announcements screen
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "../components/elements/header";
import { AnnouncementCard } from "../components/modules/annoucements/annoucement-card";
import { TitlePanel } from "../components/modules/panels/title-panel";
import { AnnouncementIcon } from "../components/svgs/announcement-icon";
import { CONSTANTS } from "../utils/constants";

export const AnnouncementsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Header leftAction="announcement" />
      <TitlePanel
        extraStyles={{ minHeight: 200 }}
        icon={({ style }) => <AnnouncementIcon style={style} />}
        title="Announcements"
        titleStyles={{ textTransform: "uppercase" }}
      />
      <AnnouncementCard
        date={new Date()}
        title="Average Session: 5.4 Min"
        description="Everyone is doing so well. Our average session time has moved up to 5.4 minutes!"
      />
      <AnnouncementCard
        date={new Date()}
        image="https://i.ibb.co/XZSSGcG/announcement.png"
        title="10,000 Habits"
        description="Celebrate the progress with us!"
      />
      <View style={styles.spacer} />
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
  spacer: {
    height: 44,
  },
});
