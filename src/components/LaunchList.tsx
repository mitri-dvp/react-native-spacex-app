import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_LAUNCHES_QUERY } from "@/src/graphql/queries";
import { Colors } from "@/src/constants/Colors";
import LaunchListItem from "./LaunchListItem";
import useDebounce from "@/src/utils/useDebouncer";

const LaunchList = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

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

  const rocketFilter = new RegExp(debouncedSearch, "gi");

  const filteredData = data.launches.filter((launches) =>
    rocketFilter.test(launches.rocket.rocket_name)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Space X Launches</Text>
      <TextInput
        style={styles.input}
        placeholder="Filter by rocket..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      {filteredData.length === 0 ? (
        <Text style={[styles.error_text, { color: "black" }]}>
          Launches not found
        </Text>
      ) : null}
      <FlatList
        data={filteredData}
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
    marginVertical: 16,
    textAlign: "center",
  },
  input: {
    marginVertical: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    borderColor: "transparent",
    borderBottomColor: "black",
    borderWidth: StyleSheet.hairlineWidth,
  },
  error_container: { alignContent: "center" },
  error_text: { textAlign: "center", color: Colors.red },
});

export default LaunchList;
