import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Person } from "./Person";

export type StackNavigatorParamList = {
  Home: undefined;
  Details: {
    person: Person;
  };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  "Details"
>;

export type DetailsScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "Details"
>;
