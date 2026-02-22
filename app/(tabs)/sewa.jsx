import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
    CalendarDaysIcon,
    MapPinIcon,
    QrCodeIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingDetailModal from "../../components/booking-modal"; // Kita buat modalnya di bawah
import { Fonts } from "../../constants/fonts";

const ActivityScreen = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const dummyBookings = [
    {
      id: "BRM-882910",
      motor: "Yamaha NMAX Turbo",
      date: "22 Feb - 23 Feb",
      status: "Siap Diambil",
      location: "Brum Rental Sentani",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SEWA SAYA</Text>
      </View>

      <FlatList
        data={dummyBookings}
        contentContainerStyle={{ padding: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelectedBooking(item)}
            style={styles.cardContainer}
          >
            <View style={styles.cardShadow} />
            <View style={styles.cardBody}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>

              <Text style={styles.motorName}>{item.motor}</Text>

              <View style={styles.infoRow}>
                <CalendarDaysIcon size={16} color="#666" />
                <Text style={styles.infoText}>{item.date}</Text>
              </View>

              <View style={styles.infoRow}>
                <MapPinIcon size={16} color="#666" />
                <Text style={styles.infoText}>{item.location}</Text>
              </View>

              <View style={styles.qrTrigger}>
                <QrCodeIcon size={20} color="black" />
                <Text style={styles.qrTriggerText}>TAP UNTUK QR PICKUP</Text>
              </View>
            </View>
          </Pressable>
        )}
      />

      <BookingDetailModal
        isVisible={!!selectedBooking}
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: { paddingHorizontal: 20, paddingTop: 10, marginBottom: 10 },
  title: { fontFamily: Fonts.semibold, fontSize: 24 },

  cardContainer: { position: "relative", marginBottom: 25 },
  cardShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  cardBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    padding: 15,
  },

  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#BAE6FD",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "black",
    marginBottom: 10,
  },
  statusText: { fontFamily: Fonts.semibold, fontSize: 10 },

  motorName: { fontFamily: Fonts.semibold, fontSize: 18, marginBottom: 10 },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  infoText: { fontFamily: Fonts.regular, fontSize: 13, color: "#666" },

  qrTrigger: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderStyle: "dashed",
  },
  qrTriggerText: { fontFamily: Fonts.semibold, fontSize: 12 },
});

export default ActivityScreen;
