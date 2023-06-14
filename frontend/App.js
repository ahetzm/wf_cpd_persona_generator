import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import MaterialHeaderButton from './components/headerButton';
import Login from './components/login';
import Register from './components/register';
import './services/firebase';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StatusBar} from "expo-status-bar";
import {SafeAreaView, StyleSheet} from "react-native";
import DetailsScreen from "./screens/detailScreen";
import HomeScreen from "./screens/homeScreen";
import CreatePersonaScreen from "./screens/createPersonaScreen";
import ChatScreen from "./screens/chatScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">

          <Stack.Screen name="Details" component={DetailsScreen}/>
          <Stack.Screen name="CreatePersona" component={CreatePersonaScreen}/>
          <Stack.Screen name="Chat" component={ChatScreen}/>
          <Stack.Screen
            name="Login"
            component={Login}
            options={({navigation}) => ({
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                  <Item title="Register" onPress={() => navigation.navigate('Register')}/>
                </HeaderButtons>
              ),
            })}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={({navigation}) => ({
              headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                  <Item title="Login" onPress={() => navigation.navigate('Login')}/>
                </HeaderButtons>
              ),
            })}
          />
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({navigation}) => ({
                headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                      <Item title="Loggout" onPress={() => navigation.navigate('Login')}/>
                    </HeaderButtons>
                ),
              })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto"/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20, // Adjust this value as needed to move the header down
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#007aff",
  },
});
