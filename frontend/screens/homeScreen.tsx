import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Card from "../components/card";
import { HomeScreenNavigationProp } from "../models/NavigationTypes";
import { Person, PersonFactory } from "../models/Person";
import { getUser } from "../services/firebase";
import PersonaService from "../services/persona-service";
import { PersonaRequestFactory } from "../models/PersonaInterface";

const persons: Person[] = [
  PersonFactory.random(),
  PersonFactory.random(),
  PersonFactory.random(),
  PersonFactory.random(),
  PersonFactory.random(),
  PersonFactory.random(),
];

getUser("86tgh89zg9").then((user) => {
  console.log(user);
});

const personaService = new PersonaService();

console.log(personaService);

personaService.createPerson(PersonaRequestFactory.random()).then((person: Person) => {
  console.log(person);
});

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
              age={Number(person.age)}
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
