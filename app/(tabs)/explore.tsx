import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SupportChat from "../../components/supportchat";

const FILTERS = ["Mọi thể loại", "Hang động", "Cảm giác mạnh", "Phiêu lưu"];

const CARDS = [
  {
    id: 1,
    title: "Tàu lượn siêu tốc",
    description:
      "Độ tuổi yêu cầu: Từ 10 tuổi trở lên\nChiều cao tối thiểu: 130 cm",
    image: require("../../assets/images/tau-luon-sieu-toc.png"),
    time: "~5 min",
    distance: "Cách 200m",
    categoryIndex: 2, // Cảm giác mạnh
  },
  {
    id: 2,
    title: "Vòng quay mặt trời",
    description:
      "Độ tuổi yêu cầu: Từ 10 tuổi trở lên\nChiều cao tối thiểu: 130 cm",
    image: require("../../assets/images/vong-quay-mat-troi.png"),
    time: "~3 min",
    distance: "Cách 100m",
    categoryIndex: 3, // Phiêu lưu
  },
  {
    id: 3,
    title: "Lâu đài băng đăng",
    description:
      "Khám phá thế giới băng giá với các tác phẩm điêu khắc băng nghệ thuật, không gian lạnh và check-in cực chất.",
    image: require("../../assets/images/logo-dam-sen.png"),
    time: "~2 min",
    distance: "Cách 80m",
    categoryIndex: 0, // Mọi thể loại
  },
  {
    id: 4,
    title: "Vòng đu quay",
    description:
      "Trải nghiệm cảm giác lơ lửng trên không và ngắm nhìn toàn cảnh công viên từ trên cao.",
    image: require("../../assets/images/vong-quay-mat-troi.png"),
    time: "~4 min",
    distance: "Cách 150m",
    categoryIndex: 1, // Hang động
  },
  {
    id: 5,
    title: "Vườn khủng long",
    description:
      "Khám phá thế giới khủng long sống động với nhiều mô hình tương tác",
    image: require("../../assets/images/logo-dam-sen1.png"),
    time: "~6 min",
    distance: "Cách 300m",
    categoryIndex: 3, // Phiêu lưu
  },
];

export default function ExploreScreen() {
  const [selected, setSelected] = useState(0);

  return (
    <View style={styles.screen}>
      {/* Filter Chips */}
      <View style={{ height: 64, backgroundColor: "#fff" }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterBar}
        >
          {FILTERS.map((item, idx) => {
            const isSelected = selected === idx;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => setSelected(idx)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.chipText,
                    isSelected && styles.chipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Card List */}
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardGrid}
          style={{ flex: 1 }}
        >
          {CARDS.map((card, idx) => (
            <View key={card.id} style={styles.card}>
              <View style={styles.imageContainer}>
                <Image
                  source={card.image}
                  style={styles.image}
                  resizeMode="cover"
                />
                {/* Badge category và time cùng hàng góc trái dưới */}
                <View style={styles.badgeBottomRow}>
                  <View style={[styles.badge, styles.badgeCategory]}>
                    <Text style={styles.badgeCategoryText}>
                      {FILTERS[card.categoryIndex]}
                    </Text>
                  </View>
                  <View style={[styles.badge, styles.badgeTime]}>
                    <Text style={styles.badgeText}>{card.time}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardDescription}>{card.description}</Text>
                <View style={styles.cardFooter}>
                  <View style={styles.badgeRow}>
                    <View style={[styles.badge, styles.badgeDistance]}>
                      <Text style={styles.badgeText}>{card.distance}</Text>
                    </View>
                  </View>
                  <View style={styles.buttonColumn}>
                    <TouchableOpacity 
                      style={styles.button} 
                      activeOpacity={0.8}
                      onPress={() => router.push({ pathname: '/exploreDetail', params: { id: card.id } })}
                    >
                      <Text style={styles.buttonText}>Xem chi tiết</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonDirection]}
                      activeOpacity={0.8}
                      onPress={() => router.push('/(tabs)/map')}
                    >
                      <View style={styles.buttonDirectionContent}>
                        <Ionicons name="navigate" size={16} color="#2196F3" style={{ marginRight: 6 }} />
                        <Text style={styles.buttonDirectionText}>
                          Chỉ đường
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <SupportChat />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  filterBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    minHeight: 56,
    backgroundColor: "#fff", // filter chip bar màu trắng
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#fff", // chip màu trắng
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  chipSelected: {
    backgroundColor: "#FFA1D7",
    borderColor: "#FFA1D7",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#333333",
    letterSpacing: 0.3,
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "500",
  },
  cardGrid: {
    paddingBottom: 100,
    paddingHorizontal: 0,
  },
  card: {
    width: "92%",
    alignSelf: "center",
    marginVertical: 16,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    height: 220,
    backgroundColor: "#C0C0C0",
    width: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 8,
    lineHeight: 22,
    letterSpacing: -0.3,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 16,
    lineHeight: 20,
    letterSpacing: 0,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 25,
    alignSelf: "flex-start",
    marginRight: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  badgeTime: {
    backgroundColor: "#FDE3F2",
    borderColor: "#FDE3F2",
  },
  badgeDistance: {
    backgroundColor: "#A9D0B1",
    borderColor: "#A9D0B1",
  },
  badgeText: {
    fontSize: 12,
    color: "#333333",
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: "#A9D0B1",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  buttonColumn: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: 8,
  },
  buttonDirection: {
    backgroundColor: "#D5EDFF",
    marginBottom: 0,
  },
  buttonDirectionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDirectionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  badgeCategory: {
    backgroundColor: "#FFA1D7",
    borderColor: "#FFA1D7",
  },
  badgeCategoryText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  badgeBottomRow: {
    position: "absolute",
    left: 12,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 2,
  },
});
