import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Card from "../components/card";
import { HomeScreenNavigationProp } from "../models/NavigationTypes";
import { Person } from "../models/Person";

const persons: Person[] = [
  {
    id: 1,
    name: "Alice",
    age: 25,
    imageUri: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Bob",
    age: 30,
    imageUri: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 3,
    name: "Charlie",
    age: 35,
    imageUri: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 4,
    name: "Diana",
    age: 28,
    imageUri: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 5,
    name: "Eva",
    age: 40,
    imageUri: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 6,
    name: "Frank",
    age: 45,
    imageUri: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

const HomeScreen = () => {
  // const navigation = useNavigation<HomeScreenNavigationProp>();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ScrollView>
        {persons.map((person) => (
          <TouchableOpacity
            key={person.id}
            onPress={() => navigation.navigate("Details", { person: person })}
          >
            <Card
              name={person.name}
              age={person.age}
              imageUri={person.imageUri}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
});

export default HomeScreen;
