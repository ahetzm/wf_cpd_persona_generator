import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Card from '../components/card';

interface Person {
  id: number;
  name: string;
  age: number;
  imageUri: string;
}

const persons: Person[] = [
  {
    id: 1,
    name: 'Alice',
    age: 25,
    imageUri: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'Bob',
    age: 30,
    imageUri: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 3,
    name: 'Charlie',
    age: 35,
    imageUri: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 4,
    name: 'Diana',
    age: 28,
    imageUri: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 5,
    name: 'Eva',
    age: 40,
    imageUri: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: 6,
    name: 'Frank',
    age: 45,
    imageUri: 'https://randomuser.me/api/portraits/men/5.jpg',
  }
];

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {persons.map((person) => (
          <Card
            key={person.id}
            name={person.name}
            age={person.age}
            imageUri={person.imageUri}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
});

export default HomeScreen;
