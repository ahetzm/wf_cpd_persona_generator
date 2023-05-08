import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const CreatePersonForm: React.FC<any> = () => {
  const [purposeContext, setPurposeContext] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const [goals, setGoals] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  return (
    <View>
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