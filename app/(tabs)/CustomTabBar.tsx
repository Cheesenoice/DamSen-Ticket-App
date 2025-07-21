import { useRouter, useSegments } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TABS = [
  {
    id: "home",
    label: "Home",
    icon: require("../../assets/tab/Home.png"),
    route: "/",
    type: "standard",
  },
  {
    id: "map",
    label: "Map",
    icon: require("../../assets/tab/Map.png"),
    route: "/map",
    type: "standard",
  },
  {
    id: "qr",
    label: "QR",
    icon: require("../../assets/tab/QR.png"),
    route: "/qr",
    type: "special",
  },
  {
    id: "ticket",
    label: "Ticket",
    icon: require("../../assets/tab/Ticket.png"),
    route: "/ticket",
    type: "standard",
  },
  {
    id: "explore",
    label: "Explore",
    icon: require("../../assets/tab/Explore.png"),
    route: "/explore",
    type: "standard",
  },
] as const;

const TAB_BAR_HEIGHT = 100;

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const router = useRouter();
  const segments = useSegments();

  // Determine active tab by route
  const lastSegment =
    segments.length > 0 ? segments[segments.length - 1] : undefined;
  let activeIndex = TABS.findIndex((tab) => {
    if (tab.route === "/") {
      // Home tab: active if lastSegment is undefined or 'index'
      return !lastSegment || String(lastSegment) === "index";
    }
    return lastSegment === tab.id;
  });
  if (activeIndex === -1) {
    activeIndex = 0; // Default to Home tab
  }

  return (
    <View style={styles.tabBar}>
      {TABS.map((tab, idx) => {
        const focused = idx === activeIndex;
        const isQR = tab.type === "special";
        return (
          <TouchableOpacity
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={tab.label}
            onPress={() => router.push(tab.route as any)}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            {/* Active background indicator, absolutely positioned */}
            {focused && !isQR && (
              <View style={styles.activeBg} pointerEvents="none" />
            )}
            {isQR && <View style={styles.qrBg} pointerEvents="none" />}
            <View
              style={[styles.iconLabelWrapper, isQR && styles.qrIconWrapper]}
            >
              <Image source={tab.icon} style={styles.icon} />
              {!isQR && (
                <Text
                  style={[
                    styles.label,
                    focused ? styles.labelActive : styles.labelInactive,
                  ]}
                >
                  {tab.label}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    height: TAB_BAR_HEIGHT,
    paddingHorizontal: 8,
    paddingTop: 1,
    paddingBottom: 12, // tăng để vượt qua home indicator
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
    height: 60,
    paddingVertical: 8,
    paddingHorizontal: 0,
    // For stacking the background absolutely
    position: "relative",
  },
  iconLabelWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  qrIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  activeBg: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -35 }], // (width 70 / 2)
    width: 70,
    height: 60,
    backgroundColor: "#FDE3F2",
    borderRadius: 25,
    zIndex: 0,
  },
  qrBg: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -30 }], // (width 60 / 2)
    width: 60,
    height: 60,
    backgroundColor: "#D1FBD0",
    borderRadius: 25,
    zIndex: 0,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginBottom: 0,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  labelInactive: {
    color: "#9CA3AF",
    fontWeight: "400",
  },
  labelActive: {
    color: "#9CA3AF",
    fontWeight: "bold",
  },
  labelQR: {
    color: "#4B5563",
  },
});
