import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Common header left component with back button
const HeaderLeft = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={{
      flexDirection: "row",
      alignItems: "center",
      paddingRight: 40,
      paddingLeft: 0,
      marginLeft: 0,
    }}
    onPress={onPress}
  >
    <Ionicons name="arrow-back" size={22} color="#FF69B4" />
    <Text
      style={{
        color: "#FF69B4",
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 4,
      }}
    >
      Quay về
    </Text>
  </TouchableOpacity>
);

// Common header title component
const HeaderTitle = ({ title }: { title: string }) => (
  <View style={{ paddingLeft: 12 }}>
    <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
      {title}
    </Text>
  </View>
);

export default function RootLayout() {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Notification Screen */}
        <Stack.Screen
          name="notification"
          options={{
            headerTitle: () => <HeaderTitle title="Thông báo" />,
            headerRight: () => null,
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerShadowVisible: true,
            headerLeft: () => <HeaderLeft onPress={() => router.back()} />,
          }}
        />

        {/* Buy Ticket Screen */}
        <Stack.Screen
          name="buyticket"
          options={{
            headerTitle: () => <HeaderTitle title="Mua vé" />,
            headerLeft: () => <HeaderLeft onPress={() => router.back()} />,
            headerStyle: { backgroundColor: "#fff" },
          }}
        />

        {/* Choose Ticket Screen */}
        <Stack.Screen
          name="chooseticket"
          options={{
            headerTitle: () => <HeaderTitle title="Chọn vé" />,
            headerRight: () => null,
            headerStyle: { backgroundColor: "#fff" },
            headerLeft: () => <HeaderLeft onPress={() => router.back()} />,
          }}
        />

        {/* Chatbot Screen */}
        <Stack.Screen
          name="chatbot"
          options={{
            headerTitle: () => <HeaderTitle title="Trợ lý ảo" />,
            headerLeft: () => <HeaderLeft onPress={() => router.back()} />,
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 8,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#00C851",
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{ color: "#00C851", fontSize: 14, fontWeight: "500" }}
                >
                  Online
                </Text>
              </View>
            ),
            headerStyle: { backgroundColor: "#fff" },
          }}
        />

        {/* Account Screen */}
        <Stack.Screen
          name="account"
          options={{
            headerTitle: () => <HeaderTitle title="Tài khoản" />,
            headerRight: () => null,
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: false, // Remove bottom border/shadow
            headerLeft: () => <HeaderLeft onPress={() => router.back()} />,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
