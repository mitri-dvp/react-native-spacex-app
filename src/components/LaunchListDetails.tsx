import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  ScrollView,
} from "react-native";
import React from "react";
import { Colors } from "@/src/constants/Colors";
import { GET_LAUNCH_DETAILS_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { formatter } from "@/src/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const LaunchListDetails = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery<{ launch: LaunchDetails }>(
    GET_LAUNCH_DETAILS_QUERY,
    {
      variables: { id: id },
    }
  );

  if (loading) {
    return <ActivityIndicator size="large" color={"black"} />;
  }

  if (error) {
    return (
      <View style={styles.error_container}>
        <Text style={styles.error_text}>Error: {error.networkError?.name}</Text>
        <Text style={styles.error_text}>{error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.error_container}>
        <Text style={styles.error_text}>Error: Launch data is undefined</Text>
      </View>
    );
  }

  const { launch } = data;

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { textAlign: "center", marginVertical: 32 }]}>
        Space X Launch Details
      </Text>

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
      <Text style={styles.details}>
        {launch.launch_site
          ? launch.launch_site.site_name
          : "No launch site provided"}
      </Text>
      <Text style={styles.details}>Links:</Text>
      {Object.keys(launch.links).map((key: string) => {
        const link = launch.links[key as keyof Links];
        const name = key.split("_")[0];
        const isValid = link.startsWith("http");
        if (!isValid) return;

        return (
          <React.Fragment key={key}>
            <Text style={styles.link_name}>{name}:</Text>
            <Link href={link} asChild>
              <Text style={styles.link}>{link}</Text>
            </Link>
          </React.Fragment>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    paddingHorizontal: 32,
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
    marginVertical: 8,
  },
  link_name: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  link: {
    fontSize: 16,
    marginVertical: 8,
    color: Colors.blue,
  },
  separator: {
    marginVertical: 8,
    backgroundColor: "black",
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },
  error_container: { alignContent: "center" },
  error_text: { textAlign: "center", color: Colors.red },
});

export default LaunchListDetails;
