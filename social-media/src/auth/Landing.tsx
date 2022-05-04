import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Button, View } from 'react-native'
import { navigantion } from '../constants/navigation';

export default function LandingScreen() {

  const navigation = useNavigation<any>();
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Button title={navigantion.REGISTER}
      onPress={() => navigation.navigate(navigantion.REGISTER)}/>
            <Button title={navigantion.LOGIN}
      onPress={() => navigation.navigate(navigantion.LOGIN)}/>
    </View>
  )
}
