import React, {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import usePersonaService from "../services/persona-service";
import {PersonaRequest} from '../models/PersonaInterface';
import {Person} from '../models/Person';

const CreatePersonForm: React.FC<any> = ({user}) => {
  const [purposeContext, setPurposeContext] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [interests, setInterests] = useState('');
  const [goals, setGoals] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const {createPerson} = usePersonaService(user.uid);
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
    createPerson(newPersonRequest, user.uid).then((person: Person) => {
      console.log(user.uid);
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
      navigation.navigate("Details", {person: person, user: user});
    });

  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Fill out the form below to create a new persona</Text> */}
      {loading &&
        <Text style={{
          color: '#000',
          marginTop: 20,
          marginBottom: 20,
          fontSize: 16,
        }}
        >
          Loading...
        </Text>
      }

      {/* <ImagePicker images={person.urls} onSelect={(url) => {console.log(url)}} /> */}

      {!loading &&
        <View>
          <Text style={styles.inputLabel}>Purpose/Context:</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={2}
            value={purposeContext}
            onChangeText={text => setPurposeContext(text)}
          />
          <Text style={styles.inputLabel}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={text => setName(text)}
          />
          <Text style={styles.inputLabel}>Age:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={age}
            onChangeText={text => setAge(text)}
          />
          <Text style={styles.inputLabel}>Interests:</Text>
          <TextInput
            style={styles.input}
            value={interests}
            onChangeText={text => setInterests(text)}
          />
          <Text style={styles.inputLabel}>Goals:</Text>
          <TextInput
            style={styles.input}
            value={goals}
            onChangeText={text => setGoals(text)}
          />
          <Text style={styles.inputLabel}>Additional Info:</Text>
          <TextInput
            style={styles.input}
            value={additionalInfo}
            onChangeText={text => setAdditionalInfo(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      }

    </View>
  );
};

export default CreatePersonForm;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: width - 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#008080',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});