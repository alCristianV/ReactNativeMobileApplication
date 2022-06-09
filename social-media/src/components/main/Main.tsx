import React, { useContext } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    createMaterialBottomTabNavigator, MaterialBottomTabNavigationProp
} from '@react-navigation/material-bottom-tabs';

import { AuthContext } from '../../../App';
import { icons } from '../../constants/icons';
import { navigationConst } from '../../constants/navigation';
import { values } from '../../constants/values';
import { MainTabParamList } from '../../types/MainTabParamList';
import { ErrorHandler } from '../error/ErrorHandler';
import AddScreen from './Add';
import FeedScreen from './Feed';
import ProfileScreen from './Profile';
import SearchScreen from './Search';

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

type searchScreenProp = MaterialBottomTabNavigationProp<
  MainTabParamList,
  "Search"
>;

export default function Main() {
  const auth = useContext(AuthContext);

  return (
    <ErrorHandler>
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
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
          name="Search"
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
          name="Add"
          component={AddScreen}
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
          name="Profile"
          component={ProfileScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              (navigation as searchScreenProp).navigate("Profile", {
                userId: auth.currentUser?.uid!,
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
