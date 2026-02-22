import { MotiView } from "moti";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Fonts } from "../../constants/fonts";

const BrumButton = ({
  title,
  onPress,
  color = "#dff940",
  disabled = false,
  onProcess = false, // Prop baru untuk loading state
  variant = "primary",
}) => {
  // Tombol otomatis disabled jika sedang proses
  const isDisabled = disabled || onProcess;

  const getBgColor = () => {
    if (isDisabled) return "#E5E7EB";
    if (variant === "outline") return "#FFFFFF";
    return color;
  };

  const getTextColor = () => {
    if (isDisabled) return "#9CA3AF";
    return "black";
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={styles.pressableArea}
      >
        {({ pressed }) => (
          <View style={styles.container}>
            {/* Shadow hilang jika disabled/proses */}
            {!isDisabled && <View style={styles.shadow} />}

            <MotiView
              animate={{
                translateX: !isDisabled && pressed ? 4 : 0,
                translateY: !isDisabled && pressed ? 4 : 0,
              }}
              transition={{
                type: "timing",
                duration: 50,
              }}
              style={[
                styles.buttonLayer,
                {
                  backgroundColor: getBgColor(),
                  borderColor: isDisabled ? "#9CA3AF" : "black",
                },
              ]}
            >
              <View style={styles.contentWrapper}>
                {onProcess && (
                  <ActivityIndicator
                    color="black"
                    style={{ marginRight: 10 }}
                    size="small"
                  />
                )}
                <Text style={[styles.text, { color: getTextColor() }]}>
                  {onProcess ? "Mohon Tunggu..." : title}
                </Text>
              </View>
            </MotiView>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    height: 54,
    position: "relative",
    width: "100%",
  },
  shadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 8,
  },
  buttonLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.semibold,
    textAlign: "center",
  },
});

export default BrumButton;
