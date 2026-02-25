import React, { useEffect } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootNavigator";
import { useUserDetailViewModel } from "../../viewmodels/userUserDetailViewModel";

type Props = NativeStackScreenProps<RootStackParamList, "UserDetail">;

export default function UserDetailScreen({ route }: Props) {
  const userId = route.params.userId;

  const { user, errorMessage, load, isLoading, isError } =
    useUserDetailViewModel();

  useEffect(() => {
    load(userId);
  }, [load, userId]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>User Detail</Text>
        <View style={{ marginTop: 16, alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>User Detail</Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: "#f5a3a3",
            backgroundColor: "#fff5f5",
            borderRadius: 12,
            padding: 12,
            marginTop: 12,
          }}
        >
          <Text style={{ color: "#b00020", marginBottom: 10 }}>
            Error: {errorMessage || "Something went wrong"}
          </Text>

          <Pressable
            style={{
              borderWidth: 1,
              borderColor: "#999",
              borderRadius: 10,
              paddingVertical: 10,
              alignItems: "center",
            }}
            onPress={() => load(userId)}
          >
            <Text style={{ fontWeight: "600" }}>Retry</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>User Detail</Text>
        <Text>No data</Text>
      </View>
    );
  }

  const address = user.address
    ? `${user.address.suite ?? ""} ${user.address.street ?? ""}, ${
        user.address.city ?? ""
      } - ${user.address.zipcode ?? ""}`
    : "-";

  return (
    <View style={{ flex: 1, padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>User Detail</Text>

      <Text>User ID: {user.id}</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>Website: {user.website}</Text>
      <Text>Username: {user.username ?? "-"}</Text>
      <Text>Address: {address}</Text>
      <Text>Company: {user.company?.name ?? "-"}</Text>
    </View>
  );
}