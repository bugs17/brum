import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    FlatList,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import {
    CameraIcon,
    ChevronLeftIcon,
    ChevronUpDownIcon,
    PaperAirplaneIcon,
    PhotoIcon,
} from "react-native-heroicons/solid";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import ChatSkeleton from "../../components/skeleton/chat-skeleton";
import { Fonts } from "../../constants/fonts";

// --- KOMPONEN UTAMA ---
export default function ChatScreen() {
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const listRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showToolbar, setShowToolbar] = useState(false);

  // Animation Values
  const scale = useSharedValue(1);
  const keyboardHeight = useSharedValue(0);
  const bottomPadding = useSharedValue(inset.bottom + 20);

  // DATA DUMMY
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Halo, motor NMAX sudah saya ambil.",
      sender: "user",
      time: "10:00",
    },
    {
      id: "2",
      text: "Siap kak, hati-hati di jalan ya!",
      sender: "dealer",
      time: "10:01",
    },
  ]);

  // Simulasi Loading Data
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = useCallback(
    (animated = true) => {
      if (messages.length === 0) return;
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated });
      }, 100);
    },
    [messages.length],
  );

  useKeyboardHandler(
    {
      onMove: (event) => {
        "worklet";
        keyboardHeight.value = Math.max(event.height, 0);
        if (event.height === 0) {
          bottomPadding.value = inset.bottom + 20;
        } else {
          bottomPadding.value = 20;
          runOnJS(scrollToBottom)();
        }
      },
    },
    [inset.bottom, scrollToBottom],
  );

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setShowToolbar(true),
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setShowToolbar(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim().length === 0) return;
    scale.value = withSpring(0.9);
    setTimeout(() => (scale.value = withSpring(1)), 120);

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    scrollToBottom(true);
  };

  const fakeViewStyle = useAnimatedStyle(() => ({
    height: Math.abs(keyboardHeight.value),
  }));
  const animatedBottomPadding = useAnimatedStyle(() => ({
    paddingBottom: withTiming(bottomPadding.value, { duration: 200 }),
  }));
  const sendBtnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Render Skeleton jika masih loading
  if (isLoading) {
    return <ChatSkeleton inset={inset} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="black" />
        </Pressable>
        <View style={styles.headerContent}>
          <Text style={styles.dealerName}>Brum Rental Sentani</Text>
          <Text style={styles.idText}>Yamaha NMAX • BRM-882910</Text>
        </View>
      </View>

      {/* CHAT LIST */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.msgWrapper,
              item.sender === "user" ? styles.msgUser : styles.msgDealer,
            ]}
          >
            <View
              style={[
                styles.msgBubble,
                item.sender === "user"
                  ? styles.bubbleUser
                  : styles.bubbleDealer,
              ]}
            >
              <Text
                style={[
                  styles.msgText,
                  { color: item.sender === "user" ? "black" : "white" },
                ]}
              >
                {item.text}
              </Text>
            </View>
            <Text style={styles.msgTime}>{item.time}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatListContent}
        onContentSizeChange={() => scrollToBottom(true)}
      />

      {/* INPUT AREA */}
      <Animated.View style={[styles.inputWrapper, animatedBottomPadding]}>
        <View style={styles.actionHeader}>
          <View style={styles.quickActions}>
            <Pressable
              onPress={() => console.log("Kamera")}
              style={styles.iconActionBtn}
            >
              <CameraIcon size={22} color="black" />
            </Pressable>
            <Pressable
              onPress={() => console.log("Galeri")}
              style={styles.iconActionBtn}
            >
              <PhotoIcon size={22} color="black" />
            </Pressable>
          </View>

          {showToolbar && (
            <Pressable
              onPress={() => Keyboard.dismiss()}
              style={styles.toolbarClose}
            >
              <Text style={styles.toolbarText}>Tutup</Text>
              <ChevronUpDownIcon size={18} color="#666" />
            </Pressable>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pesan..."
            cursorColor={"#000"}
            value={message}
            onChangeText={setMessage}
            multiline
            placeholderTextColor="#999"
          />
          <Animated.View style={sendBtnStyle}>
            <Pressable onPress={sendMessage} style={styles.sendBtn}>
              <PaperAirplaneIcon size={22} color="black" />
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>

      <Animated.View style={fakeViewStyle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderColor: "black",
    backgroundColor: "white",
  },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerContent: { flex: 1 },
  dealerName: { fontFamily: Fonts.bold, fontSize: 16 },
  idText: { fontFamily: Fonts.regular, fontSize: 11, color: "#666" },
  chatListContent: { padding: 20 },
  msgWrapper: { marginBottom: 18, maxWidth: "80%" },
  msgUser: { alignSelf: "flex-end", alignItems: "flex-end" },
  msgDealer: { alignSelf: "flex-start", alignItems: "flex-start" },
  msgBubble: {
    padding: 14,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "black",
  },
  bubbleUser: {
    backgroundColor: "#DFF940",
    borderBottomRightRadius: 2,
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  bubbleDealer: { backgroundColor: "black", borderBottomLeftRadius: 2 },
  msgText: { fontFamily: Fonts.medium, fontSize: 14, lineHeight: 20 },
  msgTime: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: "#999",
    marginTop: 6,
  },
  inputWrapper: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: "white",
    borderTopWidth: 3,
    borderColor: "black",
  },
  actionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  quickActions: { flexDirection: "row", gap: 15 },
  iconActionBtn: { padding: 4 },
  toolbarClose: { flexDirection: "row", alignItems: "center", gap: 4 },
  toolbarText: { fontFamily: Fonts.semibold, fontSize: 12, color: "#666" },
  inputContainer: { flexDirection: "row", alignItems: "flex-end", gap: 12 },
  input: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontFamily: Fonts.regular,
    maxHeight: 120,
  },
  sendBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#DFF940",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
});
