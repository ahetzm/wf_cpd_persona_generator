import type {RouteProp} from "@react-navigation/native";
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Person} from "./Person";
import {User} from "./User";

export type StackNavigatorParamList = {
  Home: {
    user: User
    personaToDelete: string | undefined;
  };
  Details: {
    person: Person;
    user: User;
  };
  CreatePersona: {
    user: User;
  };
  Chat: {
    person: Person;
    user: User;
  }
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackNavigatorParamList,
  "Details",
  "CreatePersona"
>;

export type HomeScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  "Home"
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
