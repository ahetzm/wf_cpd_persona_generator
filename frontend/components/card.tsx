import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface CardProps {
    name: string;
    age: number;
    imageUri: string;
}

const Card: React.FC<CardProps> = ({ name, age, imageUri }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: imageUri }} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.age}>{age} years old</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  age: {
    fontSize: 16,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default Card;
