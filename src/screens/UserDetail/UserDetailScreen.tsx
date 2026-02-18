import React from 'react';
import {Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'UserDetail'>;

export default function UserDetailScreen({route}: Props) {
  return (
    <View style={{flex: 1, padding: 16, gap: 8}}>
      <Text style={{fontSize: 18, fontWeight: '800'}}>User Detail</Text>
      <Text>User ID: {route.params.userId}</Text>
    </View>
  );
}