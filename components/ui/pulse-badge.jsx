import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const PulseBadge = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animasi membesar dan mengecil secara berulang
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      {/* Efek bayangan yang berdenyut */}
      <Animated.View
        style={[
          styles.pulse,
          {
            transform: [{ scale: pulseAnim }],
            opacity: pulseAnim.interpolate({
              inputRange: [1, 1.5],
              outputRange: [0.6, 0],
            }),
          },
        ]}
      />
      {/* Titik merah solid di tengah */}
      <View style={styles.dot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -2,
    right: -2,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#EF4444", // Merah solid
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
  },
  pulse: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
  },
});

export default PulseBadge;
