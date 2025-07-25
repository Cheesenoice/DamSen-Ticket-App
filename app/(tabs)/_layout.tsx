import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomTabBar from "./CustomTabBar";

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerTintColor: "#000",
        tabBarStyle: {
          backgroundColor: "#25292e",
          marginBottom: 16, // hoặc marginBottom: 16
        },
      }}
    >
      <Tabs.Screen name="index" options={{
        title: "Trang chủ",
        headerStyle: {
          height: 120,
          backgroundColor: "#D1FBD0",
        },
        headerLeft: () => (
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              paddingLeft: 12,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
              Chào mừng
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#d63384",
                fontWeight: "600",
                marginTop: 2,
                marginBottom: 8,
              }}
            >
              Đầm sen Park
            </Text>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 12,
            }}
          >
            <TouchableOpacity onPress={() => router.push("/notification")}>
              <Feather
                name="bell"
                size={22}
                color="#000"
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/account")}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#bbb",
                  borderRadius: 14,
                }}
              />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: "",
      }} />
      <Tabs.Screen name="about" options={{ title: "About" }} />
      <Tabs.Screen name="ticket" options={{
        title: "Ticket",
        headerStyle: { backgroundColor: "#fff" },
        headerLeft: () => (
          <View style={{ paddingLeft: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
              Vé
            </Text>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 12,
            }}
          >
            <TouchableOpacity onPress={() => router.push("/notification")}>
              <Feather
                name="bell"
                size={22}
                color="#000"
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/account")}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#bbb",
                  borderRadius: 14,
                }}
              />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: "",
      }} />
      <Tabs.Screen name="qr" options={{
        title: "QR",
        headerStyle: { backgroundColor: "#fff" },
        headerLeft: () => (
          <View style={{ paddingLeft: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
              Quét mã QR
            </Text>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 12,
            }}
          >
            <TouchableOpacity onPress={() => router.push("/notification")}>
              <Feather
                name="bell"
                size={22}
                color="#000"
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/account")}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#bbb",
                  borderRadius: 14,
                }}
              />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: () => null,
      }} />
      <Tabs.Screen name="map" options={{ title: "Map", headerShown: false }} />
      <Tabs.Screen name="explore" options={{
        title: "Explore",
        headerStyle: { backgroundColor: "#fff" },
        headerLeft: () => (
          <View style={{ paddingLeft: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
              Khám phá
            </Text>
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 12,
            }}
          >
            <TouchableOpacity onPress={() => router.push("/notification")}>
              <Feather
                name="bell"
                size={22}
                color="#000"
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/account")}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: "#bbb",
                  borderRadius: 14,
                }}
              />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: () => null,
      }} />
    </Tabs>
  );
}
