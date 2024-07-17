import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import LaunchListDetails from "@/src/components/LaunchListDetails";
import { Colors } from "@/src/constants/Colors";

const LaunchDetailModal = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.error_text}>Error: Launch ID is undefined</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LaunchListDetails id={id} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error_text: { textAlign: "center", color: Colors.red },
});

export default LaunchDetailModal;
