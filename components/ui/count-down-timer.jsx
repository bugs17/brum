import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ClockIcon } from "react-native-heroicons/solid";
import { Fonts } from "../../constants/fonts";

const CountdownTimer = ({ targetDate, isMinimal = false }) => {
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
        setTimeLeft("Habis");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const h = hours.toString().padStart(2, "0");
      const m = minutes.toString().padStart(2, "0");
      const s = seconds.toString().padStart(2, "0");

      if (days > 0) {
        setTimeLeft(`${days}d ${h}:${m}:${s}`);
      } else {
        setTimeLeft(`${h}:${m}:${s}`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <View style={[styles.countdownBox, isMinimal && styles.minimalBox]}>
      <ClockIcon size={14} color="black" />
      <Text style={[styles.countdownText, isMinimal && styles.minimalText]}>
        {timeLeft}
      </Text>
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
    borderWidth: 1.5,
    borderColor: "black",
  },
  minimalBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  countdownText: {
    fontFamily: Fonts.semibold,
    fontSize: 13,
    color: "black",
    minWidth: 80,
    textAlign: "center",
  },
  minimalText: {
    textAlign: "left",
    minWidth: 0,
    fontSize: 14,
    color: "black", // Tetap hitam biar kontras di atas background amber
  },
});

export default CountdownTimer;
