import React, { useMemo, useState } from "react";
import { Button, TextInput, View } from "react-native";
import { placeholders } from "../../constants/placeholders";
import { titles } from "../../constants/titles";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    signInWithEmailAndPassword(getAuth(), email, password);
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
