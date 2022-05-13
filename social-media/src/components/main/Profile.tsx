import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUser, fetchUserPosts } from '../../redux/slices/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const userPosts = useSelector((state: any) => state.user.posts);

  useEffect(() => {
    dispatch(fetchUser() as any);
    dispatch(fetchUserPosts() as any);
  }, []);

  useEffect(() => {
    console.log(userPosts);
  }, [userPosts]);

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
      </View>

      <View style={styles.containerGallery}>
        {userPosts && (
          <FlatList
            numColumns={3}
            horizontal={false}
            data={userPosts}
            renderItem={({ item }) => (
              <View style={styles.containerImage}>
                <Image
                  style={styles.image}
                  source={{ uri: item.downloadUrl }}
                />
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});
