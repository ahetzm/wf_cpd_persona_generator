import { useRoute } from "@react-navigation/native";
import React, {useState} from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DetailsScreenRouteProp } from "../models/NavigationTypes";
import ImagePicker from "../components/imagePicker";
import Chat from "../components/chat";

const DetailScreen: React.FC  = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const { person } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: person.imageUri }} style={styles.image} />
      <Text style={styles.name}>{person.name}</Text>
      <Text style={styles.age}>{person.age} years old</Text>

      <ImagePicker images={person.urls} onSelect={(url) => {console.log(url)}} />

      <Chat persona={person} />

      <Text style={styles.sectionTitle}>Demographics</Text>
      <Text style={styles.value}>{person.demographics.location}</Text>
      <Text style={styles.value}>{person.demographics.gender}</Text>
      <Text style={styles.value}>{person.demographics.education}</Text>
      <Text style={styles.value}>{person.demographics.income}</Text>
      <Text style={styles.value}>{person.demographics.marital_status}</Text>

      <Text style={styles.sectionTitle}>Psychographics</Text>
      <Text style={styles.value}>{person.psychographics.interests.join(', ')}</Text>
      <Text style={styles.value}>{person.psychographics.hobbies.join(', ')}</Text>
      <Text style={styles.value}>{person.psychographics.lifestyle}</Text>
      <Text style={styles.value}>{person.psychographics.personality_traits.join(', ')}</Text>
      <Text style={styles.value}>{person.psychographics.values.join(', ')}</Text>
      <Text style={styles.value}>{person.psychographics.additional_funfact}</Text>

      <Text style={styles.sectionTitle}>Goals</Text>
      <Text style={styles.value}>{person.goals.career_objectives}</Text>
      <Text style={styles.value}>{person.goals.life_ambitions}</Text>
      <Text style={styles.value}>{person.goals.personal_goals}</Text>

      <Text style={styles.sectionTitle}>Challenges</Text>
      <Text style={styles.value}>{person.pain_points.challenges}</Text>
      <Text style={styles.value}>{person.pain_points.additional_funfact}</Text>

      <Text style={styles.sectionTitle}>Motivations</Text>
      <Text style={styles.value}>{person.motivations.desires}</Text>
      <Text style={styles.value}>{person.motivations.fears}</Text>
      <Text style={styles.value}>{person.motivations.passions}</Text>

      <Text style={styles.sectionTitle}>Communication Preferences</Text>
      <Text style={styles.value}>{person.communication_preferences.preferred_channels.join(', ')}</Text>
      <Text style={styles.value}>{person.communication_preferences.preferred_format}</Text>
      <Text style={styles.value}>{person.communication_preferences.tone_of_voice}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
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
  },
  age: {
    fontSize: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    marginBottom: 20,
  },
});

export default DetailScreen;