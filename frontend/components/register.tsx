import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../services/firebase';
import {saveUser} from '../services/firebase';
import {User} from '../models/User';

interface Props {
  navigation: any;
}

const Register: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      if (result.user) {
        console.log(result.user);
        console.log(result.user.uid);
        const user: User = {
          uid: result.user.uid,
          name: name,
          email: result.user.email ?? email,
        }
        await saveUser(user);

        navigation.navigate('Home', {user: user});
      } else {
        setErrorMessage('Something went wrong! Please try again.');
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
      <Button onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default Register;
