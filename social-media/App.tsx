import * as firebaseApp from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './src/components/auth/Landing';
import LoginScreen from './src/components/auth/Login';
import RegisterScreen from './src/components/auth/Register';
import AddScreen from './src/components/main/Add';
import MainScreen from './src/components/main/Main';
import SaveScreen from './src/components/main/Save';
import { firebaseConfig } from './src/constants/firebaseConfig';
import { navigationConst } from './src/constants/navigation';
import store from './src/redux/store/store';

if (firebaseApp.getApps().length === 0) {
  firebaseApp.initializeApp(firebaseConfig);
}

const auth = getAuth();

export const AuthContext = React.createContext<Auth>(auth);
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
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
      <AuthContext.Provider value={auth}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={navigationConst.LANDING}>
            <Stack.Screen
              name={navigationConst.LANDING}
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={navigationConst.REGISTER}
              component={RegisterScreen}
            />
            <Stack.Screen
              name={navigationConst.LOGIN}
              component={LoginScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={auth}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={navigationConst.MAIN}>
            <Stack.Screen name={navigationConst.MAIN} component={MainScreen} />
            <Stack.Screen name={navigationConst.ADD} component={AddScreen} />
            <Stack.Screen name={navigationConst.SAVE} component={SaveScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}
