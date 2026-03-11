import { Skeleton } from "moti/skeleton";
import { StyleSheet, View } from "react-native";

const SkeletonCommonProps = {
  colorMode: "light",
  transition: { type: "timing", duration: 1000 },
  backgroundColor: "#E1E1E1",
};

export const InvoiceListSkeleton = () => {
  // Kita buat 4 item dummy skeleton
  return (
    <View style={{ gap: 22, paddingHorizontal: 20 }}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.invoiceCard}>
          <View style={styles.cardShadow} />
          <View style={styles.cardBody}>
            <View style={styles.topRow}>
              <Skeleton width={100} height={18} {...SkeletonCommonProps} />
              <Skeleton width={70} height={22} {...SkeletonCommonProps} />
            </View>

            <View style={styles.divider} />

            <View style={styles.mainInfo}>
              <View style={{ gap: 8 }}>
                <Skeleton width={180} height={20} {...SkeletonCommonProps} />
                <Skeleton width={100} height={14} {...SkeletonCommonProps} />
              </View>
              <Skeleton width={80} height={20} {...SkeletonCommonProps} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceCard: { position: "relative" },
  cardShadow: {
    position: "absolute",
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: "black",
    borderRadius: 16,
  },
  cardBody: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 16,
    padding: 16,
  },
  topRow: { flexDirection: "row", justifyContent: "space-between" },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 12,
    borderStyle: "dashed",
    borderWidth: 0.5,
  },
  mainInfo: { flexDirection: "row", justifyContent: "space-between" },
});
