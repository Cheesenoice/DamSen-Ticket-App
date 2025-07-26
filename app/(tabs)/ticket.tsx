import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SupportChat from "../../components/supportchat";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.8; // 80% chiều rộng màn hình
const CARD_MARGIN = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;
const CARD_HEIGHT = Math.min(SCREEN_HEIGHT * 0.62, 480); // Giới hạn tối đa 480px
const SMALL_SCREEN = SCREEN_HEIGHT < 700;

export default function TicketScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"purchase" | "mytickets">(
    "purchase"
  );

  const purchaseTickets = [
    {
      id: 1,
      title: "CÁC LOẠI VÉ LẺ",
      benefits: [
        "Vé Vòng Quay: 30.000đ - 50.000đ / vé",
        "Riêng Băng Đăng: 70.000đ / vé",
      ],
      prices: { from: "30.000 VNĐ", to: "50.000 VNĐ" },
      backgroundColor: "#FDE3F2",
    },
    {
      id: 2,
      title: "VÉ THAM QUAN",
      benefits: ["Tham quan trong ngày", "Tham quan Đầm Sen"],
      ageLimit: "Từ 7 giá đến 20 giá",
      adultPrice: "160.000 VNĐ",
      childPrice: "100.000 VNĐ",
      adultAge: "Người lớn:",
      childAge: "Trẻ em <1.4m:",
      backgroundColor: "#FDE3F2",
    },
    {
      id: 3,
      title: "VÉ TRỌN GÓI",
      benefits: ["Tham quan trong ngày", "Bao gồm trò chơi", "Thủy Cung"],
      ageLimit: "Từ 7 giá đến 20 giá",
      adultPrice: "300.000 VNĐ",
      childPrice: "220.000 VNĐ",
      adultAge: "Người lớn:",
      childAge: "Trẻ em <1.4m:",
      backgroundColor: "#D5EDFF",
    },
  ];

  // Thay đổi myTicket thành mảng nhiều vé
  const myTickets = [
    {
      title: "VÉ TRỌN GÓI",
      owner: "Lê Văn A",
      benefits: "Không giới hạn các trò chơi và điểm tham quan",
      validUntil: "29 July, 2025",
      status: "Vé đã được kích hoạt",
      orderNumber: "747529362",
      purchaseDate: "29 July, 2025",
      note: "Lưu ý: Vé không hoàn tiền. Xuất trình CMND/CCCD tại cổng.",
      backgroundColor: "#D5EDFF",
    },
    {
      title: "VÉ THAM QUAN",
      owner: "Nguyễn Văn B",
      benefits: "Tham quan toàn khu, không bao gồm trò chơi",
      validUntil: "15 August, 2025",
      status: "Vé đã được kích hoạt",
      orderNumber: "123456789",
      purchaseDate: "10 August, 2025",
      note: "Lưu ý: Vé không hoàn tiền. Xuất trình CMND/CCCD tại cổng.",
      backgroundColor: "#FDE3F2",
    },
    {
      title: "VÉ TRÒ CHƠI",
      owner: "Trần Thị C",
      benefits: "Bao gồm tất cả dịch vụ và ưu tiên xếp hàng",
      validUntil: "01 September, 2025",
      status: "Vé đã được kích hoạt",
      orderNumber: "987654321",
      purchaseDate: "01 August, 2025",
      note: "Lưu ý: Vé không hoàn tiền. Xuất trình CMND/CCCD tại cổng.",
      backgroundColor: "#A8EB69",
    },
  ];

  const PurchaseTicketCard = ({ ticket, style }: any) => (
    <View
      style={[
        styles.ticketCard,
        { backgroundColor: ticket.backgroundColor },
        style,
      ]}
    >
      <View style={styles.ticketCardTopRow}>
        <Image
          source={require("../../assets/images/park-name.png")}
          style={styles.parkNameImageSmall}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => {
            if (ticket.title === "VÉ THAM QUAN") {
              router.push("/buyticket");
            } else if (ticket.title === "VÉ TRỌN GÓI") {
              router.push({
                pathname: "/buyticket",
                params: { type: "VÉ TRỌN GÓI" },
              });
            } else if (ticket.title === "CÁC LOẠI VÉ LẺ") {
              router.push("/explore");
            }
          }}
        >
          <Text style={styles.buyButtonText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ticketCardHeader}>
        <Text style={styles.ticketCardTitle}>{ticket.title}</Text>
      </View>
      <View style={{ marginBottom: 12 }}>
        {ticket.benefits.map((benefit: string, idx: number) => (
          <View key={idx} style={styles.benefitRow}>
            <View style={styles.bullet} />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>
      {ticket.ageLimit && (
        <View style={styles.infoRow}>
          <Feather
            name="clock"
            size={16}
            color="#666"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.infoText}>{ticket.ageLimit}</Text>
        </View>
      )}
      {ticket.adultPrice && (
        <View style={{ marginTop: 8 }}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{ticket.adultAge}</Text>
            <Text style={styles.priceValue}>{ticket.adultPrice}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>{ticket.childAge}</Text>
            <Text style={styles.priceValue}>{ticket.childPrice}</Text>
          </View>
        </View>
      )}
      {ticket.prices && (
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Từ:</Text>
          <Text style={styles.priceValue}>{ticket.prices.from}</Text>
          <Text style={styles.priceLabel}>Đến:</Text>
          <Text style={styles.priceValue}>{ticket.prices.to}</Text>
        </View>
      )}
    </View>
  );

  // Sửa MyTicketCard nhận props ticket
  const MyTicketCard = ({ ticket }: { ticket: (typeof myTickets)[0] }) => (
    <View
      style={[
        styles.myTicketCard,
        {
          backgroundColor: ticket.backgroundColor,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          maxHeight: CARD_HEIGHT,
          marginRight: CARD_MARGIN,
        },
      ]}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 8 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.myTicketHeader}>
          <Image
            source={require("../../assets/images/park-name.png")}
            style={styles.parkNameImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.myTicketTitle}>{ticket.title}</Text>
        <View style={styles.infoBlock}>
          <View style={styles.infoRow}>
            <Feather
              name="user"
              size={16}
              color="#666"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.infoLabel}>Sở hữu:</Text>
          </View>
          <Text style={styles.infoValue}>{ticket.owner}</Text>
        </View>
        <View style={styles.infoBlock}>
          <View style={styles.infoRow}>
            <Feather
              name="shield"
              size={16}
              color="#666"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.infoLabel}>Quyền lợi:</Text>
          </View>
          <Text style={styles.infoValue}>{ticket.benefits}</Text>
        </View>
        <View style={styles.infoBlock}>
          <View style={styles.infoRow}>
            <Feather
              name="calendar"
              size={16}
              color="#666"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.infoLabel}>Hiệu lực đến:</Text>
          </View>
          <Text style={styles.infoValue}>{ticket.validUntil}</Text>
        </View>
        <Text style={styles.statusText}>{ticket.status}</Text>
        <View style={styles.barcodeBox}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <View
                key={i}
                style={{
                  width: Math.random() > 0.5 ? 2 : 1,
                  height: 40,
                  backgroundColor: "#000",
                  marginHorizontal: 0.5,
                }}
              />
            ))}
          </View>
        </View>
        <View style={styles.orderRow}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather
              name="hash"
              size={16}
              color="#666"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.infoLabel}>Đơn #</Text>
          </View>
          <Text style={styles.infoValue}>{ticket.orderNumber}</Text>
        </View>
        <View style={styles.orderRow}>
          <Text style={styles.infoLabel}>Ngày mua:</Text>
          <Text style={styles.infoValue}>{ticket.purchaseDate}</Text>
        </View>
        <Text style={styles.noteText}>{ticket.note}</Text>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "purchase" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("purchase")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "purchase" && styles.tabTextActive,
            ]}
          >
            Mua vé
          </Text>
          {activeTab === "purchase" && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "mytickets" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("mytickets")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "mytickets" && styles.tabTextActive,
            ]}
          >
            Vé của tôi
          </Text>
          {activeTab === "mytickets" && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>
      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        {activeTab === "purchase" ? (
          <>
            {purchaseTickets.map((ticket, idx) => (
              <PurchaseTicketCard
                key={ticket.id}
                ticket={ticket}
                style={{ marginHorizontal: 20 }}
              />
            ))}
          </>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
            }}
          >
            {myTickets.map((ticket, idx) => (
              <MyTicketCard key={idx} ticket={ticket} />
            ))}
          </ScrollView>
        )}
      </ScrollView>
      <SupportChat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
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
  ticketCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    // marginHorizontal sẽ được set động ở từng card
  },
  ticketCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  ticketCardTitle: {
    fontSize: SMALL_SCREEN ? 16 : 18,
    fontWeight: "700",
    color: "#000",
  },
  buyButton: {
    backgroundColor: "#FF8FD0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: SMALL_SCREEN ? 13 : 14,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: "#000",
    borderRadius: 3,
    marginRight: 8,
  },
  benefitText: {
    fontSize: SMALL_SCREEN ? 13 : 14,
    color: "#666",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  infoText: {
    fontSize: SMALL_SCREEN ? 13 : 14,
    color: "#666",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  priceLabel: {
    fontSize: SMALL_SCREEN ? 13 : 14,
    color: "#666",
  },
  priceValue: {
    fontSize: SMALL_SCREEN ? 13 : 14,
    color: "#000",
    fontWeight: "600",
  },
  myTicketCard: {
    backgroundColor: "#D5EDFF",
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#bbb",
    flex: 1,
    justifyContent: "space-between",
    // width, height sẽ được set động
    overflow: "hidden", // Đảm bảo không tràn ra ngoài
  },
  myTicketHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF8FD0",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  logoText: {
    color: "#fff",
    fontSize: 16,
  },
  parkName: {
    color: "#d63384",
    fontWeight: "700",
    fontSize: 16,
    marginHorizontal: 8,
  },
  myTicketTitle: {
    fontSize: SMALL_SCREEN ? 18 : 20,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginBottom: 12,
  },
  infoBlock: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: SMALL_SCREEN ? 13 : 14,
    color: "#666",
    fontWeight: "600",
  },
  infoValue: {
    fontSize: SMALL_SCREEN ? 13 : 14,
    color: "#222",
    marginLeft: 24,
    marginBottom: 2,
  },
  statusText: {
    color: "#1db954",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    fontSize: SMALL_SCREEN ? 13 : 14,
    borderTopWidth: 2,
    borderColor: "#FFF",
    paddingTop: 8,
    marginTop: 8,
  },
  barcodeBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  noteText: {
    fontSize: SMALL_SCREEN ? 11 : 12,
    color: "#666",
    textAlign: "center",
    // bỏ borderTop ở note
  },
  parkNameImage: {
    width: 180,
    height: 40,
    alignSelf: "center",
  },
  parkNameImageSmall: {
    width: 100,
    height: 24,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  ticketCardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});
