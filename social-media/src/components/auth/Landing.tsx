import React from 'react';
import { Button, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { navigationConst } from '../../constants/navigation';

export default function LandingScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        title={navigationConst.REGISTER}
        onPress={() => navigation.navigate(navigationConst.REGISTER)}
      />
      <Button
        title={navigationConst.LOGIN}
        onPress={() => navigation.navigate(navigationConst.LOGIN)}
      />
    </View>
  );
}
