import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/components/auth/Landing";
import { navigantion } from "./src/constants/navigation";

import * as firebaseApp from "firebase/app";
import { firebaseConfig } from "./src/constants/firebaseConfig";
import { getAuth } from "firebase/auth";
import RegisterScreen from "./src/components/auth/Register";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import LoginScreen from "./src/components/auth/Login";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./src/redux/reducers";

const store = configureStore({
  rootReducer,
  middleware: applyMiddleware(thunk),
});

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
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>User is logged in</Text>
    </View>
  );
}
