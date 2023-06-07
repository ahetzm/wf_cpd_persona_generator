import React from "react";
import {useRoute} from "@react-navigation/native";
import {ScrollView, StyleSheet, View} from "react-native";
import {getUser} from "../services/firebase";
import CreatePersonForm from "../components/create-person-form";
import {CreatePersonaScreenRouteProp} from "../models/NavigationTypes";


// Fetch test user from firebase
const fakeUserId = "86tgh89zg9";
getUser(fakeUserId).then((user) => {
  console.log(user);
});

const CreatePersonaScreen: React.FC = () => {
  const route = useRoute<CreatePersonaScreenRouteProp>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <CreatePersonForm/>
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

export default CreatePersonaScreen;
