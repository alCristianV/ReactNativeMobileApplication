import React, { useMemo, useState } from 'react'
import { Button, TextInput, View } from 'react-native';
import { placeholders } from '../constants/placeholders';
import { titles } from '../constants/titles';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useMemo(() => {
        return {email, password, name}
    }, [email, password, name])

    const onSignUp = () => {
        
    }

  return (
    <View>
        <TextInput placeholder={placeholders.NAME} onChangeText={(name) => setName(name)}/>
        <TextInput placeholder={placeholders.EMAIL} onChangeText={(email) => setEmail(email)}/>
        <TextInput placeholder={placeholders.PASSWORD} secureTextEntry={true} onChangeText={(password) => setPassword(password)}/>

        <Button onPress={() => onSignUp()}
        title={titles.SIGNUP_BUTTON}/>
    </View>
  )
}
