import type {RouteProp} from "@react-navigation/native";
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Person} from "./Person";

export type StackNavigatorParamList = {
  Home: undefined;
  Details: {
    person: Person;
  };
  CreatePersona: undefined;
  Chat: {
    person: Person;
  }
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  "Details",
  "CreatePersona"
>;

export type DetailsScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "Details"
>;

export type ChatScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "Chat"
>;

export type CreatePersonaScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "CreatePersona"
>;
