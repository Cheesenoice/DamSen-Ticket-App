import { Feather } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
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
      <Tabs.Screen
        name="index"
        options={{
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
                ĐẦM SEN PARK
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
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#fff",
                    borderWidth: 3,
                    borderColor: "#FF69B4",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#FF69B4",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 6,
                    marginRight: 12,
                  }}
                >
                  <Feather name="bell" size={28} color="#FF69B4" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/account")}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#fff",
                    borderWidth: 3,
                    borderColor: "#FF69B4",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#FF69B4",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 6,
                    marginLeft: 2,
                  }}
                >
                  <Image
                    source={require("../../assets/images/logo-dam-sen.png")}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      resizeMode: "cover",
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: "",
        }}
      />
      <Tabs.Screen name="about" options={{ title: "About" }} />
      <Tabs.Screen
        name="ticket"
        options={{
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
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#fff",
                    borderWidth: 3,
                    borderColor: "#FF69B4",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#FF69B4",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 6,
                    marginRight: 12,
                  }}
                >
                  <Feather name="bell" size={28} color="#FF69B4" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/account")}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#fff",
                    borderWidth: 3,
                    borderColor: "#FF69B4",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#FF69B4",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 6,
                    marginLeft: 2,
                  }}
                >
                  <Image
                    source={require("../../assets/images/logo-dam-sen.png")}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      resizeMode: "cover",
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: "",
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
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
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#fff",
                    borderWidth: 3,
                    borderColor: "#FF69B4",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#FF69B4",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 6,
                    marginRight: 12,
                  }}
                >
                  <Feather name="bell" size={28} color="#FF69B4" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/account")}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#fff",
                    borderWidth: 3,
                    borderColor: "#FF69B4",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#FF69B4",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 6,
                    marginLeft: 2,
                  }}
                >
                  <Image
                    source={require("../../assets/images/logo-dam-sen.png")}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      resizeMode: "cover",
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => null,
        }}
      />
      <Tabs.Screen name="map" options={{ title: "Map", headerShown: false }} />
      <Tabs.Screen
        name="explore"
        options={{
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
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#fff",
                    borderWidth: 3,
                    borderColor: "#FF69B4",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#FF69B4",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 6,
                    marginRight: 12,
                  }}
                >
                  <Feather name="bell" size={28} color="#FF69B4" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/account")}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#fff",
                    borderWidth: 3,
                    borderColor: "#FF69B4",
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: "#FF69B4",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 6,
                    marginLeft: 2,
                  }}
                >
                  <Image
                    source={require("../../assets/images/logo-dam-sen.png")}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      resizeMode: "cover",
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ),
          headerTitle: () => null,
        }}
      />
    </Tabs>
  );
}
