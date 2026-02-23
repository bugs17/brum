import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ClockIcon } from "react-native-heroicons/solid";
import { Fonts } from "../../constants/fonts";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Pastikan targetDate ada, kalau gak ada set ke 0
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();

      // Cek apakah target valid (bukan NaN)
      if (isNaN(target)) {
        setTimeLeft("00:00:00");
        return;
      }

      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft("Waktu Habis");
        return;
      }

      // Hitung jam, menit, detik
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // PadStart adalah cara modern untuk nambahin angka 0 di depan
      const h = hours.toString().padStart(2, "0");
      const m = minutes.toString().padStart(2, "0");
      const s = seconds.toString().padStart(2, "0");

      setTimeLeft(`${h}:${m}:${s}`);
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
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  countdownText: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    color: "black",
    minWidth: 70, // Jaga agar lebar kotak tidak goyang saat angka berubah
  },
});

export default CountdownTimer;
