import React, {useState, useEffect} from 'react';
import {useNavigation} from "@react-navigation/native";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import usePersonaService from "../services/persona-service";
import {PersonaRequest} from '../models/PersonaInterface';
import {Person} from '../models/Person';

const facts = [
  'Funfact: Personas sind fiktive Charaktere, die auf der Grundlage von Recherchen erstellt werden, um die verschiedenen Benutzertypen zu repräsentieren, die Ihren Service, Ihr Produkt, Ihre Website oder Ihre Marke auf ähnliche Weise nutzen könnten. Sie helfen, die Bedürfnisse, Erfahrungen, Verhaltensweisen und Ziele Ihrer Benutzer zu verstehen',
  'Funfact: Personas bieten aussagekräftige Archetypen, mit denen Sie Ihre Designentwicklung beurteilen können. Sie helfen dabei, die richtigen Fragen zu stellen und diese Fragen im Sinne der Benutzer zu beantworten, für die Sie gestalten​',
  'Funfact: Im Design Thinking Prozess beginnen Designer oft in der zweiten Phase, der Define-Phase, mit der Erstellung von Personas. Sie dienen als Leitfaden für Ideation-Sessions wie Brainstorming, Worst Possible Idea und SCAMPER​',
  'Funfact: Es gibt vier verschiedene Arten von Personas: zielgerichtete Personas, rollenbasierte Personas, einnehmende Personas und fiktive Personas. Jeder Typ hat seinen eigenen Fokus und Zweck, wie z.B. das Verstehen der Ziele des Benutzers, das Verstehen der Rolle des Benutzers in seiner Organisation, das Engagement des Designers mit der Persona oder das Erstellen von Annahmen basierend auf der Erfahrung des UX-Design-Teams',
  'Funfact: Personas sind auch als Modellcharaktere oder zusammengesetzte Charaktere bekannt. Sie beschreiben keine echten Menschen, sondern Sie erstellen Ihre Personas basierend auf tatsächlichen Daten, die von mehreren Personen gesammelt wurden. Sie geben den oft kalten Fakten in Ihrer Forschung eine menschliche Note',
];


const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [fact, setFact] = useState('Loading fact...');

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setFact(facts[randomIndex]);
  };

  useEffect(() => {
    getRandomFact();
    // Update progress every 3 seconds (5 minutes total)
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress < 1) {
          return oldProgress + 0.01; // increase progress by 1%
        }


        clearInterval(interval);
        return 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loadings...</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.factText}>{fact}</Text>
      </View>
  );
};





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
          <LoadingScreen></LoadingScreen>
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
  loadingText: {
    marginBottom: 20, // adjust this value for your desired spacing
  },
    progressBar: {
  flexDirection: 'row',
      height: 20,
      width: '80%',
      backgroundColor: 'white',
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 5,
},
progress: {
  backgroundColor: 'blue',
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
  absoluteFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#008080',
  },
  factText: {
    marginTop: 10,
    textAlign: 'center',
  },
});
