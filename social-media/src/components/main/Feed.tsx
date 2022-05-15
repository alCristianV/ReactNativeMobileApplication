import React, { useEffect } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { titles } from '../../constants/titles';
import { fetchUserFeedPosts } from '../../redux/slices/userSlice';

export default function Feed() {
  const dispatch = useDispatch();
  const userFeedPosts = useSelector((state: any) => state.user.feedPosts);

  useEffect(() => {
    fetchUserPosts();
    console.log(userFeedPosts);
  }, []);

  const fetchUserPosts = () => dispatch(fetchUserFeedPosts() as any);

  useEffect(() => {
    console.log(userFeedPosts);
  }, [userFeedPosts]);

  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={userFeedPosts}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.container}>{item.userInfo.name}</Text>
              <Image
                style={styles.image}
                source={{ uri: item.post.downloadUrl }}
              />
            </View>
          )}
        />
      </View>
      <Button title={titles.REFRESH} onPress={() => fetchUserPosts()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});
