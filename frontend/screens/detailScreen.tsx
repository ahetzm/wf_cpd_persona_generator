import { useNavigation, useRoute } from "@react-navigation/native";
import React, {useState} from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { DetailsScreenRouteProp, HomeScreenNavigationProp } from "../models/NavigationTypes";
import Badge from "../components/badge";

const DetailScreen: React.FC  = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();
  const { person } = route.params;

  return (
    <View style={styles.main}>
        <ScrollView>
        <View style={styles.container}>
          <Image source={{ uri: person.imageUri }} style={styles.image} />
          <Text style={styles.name}>{person.name}</Text>
          <Text style={styles.age}>{person.age} years old, {person.demographics.gender}</Text>
          <Text style={styles.age}>{person.demographics.location}</Text>

          <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Demographics</Text>
          <Text style={styles.value}>Education: {person.demographics.education}</Text>
          <Text style={styles.value}>Income: {person.demographics.income}</Text>
          <Text style={styles.value}>{person.demographics.marital_status}</Text>

          <Text style={styles.sectionTitle}>Psychographics</Text>
          {/* <Text style={styles.value}>{person.psychographics.interests.join(', ')}</Text> */}
          <View style={{flexDirection: 'row'}}>
            <Text>Interests: </Text>
            {person.psychographics.interests.map((interest, index) => {
              return <Badge text={interest} key={interest + index} />;
            })}
          </View>
          {/* <Text style={styles.value}>{person.psychographics.hobbies.join(', ')}</Text> */}
          <View style={{flexDirection: 'row'}}>
            <Text>Hobbies: </Text>
            {person.psychographics.hobbies.map((hobby, index) => {
              return <Badge text={hobby} key={hobby + index} />;
            })}
          </View>
          
          <Text style={styles.value}>Lifestyle: {person.psychographics.lifestyle}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>Personality traits: </Text>
            {person.psychographics.personality_traits.map((trait, index) => {
              return <Badge text={trait} key={trait + index} />;
            })}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>Values: </Text>
            {person.psychographics.values.map((value, index) => {
              return <Badge text={value} key={value + index} />;
            })}
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
          <View style={{flexDirection: 'row'}}>
            <Text>Preferred communication channels: </Text>
            {person.communication_preferences.preferred_channels.map((channel, index) => {
              return (<Badge text={channel} key={channel + index} />)
            })}
          </View>
          <Text style={styles.value}>Preferred format: {person.communication_preferences.preferred_format}</Text>
          <Text style={styles.value}>Tone of voice: {person.communication_preferences.tone_of_voice}</Text>
        </View>
      </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat", {person: person})}
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
        <Text style={{fontSize: 24, lineHeight: 1, color: '#fff'}}>Ask</Text>
      </TouchableOpacity>
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

  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    justifyContent: "flex-start",
    padding: 20,
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
    marginBottom: 10,
  },
});

export default DetailScreen;