import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Common header left component with back button
const HeaderLeft = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={{ flexDirection: "row", alignItems: "center", minWidth: 0 }}
    onPress={onPress}
  >
    <Ionicons name="arrow-back" size={22} color="#FF69B4" />
    <Text
      style={{
        color: "#FF69B4",
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 4,
        minWidth: 0,
        flexShrink: 1,
      }}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      Quay về
    </Text>
  </TouchableOpacity>
);

// Common header title component
const HeaderTitle = ({ title, style }: { title: string; style?: any }) => (
  <Text
    style={[
      {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        minWidth: 0,
        flexShrink: 1,
      },
      style,
    ]}
    numberOfLines={1}
    ellipsizeMode="tail"
  >
    {title}
  </Text>
);

// Common header right component (optional)
const HeaderRight = ({ children }: { children?: React.ReactNode }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      minWidth: 0,
      flexShrink: 1,
    }}
  >
    {children}
  </View>
);

// Custom header container to evenly space left, title, right
const CustomHeader = ({
  left,
  title,
  right,
}: {
  left?: React.ReactNode;
  title?: React.ReactNode;
  right?: React.ReactNode;
}) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      height: 56,
      width: "100%",
      gap: 8,
      backgroundColor: "#fff",
      minWidth: 0,
    }}
  >
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        minWidth: 0,
        flexShrink: 1,
      }}
    >
      {left}
    </View>
    <View
      style={{
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 0,
        flexShrink: 1,
      }}
    >
      {title}
    </View>
    <View
      style={{
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        minWidth: 0,
        flexShrink: 1,
      }}
    >
      {right}
    </View>
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
            header: () => (
              <CustomHeader
                left={<HeaderLeft onPress={() => router.back()} />}
                title={<HeaderTitle title="Thông báo" />}
              />
            ),
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
            header: () => (
              <CustomHeader
                left={<HeaderLeft onPress={() => router.back()} />}
                title={<HeaderTitle title="Mua vé" />}
              />
            ),
            headerLeft: () => <HeaderLeft onPress={() => router.back()} />,
            headerStyle: { backgroundColor: "#fff" },
          }}
        />

        {/* Choose Ticket Screen */}
        <Stack.Screen
          name="chooseticket"
          options={{
            header: () => (
              <CustomHeader
                left={<HeaderLeft onPress={() => router.back()} />}
                title={<HeaderTitle title="Chọn vé" />}
              />
            ),
            headerRight: () => null,
            headerStyle: { backgroundColor: "#fff" },
            headerLeft: () => <HeaderLeft onPress={() => router.back()} />,
          }}
        />

        {/* Chatbot Screen */}
        <Stack.Screen
          name="chatbot"
          options={{
            header: () => (
              <CustomHeader
                left={<HeaderLeft onPress={() => router.back()} />}
                title={
                  <HeaderTitle
                    title="Trợ lý ảo Bé Sen"
                    style={{ fontSize: 16 }}
                  />
                }
                right={
                  <HeaderRight>
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
                      style={{
                        color: "#00C851",
                        fontSize: 14,
                        fontWeight: "500",
                      }}
                    >
                      Online
                    </Text>
                  </HeaderRight>
                }
              />
            ),
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

        {/* Explore Detail Screen */}
        <Stack.Screen
          name="exploreDetail"
          options={{
            header: () => (
              <CustomHeader
                left={<HeaderLeft onPress={() => router.back()} />}
                title={<HeaderTitle title="Chi tiết" />}
              />
            ),
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: true,
            headerLeft: () => <HeaderLeft onPress={() => router.back()} />,
          }}
        />

        {/* Account Screen */}
        <Stack.Screen
          name="account"
          options={{
            header: () => (
              <CustomHeader
                left={<HeaderLeft onPress={() => router.back()} />}
                title={<HeaderTitle title="Tài khoản" />}
              />
            ),
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
