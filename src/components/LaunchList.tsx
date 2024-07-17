import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LAUNCHES_QUERY } from "@/src/graphql/queries";
import { Colors } from "@/src/constants/Colors";
import LaunchListItem from "./LaunchListItem";

const LaunchList = () => {
  const { data, loading, error } = useQuery<{ launches: Launch[] }>(
    GET_LAUNCHES_QUERY
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Space X Launches</Text>
      <FlatList
        data={data.launches}
        renderItem={({ item: launch }) => <LaunchListItem launch={launch} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginVertical: 8,
    textAlign: "center",
  },
  error_container: { alignContent: "center" },
  error_text: { textAlign: "center", color: Colors.red },
});

export default LaunchList;
