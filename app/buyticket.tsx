import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TICKET_DATA: Record<
  string,
  {
    title: string;
    priceAdult: string;
    priceChild: string;
    benefits: string[];
    freeText: string;
    notes: string[];
  }
> = {
  "VÉ THAM QUAN": {
    title: "VÉ THAM QUAN",
    priceAdult: "160.000 VNĐ",
    priceChild: "100.000 VNĐ",
    benefits: [
      "Tham quan trong ngày",
      "Tham quan Đầm Sen",
      "⏰ Từ 7 giờ 30 đến 20 giờ",
    ],
    freeText: "Miễn phí cho trẻ dưới 1 mét",
    notes: [
      "Không cần đặt trước, dùng trong ngày",
      "Thích hợp cho gia đình và trẻ nhỏ",
      "Tham quan không giới hạn khung giờ",
    ],
  },
  "VÉ TRỌN GÓI": {
    title: "VÉ TRỌN GÓI",
    priceAdult: "300.000 VNĐ",
    priceChild: "220.000 VNĐ",
    benefits: [
      "Tham quan trong ngày",
      "Bao gồm trò chơi",
      "Thủy Cung",
      "⏰ Từ 7 giờ 30 đến 20 giờ",
    ],
    freeText: "Miễn phí cho trẻ dưới 1 mét",
    notes: [
      "Không cần đặt trước, dùng trong ngày",
      "Bao gồm tất cả trò chơi & thủy cung",
      "Tham quan không giới hạn khung giờ",
    ],
  },
};

export default function BuyTicketScreen() {
  const params = useLocalSearchParams();
  const ticketType =
    typeof params.type === "string" && TICKET_DATA[params.type]
      ? params.type
      : "VÉ THAM QUAN";
  const ticket = TICKET_DATA[ticketType];
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState<"adult" | "child">("adult");
  const [showModal, setShowModal] = useState(false);
  const [agree, setAgree] = useState(false);

  if (!ticket) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", fontSize: 18, marginTop: 40 }}>
          Loại vé không hợp lệ!
        </Text>
      </View>
    );
  }

  const handleOrder = () => {
    if (selectedType === "child") {
      setShowModal(true);
    } else {
      // Xử lý thanh toán vé người lớn ở đây
      alert("Thanh toán vé người lớn thành công!");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 40,
          marginTop: 16, // <-- add margin below header
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.ticketCard,
            ticket.title === "VÉ TRỌN GÓI"
              ? { backgroundColor: "#D5EDFF" }
              : {},
          ]}
        >
          <View style={styles.ticketCardTopRow}>
            <Image
              source={require("../assets/images/park-name.png")}
              style={styles.parkNameImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.ticketCardTitle}>{ticket.title}</Text>
          <View style={styles.priceBlock}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Người lớn:</Text>
              <Text style={styles.priceValue}>{ticket.priceAdult}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Trẻ em {"<"}1,4m:</Text>
              <Text style={styles.priceValue}>{ticket.priceChild}</Text>
            </View>
          </View>
          <View style={styles.benefitBlock}>
            {ticket.benefits.map((benefit: string, idx: number) => (
              <View style={styles.benefitRow} key={idx}>
                <Feather
                  name="check-circle"
                  size={16}
                  color="#1db954"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>LOẠI VÉ</Text>
          <View style={styles.typeRow}>
            <TouchableOpacity
              style={[
                styles.typeCard,
                selectedType === "adult" && styles.typeCardSelected,
              ]}
              onPress={() => setSelectedType("adult")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.typeCardText,
                  selectedType === "adult" && { fontWeight: "bold" },
                ]}
              >
                Người lớn
              </Text>
              <Text
                style={[
                  styles.typeCardPrice,
                  selectedType === "adult" && { fontWeight: "bold" },
                ]}
              >
                {ticket.priceAdult}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeCard,
                selectedType === "child" && styles.typeCardSelected,
              ]}
              onPress={() => setSelectedType("child")}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.typeCardText,
                  selectedType === "child" && { fontWeight: "bold" },
                ]}
              >
                Trẻ em {"<"}1,4m
              </Text>
              <Text
                style={[
                  styles.typeCardPrice,
                  selectedType === "child" && { fontWeight: "bold" },
                ]}
              >
                {ticket.priceChild}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.freeText}>{ticket.freeText}</Text>
          {ticket.notes.map((note: string, idx: number) => (
            <Text style={styles.noteText} key={idx}>
              {note}
            </Text>
          ))}
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
            <Text style={styles.orderButtonText}>Đặt vé</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Modal xác nhận điều kiện vé trẻ em */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowModal(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>Lưu ý khi mua vé Trẻ Em</Text>
            <Text style={styles.modalText}>
              Vé trẻ em chỉ áp dụng cho khách có chiều cao từ 1m đến 1.4m.{"\n"}
              Trong trường hợp không đúng đối tượng, quý khách sẽ phải bù tiền
              tại cổng theo giá vé người lớn.
            </Text>
            <Text style={styles.modalTitle}>Thanh toán</Text>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgree(!agree)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
                {agree && <Feather name="check" size={18} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>
                Tôi đã đọc và đồng ý với điều kiện áp dụng vé trẻ em.
              </Text>
            </TouchableOpacity>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  !agree && styles.modalButtonDisabled,
                ]}
                disabled={!agree}
                onPress={() => {
                  setShowModal(false);
                  setAgree(false);
                  alert("Thanh toán vé trẻ em thành công!");
                }}
              >
                <Text
                  style={[styles.modalButtonText, !agree && { color: "#aaa" }]}
                >
                  Thanh toán
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setShowModal(false);
                  setAgree(false);
                }}
              >
                <Text style={[styles.modalButtonText, { color: "#d63384" }]}>
                  Hủy
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
  },
  ticketCard: {
    backgroundColor: "#FDE3F2",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  ticketCardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  parkNameImage: {
    width: 160,
    height: 36,
    alignSelf: "center",
  },
  ticketCardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#d63384",
    textAlign: "center",
    marginBottom: 12,
  },
  priceBlock: {
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  priceValue: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
  },
  benefitBlock: {
    marginBottom: 12,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 15,
    color: "#222",
  },
  infoSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#d63384",
    marginBottom: 8,
  },
  typeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  typeCard: {
    flex: 1,
    backgroundColor: "#D1FBD0",
    borderRadius: 12,
    marginHorizontal: 6,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    flexDirection: "column",
  },
  typeCardSelected: {
    borderColor: "#91B79E",
    shadowColor: "#91B79E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  typeCardText: {
    color: "#396C38",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 2,
  },
  typeCardPrice: {
    color: "#396C38",
    fontWeight: "600",
    fontSize: 15,
  },
  freeText: {
    fontSize: 14,
    color: "#1db954",
    marginBottom: 4,
    fontWeight: "600",
  },
  noteText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FDE3F2",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: "#d63384",
  },
  quantityButtonText: {
    fontSize: 22,
    color: "#d63384",
    fontWeight: "700",
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#d63384",
    minWidth: 32,
    textAlign: "center",
  },
  orderButton: {
    backgroundColor: "#d63384",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  orderButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#d63384",
    marginBottom: 12,
    textAlign: "center",
  },
  modalText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    alignSelf: "flex-start",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#91B79E",
    backgroundColor: "#fff",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#91B79E",
    borderColor: "#396C38",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#396C38",
    fontWeight: "600",
    flex: 1,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#d63384",
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 6,
    alignItems: "center",
  },
  modalButtonDisabled: {
    backgroundColor: "#eee",
  },
  modalButtonCancel: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d63384",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
