import { StackNavigationProp } from "@react-navigation/stack";
import { Person } from "./Person";

export type RootStackParamList = {
  HomeScreen: { navigation: StackNavigationProp<RootStackParamList, "HomeScreen"> },
  DetailScreen: { navigation: StackNavigationProp<RootStackParamList, "HomeScreen">, person: Person };
};

export type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "HomeScreen">;
};

export type DetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "DetailScreen">;
  person: Person;
};
