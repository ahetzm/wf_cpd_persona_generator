import { useNavigation } from "@react-navigation/native";
import React, {useEffect} from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Card from "../components/card";
import { HomeScreenNavigationProp } from "../models/NavigationTypes";
import { getUser } from "../services/firebase";
import usePersonaService from "../services/persona-service";
// import * as Notifications from 'expo-notifications';

// Fetch test user from firebase
const fakeUserId = "86tgh89zg9";
getUser(fakeUserId).then((user) => {
  console.log(user);
});

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { persons, fetchPersonas } = usePersonaService();

  // Fetch personas from firebase on component mount
  useEffect(() => {
    fetchPersonas(fakeUserId);
  }, [fetchPersonas]);


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
      <TouchableOpacity
        onPress={() => navigation.navigate("CreatePersona")}
        style={{
          borderWidth: 1,
          borderColor: 'rgba(f,f,f,0.2)',
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
        <Text style={{fontSize: 48, lineHeight: 1, color: '#fff'}}>+</Text>
      </TouchableOpacity>
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
