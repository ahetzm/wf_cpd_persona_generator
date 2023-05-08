import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DetailsScreenRouteProp } from "../models/NavigationTypes";

const DetailScreen: React.FC  = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const { person } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: person.imageUri }} style={styles.image} />
      <Text style={styles.name}>{person.name}</Text>
      <Text style={styles.age}>{person.age} years old</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  age: {
    fontSize: 18,
  },
});

export default DetailScreen;
