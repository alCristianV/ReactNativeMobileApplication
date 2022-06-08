import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useContext, useState } from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';

import { StackActions, useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../../App';
import { ErrorHandler } from '../error/ErrorHandler';

export interface SaveProps {
  imageUri: string;
}

export default function Save(props: SaveProps) {
  const [caption, setCaption] = useState("");
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const { imageUri } = props;

  const uploadImage = async () => {
    const childPath = `post/${auth.currentUser?.uid}/${Math.random().toString(
      36
    )}`;
    console.log(childPath);

    const response = await fetch(imageUri);
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
        <Image source={{ uri: imageUri }} />
        <TextInput
          placeholder="Write a Caption . . ."
          onChangeText={(caption) => setCaption(caption)}
        />

        <Button title="Save" onPress={() => uploadImage()} />
      </View>
    </ErrorHandler>
  );
}
