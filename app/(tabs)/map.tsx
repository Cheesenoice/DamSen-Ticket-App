import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { memo, MutableRefObject, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  View as RNView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import SupportChat from "../../components/supportchat";
import Modal from "./modal";

// --- Constants & Types ---
const MAP_WIDTH = 1200;
const MAP_HEIGHT = 900;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Debug mode flag - set to false for production
const DEBUG_MODE = false;

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

interface ControlPoint {
  x: number;
  y: number;
}

interface DebugPathData {
  start: ControlPoint;
  end: ControlPoint;
  cp1: ControlPoint;
  cp2: ControlPoint;
  hotspotId: string;
}

const HOTSPOTS: HotspotType[] = [
  {
    id: "castle",
    title: "Lâu đài kinh dị",
    subtitle: "~8 phút đi bộ",
    category: "Khu vực • Check-in",
    avatar: "🏰",
    metrics: { waitTime: "10", distance: "150" },
    isMaintenanceActive: true,
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
  {
    id: "zoo",
    title: "Vườn thú",
    subtitle: "~7 phút đi bộ",
    category: "Khám phá • Động vật",
    avatar: "🦁",
    metrics: { waitTime: "0", distance: "200" },
    isMaintenanceActive: false,
    description:
      "Khám phá thế giới động vật hoang dã với nhiều loài thú quý hiếm.",
    x: 420,
    y: 150,
  },
  {
    id: "waterpark",
    title: "Công viên nước",
    subtitle: "~5 phút đi bộ",
    category: "Vui chơi • Nước",
    avatar: "💦",
    metrics: { waitTime: "20", distance: "150" },
    isMaintenanceActive: false,
    description: "Trượt nước cực đã tại khu công viên nước sôi động!",
    x: 1000,
    y: 245,
  },
  {
    id: "starStage",
    title: "Sân khấu Ngôi Sao",
    subtitle: "~3 phút đi bộ",
    category: "Sự kiện • Giải trí",
    avatar: "🎤",
    metrics: { waitTime: "0", distance: "100" },
    isMaintenanceActive: false,
    description: "Nơi diễn ra các buổi biểu diễn và sự kiện hoành tráng!",
    x: 775,
    y: 480,
  },
  {
    id: "icePalace",
    title: "Băng Đăng",
    subtitle: "~5 phút đi bộ",
    category: "Khám phá • Băng tuyết",
    avatar: "❄️",
    metrics: { waitTime: "15", distance: "100" },
    isMaintenanceActive: true,
    description:
      "Khám phá thế giới băng giá huyền ảo với các tác phẩm điêu khắc băng tuyệt đẹp!",
    x: 470,
    y: 345,
  },
  {
    id: "flowerGarden",
    title: "Vườn xương rồng",
    subtitle: "~4 phút đi bộ",
    category: "Thư giãn • Thiên nhiên",
    avatar: "🌵",
    metrics: { waitTime: "0", distance: "120" },
    isMaintenanceActive: true,
    description: "Không gian xanh mát với các loài xương rồng độc đáo.",
    x: 540,
    y: 565,
  },
  {
    id: "aquarium",
    title: "Cá Pha Lê",
    subtitle: "~2 phút đi bộ",
    category: "Khám phá • Đại dương",
    avatar: "🐠",
    metrics: { waitTime: "5", distance: "50" },
    isMaintenanceActive: false,
    description: "Chiêm ngưỡng thế giới biển lung linh và sống động.",
    x: 920,
    y: 620,
  },
  {
    id: "dinoZone",
    title: "Khu khủng long",
    subtitle: "~6 phút đi bộ",
    category: "Khám phá • Giải trí",
    avatar: "🦖",
    metrics: { waitTime: "0", distance: "160" },
    isMaintenanceActive: false,
    description: "Gặp gỡ những 'sinh vật cổ đại' trong khu khủng long kỳ thú.",
    x: 410,
    y: 365,
  },
];

const CURRENT_LOCATION = { id: "me", x: 460, y: 450 };
const FERRIS_LOCATION = { x: 640, y: 310 };

const isWeb = Platform.OS === "web";

// --- Reusable Components ---

// Hotspot Dot on Map
const Hotspot: React.FC<{
  x: number;
  y: number;
  onPress: () => void;
}> = memo(({ x, y, onPress }) => {
  if (isWeb) {
    return (
      <div
        className="map-hotspot"
        data-hotspot="true"
        style={{
          position: "absolute",
          left: x - 18,
          top: y - 18,
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onPress();
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: "#E91E63",
            border: "3px solid #fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.hotspot, { left: x - 18, top: y - 18 }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.hotspotDot} />
    </TouchableOpacity>
  );
});

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

// Path generation utilities
const getDefaultControlPoints = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  hotspotId: string
): { cp1: ControlPoint; cp2: ControlPoint } => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Control points for different destinations based on map layout
  let cp1x, cp1y, cp2x, cp2y;

  switch (hotspotId) {
    case "castle": // Top-left, avoid going through buildings
      cp1x = start.x + 1;
      cp1y = start.y - 35;
      cp2x = end.x + 44;
      cp2y = end.y + 54;
      break;

    case "ferris": // Right side, gentle curve
      cp1x = start.x - 8;
      cp1y = start.y - 90;
      cp2x = end.x + 79;
      cp2y = end.y + 42;
      break;

    case "lake": // Bottom-right, curve around the lake
      cp1x = start.x + 6;
      cp1y = start.y + 155;
      cp2x = end.x + 8;
      cp2y = end.y + 54;
      break;

    case "zoo": // Top area, curve upward
      cp1x = start.x + 72;
      cp1y = start.y + -52;
      cp2x = end.x + -355;
      cp2y = end.y + 144;
      break;

    case "waterpark": // Far right, wide curve
      cp1x = start.x + -19;
      cp1y = start.y + -85;
      cp2x = end.x + -83;
      cp2y = end.y + -11;
      break;

    case "starStage": // Right-bottom, curve around lake
      cp1x = start.x - 23;
      cp1y = start.y + 127;
      cp2x = end.x + 53;
      cp2y = end.y + 132;
      break;

    case "icePalace": // Close by, gentle curve
      cp1x = start.x - 15;
      cp1y = start.y - 49;
      cp2x = end.x + 93;
      cp2y = end.y + 50;
      break;

    case "flowerGarden": // Bottom area, curve down
      cp1x = start.x + 16;
      cp1y = start.y + 103;
      cp2x = end.x + 9;
      cp2y = end.y - 46;
      break;

    case "aquarium": // Far bottom-right, wide curve
      cp1x = start.x + 30;
      cp1y = start.y + 180;
      cp2x = end.x - 70;
      cp2y = end.y - 115;
      break;

    case "dinoZone": // Left side, gentle curve
      cp1x = start.x + 21;
      cp1y = start.y - 70;
      cp2x = end.x - 34;
      cp2y = end.y + 28;
      break;

    default: // Generic smooth curve
      const curveFactor = Math.min(distance * 0.3, 100);
      cp1x = start.x + dx * 0.25 + (dy > 0 ? -curveFactor : curveFactor);
      cp1y = start.y + dy * 0.25 + (dx > 0 ? -curveFactor : curveFactor);
      cp2x = start.x + dx * 0.75 + (dy > 0 ? curveFactor : -curveFactor);
      cp2y = start.y + dy * 0.75 + (dx > 0 ? curveFactor : -curveFactor);
  }

  return {
    cp1: { x: cp1x, y: cp1y },
    cp2: { x: cp2x, y: cp2y },
  };
};

const generateCurvedPath = (
  start: { x: number; y: number },
  end: { x: number; y: number },
  hotspotId: string,
  customControlPoints?: { cp1: ControlPoint; cp2: ControlPoint }
): string => {
  const controlPoints =
    customControlPoints || getDefaultControlPoints(start, end, hotspotId);
  return `M${start.x},${start.y} C${controlPoints.cp1.x},${controlPoints.cp1.y} ${controlPoints.cp2.x},${controlPoints.cp2.y} ${end.x},${end.y}`;
};

// Debug Control Point Component
const DraggableControlPoint: React.FC<{
  point: ControlPoint;
  color: string;
  onDrag: (newPoint: ControlPoint) => void;
}> = ({ point, color, onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handlePointerDown = React.useCallback(
    (e: any) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent map pan/zoom

      // Calculate offset from pointer to control point center
      const svgElement = e.currentTarget.closest("svg");
      if (!svgElement) return;

      const rect = svgElement.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      setDragOffset({
        x: point.x - pointerX,
        y: point.y - pointerY,
      });

      setIsDragging(true);
    },
    [point.x, point.y]
  );

  const handlePointerMove = React.useCallback(
    (e: any) => {
      if (!isDragging) return;
      e.preventDefault();
      e.stopPropagation();

      // Find the SVG container more reliably
      const svgElement = document.querySelector(
        'svg[width="1200"][height="900"]'
      );
      if (!svgElement) return;

      const rect = svgElement.getBoundingClientRect();
      const pointerX = e.clientX - rect.left;
      const pointerY = e.clientY - rect.top;

      // Apply offset to get accurate control point position
      const newX = pointerX + dragOffset.x;
      const newY = pointerY + dragOffset.y;

      // Constrain to map bounds
      const constrainedX = Math.max(0, Math.min(MAP_WIDTH, newX));
      const constrainedY = Math.max(0, Math.min(MAP_HEIGHT, newY));

      onDrag({ x: constrainedX, y: constrainedY });
    },
    [isDragging, onDrag, dragOffset]
  );

  const handlePointerUp = React.useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      // Use capture phase to ensure we get events first
      document.addEventListener("pointermove", handlePointerMove, {
        capture: true,
      });
      document.addEventListener("pointerup", handlePointerUp, {
        capture: true,
      });
      return () => {
        document.removeEventListener("pointermove", handlePointerMove, {
          capture: true,
        });
        document.removeEventListener("pointerup", handlePointerUp, {
          capture: true,
        });
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return (
    <g>
      {/* Larger invisible hit area */}
      <circle
        cx={point.x}
        cy={point.y}
        r={20}
        fill="transparent"
        style={{ cursor: "pointer" }}
        onPointerDown={handlePointerDown}
      />
      {/* Visible control point */}
      <circle
        cx={point.x}
        cy={point.y}
        r={8}
        fill={color}
        stroke="white"
        strokeWidth={3}
        style={{
          cursor: "pointer",
          pointerEvents: "none", // Let the larger circle handle events
        }}
      />
      {/* Outer ring when dragging */}
      {isDragging && (
        <circle
          cx={point.x}
          cy={point.y}
          r={12}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeDasharray="4,4"
          style={{ pointerEvents: "none" }}
        />
      )}
    </g>
  );
};

// Debug Info Panel
const DebugPanel: React.FC<{ debugData: DebugPathData | null }> = ({
  debugData,
}) => {
  if (!DEBUG_MODE || !debugData) return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.9)",
        padding: 15,
        borderRadius: 10,
        zIndex: 1000,
        minWidth: 160,
        maxWidth: 320,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", marginBottom: 10 }}>
        Debug Mode - {debugData.hotspotId}
      </Text>
      <Text style={{ color: "white", fontSize: 12 }}>
        Start: ({debugData.start.x.toFixed(0)}, {debugData.start.y.toFixed(0)})
      </Text>
      <Text style={{ color: "white", fontSize: 12 }}>
        End: ({debugData.end.x.toFixed(0)}, {debugData.end.y.toFixed(0)})
      </Text>
      <Text style={{ color: "#ff6b6b", fontSize: 12 }}>
        CP1: ({debugData.cp1.x.toFixed(0)}, {debugData.cp1.y.toFixed(0)})
      </Text>
      <Text style={{ color: "#4ecdc4", fontSize: 12 }}>
        CP2: ({debugData.cp2.x.toFixed(0)}, {debugData.cp2.y.toFixed(0)})
      </Text>

      <Text style={{ color: "yellow", fontSize: 10, marginTop: 10 }}>
        Copy this to code:
      </Text>
      <Text style={{ color: "yellow", fontSize: 10 }}>
        cp1x = start.x + {(debugData.cp1.x - debugData.start.x).toFixed(0)};
      </Text>
      <Text style={{ color: "yellow", fontSize: 10 }}>
        cp1y = start.y + {(debugData.cp1.y - debugData.start.y).toFixed(0)};
      </Text>
      <Text style={{ color: "yellow", fontSize: 10 }}>
        cp2x = end.x + {(debugData.cp2.x - debugData.end.x).toFixed(0)};
      </Text>
      <Text style={{ color: "yellow", fontSize: 10 }}>
        cp2y = end.y + {(debugData.cp2.y - debugData.end.y).toFixed(0)};
      </Text>
    </View>
  );
};

// Enhanced Route Path component with debug mode
const RoutePath: React.FC<{
  show: boolean;
  destinationId?: string;
  onDebugUpdate?: (debugData: DebugPathData) => void;
}> = ({ show, destinationId, onDebugUpdate }) => {
  // All hooks must be called before any conditional returns
  const [debugControlPoints, setDebugControlPoints] = useState<{
    cp1: ControlPoint;
    cp2: ControlPoint;
  } | null>(null);

  const destination = destinationId
    ? HOTSPOTS.find((h) => h.id === destinationId)
    : null;

  // Initialize debug control points
  React.useEffect(() => {
    if (DEBUG_MODE && destination && destinationId) {
      const defaultPoints = getDefaultControlPoints(
        CURRENT_LOCATION,
        destination,
        destinationId
      );
      setDebugControlPoints(defaultPoints);

      if (onDebugUpdate) {
        onDebugUpdate({
          start: CURRENT_LOCATION,
          end: destination,
          cp1: defaultPoints.cp1,
          cp2: defaultPoints.cp2,
          hotspotId: destinationId,
        });
      }
    }
  }, [destinationId, destination, onDebugUpdate]);

  // Early returns after all hooks
  if (!show || !destinationId || !destination) return null;

  const currentControlPoints =
    DEBUG_MODE && debugControlPoints ? debugControlPoints : undefined;
  const pathData = generateCurvedPath(
    CURRENT_LOCATION,
    destination,
    destinationId,
    currentControlPoints
  );

  const handleCP1Drag = (newPoint: ControlPoint) => {
    if (!DEBUG_MODE || !debugControlPoints) return;
    const newControlPoints = { ...debugControlPoints, cp1: newPoint };
    setDebugControlPoints(newControlPoints);

    if (onDebugUpdate) {
      onDebugUpdate({
        start: CURRENT_LOCATION,
        end: destination,
        cp1: newPoint,
        cp2: debugControlPoints.cp2,
        hotspotId: destinationId,
      });
    }
  };

  const handleCP2Drag = (newPoint: ControlPoint) => {
    if (!DEBUG_MODE || !debugControlPoints) return;
    const newControlPoints = { ...debugControlPoints, cp2: newPoint };
    setDebugControlPoints(newControlPoints);

    if (onDebugUpdate) {
      onDebugUpdate({
        start: CURRENT_LOCATION,
        end: destination,
        cp1: debugControlPoints.cp1,
        cp2: newPoint,
        hotspotId: destinationId,
      });
    }
  };

  return (
    <Svg
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: DEBUG_MODE ? 1000 : 5,
        pointerEvents: DEBUG_MODE ? "auto" : "none",
      }}
    >
      {/* Path shadow for depth */}
      <Path
        d={pathData}
        stroke="rgba(233, 30, 99, 0.3)"
        strokeWidth={10}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        pointerEvents="none"
      />
      {/* Main path */}
      <Path
        d={pathData}
        stroke="#E91E63"
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="10,5"
        pointerEvents="none"
      />
      {/* Path dots for animation effect */}
      <Path
        d={pathData}
        stroke="#FF69B4"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2,8"
        pointerEvents="none"
      />

      {/* Debug mode: Show control lines and draggable points */}
      {DEBUG_MODE && debugControlPoints && (
        <>
          {/* Control lines */}
          <Path
            d={`M${CURRENT_LOCATION.x},${CURRENT_LOCATION.y} L${debugControlPoints.cp1.x},${debugControlPoints.cp1.y}`}
            stroke="#ff6b6b"
            strokeWidth={1}
            strokeDasharray="5,5"
            fill="none"
          />
          <Path
            d={`M${destination.x},${destination.y} L${debugControlPoints.cp2.x},${debugControlPoints.cp2.y}`}
            stroke="#4ecdc4"
            strokeWidth={1}
            strokeDasharray="5,5"
            fill="none"
          />

          {/* Draggable control points */}
          <DraggableControlPoint
            point={debugControlPoints.cp1}
            color="#ff6b6b"
            onDrag={handleCP1Drag}
          />
          <DraggableControlPoint
            point={debugControlPoints.cp2}
            color="#4ecdc4"
            onDrag={handleCP2Drag}
          />
        </>
      )}
    </Svg>
  );
};

interface MapImageProps {
  scale: any;
  translateX: any;
  translateY: any;
  panGesture: any;
  pinchGesture: any;
  panRef: any;
  pinchRef: any;
  onHotspotPress: (h: HotspotType) => void;
  showRoute: boolean;
  destinationId?: string;
  onDebugUpdate?: (debugData: DebugPathData) => void;
}

interface WebState {
  dragging: boolean;
  lastX: number;
  lastY: number;
  lastTranslateX: number;
  lastTranslateY: number;
  pinch: boolean;
  lastDist: number;
  lastScale: number;
}

// Custom hook: useWebPanZoom
function useWebPanZoom(
  containerRef: MutableRefObject<HTMLDivElement | null>,
  scale: any,
  translateX: any,
  translateY: any
) {
  React.useEffect(() => {
    if (!isWeb || !containerRef.current) return;
    const el = containerRef.current;
    let pointerIds: number[] = [];
    let pointers: { [id: number]: { x: number; y: number } } = {};
    let panStart = { x: 0, y: 0, tx: 0, ty: 0 };
    let pinchStart = { dist: 0, scale: 1 };
    let isDragging = false;

    const getDistance = (
      a: { x: number; y: number },
      b: { x: number; y: number }
    ) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const onPointerDown = (e: PointerEvent) => {
      // Don't interfere with hotspot clicks
      const target = e.target as HTMLElement;
      // Check for hotspot markers using multiple methods
      if (
        target &&
        (target.closest('[data-hotspot="true"]') ||
          target.closest(".map-hotspot") ||
          target.classList.contains("map-hotspot"))
      ) {
        return;
      }

      el.setPointerCapture(e.pointerId);
      pointerIds.push(e.pointerId);
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      isDragging = false;

      if (e.pointerType === "mouse" || pointerIds.length === 1) {
        // Pan start
        panStart = {
          x: e.clientX,
          y: e.clientY,
          tx: translateX.value,
          ty: translateY.value,
        };
      } else if (pointerIds.length === 2) {
        // Pinch start
        const [id1, id2] = pointerIds;
        const dist = getDistance(pointers[id1], pointers[id2]);
        pinchStart = { dist, scale: scale.value };
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pointerIds.includes(e.pointerId)) return;
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };

      if (
        e.pointerType === "mouse" &&
        pointerIds.length === 1 &&
        e.buttons === 1
      ) {
        // Pan with mouse
        const dx = e.clientX - panStart.x;
        const dy = e.clientY - panStart.y;

        // Only start dragging if moved more than 5px
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          isDragging = true;
        }

        if (isDragging) {
          translateX.value = panStart.tx + dx;
          translateY.value = panStart.ty + dy;
        }
      } else if (e.pointerType === "touch") {
        if (pointerIds.length === 1) {
          // Pan with 1 finger
          const dx = e.clientX - panStart.x;
          const dy = e.clientY - panStart.y;

          if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            isDragging = true;
          }

          if (isDragging) {
            translateX.value = panStart.tx + dx;
            translateY.value = panStart.ty + dy;
          }
        } else if (pointerIds.length === 2) {
          // Pinch with 2 fingers
          const [id1, id2] = pointerIds;
          const dist = getDistance(pointers[id1], pointers[id2]);
          let newScale = pinchStart.scale * (dist / pinchStart.dist);
          newScale = Math.max(0.5, Math.min(2.5, newScale));
          scale.value = newScale;
        }
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      el.releasePointerCapture(e.pointerId);
      pointerIds = pointerIds.filter((id) => id !== e.pointerId);
      delete pointers[e.pointerId];
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.ctrlKey) {
        // Pinch zoom (Trackpad pinch or Ctrl+Wheel)
        // deltaY is negative when zooming in (fingers spread)
        const zoomSensitivity = 0.005;
        const newScale = scale.value - e.deltaY * zoomSensitivity;
        scale.value = Math.max(0.5, Math.min(2.5, newScale));
      } else {
        // Pan (Trackpad two-finger drag or Mouse wheel)
        translateX.value = translateX.value - e.deltaX;
        translateY.value = translateY.value - e.deltaY;
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [scale, translateX, translateY]);
}

const MapImage: React.FC<MapImageProps> = memo(
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
    destinationId,
    onDebugUpdate,
  }: MapImageProps) => {
    // --- Web state ---
    const [webState, setWebState] = React.useState<WebState>({
      dragging: false,
      lastX: 0,
      lastY: 0,
      lastTranslateX: 0,
      lastTranslateY: 0,
      pinch: false,
      lastDist: 0,
      lastScale: 1,
    });
    const containerRef = React.useRef<HTMLDivElement>(null);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    }));

    if (isWeb) {
      useWebPanZoom(containerRef, scale, translateX, translateY);
      return (
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: "100%",
            touchAction: "none",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={[
              {
                width: MAP_WIDTH,
                height: MAP_HEIGHT,
                pointerEvents: "box-none",
              },
              animatedStyle,
            ]}
          >
            <Image
              source={require("../../assets/images/damsen-map.webp")}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <RoutePath
              show={showRoute}
              destinationId={destinationId}
              onDebugUpdate={onDebugUpdate}
            />
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
        </div>
      );
    }
    // Mobile: giữ nguyên gesture handler
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
              style={[
                { width: MAP_WIDTH, height: MAP_HEIGHT, touchAction: "none" },
                animatedStyle,
              ]}
            >
              <Image
                source={require("../../assets/images/damsen-map.webp")}
                style={styles.mapImage}
                resizeMode="cover"
              />
              <RoutePath
                show={showRoute}
                destinationId={destinationId}
                onDebugUpdate={onDebugUpdate}
              />
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

// Web Draggable Handle Component
const WebDraggableHandle: React.FC<{
  translateY: Animated.SharedValue<number>;
  onClose: () => void;
  sheetHeight: number;
}> = ({ translateY, onClose, sheetHeight }) => {
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startY = 0;
    let startTransY = 0;
    let isDragging = false;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startY = e.clientY;
      startTransY = translateY.value;
      el.setPointerCapture(e.pointerId);
      e.stopPropagation();
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const delta = e.clientY - startY;
      const nextY = startTransY + delta;

      // Allow dragging up with resistance (elastic effect)
      if (nextY < 0) {
        translateY.value = nextY * 0.3;
      } else {
        translateY.value = nextY;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      el.releasePointerCapture(e.pointerId);

      const delta = e.clientY - startY;
      if (delta > 100) {
        onClose();
      } else {
        translateY.value = withTiming(0, { duration: 300 });
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
    };
  }, [translateY, onClose, sheetHeight]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        padding: "10px 0",
        display: "flex",
        justifyContent: "center",
        cursor: "grab",
        touchAction: "none",
      }}
    >
      <div
        style={{
          width: 40,
          height: 4,
          backgroundColor: "#E0E0E0",
          borderRadius: 2,
        }}
      />
    </div>
  );
};

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

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = sheetTranslateY.value;
    },
    onActive: (event, ctx: any) => {
      const nextY = ctx.startY + event.translationY;
      // Limit to not go above 0 (expanded state)
      sheetTranslateY.value = Math.max(0, nextY);
    },
    onEnd: (event) => {
      if (event.translationY > 100 || event.velocityY > 500) {
        // Close
        sheetTranslateY.value = withTiming(SHEET_HEIGHT, {}, (finished) => {
          if (finished) {
            runOnJS(onClose)();
          }
        });
      } else {
        // Snap back open
        sheetTranslateY.value = withTiming(0);
      }
    },
  });

  React.useEffect(() => {
    if (visible) {
      sheetTranslateY.value = withTiming(0, { duration: 300 });
    } else {
      sheetTranslateY.value = withTiming(SHEET_HEIGHT, { duration: 300 });
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.bottomSheet, animatedSheetStyle]}>
      {isWeb ? (
        <WebDraggableHandle
          translateY={sheetTranslateY}
          onClose={onClose}
          sheetHeight={SHEET_HEIGHT}
        />
      ) : (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={{
              width: "100%",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <View style={navStyles.sheetHandle} />
          </Animated.View>
        </PanGestureHandler>
      )}
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
const MapScreen: React.FC = () => {
  const router = useRouter();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotType | null>(
    null
  );
  const [navigationMode, setNavigationMode] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const [debugData, setDebugData] = useState<DebugPathData | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false); // Thêm state modal

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
    const targetScale = 1;
    const centerX = windowWidth / 2 - CURRENT_LOCATION.x;
    const centerY = windowHeight / 2 - CURRENT_LOCATION.y;

    if (isWeb) {
      // Manual animation loop for Web to ensure smoothness
      const startScale = scale.value;
      const startX = translateX.value;
      const startY = translateY.value;
      const startTime = Date.now();
      const duration = 1000; // 1000ms = 1s

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing: EaseOutExpo (giống Google Maps)
        // 1 - Math.pow(2, -10 * progress)
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        scale.value = startScale + (targetScale - startScale) * ease;
        translateX.value = startX + (centerX - startX) * ease;
        translateY.value = startY + (centerY - startY) * ease;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    } else {
      // Mobile implementation
      const springConfig = {
        damping: 20,
        stiffness: 90,
        mass: 1,
      };
      scale.value = withSpring(targetScale, springConfig);
      translateX.value = withSpring(centerX, springConfig);
      translateY.value = withSpring(centerY, springConfig);
    }
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

  // --- Web touch gesture state ---
  const webTouchState = useRef({
    lastTouches: null as TouchList | null,
    lastDistance: 0,
    lastScale: 1,
    lastTranslate: { x: 0, y: 0 },
    startTranslate: { x: 0, y: 0 },
  });

  // --- Web touch handlers ---
  const handleTouchStart = (e: TouchEvent) => {
    if (!isWeb) return;
    const touches = e.touches;
    webTouchState.current.lastTouches = touches;
    if (touches.length === 2) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      webTouchState.current.lastDistance = Math.sqrt(dx * dx + dy * dy);
      webTouchState.current.lastScale = scale.value;
    } else if (touches.length === 1) {
      webTouchState.current.startTranslate = {
        x: touches[0].clientX - translateX.value,
        y: touches[0].clientY - translateY.value,
      };
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isWeb) return;
    const touches = e.touches;
    if (touches.length === 2) {
      // Pinch zoom
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const scaleFactor = distance / webTouchState.current.lastDistance;
      let newScale = webTouchState.current.lastScale * scaleFactor;
      newScale = Math.max(0.5, Math.min(2.5, newScale));
      scale.value = newScale;
    } else if (touches.length === 1) {
      // Pan
      const x = touches[0].clientX - webTouchState.current.startTranslate.x;
      const y = touches[0].clientY - webTouchState.current.startTranslate.y;
      translateX.value = x;
      translateY.value = y;
    }
    e.preventDefault();
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!isWeb) return;
    // Reset state if needed
    webTouchState.current.lastTouches = null;
  };

  return (
    <View style={styles.container}>
      {/* Fixed warning button */}
      <TouchableOpacity
        style={[styles.warningButton, { backgroundColor: "#FDE3F2" }]}
        onPress={() => setShowAlertModal(true)}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 32 }}>🚨</Text>
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
        destinationId={selectedHotspot?.id}
        onDebugUpdate={setDebugData}
        {...(isWeb
          ? {
              ref: (ref: HTMLDivElement | null) => {
                if (ref) {
                  ref.ontouchstart = handleTouchStart;
                  ref.ontouchmove = handleTouchMove;
                  ref.ontouchend = handleTouchEnd;
                }
              },
            }
          : {})}
      />
      {/* Floating header */}
      {/* <SafeAreaView style={styles.headerContainer}>
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
      </SafeAreaView> */}
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
      <DebugPanel debugData={debugData} />
      <SupportChat />
    </View>
  );
};

export default MapScreen;

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
    zIndex: 50,
    pointerEvents: "auto",
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
    bottom: -200, // Extend below screen to cover elastic pull gap
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
    paddingBottom: 202, // Compensate for bottom: -200
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
    zIndex: 30,
  },
  currentLocationBtn: {
    position: "absolute",
    bottom: 32,
    left: 24,
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
