import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { chatWithGemini, GeminiApiContent } from "./geminiChat";
// import logoDamSen from "../assets/images/logo-dam-sen.png";
const logoDamSen = require("../assets/images/logo-dam-sen.png");

const initialMessages = [
  {
    id: "1",
    type: "incoming",
    text: "Xin chào! Bé Sen có thể giúp gì cho bạn hôm nay?🤔",
    timestamp: new Date().toISOString(),
  },
];

export default function ChatbotScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [chatHistory, setChatHistory] = useState<GeminiApiContent[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);
  const { preset } = useLocalSearchParams();
  const [presetSent, setPresetSent] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyDots, setEmergencyDots] = useState("");
  const emergencyInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Gửi tin nhắn tự động nếu có preset
  React.useEffect(() => {
    if (!preset || presetSent) return;
    let text = "";
    if (preset === "toibilac") text = "Trẻ em bị lạc";
    if (preset === "toibimatdo") text = "Tôi bị mất đồ";
    if (preset === "ho_tro_y_te") text = "Tôi cần hỗ trợ y tế";
    if (preset === "ho_tro_khac") text = "Tôi cần hỗ trợ hỏi đáp";
    if (text) {
      setPresetSent(true);
      sendMessage(text);
    }
  }, [preset, presetSent]);

  const sendMessage = async (overrideText?: string) => {
    const messageText = overrideText !== undefined ? overrideText : input;
    if (!messageText.trim()) return;
    const userMsg = {
      id: Date.now().toString(),
      type: "outgoing",
      text: messageText,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      // Gọi Gemini với chat history
      const data = await chatWithGemini(userMsg.text, chatHistory);

      // Cập nhật UI
      const aiMsg = {
        id: Date.now().toString() + "-ai",
        type: "incoming",
        text: data.reply, 
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);

      // Cập nhật chat history để gửi trong lần gọi tiếp theo
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "user", parts: [{ text: userMsg.text }] },
        { role: "model", parts: [{ text: data.reply }] },
      ]);

      if (data.isEmergency) {
        setIsEmergency(true);
      } else {
        setIsEmergency(false);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-fail",
          type: "incoming",
          text: "Không thể kết nối tới trợ lý. Vui lòng thử lại sau.",
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsEmergency(false);
    }
    setLoading(false);
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Hàm gửi tin nhắn từ input (dùng cho onSubmitEditing và onPress)
  const sendMessageFromInput = (e?: any) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    sendMessage();
  };

  // Animation for emergency dots
  React.useEffect(() => {
    if (isEmergency) {
      if (emergencyInterval.current) clearInterval(emergencyInterval.current);
      let dots = "";
      emergencyInterval.current = setInterval(() => {
        dots = dots.length < 3 ? dots + "." : "";
        setEmergencyDots(dots);
      }, 500);
    } else {
      if (emergencyInterval.current) clearInterval(emergencyInterval.current);
      setEmergencyDots("");
    }
    return () => {
      if (emergencyInterval.current) clearInterval(emergencyInterval.current);
    };
  }, [isEmergency]);

  const renderMessage = ({ item }: { item: any }) => {
    const isIncoming = item.type === "incoming";
    return (
      <View
        style={[
          styles.messageRow,
          { justifyContent: isIncoming ? "flex-start" : "flex-end" },
        ]}
      >
        {isIncoming && (
          <View style={styles.avatarContainer}>
            <Image source={logoDamSen} style={styles.avatarLogo} />
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            isIncoming ? styles.incomingBubble : styles.outgoingBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isIncoming ? styles.incomingText : styles.outgoingText,
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 100}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Chat messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        {/* Emergency transfer message */}
        {isEmergency && (
          <View style={styles.emergencyContainer}>
            <Text style={styles.emergencyText}>
              Đang chuyển sang cho nhân viên{emergencyDots}
            </Text>
          </View>
        )}
        {/* Input area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
            editable={!loading}
            onSubmitEditing={sendMessageFromInput}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => sendMessageFromInput()}
            disabled={loading || !input.trim()}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Ionicons name="send" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  chatContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
  },
  avatar: {
    // Xóa style cũ, không dùng nữa
    // width: 32,
    // height: 32,
    // borderRadius: 16,
    // backgroundColor: "#00C851",
    // marginRight: 12,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#D5EDFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: "80%",
  },
  incomingBubble: {
    backgroundColor: "#E8E8E8",
    borderBottomLeftRadius: 4,
    alignSelf: "flex-start",
  },
  outgoingBubble: {
    backgroundColor: "#FF69B4",
    borderBottomRightRadius: 4,
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  incomingText: {
    color: "#000",
  },
  outgoingText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 0,
    borderWidth: 0,
    outlineWidth: 0,
    borderColor: "transparent",
    outlineColor: "transparent",
    backgroundColor: "transparent",
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF69B4",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  emergencyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  emergencyText: {
    color: "#FF69B4",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 2,
  },
});
