import React from 'react';
import {Pressable, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation/RootNavigator';
import {Routes} from '../../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, 'Users'>;

export default function UsersScreen({navigation}: Props) {
  return (
    <View style={{flex: 1, padding: 16, gap: 12}}>
      <Text style={{fontSize: 18, fontWeight: '800'}}>Users (placeholder)</Text>
      <Text>Next: MVVM + dummy API + list</Text>

      <Pressable
        onPress={() => navigation.navigate(Routes.UserDetail, {userId: 1})}
        style={{padding: 12, borderWidth: 1, borderRadius: 10}}>
        <Text style={{fontWeight: '700'}}>Open User Detail</Text>
      </Pressable>
    </View>
  );
}