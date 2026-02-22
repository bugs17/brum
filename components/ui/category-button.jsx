import { MotiView } from "moti";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Fonts } from "../../constants/fonts";

const BrumCategoryCard = ({
  title,
  onPress,
  isActive = false,
  activeColor = "#dff940",
}) => {
  return (
    <View style={styles.wrapper}>
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <View style={styles.container}>
            {/* Shadow tetap diam di belakang */}
            <View style={styles.shadow} />

            {/* Layer atas yang bergerak saat ditekan */}
            <MotiView
              animate={{
                // Jika aktif atau sedang ditekan, dia pindah ke posisi shadow (4px)
                translateX: pressed || isActive ? 3 : 0,
                translateY: pressed || isActive ? 3 : 0,
              }}
              transition={{
                type: "timing",
                duration: 50,
              }}
              style={[
                styles.body,
                {
                  backgroundColor: isActive ? activeColor : "white",
                },
              ]}
            >
              <Text style={styles.text}>{title}</Text>
            </MotiView>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 15,
    marginBottom: 10, // Ruang untuk shadow bawah agar tidak terpotong
  },
  container: {
    width: 95,
    height: 45,
    position: "relative",
  },
  shadow: {
    position: "absolute",
    top: 3,
    left: 3,
    right: -3,
    bottom: -3,
    backgroundColor: "black",
    borderRadius: 12,
  },
  body: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: Fonts.regular, // IBM Plex Mono
    fontSize: 12,
    color: "black",
  },
});

export default BrumCategoryCard;
