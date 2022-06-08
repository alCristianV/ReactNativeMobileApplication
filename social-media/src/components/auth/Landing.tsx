import React from 'react';
import { Button, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { navigationConst } from '../../constants/navigation';
import { RootStackParamList } from '../../types/RootStackParamList';

type landingScreenProp = StackNavigationProp<RootStackParamList, "Landing">;

export default function LandingScreen() {
  const navigation = useNavigation<landingScreenProp>();
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        title={navigationConst.REGISTER}
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title={navigationConst.LOGIN}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
