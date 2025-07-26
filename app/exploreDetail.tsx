import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SupportChat from "../components/supportchat";

import { router, useLocalSearchParams } from "expo-router";

const GAME_DETAILS = [
  {
    id: 1,
    title: "Tàu lượn siêu tốc",
    description:
      "Thỏa sức vui chơi với hàng chục máng trượt, hồ tạo sóng và các trò chơi nước sôi động. Công viên nước Đầm Sen – nơi cả gia đình cùng tận hưởng một ngày hè mát lạnh và đầy sắc màu!",
    image: require("../assets/images/tau-luon-sieu-toc.png"),
    wait: 30,
    distance: 300,
    price: "50.000",
  },
  {
    id: 2,
    title: "Vòng quay mặt trời",
    description:
      "Ngắm toàn cảnh công viên từ trên cao và trải nghiệm cảm giác phiêu lưu nhẹ nhàng.",
    image: require("../assets/images/vong-quay-mat-troi.png"),
    wait: 10,
    distance: 100,
    price: "40.000",
  },
  {
    id: 3,
    title: "Lâu đài băng đăng",
    description:
      "Khám phá thế giới băng giá với các tác phẩm điêu khắc băng nghệ thuật, không gian lạnh và check-in cực chất.",
    image: require("../assets/images/logo-dam-sen.png"),
    wait: 5,
    distance: 80,
    price: "30.000",
  },
  {
    id: 4,
    title: "Vòng đu quay",
    description: "Trải nghiệm cảm giác lơ lửng trên không và ngắm nhìn toàn cảnh công viên từ trên cao.",
    image: require("../assets/images/vong-quay-mat-troi.png"),
    wait: 15,
    distance: 150,
    price: "35.000",
  },
  {
    id: 5,
    title: "Vườn khủng long",
    description:
      "Khám phá thế giới khủng long sống động với nhiều mô hình tương tác và khu check-in độc đáo.",
    image: require("../assets/images/logo-dam-sen1.png"),
    wait: 8,
    distance: 300,
    price: "45.000",
  },
];

export default function ExploreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const game = GAME_DETAILS.find((g) => g.id === Number(id));

  if (!game) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Không tìm thấy thông tin trò chơi.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={game.image}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Wait Time and Distance Cards */}
          <View style={styles.infoCardsRow}>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardNumber}>{game.wait}</Text>
              <Text style={styles.infoCardLabel}>phút chờ</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoCardNumber}>{game.distance}</Text>
              <Text style={styles.infoCardLabel}>mét cách xa</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{game.title}</Text>

          {/* Description */}
          <Text style={styles.description}>{game.description}</Text>

          {/* Price Section */}
          <View style={styles.priceSectionRow}>
            <Text style={styles.priceLabel}>Giá vé</Text>
            <Text style={styles.priceValue}>{game.price}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.ticketButton} activeOpacity={0.8}>
              <Text style={styles.ticketButtonText}>Đặt vé</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.directionButton}
              activeOpacity={0.8}
              onPress={() => router.push("/(tabs)/map")}
            >
              <Text style={styles.directionButtonText}>Xem đường đi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <SupportChat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    backgroundColor: "#C0C0C0",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoCardsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoCard: {
    backgroundColor: "#D1FBD0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    minWidth: 80,
  },
  infoCardNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 2,
  },
  infoCardLabel: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 24,
  },
  priceSectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    width: "100%",
    paddingHorizontal: 4,
  },
  priceLabel: {
    fontSize: 16,
    color: "#666",
  },
  priceValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#E91E63",
  },
  buttonContainer: {
    gap: 12,
    paddingBottom: 40,
  },
  ticketButton: {
    backgroundColor: "#FF69B4",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  directionButton: {
    backgroundColor: "#D5EDFF",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B3D9FF",
  },
  directionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
