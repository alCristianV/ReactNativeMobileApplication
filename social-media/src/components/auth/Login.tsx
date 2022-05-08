import React, { useMemo, useState } from "react";
import { Button, TextInput, View } from "react-native";
import { placeholders } from "../../constants/placeholders";
import { titles } from "../../constants/titles";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
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
