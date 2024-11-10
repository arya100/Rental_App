import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen'; // We'll create this file next
import HomeScreen from './src/screens/HomeScreen';
import CarListScreen from './src/screens/Car/CarListScreen';
import CarDetailsScreen from './src/screens/Car/CarDetailScreen';
import OwnersSignUpScreen from './src/screens/owners/OwnersSignUpScreen';
import OwnedCarsScreen from './src/screens/owners/OwnedCarsScreen';
import AddEditCarScreen from './src/screens/owners/AddEditCarScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  CreateDriver: undefined;
  Profile: undefined;
  RideTypeSelection: undefined;
  CarList: { type: 'self-drive' | 'with-driver' };
  CarDetails: {
    photos: string[];
    driverName: string;
    carType: string;
    rating: number;
    availability: string;
    distance: string;
    contact: string;
    costPerDay: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="SignUp" component={OwnersSignUpScreen} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="Profile" component={OwnedCarsScreen} options={{ title: 'My Cars' }} />
          <Stack.Screen name="CarList" component={CarListScreen} options={{ title: 'Available Cars' }} />
          <Stack.Screen name="CarDetails" component={CarDetailsScreen} options={{ title: 'Car Details' }} />
          <Stack.Screen name="AddEditCar" component={AddEditCarScreen} options={{ title: 'Add/Edit Car' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;


