import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type DetailScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
  persona: any;
};

const DetailScreen: React.FC<any> = ({ navigation, persona }) => {
  return (
    <View>
      <Image
        source={{ uri: persona?.imageUri }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{persona?.name}</Text>
      <Text>{persona?.age} years old</Text>
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
