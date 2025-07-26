import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TabType = "userinfo" | "rewards" | "points";

export default function AccountScreen() {
  const navigation = useNavigation();
  const router = useRouter();


  const [activeTab, setActiveTab] = useState<TabType>("userinfo");

  const rewards = [
    {
      id: 1,
      title: "Vé buffet",
      points: 1000,
      description: "Có thời hạn 10 ngày sau khi đổi",
      backgroundColor: "#FDE3F2",
    },
    {
      id: 2,
      title: "Voucher giảm 20% giá vé",
      points: 1000,
      description: "Có thời hạn 10 ngày sau khi đổi",
      backgroundColor: "#D5EDFF",
    },
    {
      id: 3,
      title: "Coupon 2 Pepsi miễn phí",
      points: 500,
      description: "Có thời hạn 3 ngày sau khi đổi",
      backgroundColor: "#E8F5E8",
    },
  ];

  const pointsHistory = [
    { date: "14/07", points: "+150 điểm", type: "earn" },
    { date: "01/07", points: "+300 điểm", type: "earn" },
    {
      date: "20/06",
      points: "+800 điểm",
      description: "(Nạp ví điện tử)",
      type: "earn",
    },
  ];

  const renderUserInfo = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Avatar and Basic Info */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/images/logo-dam-sen.png")}
            style={[
              styles.avatar,
              {
                backgroundColor: '#fff',
                resizeMode: 'cover',
                borderWidth: 1,
                borderColor: '#eee',
              },
            ]}
          />
        </View>
        <Text style={styles.userName}>Lê Văn A</Text>
        <Text style={styles.membershipBadge}>🎖️ Thành viên Bạc</Text>
      </View>

      {/* User Details */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Mã thành viên</Text>
          <Text style={styles.infoValue}>Damsen20250716</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Số điện thoại</Text>
          <Text style={styles.infoValue}>0987 654 321</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>van.awork@gmail.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Ngày sinh</Text>
          <Text style={styles.infoValue}>22/02/2000</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Hạng thành viên</Text>
          <Text style={styles.infoValue}>🎖️ Thành viên Bạc</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Ngày tham gia</Text>
          <Text style={styles.infoValue}>27/10/2024</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderRewards = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Points Balance */}
      <View style={styles.pointsHeader}>
        <Text style={styles.pointsTitle}>⭐ 1250 điểm</Text>
      </View>

      {/* Rewards List */}
      <View style={styles.rewardsContainer}>
        {rewards.map((reward) => (
          <View
            key={reward.id}
            style={[
              styles.rewardCard,
              { backgroundColor: reward.backgroundColor },
            ]}
          >
            <View style={styles.rewardContent}>
              <Text style={styles.rewardTitle}>{reward.title}</Text>
              <Text style={styles.rewardPoints}>{reward.points} điểm</Text>
              <Text style={styles.rewardDescription}>{reward.description}</Text>
            </View>
            <TouchableOpacity style={styles.exchangeButton}>
              <Text style={styles.exchangeButtonText}>Đổi</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderPoints = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Points Summary */}
      <View style={styles.pointsSummary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Tổng điểm</Text>
          <Text style={styles.summaryValue}>⭐ 1250 điểm</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Hạng thành viên</Text>
          <Text style={styles.summaryValue}>🎖️ Thành viên Bạc</Text>
        </View>
      </View>

      {/* Points History */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Lịch sử tích điểm:</Text>
        {pointsHistory.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyDate}>• {item.date}:</Text>
            <Text style={styles.historyPoints}>{item.points}</Text>
            {item.description && (
              <Text style={styles.historyDescription}>{item.description}</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView style={styles.container}>
        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "userinfo" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("userinfo")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "userinfo" && styles.tabTextActive,
              ]}
            >
              Thông tin
            </Text>
            {activeTab === "userinfo" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "rewards" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("rewards")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "rewards" && styles.tabTextActive,
              ]}
            >
              Ưu đãi
            </Text>
            {activeTab === "rewards" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "points" && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab("points")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "points" && styles.tabTextActive,
              ]}
            >
              Tích điểm
            </Text>
            {activeTab === "points" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={{ flex: 1 }}>
          {activeTab === "userinfo" && renderUserInfo()}
          {activeTab === "rewards" && renderRewards()}
          {activeTab === "points" && renderPoints()}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#D1FBD0",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  settingsButton: {
    padding: 8,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  tabButtonActive: {},
  tabText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#000",
    fontWeight: "700",
  },
  tabIndicator: {
    height: 6, // dày hơn
    width: 40, // ngắn lại, bạn có thể chỉnh 40 hoặc 50 tuỳ ý
    backgroundColor: "#FF8FD0",
    borderRadius: 3,
    alignSelf: "center", // căn giữa
    marginTop: 4,
    marginBottom: 1, // giảm xuống 0 cho sát header
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF69B4",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  membershipBadge: {
    fontSize: 16,
    color: "#FF69B4",
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  pointsHeader: {
    backgroundColor: "#FDE3F2",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  pointsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  rewardsContainer: {
    gap: 16,
  },
  rewardCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  rewardPoints: {
    fontSize: 14,
    color: "#FF69B4",
    fontWeight: "600",
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 12,
    color: "#666",
  },
  exchangeButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginLeft: 12,
  },
  exchangeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  pointsSummary: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  historySection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    flexWrap: "wrap",
  },
  historyDate: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
  },
  historyPoints: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
    marginRight: 8,
  },
  historyDescription: {
    fontSize: 14,
    color: "#666",
  },
});
