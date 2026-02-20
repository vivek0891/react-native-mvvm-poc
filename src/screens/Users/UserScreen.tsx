

import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../navigation/RootNavigator";
import { Routes } from "../../navigation/routes";
import { useUsersViewModel } from "../../viewmodels/userUsersViewModel";
import { styles } from "./UserScreen.styles";

type Props = NativeStackScreenProps<RootStackParamList, "Users">;

export default function UserScreen({ navigation }: Props) {
  const { status, filteredUsers, query, setQuery, load, errorMessage } =
    useUsersViewModel();

  // Load only once on screen mount
  useEffect(() => {
    load();
  }, [load]);

  const isLoading = status === "loading";
  const isError = status === "error";

  return (
    <View style={styles.container}>
      {/* Search */}
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search by name/email"
        placeholderTextColor="#888"
        style={styles.search}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        returnKeyType="search"
      />

      {/* Error box (doesn't push list too much) */}
      {isError ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>
            Error: {errorMessage || "Something went wrong"}
          </Text>

          <Pressable style={styles.retryBtn} onPress={load}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      ) : null}

      {/* List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => String(item.id)} // IMPORTANT: stable key
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === "ios" ? "on-drag" : "none"}
        removeClippedSubviews={true}
        initialNumToRender={12}
        windowSize={10}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          isLoading ? null : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                {query.trim().length > 0 ? "No results" : "No users found"}
              </Text>
            </View>
          )
        }
        // Loader as footer so it does NOT change layout height and cause "jumping"
        ListFooterComponent={
          isLoading ? (
            <View style={styles.loaderBox}>
              <ActivityIndicator />
            </View>
          ) : null
        }
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles.row}
              onPress={() =>
                navigation.navigate(Routes.UserDetail, { userId: item.id })
              }
            >
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={styles.email}>
                {item.email}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
