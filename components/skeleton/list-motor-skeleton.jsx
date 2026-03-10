// Lokasi: components/ui/motor-card-skeleton.js
import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";

const MotorCardSkeleton = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.innerWrapper}>
        <View style={styles.cardShadow} />
        <MotiView
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "timing",
            duration: 1000,
            loop: true,
          }}
          style={styles.cardBody}
        >
          {/* Image Placeholder Skeleton */}
          <View
            style={[styles.imagePlaceholder, { backgroundColor: "#E5E5E5" }]}
          />

          <View style={styles.contentWrapper}>
            {/* Title Skeleton */}
            <View
              style={[
                styles.skeletonBar,
                { width: "80%", height: 16, marginBottom: 8 },
              ]}
            />
            {/* Dealer Skeleton */}
            <View
              style={[
                styles.skeletonBar,
                { width: "50%", height: 12, marginBottom: 12 },
              ]}
            />
            {/* Price Skeleton */}
            <View style={[styles.skeletonBar, { width: "40%", height: 15 }]} />
          </View>
        </MotiView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: { height: 110, marginBottom: 20, width: "100%" },
  innerWrapper: { height: "100%", position: "relative" },
  cardShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "#EEE",
    borderRadius: 12,
  },
  cardBody: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#EEE",
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  contentWrapper: { flex: 1, marginLeft: 15, justifyContent: "center" },
  skeletonBar: { backgroundColor: "#F0F0F0", borderRadius: 4 },
});

export default MotorCardSkeleton;
