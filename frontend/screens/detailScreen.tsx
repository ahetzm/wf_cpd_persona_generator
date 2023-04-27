import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DetailScreenProps } from "../models/Props";

const DetailScreen: React.FC<DetailScreenProps> = ({ navigation, person }) => {
  return (
    <View>
      <Image
        source={{ uri: person.imageUri }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{person.name}</Text>
      <Text>{person.age} years old</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  age: {
    fontSize: 18,
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default DetailScreen;
