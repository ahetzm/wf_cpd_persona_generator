import { StackNavigationProp } from "@react-navigation/stack";
import { Person } from "./Person";

export type RootStackParamList = {
  Home: undefined;
  PersonDetail: { person: Person };
};

export type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export type DetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "PersonDetail">;
  person: Person;
};
