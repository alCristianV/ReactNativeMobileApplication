import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

export type RegisterProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;
