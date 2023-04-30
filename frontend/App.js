import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MaterialHeaderButton from './components/headerButton';
import Login from './components/login';
import Register from './components/register';
import './firebaseConfig';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options= {({ navigation }) => ({
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                                <Item title="Register" onPress={() => navigation.navigate('Register')} />
                            </HeaderButtons>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
                                <Item title="Login" onPress={() => navigation.navigate('Login')} />
                            </HeaderButtons>
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
