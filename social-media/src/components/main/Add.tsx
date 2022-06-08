import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { navigationConst } from '../../constants/navigation';
import { ErrorHandler } from '../error/ErrorHandler';

export default function Add() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const init = async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus?.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus?.status === "granted");
    };
    init();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <ErrorHandler>
      <View style={{ flex: 1 }}>
        <View style={styles.cameraContainer}>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
            ratio={"1:1"}
          />
        </View>

        <Button
          title="Flip Image"
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        ></Button>
        <Button title="Take Picture" onPress={() => takePicture()} />
        <Button
          title="Pick Image From Gallery"
          onPress={async () => await pickImage()}
        />
        <Button
          title="Save"
          onPress={() =>
            navigation.navigate(navigationConst.SAVE, {
              image,
            })
          }
        />
        {image ? <Image source={{ uri: image }} style={{ flex: 1 }} /> : null}
      </View>
    </ErrorHandler>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
