import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { navigationConst } from '../../constants/navigation';
import { MainTabParamList } from '../../types/MainTabParamList';
import { ErrorHandler } from '../error/ErrorHandler';

type searchScreenProp = MaterialBottomTabNavigationProp<
  MainTabParamList,
  "Search"
>;

export default function Search() {
  const navigation = useNavigation<searchScreenProp>();
  const [users, setUsers] = useState<any>([]);

  const fetchUsers = async (search: string) => {
    const usersCollectionRef = query(
      collection(getFirestore(), "users"),
      where("name", ">=", search)
    );
    const usersDocsSnap = await getDocs(usersCollectionRef);
    console.log(usersDocsSnap);
    let newUsers: object[] = [];
    usersDocsSnap.forEach((doc) => {
      console.log(doc);
      newUsers.push({ id: doc.id, data: doc.data() });
    });
    setUsers(newUsers);
  };
  return (
    <ErrorHandler>
      <View>
        <TextInput
          placeholder="Type Here..."
          onChangeText={async (search) => await fetchUsers(search)}
        />

        <FlatList
          numColumns={1}
          horizontal={false}
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Profile", { userId: item.id })
              }
            >
              <Text>{item.data.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ErrorHandler>
  );
}
