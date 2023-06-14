import {useNavigation, useRoute} from "@react-navigation/native";
import React, {useState} from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  DetailsScreenRouteProp,
  HomeScreenNavigationProp,
} from "../models/NavigationTypes";
import Badge from "../components/badge";
import usePersonaService from "../services/persona-service";

const DetailScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();
  const {person, user} = route.params;
  const {removePersona} = usePersonaService(user.uid);

  const handleDeletePerson = async () => {
    console.log("Deleting person...", person.id);
    await removePersona(user.uid, person.id);
    navigation.navigate("Home", {user: user, personaToDelete: person.id});
  };

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{uri: person.imageUri}} style={styles.image}/>
        <Text style={styles.name}>{person.name}</Text>
        <Text style={styles.age}>
          {person.age} years old, {person.demographics.gender}
        </Text>
        <Text style={styles.age}>{person.demographics.location}</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Demographics</Text>
          <Text style={styles.value}>Education: {person.demographics.education}</Text>
          <Text style={styles.value}>Income: {person.demographics.income}</Text>
          <Text style={styles.value}>{person.demographics.marital_status}</Text>

          <Text style={styles.sectionTitle}>Psychographics</Text>
          <View style={styles.rowContainer}>
            <Text>Hobbies: </Text>
            <View style={styles.badgeContainer}>
              {person.psychographics.hobbies.map((hobby, index) => {
                return <Badge text={hobby} key={hobby + index}/>;
              })}
            </View>
          </View>

          <Text style={styles.value}>Lifestyle: {person.psychographics.lifestyle}</Text>
          <View style={styles.rowContainer}>
            <Text>Personality traits: </Text>
            <View style={styles.badgeContainer}>
              {person.psychographics.personality_traits.map((trait, index) => {
                return <Badge text={trait} key={trait + index}/>;
              })}
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text>Values: </Text>
            <View style={styles.badgeContainer}>
              {person.psychographics.values.map((value, index) => {
                return <Badge text={value} key={value + index}/>;
              })}
            </View>
          </View>
          <Text style={styles.value}>{person.psychographics.additional_funfact}</Text>

          <Text style={styles.sectionTitle}>Goals</Text>
          <Text style={styles.value}>Career objectives: {person.goals.career_objectives}</Text>
          <Text style={styles.value}>Life Ambitions: {person.goals.life_ambitions}</Text>
          <Text style={styles.value}>Goals: {person.goals.personal_goals}</Text>

          <Text style={styles.sectionTitle}>Challenges</Text>
          <Text style={styles.value}>Challenges: {person.pain_points.challenges}</Text>
          <Text style={styles.value}>Facts: {person.pain_points.additional_funfact}</Text>

          <Text style={styles.sectionTitle}>Motivations</Text>
          <Text style={styles.value}>Desires: {person.motivations.desires}</Text>
          <Text style={styles.value}>Dears: {person.motivations.fears}</Text>
          <Text style={styles.value}>Passions: {person.motivations.passions}</Text>

          <Text style={styles.sectionTitle}>Communication Preferences</Text>
          <View style={styles.rowContainer}>
            <Text>Preferred communication channels: </Text>
            <View style={styles.badgeContainer}>
              {person.communication_preferences.preferred_channels.map((channel, index) => {
                return <Badge text={channel} key={channel + index}/>
              })}
            </View>
          </View>
          <Text style={styles.value}>Preferred format:
            {person.communication_preferences.preferred_format}
          </Text>
          <Text style={styles.value}>Tone of voice: {person.communication_preferences.tone_of_voice}</Text>
        </View>
        <TouchableOpacity
          onPress={handleDeletePerson}
          style={{
            padding: 10,
            backgroundColor: "#ff0000",
            borderRadius: 100,
          }}
        >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat", {person: person, user: user})}
        style={styles.floatingButton}
      >
        <Text style={styles.buttonText}>Ask</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  detailsContainer: {
    width: "100%",
    paddingHorizontal: 20,
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
    marginBottom: 10,
  },
  age: {
    fontSize: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  value: {
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  badgeContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginLeft: 5,
  },
  floatingButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#4BB543",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
  },
});

export default DetailScreen;