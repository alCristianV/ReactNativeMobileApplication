import { getAuth } from 'firebase/auth';
import {
    addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, where
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { titles } from '../../constants/titles';
import { fetchUser, fetchUserPosts } from '../../redux/slices/userSlice';
import { getUsersFollowingDoc } from '../../utils/getUsersFollowingDoc';
import { ErrorHandler } from '../error/ErrorHandler';

export default function Profile(props: any) {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(false);
  const user = useSelector((state: any) => state.user.user);
  const userPosts = useSelector((state: any) => state.user.posts);
  //const userFollowing = useSelector((state: any) => state.user.following);

  useEffect(() => {
    const userId = props.route.params.uid;
    const currentUserId = getAuth().currentUser?.uid as string;
    if (userId === getAuth().currentUser?.uid) {
      dispatch(fetchUser(currentUserId) as any);
      dispatch(fetchUserPosts(currentUserId) as any);
      return;
    } else {
      dispatch(fetchUser(userId) as any);
      dispatch(fetchUserPosts(userId) as any);

      subscribeUserFollowing(currentUserId);
    }
  }, [props.route.params.uid]);

  const onFollow = () => {
    addDoc(
      collection(
        getFirestore(),
        "following",
        getAuth().currentUser?.uid as string,
        "userFollowing"
      ),
      { userId: props.route.params.uid }
    );
  };
  const onUnfollow = async () => {
    const currentUserId = getAuth().currentUser?.uid as string;
    const usersFollowingCollectionRef = getUsersFollowingDoc(currentUserId);
    const propsUserDoc = await getDocs(
      query(
        usersFollowingCollectionRef,
        where("userId", "==", props.route.params.uid)
      )
    );

    propsUserDoc.forEach((doc) => {
      console.log(doc);
      deleteDoc(doc.ref);
    });
  };

  const subscribeUserFollowing = (userId: string) => {
    const usersFollowingCollectionRef = getUsersFollowingDoc(userId);

    const unsubscribe = onSnapshot(
      usersFollowingCollectionRef,
      (querySnapshot) => {
        const docs: any = [];
        querySnapshot.forEach((doc) => {
          const followedUserId = doc.data().userId;
          docs.push(followedUserId);
        });
        console.log("doc2");
        console.log(docs.join(", "));
        if (docs.indexOf(props.route.params.uid) > -1) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      }
    );

    return unsubscribe;
  };

  const onLogout = () => {
    getAuth().signOut();
  };

  if (user === null) {
    return <View />;
  }

  return (
    <ErrorHandler>
      <View style={styles.container}>
        <View style={styles.containerInfo}>
          <Text>{user?.name}</Text>
          <Text>{user?.email}</Text>

          {props.route.params.uid !== getAuth().currentUser?.uid ? (
            <View>
              {following ? (
                <Button title="Following" onPress={() => onUnfollow()} />
              ) : (
                <Button title="Follow" onPress={() => onFollow()} />
              )}
            </View>
          ) : (
            <Button title="Logout" onPress={() => onLogout()} />
          )}
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
    </ErrorHandler>
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
