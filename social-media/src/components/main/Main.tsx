import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { icons } from '../../constants/icons';
import { navigationConst } from '../../constants/navigation';
import { titles } from '../../constants/titles';
import { values } from '../../constants/values';
import { fetchUser, fetchUserPosts } from '../../redux/slices/userSlice';
import FeedScreen from './Feed';
import ProfileScreen from './Profile';

const EmptyScreen = () => {
  return null;
};

const Tab = createMaterialBottomTabNavigator();

export default function Main() {
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);

  useEffect(() => {
    console.log("Main");
    //dispatch(fetchUser() as any);
    dispatch(fetchUserPosts() as any);
  }, []);

  return (
    <Tab.Navigator initialRouteName={navigationConst.FEED} labeled={false}>
      <Tab.Screen
        name={navigationConst.FEED}
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={icons.HOME}
              color={color}
              size={values.ICON_SIZE}
            />
          ),
        }}
      />
      <Tab.Screen
        name={navigationConst.ADD_CONTAINER}
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate(navigationConst.ADD);
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={icons.ADD}
              color={color}
              size={values.ICON_SIZE}
            />
          ),
        }}
      />
      <Tab.Screen
        name={navigationConst.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={icons.PROFILE}
              color={color}
              size={values.ICON_SIZE}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
