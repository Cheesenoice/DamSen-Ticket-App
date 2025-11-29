# 🎢 DamSen Park Mobile App - Frontend

[![Expo](https://img.shields.io/badge/Expo-~53.0.17-blue.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.79.5-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-blue.svg)](https://www.typescriptlang.org/)

> **Dự án Front-end trình bày toàn bộ thiết kế nghiệp vụ và giao diện người dùng cho ứng dụng mobile công viên giải trí Đầm Sen**

## 📱 Tổng quan

Đây là ứng dụng mobile front-end được phát triển bằng **React Native + Expo** cho công viên giải trí Đầm Sen. Ứng dụng cung cấp trải nghiệm người dùng hoàn chỉnh với các tính năng như mua vé, bản đồ tương tác, quét QR check-in, và chatbot hỗ trợ khách hàng.

## 🌐 Demo & Thiết kế

- **🔗 Web Demo:** [https://damsenapp.netlify.app/](https://damsenapp.netlify.app/)
- **🎨 Figma Design:** [Xem thiết kế chi tiết](https://www.figma.com/design/rz6JzjI710R9xLjnkebHwC/damsen-app?fuid=1465730408892692823)
- **📄 Tài liệu:** DamSenApp_Report.pdf

## ✨ Tính năng chính

### 🏠 Trang chủ (Home)

- Tìm kiếm địa điểm và trò chơi
- Hiển thị các loại vé và sự kiện nổi bật
- Combo gia đình và khuyến mãi đặc biệt
- Chatbot hỗ trợ khách hàng 24/7

### 🎫 Mua vé (Ticket)

- **Vé lẻ:** Các trò chơi riêng lẻ (30.000đ - 70.000đ)
- **Vé tham quan:** Trọn ngày tham quan công viên (100.000đ - 160.000đ)
- **Vé trọn gói:** Bao gồm tất cả trò chơi + Thủy Cung (220.000đ - 300.000đ)
- Quản lý vé đã mua với mã vạch điện tử

### 📸 QR Check-in

- Quét mã QR tự động tại cổng vào
- Hệ thống check-in nhanh chóng
- Tích hợp camera với Expo Camera API

### 🗺️ Bản đồ tương tác (Map)

- Bản đồ công viên tương tác với zoom và pan
- 10+ điểm đến: Lâu đài kinh dị, Vòng đu quay, Băng Đăng, Vườn khủng long...
- Chỉ đường thông minh với đường đi tối ưu
- Hiển thị thời gian chờ và khoảng cách đến điểm đến
- Nút cảnh báo khẩn cấp (trẻ em bị lạc, y tế, mất đồ)

### 🎡 Khám phá (Explore)

- Danh sách 50+ trò chơi hấp dẫn
- Bộ lọc theo thể loại: Cảm giác mạnh, Phiêu lưu, Hang động
- Thông tin chi tiết: độ tuổi, chiều cao, thời gian chờ
- Đặt vé trực tiếp từ danh sách

### 💬 Chatbot AI

- Tích hợp Google Gemini AI
- Hỗ trợ đa ngôn ngữ
- Xử lý các tình huống khẩn cấp:
  - Trẻ em bị lạc
  - Mất đồ
  - Hỗ trợ y tế
  - Hỏi đáp chung

### 👤 Tài khoản (Account)

- Quản lý thông tin cá nhân
- Lịch sử mua vé
- Cài đặt thông báo

## 🛠️ Công nghệ sử dụng

### Core Technologies

- **Framework:** React Native 0.79.5
- **Platform:** Expo SDK ~53.0.17
- **Language:** TypeScript ~5.8.3
- **Navigation:** Expo Router ~5.1.3
- **UI Components:** React Native built-in + Custom components

### Key Dependencies

```json
{
  "@expo/vector-icons": "^14.1.0",
  "@gorhom/bottom-sheet": "^5.1.6",
  "@react-navigation/native": "^7.1.6",
  "expo-camera": "~16.1.10",
  "expo-barcode-scanner": "^13.0.1",
  "react-native-reanimated": "~3.17.4",
  "react-native-gesture-handler": "~2.24.0",
  "react-native-webview": "13.13.5"
}
```

### Features & APIs

- **Camera & QR:** expo-camera, expo-barcode-scanner
- **Animations:** react-native-reanimated
- **Gestures:** react-native-gesture-handler (pinch, pan, zoom)
- **Bottom Sheet:** @gorhom/bottom-sheet
- **AI Chat:** Google Gemini API integration

## 🚀 Cài đặt và Chạy dự án

### Yêu cầu hệ thống

- Node.js 18+
- npm hoặc yarn
- Expo CLI
- iOS Simulator / Android Emulator (tùy chọn)

### Các bước cài đặt

1. **Clone repository**

```bash
git clone https://github.com/Cheesenoice/DamSen-Ticket-App.git
cd StickerSmash
```

2. **Cài đặt dependencies**

```bash
npm install
```

3. **Chạy ứng dụng**

```bash
npx expo start
```

4. **Chọn platform để xem**
   - Nhấn `i` - iOS Simulator
   - Nhấn `a` - Android Emulator
   - Nhấn `w` - Web browser
   - Quét QR code - Expo Go app trên điện thoại

### Scripts có sẵn

```bash
npm start          # Khởi động Expo development server
npm run android    # Chạy trên Android emulator
npm run ios        # Chạy trên iOS simulator
npm run web        # Chạy trên web browser
npm run lint       # Kiểm tra code với ESLint
```

## 📁 Cấu trúc dự án

```
StickerSmash/
├── app/                          # Screens & Routes (Expo Router)
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── index.tsx            # 🏠 Home screen
│   │   ├── explore.tsx          # 🎡 Explore rides
│   │   ├── ticket.tsx           # 🎫 Ticket management
│   │   ├── map.tsx              # 🗺️ Interactive map
│   │   ├── qr.tsx               # 📸 QR scanner
│   │   ├── modal.tsx            # Emergency modal
│   │   ├── CustomTabBar.tsx     # Custom tab bar component
│   │   └── _layout.tsx          # Tab layout
│   ├── _layout.tsx              # Root layout
│   ├── account.tsx              # 👤 Account screen
│   ├── buyticket.tsx            # 💳 Ticket purchase flow
│   ├── chatbot.tsx              # 💬 AI Chatbot screen
│   ├── geminiChat.ts            # 🤖 Gemini AI integration
│   ├── exploreDetail.tsx        # Ride detail view
│   ├── notification.tsx         # 🔔 Notifications
│   └── chooseticket.tsx         # Ticket selection
├── assets/                       # Static assets
│   ├── images/                  # Images & illustrations
│   ├── fonts/                   # Custom fonts
│   └── tab/                     # Tab bar icons
├── components/                   # Reusable components
│   └── supportchat.tsx          # Floating chat support button
├── contexts/                     # React Context providers
├── Design.json                   # Tab navigation design system
├── MapDesign.json               # Map UI/UX design specs
├── app.json                     # Expo configuration
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript configuration
```

## 🎨 Design System

### Màu sắc chính

```typescript
Primary Colors:
- Pink: #FF69B4, #FDE3F2, #FF8FD0
- Green: #A9D0B1, #D1FBD0, #8BC34A
- Blue: #D5EDFF, #03A9F4, #1976d2

Neutral Colors:
- White: #FFFFFF
- Light Gray: #F5F5F5, #E8E8E8
- Gray: #999999, #666666
- Dark: #333333, #000000
```

### Typography

- **Font Family:** System (iOS: San Francisco, Android: Roboto)
- **Sizes:** 12px - 28px
- **Weights:** 400, 500, 600, 700

### UI Patterns

- **Tab Bar:** Custom bottom tab với active state effects
- **Cards:** Rounded corners (8px-25px) với subtle shadows
- **Buttons:** Pill-shaped (borderRadius: 20-25px)
- **Modals:** Bottom sheet với draggable handle

## 🗂️ Nghiệp vụ chính

### 1. Luồng mua vé

```
Home → Ticket Tab → Chọn loại vé → Buy Ticket → Thanh toán → My Tickets
```

### 2. Luồng check-in

```
QR Tab → Quét mã QR tại cổng → Chọn loại vé → Xác nhận → Vào cổng
```

### 3. Luồng chỉ đường

```
Map Tab → Chọn điểm đến → Xem thông tin → Chỉ đường → Theo dõi route
```

### 4. Luồng khẩn cấp

```
Map → Nút cảnh báo → Chọn tình huống → Chatbot AI → Kết nối nhân viên
```

## 🔧 Tính năng nâng cao

### Interactive Map

- **Pan & Zoom:** Reanimated gestures cho smooth experience
- **Curved Pathfinding:** Thuật toán tìm đường tối ưu với Bézier curves
- **Hotspots:** 10 điểm đến với thông tin real-time
- **Current Location:** Tracking vị trí người dùng
- **Debug Mode:** Tools để fine-tune navigation paths

### AI Chatbot

- **Context-aware:** Nhớ lịch sử chat để hiểu ngữ cảnh
- **Emergency Detection:** Tự động nhận diện tình huống khẩn cấp
- **Transfer to Staff:** Chuyển sang nhân viên khi cần

### QR Scanner

- **Auto-detect:** Tự động nhận diện và xử lý mã QR
- **Real-time Processing:** Phản hồi tức thì
- **Permission Handling:** Quản lý quyền camera thông minh

## 📊 Performance

- **Bundle Size:** Optimized với code splitting
- **Animations:** 60fps với react-native-reanimated
- **Image Loading:** Lazy loading + caching
- **API Calls:** Debounced và throttled

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

## 📱 Platforms

- ✅ iOS (iPhone & iPad)
- ✅ Android (Phone & Tablet)
- ✅ Web (Responsive)

## 👥 Nhóm phát triển

- **Repository:** [DamSen-Ticket-App](https://github.com/Cheesenoice/DamSen-Ticket-App)
- **Owner:** Cheesenoice
- **Branch:** main

## 📄 Tài liệu tham khảo

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Google Gemini AI](https://ai.google.dev/)

## 🔐 Environment Variables

Create `.env` file (not included in repo):

```env
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

## 📝 License

This project is for educational and demonstration purposes.

---

**🌟 Lưu ý:** Đây là dự án front-end showcase, tập trung vào UI/UX và trải nghiệm người dùng. Backend APIs và database chưa được implement trong phiên bản này.
