import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router"; // thêm dòng này
import React, { useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_MARGIN = 16;
const SMALL_SCREEN = SCREEN_HEIGHT < 700;
const CARD_HEIGHT = Math.min(SCREEN_HEIGHT * 0.62, 480); // Giới hạn tối đa 480px

export default function ChooseTicketScreen() {
  const navigation = useNavigation();
  const router = useRouter(); // thêm dòng này
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [activated, setActivated] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions &&
      navigation.setOptions({
        headerTitle: () => (
          <View style={{ paddingLeft: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
              Chọn vé
            </Text>
          </View>
        ),
        headerRight: () => null,
        headerStyle: { backgroundColor: "#fff" },
        headerLeft: () => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 40,
              paddingLeft: 0,
              marginLeft: 0,
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#FF69B4" />
            <Text
              style={{
                color: "#FF69B4",
                fontSize: 16,
                fontWeight: "500",
                marginLeft: 4,
              }}
            >
              Quay về
            </Text>
          </TouchableOpacity>
        ),
      });
  }, [navigation]);

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

  const MyTicketCard = ({
    ticket,
    selected,
  }: {
    ticket: (typeof myTickets)[0];
    selected: boolean;
  }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => setSelectedIdx(myTickets.indexOf(ticket))}
      style={[
        styles.myTicketCard,
        {
          backgroundColor: ticket.backgroundColor,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          maxHeight: CARD_HEIGHT,
          marginRight: CARD_MARGIN,
          borderWidth: selected ? 4 : 2,
          borderColor: selected ? "#FF8FD0" : "#bbb",
          overflow: "hidden",
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
            source={require("../assets/images/park-name.png")}
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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Hướng dẫn chọn vé */}
      {!activated && (
        <Text
          style={{
            fontSize: 16,
            color: "#333",
            fontWeight: "500",
            marginTop: 16,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Chạm vào một vé để chọn và nhấn "Kích hoạt" để sử dụng vé.
        </Text>
      )}
      {activated && (
        <View style={styles.successBox}>
          <Text style={styles.successTitle}>Check-in Thành công</Text>
          <Text style={styles.successText}>
            Vé đã được xác nhận. Chúc bạn có một ngày vui vẻ tại Đầm Sen!
          </Text>
        </View>
      )}
      {activated ? (
        <View style={styles.activatedCardWrapper}>
          <MyTicketCard ticket={myTickets[selectedIdx]} selected={true} />
        </View>
      ) : (
        <View style={{ width: "100%", overflow: "visible" }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + CARD_MARGIN}
            decelerationRate="fast"
            scrollEnabled={true}
            contentContainerStyle={{
              paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2,
            }}
            style={{ flexGrow: 0 }}
          >
            {myTickets.map((ticket, idx) => (
              <MyTicketCard
                key={idx}
                ticket={ticket}
                selected={selectedIdx === idx}
              />
            ))}
          </ScrollView>
        </View>
      )}
      {/* Kích hoạt button */}
      {!activated && (
        <TouchableOpacity
          style={styles.activateButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.activateButtonText}>Kích hoạt</Text>
        </TouchableOpacity>
      )}
      {/* Thoát về Home khi check-in thành công */}
      {activated && (
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => router.push("/")}
          activeOpacity={0.85}
        >
          <Text style={styles.exitButtonText}>Thoát về Home</Text>
        </TouchableOpacity>
      )}
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Mỗi vé chỉ được kích hoạt một lần.
            </Text>
            <Text style={styles.modalText}>
              📍 Sau khi kích hoạt, hệ thống sẽ bắt đầu chia sẻ vị trí để hỗ trợ
              an toàn.
            </Text>
            <Text style={styles.modalText}>
              Bạn đang chọn vé số #{myTickets[selectedIdx].orderNumber}
            </Text>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#1db954" }]}
                onPress={() => {
                  setActivated(true);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Kích hoạt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#bbb" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Hủy bỏ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    overflow: "hidden", // Ngăn scroll ngoài ý muốn
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  myTicketCard: {
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    marginBottom: 16,
    borderStyle: "dashed",
    flex: 1,
    justifyContent: "space-between",
    overflow: "hidden", // Ngăn overflow
  },
  myTicketHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  parkNameImage: {
    width: 180,
    height: 40,
    alignSelf: "center",
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
  },
  activateButton: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: "#FF8FD0",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 32,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  activateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  exitButton: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: "#1db954",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 32,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  exitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    width: SCREEN_WIDTH * 0.8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#000",
    textAlign: "center",
  },
  modalText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    width: "100%",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  successBox: {
    marginTop: 24,
    marginBottom: 8,
    backgroundColor: "#E6F9ED",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    color: "#1db954",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 6,
  },
  successText: {
    color: "#222",
    fontSize: 15,
    textAlign: "center",
  },
  activatedCardWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
