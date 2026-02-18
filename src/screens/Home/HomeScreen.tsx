import React from 'react';
import {Pressable, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation/RootNavigator';
import {Routes} from '../../navigation/routes';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  return (
    <View style={{flex: 1, padding: 16, gap: 12, justifyContent: 'center'}}>
      <Text style={{fontSize: 22, fontWeight: '800'}}>RN MVVM POC</Text>
      <Text>Home screen (iOS + Android)</Text>

      <Pressable
        onPress={() => navigation.navigate(Routes.Users)}
        style={{padding: 12, borderWidth: 1, borderRadius: 10}}>
        <Text style={{fontWeight: '700'}}>Go to Users</Text>
      </Pressable>
    </View>
  );
}