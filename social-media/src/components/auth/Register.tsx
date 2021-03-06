import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { Button, TextInput, View } from 'react-native';

import { AuthContext } from '../../../App';
import { placeholders } from '../../constants/placeholders';
import { titles } from '../../constants/titles';
import { getUsersDoc } from '../../utils/getUsersDoc';

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const onSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const usersRef = getUsersDoc(auth.currentUser?.uid as string);
        await setDoc(usersRef, { name, email });
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder={placeholders.NAME}
        onChangeText={(name) => setName(name)}
      />
      <TextInput
        placeholder={placeholders.EMAIL}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder={placeholders.PASSWORD}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      <Button onPress={() => onSignUp()} title={titles.SIGNUP_BUTTON} />
    </View>
  );
}
