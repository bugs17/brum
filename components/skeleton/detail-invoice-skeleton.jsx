import { Skeleton } from "moti/skeleton";
import { StyleSheet, View } from "react-native";

const SkeletonCommonProps = {
  colorMode: "light",
  transition: { type: "timing", duration: 1000 },
  backgroundColor: "#E1E1E1", // Warna standar skeleton lo
};

export const InvoiceDetailSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Skeleton Status Banner */}
      <Skeleton width={"100%"} height={60} {...SkeletonCommonProps} />

      {/* Skeleton Info Utama Card */}
      <View style={styles.sectionCard}>
        <View style={styles.cardShadow} />
        <View style={[styles.cardBody, { gap: 12 }]}>
          <Skeleton width={150} height={20} {...SkeletonCommonProps} />
          <Skeleton width={"100%"} height={15} {...SkeletonCommonProps} />
          <Skeleton width={"100%"} height={15} {...SkeletonCommonProps} />
        </View>
      </View>

      {/* Title Detail */}
      <Skeleton width={120} height={25} {...SkeletonCommonProps} />

      {/* Skeleton Rincian Sewa Card */}
      <View style={styles.sectionCard}>
        <View style={styles.cardShadow} />
        <View style={[styles.cardBody, { gap: 15 }]}>
          <Skeleton width={220} height={30} {...SkeletonCommonProps} />
          <Skeleton width={100} height={18} {...SkeletonCommonProps} />

          <View style={styles.line} />

          <Skeleton width={"100%"} height={20} {...SkeletonCommonProps} />
          <Skeleton width={"100%"} height={20} {...SkeletonCommonProps} />
          <Skeleton width={"100%"} height={20} {...SkeletonCommonProps} />

          <View style={styles.totalDivider} />

          <Skeleton width={"100%"} height={45} {...SkeletonCommonProps} />
        </View>
      </View>

      {/* Skeleton Buttons */}
      <View style={{ gap: 15 }}>
        <Skeleton width={"100%"} height={55} {...SkeletonCommonProps} />
        <Skeleton width={"100%"} height={55} {...SkeletonCommonProps} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20 },
  sectionCard: { position: "relative", marginBottom: 5 },
  cardShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
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
  line: { height: 1, backgroundColor: "#EEE", marginVertical: 5 },
  totalDivider: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 5,
    borderStyle: "dashed",
    borderWidth: 0.5,
  },
});
