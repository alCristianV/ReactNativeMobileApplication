import { getAuth } from 'firebase/auth';
import React, { useContext } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { AuthContext } from '../../../App';
import { icons } from '../../constants/icons';
import { navigationConst } from '../../constants/navigation';
import { values } from '../../constants/values';
import { ErrorHandler } from '../error/ErrorHandler';
import FeedScreen from './Feed';
import ProfileScreen from './Profile';
import SearchScreen from './Search';

const EmptyScreen = () => {
  return null;
};

const Tab = createMaterialBottomTabNavigator();

export default function Main() {
  const auth = useContext(AuthContext);

  return (
    <ErrorHandler>
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
          name={navigationConst.SEARCH}
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={icons.SEARCH}
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
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate(navigationConst.PROFILE, {
                uid: auth.currentUser?.uid as string,
              });
            },
          })}
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
    </ErrorHandler>
  );
}
