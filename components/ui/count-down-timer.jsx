import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ClockIcon } from "react-native-heroicons/solid";
import { Fonts } from "../../constants/fonts";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();

      if (isNaN(target)) {
        setTimeLeft("00:00:00");
        return;
      }

      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft("Waktu Habis");
        return;
      }

      // Hitung Hari, Jam, Menit, Detik
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Format angka agar selalu 2 digit
      const h = hours.toString().padStart(2, "0");
      const m = minutes.toString().padStart(2, "0");
      const s = seconds.toString().padStart(2, "0");

      // Logika tampilan: Jika lebih dari 0 hari, tampilkan "Xd HH:MM:SS"
      if (days > 0) {
        setTimeLeft(`${days}d ${h}:${m}:${s}`);
      } else {
        // Jika sisa waktu kurang dari 24 jam, langsung "HH:MM:SS"
        setTimeLeft(`${h}:${m}:${s}`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <View style={styles.countdownBox}>
      <ClockIcon size={16} color="black" />
      <Text style={styles.countdownText}>{timeLeft}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  countdownBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F3F4F6", // Abu-abu netral
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.5, // Sedikit lebih tebal agar terasa "honest design"
    borderColor: "black", // Outline hitam tegas khas Brum
  },
  countdownText: {
    fontFamily: Fonts.semibold,
    fontSize: 13,
    color: "black",
    minWidth: 85, // Ditambah sedikit karena ada karakter 'd'
    textAlign: "center",
  },
});

export default CountdownTimer;
