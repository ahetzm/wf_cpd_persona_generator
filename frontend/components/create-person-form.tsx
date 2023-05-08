import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import usePersonaService from "../services/persona-service";
import { PersonaRequest } from '../models/PersonaInterface';
import { Person } from '../models/Person';

const CreatePersonForm: React.FC<any> = () => {
  const [purposeContext, setPurposeContext] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const [goals, setGoals] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const { createPerson } = usePersonaService();
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log('Submitting form...');

    setLoading(true);

    // Create a new person object
    const newPersonRequest: PersonaRequest = {
      purpose_context: purposeContext,
      name,
      age,
      interests,
      goals,
      additional_info: additionalInfo,
    };

    // Call createPerson service method
    createPerson(newPersonRequest).then((person: Person) => {
      console.log('Person created successfully!', person);

      // Set loading to false
      setLoading(false);

      // Reset form
      setPurposeContext('');
      setName('');
      setAge('');
      setInterests('');
      setGoals('');
      setAdditionalInfo('');

      // Navigate to created person details screen
      // @ts-ignore
      navigation.navigate("Details", { person: person });
    });

  }

  return (
    <View>
      <Text>Fill out the form below to create a new persona</Text>
      <Text>{loading}</Text>
      <Text>Purpose/Context:</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        value={purposeContext}
        onChangeText={text => setPurposeContext(text)}
      />
      <Text>Name:</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text>Age:</Text>
      <TextInput
        keyboardType="numeric"
        value={age}
        onChangeText={text => setAge(text)}
      />
      <Text>Interests:</Text>
      <TextInput
        value={interests}
        onChangeText={text => setInterests(text)}
      />
      <Text>Goals:</Text>
      <TextInput
        value={goals}
        onChangeText={text => setGoals(text)}
      />
      <Text>Additional Info:</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        value={additionalInfo}
        onChangeText={text => setAdditionalInfo(text)}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePersonForm;