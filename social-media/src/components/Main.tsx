import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { View, Text } from "react-native";

export default function Main() {
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(getUser() as any);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>{userState.user?.name} is logged in</Text>
    </View>
  );
}
