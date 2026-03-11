import { MotiView } from "moti";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    CheckCircleIcon,
    ClockIcon,
    XMarkIcon,
} from "react-native-heroicons/solid";
import { Fonts } from "../constants/fonts";

export const TransactionSelectorModal = ({
  visible,
  onClose,
  onSelect,
  transactions,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <MotiView
          from={{ translateY: 300 }}
          animate={{ translateY: 0 }}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Pilih Transaksi</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <XMarkIcon size={24} color="black" />
            </Pressable>
          </View>

          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item }) => (
              <Pressable onPress={() => onSelect(item)} style={styles.card}>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        item.status === "Aktif" ? "#BAE6FD" : "#BBF7D0",
                    },
                  ]}
                >
                  {item.status === "Aktif" ? (
                    <ClockIcon size={12} color="black" />
                  ) : (
                    <CheckCircleIcon size={12} color="black" />
                  )}
                  <Text style={styles.statusText}>
                    {item.status.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.motorName}>{item.motorName}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.invoiceText}>INV-{item.id}</Text>
              </Pressable>
            )}
          />
        </MotiView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    height: "70%",
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontFamily: Fonts.bold, fontSize: 18 },
  closeBtn: { padding: 4 },
  card: {
    padding: 15,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    marginBottom: 15,
    backgroundColor: "white",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  statusText: { fontFamily: Fonts.bold, fontSize: 10 },
  motorName: { fontFamily: Fonts.bold, fontSize: 16, color: "black" },
  dateText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  invoiceText: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: "#AAA",
    marginTop: 2,
  },
});
