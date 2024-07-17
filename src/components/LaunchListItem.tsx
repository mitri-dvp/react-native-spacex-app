import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import { formatter } from "@/src/utils/date";

const LaunchListItem = ({ launch }: { launch: Launch }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sub_title}>
        {formatter.format(new Date(launch.launch_date_utc))}
      </Text>
      <Text style={styles.title}>{launch.mission_name}</Text>
      <Text style={styles.sub_title}>
        <Ionicons
          name={
            launch.rocket.rocket_type === "rocket"
              ? "rocket-sharp"
              : "sparkles-sharp"
          }
        />{" "}
        {launch.rocket.rocket_name}
      </Text>
      <View style={styles.separator} />
      <Text style={styles.details}>
        {launch.details || "No details provided"}
      </Text>
      <Link href={`(modals)/details/${launch.id}`} asChild>
        <Button title="View Details" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 8,
  },
  sub_title: {
    fontSize: 16,
    color: Colors.gray,
  },
  details: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 8,
    backgroundColor: "black",
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },
});

export default LaunchListItem;
