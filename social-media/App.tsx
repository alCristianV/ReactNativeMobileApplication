import * as firebaseApp from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './src/components/auth/Landing';
import LoginScreen from './src/components/auth/Login';
import RegisterScreen from './src/components/auth/Register';
import AddScreen from './src/components/main/Add';
import MainScreen from './src/components/main/Main';
import { firebaseConfig } from './src/constants/firebaseConfig';
import { navigantion } from './src/constants/navigation';
import store from './src/redux/store/store';

if (firebaseApp.getApps().length === 0) {
  firebaseApp.initializeApp(firebaseConfig);
}
const Stack = createNativeStackNavigator();
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      setLoaded(true);
      if (user) {
        setLoggedIn(true);
        return;
      }
      setLoggedIn(false);
    });
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={navigantion.LANDING}>
          <Stack.Screen
            name={navigantion.LANDING}
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={navigantion.REGISTER}
            component={RegisterScreen}
          />
          <Stack.Screen name={navigantion.LOGIN} component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={navigantion.MAIN}>
          <Stack.Screen
            name={navigantion.MAIN}
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={navigantion.ADD} component={AddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
