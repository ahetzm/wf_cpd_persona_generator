import React from "react";
import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/native";
import {StyleSheet, View, Image, Text} from "react-native";
import {ChatScreenRouteProp} from "../models/NavigationTypes";
import Chat from "../components/chat";

const CreatePersonaScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const {person, user} = route.params;

  return (
    <View style={styles.main}>
      <Chat persona={person} user={user}/>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
});

export default CreatePersonaScreen;
