import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { navigationConst } from '../../constants/navigation';

export default function Search() {
  const navigation = useNavigation<any>();
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
              navigation.navigate(navigationConst.PROFILE, { uid: item.id })
            }
          >
            <Text>{item.data.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
