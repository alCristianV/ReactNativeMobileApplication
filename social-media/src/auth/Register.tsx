import React, { useMemo, useState } from "react";
import { Button, TextInput, View } from "react-native";
import { placeholders } from "../constants/placeholders";
import { titles } from "../constants/titles";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const usersRef = doc(
          getFirestore(),
          "users",
          auth.currentUser?.uid as string
        );
        setDoc(usersRef, { name, email });
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
