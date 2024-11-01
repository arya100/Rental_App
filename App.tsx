
// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Provider as PaperProvider } from 'react-native-paper';
// import LoginScreen from './src/screens/LoginScreen'; // We'll create this file next
// import HomeScreen from './src/screens/HomeScreen';
// import CreateDriverScreen from './src/screens/CreateNewDriverScreen';
// import RideTypeSelectionScreen from './src//screens/RideTypeSelectionScreen';
// import CarListScreen from './src/screens/CarListScreen';
// import CarDetailsScreen from './src/screens/CarDetailScreen';

// export type RootStackParamList = {
//   Login: undefined;
//   Home: undefined;
//   CreateDriver: undefined;
//   RideTypeSelection: undefined
//   CarList: { type: 'self-drive' | 'with-driver' };
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const App = () => {
//   return (
//     <PaperProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen 
//             name="Login" 
//             component={LoginScreen} 
//             options={{ headerShown: false }} 
//           />
//           <Stack.Screen 
//             name="Home" 
//             component={HomeScreen} 
//             options={{ title: 'Home' }} 
//           />
//           <Stack.Screen 
//             name="CreateDriver" 
//             component={CreateDriverScreen} 
//             options={{ title: 'Create Driver Profile' }} 
//           />
//           <Stack.Screen 
//             name="RideTypeSelection" 
//             component={RideTypeSelectionScreen} 
//             options={{ title: 'Choose Ride Type' }} 
//           />
//           <Stack.Screen 
//             name="CarList" 
//             component={CarListScreen} 
//             options={({ route }) => ({
//               title: route.params.type === 'self-drive' ? 'Self-drive Cars' : 'Cars with Driver',
//             })} 
//           />
//           <Stack.Screen name="CarDetails" component={CarDetailsScreen} options={{ title: 'Car Details' }} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// };

// export default App;

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './src/screens/LoginScreen'; // We'll create this file next
import HomeScreen from './src/screens/HomeScreen';
import CreateDriverScreen from './src/screens/CreateNewDriverScreen';
import RideTypeSelectionScreen from './src//screens/RideTypeSelectionScreen';
import CarListScreen from './src/screens/CarListScreen';
import CarDetailsScreen from './src/screens/CarDetailScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  CreateDriver: undefined;
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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="CreateDriver" component={CreateDriverScreen} options={{ title: 'Create Driver Profile' }} />
          <Stack.Screen name="RideTypeSelection" component={RideTypeSelectionScreen} options={{ title: 'Choose Ride Type' }} />
          <Stack.Screen name="CarList" component={CarListScreen} options={{ title: 'Available Cars' }} />
          <Stack.Screen name="CarDetails" component={CarDetailsScreen} options={{ title: 'Car Details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
