import { useRoute } from "@react-navigation/native";
import React, {useState} from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { DetailsScreenRouteProp } from "../models/NavigationTypes";
import ImagePicker from "../components/imagePicker";
import Chat, {ChatMessage} from "../components/chat";
import usePersonaService from "../services/persona-service";
import { PersonaQuestionRequest } from "../models/AnswerInterface";
import { getRandId } from "../services/firebase";

const DetailScreen: React.FC  = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const { person } = route.params;

  const {getAnswer} = usePersonaService();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [writingBack, setWritingBack] = useState<boolean>(false);

  const onSendHandler = async (message: string) => {
    const newMessage: ChatMessage = { message, id: getRandId(), isUser: true };
    setMessages((prevMessages) => [ newMessage, ...prevMessages ]);
    getAnswerHandler(message).then(console.log).catch(console.error);
  };

  const getAnswerHandler = async (message: string) => {
    setWritingBack(true);
    const answerRequest: PersonaQuestionRequest = { question: message, data: person };
    const answer = await getAnswer(answerRequest);
  
    const newMessage: ChatMessage = { message: answer, id: getRandId(), isUser: false };
    
  
    setWritingBack(false);
    setMessages((prevMessages) => [ newMessage, ...prevMessages ]);
    
    return answer;
  };



  return (
    <View style={styles.container}>
      <Image source={{ uri: person.imageUri }} style={styles.image} />
      <Text style={styles.name}>{person.name}</Text>
      <Text style={styles.age}>{person.age} years old</Text>

      <ImagePicker images={person.urls} onSelect={(url) => {console.log(url)}} />

      <Chat chatTitle={person.name} onSend={onSendHandler} messages={messages} writingBack={writingBack} />

      <Text>Demographics</Text>
      <Text>{person.demographics.location}</Text>
      <Text>{person.demographics.gender}</Text>
      <Text>{person.demographics.education}</Text>
      <Text>{person.demographics.income}</Text>
      <Text>{person.demographics.marital_status}</Text>

      <Text>Psychographics</Text>
      <Text>{person.psychographics.interests.join(', ')}</Text>
      <Text>{person.psychographics.hobbies.join(', ')}</Text>
      <Text>{person.psychographics.lifestyle}</Text>
      <Text>{person.psychographics.personality_traits.join(', ')}</Text>
      <Text>{person.psychographics.values.join(', ')}</Text>
      <Text>{person.psychographics.additional_funfact}</Text>

      <Text>Goals</Text>
      <Text>{person.goals.career_objectives}</Text>
      <Text>{person.goals.life_ambitions}</Text>
      <Text>{person.goals.personal_goals}</Text>

      <Text>Challenges</Text>
      <Text>{person.pain_points.challenges}</Text>
      <Text>{person.pain_points.additional_funfact}</Text>

      <Text>Motivations</Text>
      <Text>{person.motivations.desires}</Text>
      <Text>{person.motivations.fears}</Text>
      <Text>{person.motivations.passions}</Text>

      <Text>Communication Preferences</Text>
      <Text>{person.communication_preferences.preferred_channels.join(', ')}</Text>
      <Text>{person.communication_preferences.preferred_format}</Text>
      <Text>{person.communication_preferences.tone_of_voice}</Text>
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
});

export default DetailScreen;
