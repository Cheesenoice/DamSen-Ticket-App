import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

// Dữ liệu static cho notification
const notifications = [
  {
    id: 1,
    title: "Chúc mừng! Bạn vừa nhận được 100 điểm thưởng",
    description: "Hãy kiểm tra tài khoản để sử dụng điểm.",
    time: "1 phút trước",
    type: "reward",
    icon: "gift-outline",
    color: "#FF69B4",
  },
  {
    id: 2,
    title: "Vé của bạn đã được xác nhận",
    description: "Vé buffet ngày 27/07 đã sẵn sàng sử dụng.",
    time: "2 giờ trước",
    type: "ticket",
    icon: "ticket-outline",
    color: "#00C851",
  },
  {
    id: 3,
    title: "Khuyến mãi đặc biệt tháng 7",
    description: "Nhận ưu đãi giảm 20% giá vé khi mua online.",
    time: "Hôm nay, 09:00",
    type: "promo",
    icon: "pricetag-outline",
    color: "#FF8FD0",
  },
  {
    id: 4,
    title: "Cập nhật: Chính sách đổi vé mới",
    description: "Bạn có thể đổi vé linh hoạt hơn từ 25/07.",
    time: "Hôm qua, 18:30",
    type: "info",
    icon: "information-circle-outline",
    color: "#4FC3F7",
  },
  {
    id: 5,
    title: "Thông báo bảo trì hệ thống",
    description: "Ứng dụng sẽ bảo trì từ 23:00 ngày 28/07 đến 02:00 ngày 29/07.",
    time: "Hôm nay, 14:00",
    type: "maintenance",
    icon: "construct-outline",
    color: "#FFA726",
  },
  {
    id: 6,
    title: "Sự kiện: Đêm nhạc ngoài trời",
    description: "Tham gia đêm nhạc miễn phí vào tối thứ 7 tại quảng trường trung tâm.",
    time: "2 ngày trước",
    type: "event",
    icon: "musical-notes-outline",
    color: "#AB47BC",
  },
  {
    id: 7,
    title: "Nhắc nhở: Đánh giá trải nghiệm",
    description: "Hãy để lại đánh giá sau khi tham quan để nhận quà tặng hấp dẫn!",
    time: "3 ngày trước",
    type: "reminder",
    icon: "star-outline",
    color: "#FFD600",
  },
  {
    id: 8,
    title: "Thông tin: Khu vực mới mở cửa",
    description: "Khu Thủy Cung đã mở cửa trở lại, mời bạn ghé thăm!",
    time: "4 ngày trước",
    type: "info",
    icon: "fish-outline",
    color: "#29B6F6",
  },
];

const NotificationScreen = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={[styles.iconContainer, { backgroundColor: item.color + "22" }]}> 
        <Ionicons name={item.icon as any} size={28} color={item.color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={true}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9F9F9",
    flexGrow: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  time: {
    fontSize: 12,
    color: "#AAA",
    fontStyle: "italic",
  },
});
