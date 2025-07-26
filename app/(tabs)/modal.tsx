import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CASES = [
  {
    key: "child",
    icon: "🧒",
    label: "Trẻ em bị lạc",
    modalTitle: "TRẺ EM BỊ LẠC",
    modalDesc:
      "Chúng tôi sẽ ngay lập tức liên hệ với đội ngũ an ninh và hỗ trợ tìm kiếm trẻ em. Vui lòng giữ bình tĩnh và ở nguyên vị trí.",
    message: "Trẻ em bị lạc",
  },
  {
    key: "medical",
    icon: "🏥",
    label: "Hỗ trợ y tế",
    modalTitle: "HỖ TRỢ Y TẾ",
    modalDesc:
      "Đội ngũ y tế sẽ được thông báo ngay lập tức. Nếu đây là trường hợp khẩn cấp, vui lòng gọi 115 hoặc tìm kiếm sự giúp đỡ gần nhất.",
    message: "Tôi cần hỗ trợ y tế",
  },
  {
    key: "lost",
    icon: "👜",
    label: "Mất đồ",
    modalTitle: "MẤT ĐỒ",
    modalDesc:
      "Chúng tôi sẽ kiểm tra khu vực xung quanh và liên hệ với phòng đồ thất lạc. Vui lòng cung cấp mô tả chi tiết về vật phẩm bị mất.",
    message: "Tôi bị mất đồ",
  },
  {
    key: "other",
    icon: "📞",
    label: "Hỗ trợ khác",
    modalTitle: "HỖ TRỢ KHÁC",
    modalDesc:
      "Đội ngũ hỗ trợ sẽ liên hệ với bạn trong vòng 5 phút. Vui lòng mô tả tình huống để chúng tôi có thể hỗ trợ tốt nhất.",
    message: "Tôi cần hỗ trợ khẩn cấp",
  },
];

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onCaseSelect?: (caseKey: string) => void;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, onCaseSelect }) => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  if (!visible) return null;

  const handleCasePress = (caseKey: string) => {
    setSelectedCase(caseKey);
  };
  const handleModalClose = () => {
    setSelectedCase(null);
    onClose();
  };
  const handleCaseConfirm = () => {
    if (onCaseSelect && selectedCase) {
      onCaseSelect(selectedCase);
    }
    setSelectedCase(null);
    onClose();
  };

  const caseObj = CASES.find((c) => c.key === selectedCase);

  return (
    <View style={styles.absoluteOverlay}>
      {/* Modal nhỏ khi chọn case */}
      {selectedCase && caseObj ? (
        <Pressable style={styles.modalBackdrop} onPress={handleModalClose}>
          <View style={styles.modalContentBox}>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={handleModalClose}
            >
              <Text style={styles.modalCloseBtnText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalIcon}>{caseObj.icon}</Text>
            <Text style={styles.modalTitle}>{caseObj.modalTitle}</Text>
            <Text style={styles.modalDesc}>{caseObj.modalDesc}</Text>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={handleCaseConfirm}
            >
              <Text style={styles.confirmBtnText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      ) : (
        <View style={styles.centeredBox}>
          <View style={styles.whiteCard}>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
              <Text style={styles.modalCloseBtnText}>×</Text>
            </TouchableOpacity>
            <View style={styles.pinkCard}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>KHẨN CẤP</Text>
                <Text style={styles.headerDesc}>
                  Vui lòng xác nhận yêu cầu hỗ trợ{"\n"}khẩn cấp của bạn
                </Text>
              </View>
            </View>
            <View style={styles.buttonGroup}>
              {CASES.map((c) => (
                <TouchableOpacity
                  key={c.key}
                  style={styles.emergencyButton}
                  onPress={() => handleCasePress(c.key)}
                  activeOpacity={0.85}
                >
                  <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>{c.icon}</Text>
                  </View>
                  <Text style={styles.buttonText}>{c.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Vị trí hiện tại của bạn sẽ được chia sẻ{"\n"}với đội ngũ hỗ trợ
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  absoluteOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centeredBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  whiteCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    maxWidth: 320,
    width: "90%",
    marginBottom: 60,
    padding: 0,
    position: "relative", // thêm dòng này
  },
  pinkCard: {
    backgroundColor: "#FDE3F2",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 16,
    textAlign: "center",
    marginBottom: 0,
  },
  header: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF191C",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  headerDesc: {
    fontSize: 14,
    color: "#000",
    lineHeight: 22,
    textAlign: "center",
  },
  buttonGroup: {
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 12,
    paddingRight: 12,
  },
  emergencyButton: {
    backgroundColor: "#D5EDFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: "100%",
    minHeight: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 0,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },
  iconText: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  footer: {
    alignItems: "center",
    padding: 10,
    paddingLeft: 12,
    paddingRight: 12,
  },
  footerText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    lineHeight: 20,
    textAlign: "center",
  },
  // Modal nhỏ
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContentBox: {
    backgroundColor: "#FDE3F2",
    borderRadius: 16,
    padding: 20,
    maxWidth: 320,
    width: "90%",
    alignItems: "center",
    position: "relative",
  },
  modalCloseBtn: {
    position: "absolute",
    top: 8, // có thể giảm xuống cho gọn
    right: 8,
    backgroundColor: "transparent",
    borderWidth: 0,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    zIndex: 10, // thêm dòng này
  },
  modalCloseBtnText: {
    fontSize: 22,
    color: "#FF191C",
    lineHeight: 22,
    fontWeight: "bold",
  },
  modalIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF191C",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDesc: {
    fontSize: 13,
    color: "#000",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 14,
  },
  confirmBtn: {
    backgroundColor: "#FF69B4",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 8,
  },
  confirmBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default Modal;
