import { Feather } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useEffect, useLayoutEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QRScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const hasNavigated = useRef(false);

  useLayoutEffect(() => {
    navigation.setOptions &&
      navigation.setOptions({
        headerStyle: { backgroundColor: "#fff" },
        headerLeft: () => (
          <View style={{ paddingLeft: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
              Quét mã QR
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
        headerTitle: () => null,
      });
  }, [navigation]);

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // Hàm xử lý khi quét được mã QR
  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (!hasNavigated.current && result?.data) {
      hasNavigated.current = true;
      navigation.navigate("chooseticket" as never);
    }
  };

  // Reset lại hasNavigated khi tab được focus lại
  useEffect(() => {
    if (isFocused) {
      hasNavigated.current = false;
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đây là hệ thống Check-in tự động</Text>
      <Text style={styles.subtitle}>Vui lòng quét mã để vào cổng</Text>
      <View style={styles.scannerBox}>
        {!permission ? (
          <Text style={styles.scannerText}>Đang kiểm tra quyền camera...</Text>
        ) : !permission.granted ? (
          <Text style={styles.scannerText}>Không có quyền truy cập camera</Text>
        ) : isFocused ? (
          <CameraView
            style={styles.camera}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleBarcodeScanned}
          />
        ) : (
          <Text style={styles.scannerText}>
            Camera sẽ tự động bật khi bạn ở trang này
          </Text>
        )}
      </View>
      <TouchableOpacity style={styles.scanButton} activeOpacity={0.8}>
        <Text style={styles.scanButtonText}>Quét mã QR check-in tại cổng</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>Sau đó chọn loại vé của bạn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  scannerBox: {
    width: 240,
    height: 240,
    borderRadius: 31,
    borderWidth: 5,
    borderColor: "#FF8FD0",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
  scannerText: {
    color: "#bbb",
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
  scanButton: {
    backgroundColor: "#FF8FD0",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  scanButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  footerText: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },
});
