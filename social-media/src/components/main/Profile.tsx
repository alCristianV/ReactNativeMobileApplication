import { getAuth } from 'firebase/auth';
import {
    addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, where
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';

import { AuthContext } from '../../../App';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchUserPosts, selectPosts } from '../../redux/slices/postsSlice';
import { fetchUser, selectUser } from '../../redux/slices/usersSlice';
import { MainTabParamList } from '../../types/MainTabParamList';
import { getUsersFollowingDoc } from '../../utils/getUsersFollowingDoc';
import { ErrorHandler } from '../error/ErrorHandler';

type Props = MaterialBottomTabScreenProps<MainTabParamList, "Profile">;

export default function Profile({ route, navigation }: Props) {
  const dispatch = useAppDispatch();
  const [following, setFollowing] = useState(false);
  const user = useAppSelector((state) => selectUser(state));
  const userPosts = useAppSelector((state) => selectPosts(state));
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!route.params.userId) return;
    const newuserId = route.params.userId;

    if (!newuserId) return;
    const currentUserId = auth.currentUser?.uid as string;
    if (newuserId === auth.currentUser?.uid) {
      dispatch(fetchUser(currentUserId));
      dispatch(fetchUserPosts(currentUserId));
      return;
    } else {
      dispatch(fetchUser(newuserId));
      dispatch(fetchUserPosts(newuserId));

      console.log("subscribeUserFollowing");
      subscribeUserFollowing(currentUserId);
    }
  }, [route.params.userId]);

  const onFollow = () => {
    addDoc(
      collection(
        getFirestore(),
        "following",
        auth.currentUser?.uid as string,
        "userFollowing"
      ),
      { userId: route.params.userId }
    );
  };
  const onUnfollow = async () => {
    const currentUserId = auth.currentUser?.uid as string;
    const usersFollowingCollectionRef = getUsersFollowingDoc(currentUserId);
    const propsUserDoc = await getDocs(
      query(
        usersFollowingCollectionRef,
        where("userId", "==", route.params.userId)
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
        const followedUserIds: string[] = [];
        querySnapshot.forEach((doc) => {
          const followedUserId = doc.data().userId;
          followedUserIds.push(followedUserId);
        });
        console.log("doc2");
        console.log(followedUserIds.join(", "));
        if (followedUserIds.indexOf(route.params.userId) > -1) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      }
    );

    return unsubscribe;
  };

  const onLogout = () => {
    auth.signOut();
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

          {route.params.userId !== auth.currentUser?.uid ? (
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
