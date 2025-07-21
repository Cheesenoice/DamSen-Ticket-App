import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { memo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  View as RNView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import Modal from "./modal";

// --- Constants & Types ---
const MAP_WIDTH = 1200;
const MAP_HEIGHT = 900;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface HotspotType {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  avatar: string;
  metrics: { waitTime: string; distance: string };
  isMaintenanceActive: boolean;
  description: string;
  x: number;
  y: number;
}

const HOTSPOTS: HotspotType[] = [
  {
    id: "castle",
    title: "Lâu đài kinh dị",
    subtitle: "~8 phút đi bộ",
    category: "Khu vực • Check-in",
    avatar: "🏰",
    metrics: { waitTime: "10", distance: "150" },
    isMaintenanceActive: false,
    description:
      "Một lâu đài tuyệt đẹp giữa công viên. Nơi lý tưởng để chụp ảnh và vui chơi cùng gia đình!",
    x: 230,
    y: 240,
  },
  {
    id: "ferris",
    title: "Vòng Đu Quay",
    subtitle: "~6 phút đi bộ",
    category: "Loại • Cảm giác mạnh",
    avatar: "🎡",
    metrics: { waitTime: "30", distance: "300" },
    isMaintenanceActive: false,
    description: "Ngắm toàn cảnh công viên từ trên cao!",
    x: 640,
    y: 310,
  },
  {
    id: "lake",
    title: "Bến Thuyền",
    subtitle: "~10 phút đi bộ",
    category: "Khu vực • Thư giãn",
    avatar: "🦢",
    metrics: { waitTime: "5", distance: "80" },
    isMaintenanceActive: true,
    description: "Thư giãn bên hồ hoặc chèo thuyền thiên nga.",
    x: 890,
    y: 520,
  },
];

const CURRENT_LOCATION = { id: "me", x: 460, y: 450 };
const FERRIS_LOCATION = { x: 640, y: 310 };

// --- Reusable Components ---

// Hotspot Dot on Map
const Hotspot: React.FC<{
  x: number;
  y: number;
  onPress: () => void;
}> = memo(({ x, y, onPress }) => (
  <TouchableOpacity
    style={[styles.hotspot, { left: x - 18, top: y - 18 }]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.hotspotDot} />
  </TouchableOpacity>
));

// Current Location Dot
const CurrentLocation: React.FC<{ x: number; y: number }> = memo(({ x, y }) => (
  <View
    style={[
      styles.hotspot,
      styles.currentLocationSpot,
      { left: x - 12, top: y - 12 },
    ]}
  />
));

// Route Path (SVG)
const RoutePath: React.FC<{ show: boolean }> = ({ show }) =>
  show ? (
    <Svg
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      <Path
        d={`M${CURRENT_LOCATION.x},${CURRENT_LOCATION.y} C${
          CURRENT_LOCATION.x + 40
        },${CURRENT_LOCATION.y - 100} ${FERRIS_LOCATION.x - 80},${
          FERRIS_LOCATION.y + 95
        } ${FERRIS_LOCATION.x},${FERRIS_LOCATION.y}`}
        stroke="#E91E63"
        strokeWidth={6}
        fill="none"
      />
    </Svg>
  ) : null;

// Map Image with Hotspots, CurrentLocation, Route
const MapImage: React.FC<{
  scale: any;
  translateX: any;
  translateY: any;
  panGesture: any;
  pinchGesture: any;
  panRef: any;
  pinchRef: any;
  onHotspotPress: (h: HotspotType) => void;
  showRoute: boolean;
}> = memo(
  ({
    scale,
    translateX,
    translateY,
    panGesture,
    pinchGesture,
    panRef,
    pinchRef,
    onHotspotPress,
    showRoute,
  }) => {
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    }));
    return (
      <PinchGestureHandler
        ref={pinchRef}
        onGestureEvent={pinchGesture}
        simultaneousHandlers={panRef}
      >
        <Animated.View style={styles.mapZoomContainer}>
          <PanGestureHandler
            ref={panRef}
            onGestureEvent={panGesture}
            simultaneousHandlers={pinchRef}
          >
            <Animated.View
              style={[{ width: MAP_WIDTH, height: MAP_HEIGHT }, animatedStyle]}
            >
              <Image
                source={require("../../assets/images/damsen-map.webp")}
                style={styles.mapImage}
                resizeMode="cover"
              />
              <RoutePath show={showRoute} />
              <CurrentLocation x={CURRENT_LOCATION.x} y={CURRENT_LOCATION.y} />
              {HOTSPOTS.map((h) => (
                <Hotspot
                  key={h.id}
                  x={h.x}
                  y={h.y}
                  onPress={() => onHotspotPress(h)}
                />
              ))}
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    );
  }
);

// Navigation Directions Steps
interface NavigationStep {
  id: number;
  text: string;
  isCompleted: boolean;
  hasHighlight?: boolean;
  highlightText?: string;
}

interface NavigationDirectionsProps {
  destination: string;
  walkingTime: string;
  steps: NavigationStep[];
  onCancel: () => void;
}

const NavigationDirections: React.FC<NavigationDirectionsProps> = memo(
  ({ destination, walkingTime, steps, onCancel }) => (
    <>
      {/* Header */}
      <RNView style={navStyles.headerRow}>
        <RNView style={{ flex: 1 }}>
          <Text style={navStyles.headerTitle}>Đường đi đến {destination}</Text>
          <RNView style={navStyles.walkingInfoRow}>
            <Ionicons name="walk" size={16} color="#ff69b4" />
            <Text style={navStyles.walkingInfoText}>{walkingTime}</Text>
          </RNView>
        </RNView>
        <TouchableOpacity style={styles.closeHotspotBtn} onPress={onCancel}>
          <Text style={styles.closeHotspotText}>Đóng</Text>
        </TouchableOpacity>
      </RNView>
      {/* Steps */}
      <RNView style={{ position: "relative", marginTop: 24 }}>
        <RNView style={{ paddingRight: 16 }}>
          {steps.map((step) => (
            <RNView key={step.id} style={navStyles.stepRow}>
              <RNView
                style={[
                  navStyles.stepIcon,
                  step.isCompleted
                    ? navStyles.stepIconActive
                    : navStyles.stepIconInactive,
                ]}
              >
                {step.isCompleted && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </RNView>
              <Text
                style={[
                  navStyles.stepText,
                  step.isCompleted
                    ? navStyles.stepTextActive
                    : navStyles.stepTextInactive,
                ]}
              >
                {step.hasHighlight ? (
                  <Text>
                    {step.text.split(`'${step.highlightText}'`)[0]}
                    <Text style={navStyles.stepHighlight}>
                      '{step.highlightText}'
                    </Text>
                    {step.text.split(`'${step.highlightText}'`)[1]}
                  </Text>
                ) : (
                  step.text
                )}
              </Text>
            </RNView>
          ))}
        </RNView>
      </RNView>
    </>
  )
);

// Hotspot Info Card
const HotspotInfo: React.FC<{
  hotspot: HotspotType;
  onDirection: () => void;
  onClose: () => void;
}> = memo(({ hotspot, onDirection, onClose }) => (
  <>
    <View style={styles.cardHeader}>
      <View style={styles.avatarBox}>
        <Text style={styles.avatarText}>{hotspot.avatar}</Text>
      </View>
      <View style={styles.cardHeaderText}>
        <Text style={styles.cardTitle}>{hotspot.title}</Text>
        <Text style={styles.cardSubtitle}>{hotspot.subtitle}</Text>
        <Text style={styles.cardCategory}>{hotspot.category}</Text>
      </View>
      <View style={styles.actionButtonCol}>
        <TouchableOpacity style={styles.actionButton} onPress={onDirection}>
          <Text style={styles.actionButtonText}>Chỉ đường</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeHotspotBtn} onPress={onClose}>
          <Text style={styles.closeHotspotText}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>
    {hotspot.isMaintenanceActive && (
      <View style={styles.maintenanceBadge}>
        <Text style={styles.maintenanceBadgeText}>Đang bảo trì</Text>
      </View>
    )}
    <View style={styles.metricsRow}>
      <View style={styles.metricCard}>
        <Text style={styles.metricValue}>{hotspot.metrics.waitTime}</Text>
        <Text style={styles.metricLabel}>phút chờ</Text>
      </View>
      <View style={styles.metricCard}>
        <Text style={styles.metricValue}>{hotspot.metrics.distance}</Text>
        <Text style={styles.metricLabel}>mét cách xa</Text>
      </View>
    </View>
    <Text style={styles.cardDesc}>{hotspot.description}</Text>
  </>
));

// Bottom Sheet
const BottomSheet: React.FC<{
  visible: boolean;
  navigationMode: boolean;
  selectedHotspot: HotspotType | null;
  onDirection: () => void;
  onClose: () => void;
}> = ({ visible, navigationMode, selectedHotspot, onDirection, onClose }) => {
  const SHEET_HEIGHT = 380;
  const sheetTranslateY = useSharedValue(SHEET_HEIGHT);
  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sheetTranslateY.value }],
  }));
  React.useEffect(() => {
    if (visible) {
      sheetTranslateY.value = withTiming(0, { duration: 300 });
    } else {
      sheetTranslateY.value = withTiming(SHEET_HEIGHT, { duration: 300 });
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.bottomSheet, animatedSheetStyle]}>
      <View style={navStyles.sheetHandle} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={true}
      >
        {navigationMode ? (
          <NavigationDirections
            destination="Vòng Đu Quay"
            walkingTime="cách 6 phút đi bộ"
            steps={[
              {
                id: 0,
                text: "Quẹo phải ở 'nhà ga Monorail 2'",
                isCompleted: true,
                hasHighlight: true,
                highlightText: "nhà ga Monorail 2",
              },
              {
                id: 1,
                text: "Đi thẳng 150m",
                isCompleted: false,
                hasHighlight: false,
              },
              {
                id: 2,
                text: "Quẹo trái",
                isCompleted: false,
                hasHighlight: false,
              },
              {
                id: 3,
                text: "Đã đến!",
                isCompleted: false,
                hasHighlight: false,
              },
            ]}
            onCancel={onClose}
          />
        ) : selectedHotspot ? (
          <HotspotInfo
            hotspot={selectedHotspot}
            onDirection={onDirection}
            onClose={onClose}
          />
        ) : (
          <>
            <Text style={styles.cardTitle}>Thông tin khu vực</Text>
            <Text style={styles.cardDesc}>
              Chạm vào các điểm trên bản đồ để xem chi tiết.
            </Text>
          </>
        )}
      </ScrollView>
    </Animated.View>
  );
};

// --- Main MapScreen ---
export default function MapScreen() {
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotType | null>(
    null
  );
  const [showRoute, setShowRoute] = useState(false);
  const [navigationMode, setNavigationMode] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false); // Thêm state modal
  const router = useRouter();

  // Animation for pan/zoom
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const lastScale = useRef(1);

  // Pan gesture
  const panGesture = useAnimatedGestureHandler({
    onStart: (_: any, ctx: any) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
  });

  // Pinch gesture
  const pinchGesture = useAnimatedGestureHandler({
    onStart: (_: any, ctx: any) => {
      ctx.startScale = scale.value;
    },
    onActive: (event: any, ctx: any) => {
      scale.value = Math.max(
        0.5,
        Math.min(2.5, ctx.startScale * (event.scale ?? 1))
      );
    },
    onEnd: () => {
      lastScale.current = scale.value;
    },
  });

  // Go to current location (center the blue dot)
  const goToCurrentLocation = () => {
    scale.value = withTiming(1, { duration: 200 }, (finished?: boolean) => {
      if (finished) {
        const centerX = SCREEN_WIDTH / 2 - CURRENT_LOCATION.x * 1;
        const centerY = SCREEN_HEIGHT / 2 - CURRENT_LOCATION.y * 1;
        translateX.value = withTiming(centerX, { duration: 300 });
        translateY.value = withTiming(centerY, { duration: 300 });
      }
    });
  };

  // Tự động zoom vào vị trí hiện tại khi vào trang map
  React.useEffect(() => {
    goToCurrentLocation();
  }, []);

  // Hotspot handlers
  const openHotspot = (hotspot: HotspotType) => {
    setSelectedHotspot(hotspot);
    setShowRoute(false);
    setNavigationMode(false);
  };
  const closeHotspot = () => {
    setSelectedHotspot(null);
    setShowRoute(false);
    setNavigationMode(false);
  };
  const showDirection = () => {
    setShowRoute(true);
    setNavigationMode(true);
  };

  // Gesture refs
  const panRef = useRef(null);
  const pinchRef = useRef(null);

  const handleCaseSelect = (preset: string) => {
    setShowAlertModal(false);
    router.push({ pathname: "/chatbot", params: { preset } });
  };

  return (
    <View style={styles.container}>
      {/* Fixed warning button */}
      <TouchableOpacity
        style={[styles.warningButton, { backgroundColor: "#FDE3F2" }]}
        onPress={() => setShowAlertModal(true)}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 32 }}>✉</Text>
      </TouchableOpacity>
      {/* Fixed go-to-current-location button */}
      <TouchableOpacity
        style={[
          styles.currentLocationBtn,
          {
            bottom: selectedHotspot || navigationMode ? 350 : 32,
          },
        ]}
        onPress={goToCurrentLocation}
        activeOpacity={0.8}
      >
        <Ionicons name="locate" size={28} color="#1976d2" />
      </TouchableOpacity>
      {/* Map background as pinch-to-zoom and pannable area */}
      <MapImage
        scale={scale}
        translateX={translateX}
        translateY={translateY}
        panGesture={panGesture}
        pinchGesture={pinchGesture}
        panRef={panRef}
        pinchRef={pinchRef}
        onHotspotPress={openHotspot}
        showRoute={showRoute}
      />
      {/* Floating header */}
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={[
              styles.headerButton,
              { marginTop: Platform.OS === "ios" ? 80 : 20 },
            ]}
          >
            <Ionicons name="arrow-back" size={24} color="#424242" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={[
              styles.headerButton,
              { marginTop: Platform.OS === "ios" ? 80 : 20 },
            ]}
          >
            <Ionicons name="search" size={24} color="#424242" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* Bottom sheet shows hotspot info if selected or navigation mode */}
      <BottomSheet
        visible={!!selectedHotspot || navigationMode}
        navigationMode={navigationMode}
        selectedHotspot={selectedHotspot}
        onDirection={showDirection}
        onClose={closeHotspot}
      />
      {/* Modal xin chào - Đặt ở cuối cùng, không bọc trong View nào khác */}
      <Modal
        visible={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        onCaseSelect={(caseKey) => {
          let preset = "";
          if (caseKey === "child") preset = "toibilac";
          else if (caseKey === "lost") preset = "toibimatdo";
          else if (caseKey === "medical") preset = "ho_tro_y_te";
          else if (caseKey === "other") preset = "ho_tro_khac";
          if (preset) {
            setShowAlertModal(false);
            router.push({ pathname: "/chatbot", params: { preset } });
          }
        }}
      />
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4FFDD",
  },
  mapZoomContainer: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "#E4FFDD",
    overflow: "hidden",
  },
  mapImage: {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    borderRadius: 0,
  },
  hotspot: {
    position: "absolute",
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  hotspotDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E91E63",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingTop: 30,
    paddingHorizontal: 16,
    zIndex: 100,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20,
  },
  headerButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    minHeight: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    alignItems: "stretch",
    zIndex: 10,
    paddingHorizontal: 20,
    paddingBottom: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  avatarBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#e3f2fd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 32,
  },
  cardHeaderText: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
    paddingHorizontal: 20,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 14,
    color: "#666",
  },
  actionButton: {
    backgroundColor: "#e3f2fd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
    marginLeft: 8,
  },
  actionButtonText: {
    color: "#1976d2",
    fontSize: 14,
    fontWeight: "500",
  },
  actionButtonCol: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginLeft: 8,
    gap: 8,
  },
  closeHotspotBtn: {
    marginTop: 8,
    alignSelf: "flex-end",
    backgroundColor: "#E91E63",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  closeHotspotText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  maintenanceBadge: {
    backgroundColor: "#ff4444",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
    marginTop: 12,
    marginBottom: 16,
  },
  maintenanceBadgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  metricsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#e8f5e8",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  cardDesc: {
    fontSize: 14,
    color: "#444",
    marginTop: 8,
    marginBottom: 8,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  warningButton: {
    position: "absolute",
    top: 90,
    right: 24,
    zIndex: 200,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  currentLocationSpot: {
    backgroundColor: "#1976d2",
    borderWidth: 3,
    borderColor: "#fff",
    width: 24,
    height: 24,
    borderRadius: 12,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  currentLocationBtn: {
    position: "absolute",
    bottom: 32,
    right: 24,
    zIndex: 300,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
});

const navStyles = StyleSheet.create({
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  walkingInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  walkingInfoText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  stepIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  stepIconActive: {
    backgroundColor: "#ff69b4",
  },
  stepIconInactive: {
    backgroundColor: "#e0e0e0",
  },
  stepText: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  stepTextActive: {
    fontWeight: "500",
    color: "#1a1a1a",
  },
  stepTextInactive: {
    fontWeight: "400",
    color: "#666",
  },
  stepHighlight: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 6,
    borderRadius: 4,
    fontWeight: "600",
  },
});
