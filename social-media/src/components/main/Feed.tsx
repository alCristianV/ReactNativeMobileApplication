import React, { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '../../../App';
import { titles } from '../../constants/titles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchUserFeedPosts, selectFeedPosts } from '../../redux/slices/feedSlice';
import { selectPosts } from '../../redux/slices/postsSlice';
import { ErrorHandler } from '../error/ErrorHandler';
import AnimatedFeedList from './AnimatedFeedList';

export default function Feed() {
  const dispatch = useAppDispatch();
  const userFeedPosts = useAppSelector((state) => selectFeedPosts(state));
  const [feed, setFeed] = useState<any[]>([]);
  const [randomImage, setRandomImage] = useState("");
  const [randomActivity, setRandomActivity] = useState("");
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = () =>
    dispatch(fetchUserFeedPosts(auth.currentUser?.uid as string));

  useEffect(() => {
    fetchRandomImage();
    fetchRandomActivity();
    setFeed(userFeedPosts);
    console.log(auth.currentUser?.uid);
    console.log(userFeedPosts);
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
