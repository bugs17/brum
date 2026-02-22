import { MotiView } from "moti";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { HeartIcon as HeartOutline } from "react-native-heroicons/outline";
import { HeartIcon as HeartSolid } from "react-native-heroicons/solid";

const WishlistButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Pressable onPress={() => setIsLiked(!isLiked)}>
      <MotiView
        // Efek animasi "Pop" saat state isLiked berubah
        animate={{
          scale: isLiked ? [1, 1.4, 1] : 1,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 200,
        }}
        style={styles.iconBtn}
      >
        {isLiked ? (
          <HeartSolid size={28} color="#FF4444" /> // Merah Solid
        ) : (
          <HeartOutline size={28} color="black" /> // Hitam Outline
        )}
      </MotiView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconBtn: {
    padding: 8,
    // Kita nggak pake shadow di sini biar icon-nya tetep clean di header
  },
});

export default WishlistButton;
