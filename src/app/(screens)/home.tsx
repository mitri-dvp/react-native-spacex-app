import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import LaunchList from "@/src/components/LaunchList";

const LaunchListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LaunchList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default LaunchListScreen;
