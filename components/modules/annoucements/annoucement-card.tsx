/**
 * @author Muhammad Omran
 * @date 07-05-2021
 * @description implement the reusable annoucement card component
 */

import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { CONSTANTS } from "../../../utils/constants";

/**
 * interface that defines the props of the component
 *
 * @interface
 */
interface AnnoucementCardProps {
  /**
   * the datetime stamp of the annoucement
   *
   * @type {Date}
   */
  date: Date;

  /**
   * the announcement description
   *
   * @type {string}
   */
  description: string;

  /**
   * the announcement image
   *
   * @type {string}
   */
  image?: string;

  /**
   * the annoucement title
   *
   * @type {string}
   */
  title: string;
}

export const AnnouncementCard = ({
  date,
  description,
  image,
  title,
}: AnnoucementCardProps) => (
  <View style={styles.card}>
    <Text style={styles.date}>{`${date.getFullYear()}/${`0${
      date.getMonth() + 1
    }`.substr(-2)}/${`0${date.getDate() + 1}`.substr(-2)}`}</Text>
    <View style={styles.body}>
      {!!image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: CONSTANTS.HEADER_HORIZONTAL_MARGIN,
    marginBottom: 40,
    opacity: 0.66,
  },
  date: {
    marginLeft: 26,
    marginBottom: 5,
    fontFamily: "Rubik-Regular",
    fontSize: 16,
    lineHeight: 28,
    color: "#fff",
  },
  body: {
    backgroundColor: "rgba(22, 17, 54, 0.72)",
    borderRadius: 24,
    overflow: "hidden",
  },
  image: {
    aspectRatio: 1.62,
    resizeMode: "cover",
    width: "100%",
    opacity: 0.72,
    backgroundColor: "rgba(22, 17, 54, 0.72)",
  },
  title: {
    paddingTop: 25,
    paddingLeft: 26,
    paddingRight: 32,
    fontFamily: "Rubik-Medium",
    fontSize: 20,
    lineHeight: 28,
    color: "#fff",
    marginBottom: 3,
  },
  description: {
    paddingBottom: 25,
    paddingLeft: 26,
    paddingRight: 32,
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    lineHeight: 24,
    color: "#fff",
    opacity: 0.66,
  },
});
