import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { titles } from '../../constants/titles';
import { fetchUserFeedPosts } from '../../redux/slices/userSlice';
import { ErrorHandler } from '../error/ErrorHandler';
import AnimatedFeedList from './AnimatedFeedList';

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
    <ErrorHandler>
      <View style={styles.container}>
        <View style={styles.containerGallery}>
          <AnimatedFeedList data={feed}></AnimatedFeedList>
        </View>
        <Button title={titles.REFRESH} onPress={() => fetchUserPosts()} />
      </View>
    </ErrorHandler>
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
