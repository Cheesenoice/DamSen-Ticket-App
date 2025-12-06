import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const logoDamSen = require("../assets/images/logo-dam-sen.png");

const SupportChat = () => {
  const router = useRouter();
  const [showBubble, setShowBubble] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let timer: any;
    if (showBubble) {
      timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }).start(() => setShowBubble(false));
      }, 5000);
    }
    return () => timer && clearTimeout(timer);
  }, [showBubble, fadeAnim]);

  const handlePress = () => {
    router.push("/chatbot");
  };

  return (
    <View style={styles.floatingButtonContainer}>
      {showBubble && (
        <View style={styles.bubbleWrapper}>
          <Animated.View style={[styles.chatBubble, { opacity: fadeAnim }]}>
            <View style={styles.bubbleContent}>
              <Text style={styles.bubbleText}>Chat với Bé Sen</Text>
            </View>
          </Animated.View>
          <Animated.View style={[styles.bubbleArrow, { opacity: fadeAnim }]} />
        </View>
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <Image source={logoDamSen} style={styles.logo} resizeMode="contain" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    zIndex: 1000,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF69B4",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  bubbleWrapper: {
    position: "absolute",
    bottom: 64,
    right: 0,
    alignItems: "flex-end",
    zIndex: 1001,
    maxWidth: 300,
  },
  chatBubble: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 140,
  },
  bubbleContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  bubbleText: {
    color: "#FF69B4",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  bubbleArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
    marginRight: 18,
    marginTop: -1,
    zIndex: 1002,
  },
});

export default SupportChat;
