import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './src/auth/Landing';
import { navigantion } from './src/constants/navigation';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={navigantion.LANDING}>
        <Stack.Screen name={navigantion.LANDING}
        component={LandingScreen}
        options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
