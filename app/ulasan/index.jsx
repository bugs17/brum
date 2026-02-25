import { AnimatePresence, MotiView } from "moti";
import { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {
    ChatBubbleLeftEllipsisIcon,
    ChevronLeftIcon,
    PencilSquareIcon,
    StarIcon,
    XMarkIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "../../constants/fonts";
import { useSafeRouter } from "../../hooks/use-safe-router";

// Dummy Data Mix (Sudah & Belum Diulas)
const DUMMY_DATA = [
  {
    id: "101",
    motorName: "Honda PCX 160",
    dealerName: "Jaya Rental Abepura",
    date: "Baru Selesai",
    isReviewed: false,
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "1",
    motorName: "Yamaha NMAX 2023",
    dealerName: "Sentani Rental",
    date: "12 Feb 2026",
    isReviewed: true,
    rating: 5,
    comment: "Motornya jos, tarikan enteng banget buat naik ke Base-G.",
    image:
      "https://images.unsplash.com/photo-1620939511593-9602f2187640?q=80&w=200&auto=format&fit=crop",
  },
];

const MyReviewsScreen = () => {
  const router = useSafeRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedMotor, setSelectedMotor] = useState(null);
  const [rating, setRating] = useState(1); // Default minimal 1 bintang
  const [comment, setComment] = useState(""); // State untuk menampung teks ulasan
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openReviewModal = (item) => {
    setSelectedMotor(item);
    setRating(1); // Reset rating ke minimal 1 saat buka modal baru
    setComment(""); // Reset komentar
    setShowModal(true);
  };

  const handleSubmitReview = async () => {
    // Validasi: Cegah kirim jika komentar kosong atau hanya spasi
    if (comment.trim().length === 0) {
      alert("Tuliskan ulasanmu dulu ya!");
      return;
    }

    Keyboard.dismiss();
    setIsSubmitting(true);

    // Simulasi Proses Pengiriman (API Call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowModal(false);
  };

  const renderReviewItem = ({ item }) => {
    if (!item.isReviewed) {
      return (
        <View style={styles.reviewCard}>
          <View style={styles.cardShadow} />
          <Pressable onPress={() => openReviewModal(item)}>
            {({ pressed }) => (
              <MotiView
                animate={{
                  translateX: pressed ? 4 : 0,
                  translateY: pressed ? 4 : 0,
                }}
                transition={{ type: "timing", duration: 50 }}
                style={[styles.cardBody, { backgroundColor: "#FEF08A" }]}
              >
                <View style={styles.headerCard}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.motorThumb}
                  />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.motorTitle}>{item.motorName}</Text>
                    <Text style={styles.dealerSubtitle}>{item.dealerName}</Text>
                  </View>
                  <View style={styles.badgePending}>
                    <Text style={styles.badgeText}>BELUM DIULAS</Text>
                  </View>
                </View>
                <View style={styles.actionPrompt}>
                  <PencilSquareIcon size={18} color="black" />
                  <Text style={styles.promptText}>
                    Ketuk untuk tulis ulasan
                  </Text>
                </View>
              </MotiView>
            )}
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.reviewCard}>
        <View style={styles.cardShadow} />
        <View style={styles.cardBody}>
          <View style={styles.headerCard}>
            <Image source={{ uri: item.image }} style={styles.motorThumb} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.motorTitle}>{item.motorName}</Text>
              <Text style={styles.dealerSubtitle}>{item.dealerName}</Text>
            </View>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
          <View style={styles.ratingRow}>
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                size={16}
                color={i < item.rating ? "#FDE047" : "#E5E7EB"}
              />
            ))}
          </View>
          <View style={styles.commentBox}>
            <ChatBubbleLeftEllipsisIcon size={16} color="#666" />
            <Text style={styles.commentText}>{item.comment}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Utama */}
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <ChevronLeftIcon size={24} color="black" />
          </Pressable>
          <Text style={styles.mainTitle}>ULASAN SAYA</Text>
        </View>
      </View>

      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderReviewItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* --- MODAL ULASAN (FULL SOP BRUM) --- */}
      <Modal
        visible={showModal}
        animationType="fade"
        transparent
        onRequestClose={() => !isSubmitting && setShowModal(false)}
      >
        <Pressable
          onPress={() => !isSubmitting && setShowModal(false)}
          style={[StyleSheet.absoluteFill, styles.overlay]}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.containerAvoidingView}
          pointerEvents="box-none"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContentWrapper}>
              <View style={styles.modalShadow} />

              <View style={styles.modalBody}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>TULIS ULASAN</Text>
                  <Pressable
                    onPress={() => setShowModal(false)}
                    style={styles.closeBtn}
                    disabled={isSubmitting}
                  >
                    <XMarkIcon size={20} color="black" />
                  </Pressable>
                </View>

                {/* Star Rating Picker - Minimal 1 Bintang */}
                <Text style={styles.label}>
                  Rating untuk {selectedMotor?.motorName}
                </Text>
                <View style={styles.ratingPicker}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Pressable
                      key={num}
                      onPress={() => setRating(num)}
                      disabled={isSubmitting}
                    >
                      <StarIcon
                        size={38}
                        color={num <= rating ? "#FDE047" : "#E5E7EB"}
                      />
                    </Pressable>
                  ))}
                </View>

                {/* Input Area */}
                <Text style={styles.label}>Tulis pengalamanmu</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Contoh: Motor bersih, diler ramah..."
                    multiline
                    style={styles.textArea}
                    placeholderTextColor="#999"
                    cursorColor={"black"}
                    selectionColor={"#dff940"}
                    editable={!isSubmitting}
                    value={comment}
                    onChangeText={setComment}
                  />
                </View>

                {/* Submit Button */}
                <Pressable
                  onPress={handleSubmitReview}
                  style={styles.submitBtnContainer}
                  disabled={isSubmitting}
                >
                  {({ pressed }) => (
                    <View style={{ position: "relative", height: 55 }}>
                      <View style={styles.btnShadow} />
                      <MotiView
                        animate={{
                          translateX: pressed || isSubmitting ? 4 : 0,
                          translateY: pressed || isSubmitting ? 4 : 0,
                        }}
                        transition={{ type: "timing", duration: 50 }}
                        style={[
                          styles.btnBody,
                          isSubmitting && { backgroundColor: "#ccc" },
                        ]}
                      >
                        <Text style={styles.btnText}>
                          {isSubmitting ? "MENGIRIM..." : "KIRIM ULASAN"}
                        </Text>
                      </MotiView>
                    </View>
                  )}
                </Pressable>

                {/* --- LOADING OVERLAY DALAM MODAL --- */}
                <AnimatePresence>
                  {isSubmitting && (
                    <MotiView
                      from={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={styles.loadingOverlay}
                    >
                      <View style={styles.loadingCard}>
                        <ActivityIndicator size="large" color="#dff940" />
                        <Text style={styles.loadingText}>
                          Memproses Ulasan...
                        </Text>
                        <Text style={styles.loadingSub}>
                          Ulasanmu sangat berharga buat komunitas Brum!
                        </Text>
                      </View>
                    </MotiView>
                  )}
                </AnimatePresence>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  headerSection: { padding: 25 },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 15 },
  mainTitle: { fontFamily: Fonts.bold, fontSize: 26, color: "black" },
  listContainer: { padding: 25 },
  iconBtn: { padding: 8 },

  // CARD STYLES
  reviewCard: { position: "relative", marginBottom: 25 },
  cardShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 16,
  },
  cardBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 15,
  },
  headerCard: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  motorThumb: {
    width: 45,
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  motorTitle: { fontFamily: Fonts.bold, fontSize: 14 },
  dealerSubtitle: { fontFamily: Fonts.regular, fontSize: 12, color: "#666" },
  dateText: { fontFamily: Fonts.regular, fontSize: 10, color: "#999" },

  // UNREVIEWED ACTION AREA
  actionPrompt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    borderTopWidth: 1.5,
    borderTopColor: "black",
    paddingTop: 10,
    borderStyle: "dashed",
  },
  promptText: { fontFamily: Fonts.bold, fontSize: 12 },
  badgePending: {
    backgroundColor: "black",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: { color: "white", fontSize: 9, fontFamily: Fonts.bold },

  // REVIEWED STYLES
  ratingRow: { flexDirection: "row", marginBottom: 10, gap: 2 },
  commentBox: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#F9FAFB",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  commentText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 13,
    fontStyle: "italic",
  },

  // MODAL STYLES (SOP BRUM)
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.84)",
  },
  containerAvoidingView: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
  },
  modalContentWrapper: {
    position: "relative",
    width: "100%",
  },
  modalShadow: {
    position: "absolute",
    top: 6,
    left: 6,
    right: -6,
    bottom: -6,
    backgroundColor: "black",
    borderRadius: 12,
  },
  modalBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 20,
    overflow: "hidden", // Supaya loading overlay tertutup rapi
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { fontFamily: Fonts.bold, fontSize: 18 },
  closeBtn: {
    padding: 4,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
  },
  label: { fontFamily: Fonts.semibold, fontSize: 14, marginBottom: 8 },
  ratingPicker: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  inputWrapper: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 12,
    height: 120,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  textArea: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    textAlignVertical: "top",
  },
  submitBtnContainer: {
    width: "100%",
  },
  btnShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  btnBody: {
    flex: 1,
    backgroundColor: "#BBF7D0",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: { fontFamily: Fonts.bold, fontSize: 16 },

  // LOADING OVERLAY
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  loadingCard: { alignItems: "center", padding: 20 },
  loadingText: {
    fontFamily: Fonts.semibold,
    fontSize: 16,
    marginTop: 15,
    color: "black",
  },
  loadingSub: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
});

export default MyReviewsScreen;
