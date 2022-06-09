import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useContext, useState } from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';

import { StackActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

import { AuthContext } from '../../../App';
import { RootStackParamList } from '../../types/RootStackParamList';
import { ErrorHandler } from '../error/ErrorHandler';

type Props = StackScreenProps<RootStackParamList, "Save">;

export default function Save({ route, navigation }: Props) {
  const [caption, setCaption] = useState("");
  const auth = useContext(AuthContext);

  const uploadImage = async () => {
    const childPath = `post/${auth.currentUser?.uid}/${Math.random().toString(
      36
    )}`;
    console.log(childPath);

    const response = await fetch(route.params.imageUri);
    const blob = await response.blob();

    const storageRef = ref(getStorage(), childPath);

    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        savePostData(url);
      });
    });
  };

  const savePostData = (downloadURL: string) => {
    addDoc(
      collection(
        getFirestore(),
        "posts",
        auth.currentUser?.uid as string,
        "userPosts"
      ),
      {
        downloadURL,
        caption,
        creation: serverTimestamp(),
      }
    ).then(() => navigation.dispatch(StackActions.popToTop()));
  };
  return (
    <ErrorHandler>
      <View style={{ flex: 1 }}>
        <Image source={{ uri: route.params.imageUri }} />
        <TextInput
          placeholder="Write a Caption . . ."
          onChangeText={(caption) => setCaption(caption)}
        />

        <Button title="Save" onPress={() => uploadImage()} />
      </View>
    </ErrorHandler>
  );
}
