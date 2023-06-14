import React from "react";
import {useRoute} from "@react-navigation/native";
import {ScrollView, StyleSheet, View} from "react-native";
import {getUser} from "../services/firebase";
import CreatePersonForm from "../components/create-person-form";
import {CreatePersonaScreenRouteProp} from "../models/NavigationTypes";


const CreatePersonaScreen: React.FC = () => {
  const route = useRoute<CreatePersonaScreenRouteProp>();
  const {user} = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        <CreatePersonForm user={user}/>
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
