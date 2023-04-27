import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import DetailScreen from "../screens/detailScreen";
import HomeScreen from "../screens/homeScreen";

const Stack = createNativeStackNavigator();

const NavStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavStack;
