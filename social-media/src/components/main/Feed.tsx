import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { titles } from '../../constants/titles';
import { fetchUserFeedPosts } from '../../redux/slices/userSlice';

export default function Feed() {
  const dispatch = useDispatch();
  const userFeedPosts: any[] = useSelector(
    (state: any) => state.user.feedPosts
  );
  const [feed, setFeed] = useState<any[]>([]);
  const [randomImage, setRandomImage] = useState("");
  const [randomActivity, setRandomActivity] = useState("");

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = () => dispatch(fetchUserFeedPosts() as any);

  useEffect(() => {
    fetchRandomImage();
    fetchRandomActivity();
    setFeed(userFeedPosts);
    const randomPost = {
      userInfo: { name: "Your random post" },
      post: { caption: "Bored? " + randomActivity, downloadUrl: randomImage },
    };

    setFeed((feed) => [...feed.reverse(), randomPost]);
    setFeed((feed) => [...feed.reverse()]);
    console.log(feed);
  }, [userFeedPosts]);

  const fetchRandomImage = async () => {
    const res = await fetch("https://source.unsplash.com/random/800x600");
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setRandomImage(imageObjectURL);
  };

  const fetchRandomActivity = async () => {
    fetch("https://www.boredapi.com/api/activity")
      .then((response) => response.json())
      .then((actualData) => setRandomActivity(actualData.activity));
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={feed}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.container}>{item.userInfo.name}</Text>
              <Text style={styles.container}>{item.post.caption}</Text>
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
