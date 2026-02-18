import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Routes} from './routes';
import HomeScreen from '../screens/Home/HomeScreen';
import UsersScreen from '../screens/Users/UserScreen';
import UserDetailScreen from '../screens/UserDetail/UserDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  Users: undefined;
  UserDetail: {userId: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Routes.Home} component={HomeScreen} />
        <Stack.Screen name={Routes.Users} component={UsersScreen} options={{title: 'Users'}} />
        <Stack.Screen name={Routes.UserDetail} component={UserDetailScreen} options={{title: 'User Detail'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}