import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/native";
import React, {useEffect} from "react";
import {ScrollView, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import Card from "../components/card";
import {HomeScreenNavigationProp, HomeScreenRouteProp} from "../models/NavigationTypes";
import {getUser} from "../services/firebase";
import usePersonaService from "../services/persona-service";
import { useState } from "react";
import { Person } from "../models/Person";
// import * as Notifications from 'expo-notifications';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();
  const {user, personaToDelete} = route.params;
  const [persons, setPersons] = useState<Person[]>([]);
  const {fetchPersonas} = usePersonaService(user.uid);
  console.log("Executing Home Function", user.uid, personaToDelete);

  // Fetch personas from firebase on component mount
  useEffect(() => {
    console.log("Fetching personas", user.uid, personaToDelete);
    fetchPersonas(user.uid).then((fetchPersonas: Person[]) => {
      setPersons(fetchPersonas);
    });
  }, [fetchPersonas]);

  useEffect(() => {
    if (personaToDelete) {
      setPersons(persons.filter((person) => person.id !== personaToDelete));
    }
  }, [personaToDelete]);


  // // First, set the handler that will cause the notification
  // // to show the alert
  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false,
  //   }),
  // });

  // // Second, call the method
  // Notifications.scheduleNotificationAsync({
  //   content: {
  //     title: 'Look at that notification',
  //     body: "I'm so proud of myself!",
  //   },
  //   trigger: null,
  // });

  return (
    <View style={styles.container}>
      { persons.length === 0 ? 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#000', marginTop: 20}}>No Personas yet!</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate("CreatePersona", {user: user})}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
              <Text style={{
                padding: 10,
                fontSize: 18,
                backgroundColor: '#4BB543',
                borderRadius: 100, 
                color: '#000', 
                marginTop: 7
                }}>Click to generate your first Persona</Text>
              
            </TouchableOpacity>
          </View> : null

        }
      <ScrollView>
        {persons.map((person) => (
          <TouchableOpacity
            key={person.id}
            onPress={() => navigation.navigate("Details", {person: person, user: user})}
          >
            <Card
              name={person.name}
              age={Number(person.age)}
              imageUri={person.imageUri}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      { persons.length !== 0 ?
        <TouchableOpacity
          onPress={() => navigation.navigate("CreatePersona", {user: user})}
          style={{
            borderWidth: 1,
            borderColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: 70,
            backgroundColor: '#4BB543',
            borderRadius: 100,
          }}
        >
          <Text style={{fontSize: 48, color: '#fff', marginBottom: 7}}>+</Text>
        </TouchableOpacity> : null
      }
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
