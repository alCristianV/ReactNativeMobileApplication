import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';

import { StackActions, useNavigation } from '@react-navigation/native';

export default function Save(props: any) {
  const [caption, setCaption] = useState("");
  const navigation = useNavigation();

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${
      getAuth().currentUser?.uid
    }/${Math.random().toString(36)}`;
    console.log(childPath);

    const response = await fetch(uri);
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
        getAuth().currentUser?.uid as string,
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
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a Caption . . ."
        onChangeText={(caption) => setCaption(caption)}
      />

      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
