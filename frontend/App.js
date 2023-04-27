import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Header from "./components/header";
import HomeScreen from "./screens/homeScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <HomeScreen/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20, // Adjust this value as needed to move the header down
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#007aff",
  },
});
