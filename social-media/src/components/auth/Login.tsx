import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useMemo, useState } from 'react';
import { Button, TextInput, View } from 'react-native';

import { AuthContext } from '../../../App';
import { placeholders } from '../../constants/placeholders';
import { titles } from '../../constants/titles';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const onSignUp = () => {
    signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <View>
      <TextInput
        placeholder={placeholders.EMAIL}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder={placeholders.PASSWORD}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <Button onPress={() => onSignUp()} title={titles.LOGIN_BUTTON} />
    </View>
  );
}
