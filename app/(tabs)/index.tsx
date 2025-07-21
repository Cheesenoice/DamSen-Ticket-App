import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: 120, // Tăng chiều cao header
        backgroundColor: "#D1FBD0", // Thêm màu nền xanh lá
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
          <Feather
            name="bell"
            size={22}
            color="#000"
            style={{ marginRight: 12 }}
          />
          <View
            style={{
              width: 28,
              height: 28,
              backgroundColor: "#bbb",
              borderRadius: 14,
            }}
          />
        </View>
      ),
      headerTitle: "",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#ff69b4"
            style={{ marginRight: 12 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm mọi thứ tại đây!"
            placeholderTextColor="#999"
            editable={true}
          />
        </View>

        {/* Action Cards */}
        <View style={styles.actionCardsContainer}>
          <View style={[styles.actionCard, styles.actionCardPink]}>
            <Image
              source={require("../../assets/images/mua-ve.jpg")}
              style={styles.actionImage}
              resizeMode="cover"
            />
            <Text style={styles.actionTitle}>Mua vé</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Mua ngay</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.actionCard, styles.actionCardPink]}>
            <Image
              source={require("../../assets/images/su-kien.jpg")}
              style={styles.actionImage}
              resizeMode="cover"
            />
            <Text style={styles.actionTitle}>Sự kiện</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Khám phá</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Games Section */}
        <View style={styles.featureSection}>
          <Text style={styles.sectionTitle}>CÁC TRÒ CHƠI HẤP DẪN</Text>
          <Text style={styles.sectionDescription}>
            Trải nghiệm hơn 50 trò chơi hấp dẫn ngay tại Đầm sen
          </Text>
          <TouchableOpacity style={styles.featureButton}>
            <Text style={styles.featureButtonText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        {/* Family Combo Section */}
        <View style={styles.comboSection}>
          <Text style={styles.sectionTitle}>COMBO DÀNH CHO GIA ĐÌNH</Text>
          <Text style={styles.sectionDescription}>
            Khuyến mãi chỉ với giá 2.295.000đ bao gồm:
          </Text>
          <View style={{ marginLeft: 16, marginBottom: 8 }}>
            <Text style={styles.bulletPoint}>• 10 vé vào cửa</Text>
            <Text style={styles.bulletPoint}>• Pepsi lon x 5</Text>
          </View>
          <TouchableOpacity style={styles.comboButton}>
            <Text style={styles.comboButtonText}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 32,
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginTop: 12,
  },
  searchInput: {
    fontSize: 16,
    color: "#999",
    flex: 1,
  },
  actionCardsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    alignItems: "flex-start",
  },
  actionCardPink: {
    backgroundColor: "#FDE3F2",
    borderColor: "#d63384", // Đổi sang màu hồng đậm
    borderWidth: 1, // Viền mỏng lại
  },
  actionImage: {
    width: "100%",
    height: 100,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  actionSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
  },
  actionButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  actionButtonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  featureSection: {
    backgroundColor: "#D5EDFF",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  featureButton: {
    alignSelf: "flex-end",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#0066cc",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  featureButtonText: {
    color: "#0066cc",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  comboSection: {
    backgroundColor: "#FDE3F2",
    borderRadius: 8,
    padding: 20,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  comboButton: {
    alignSelf: "flex-end",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d63384",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  comboButtonText: {
    color: "#d63384",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  header: {
    paddingBottom: 16,
    marginBottom: 12,
  },
});
