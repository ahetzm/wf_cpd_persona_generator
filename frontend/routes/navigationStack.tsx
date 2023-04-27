import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import DetailScreen from '../screens/detailScreen';
import HomeScreen from '../screens/homeScreen';

const Stack = createNativeStackNavigator();

const NavStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="PersonDetail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavStack;