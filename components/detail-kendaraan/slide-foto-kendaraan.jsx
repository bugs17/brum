import { MotiView } from "moti";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";

const DUMMY_IMAGES = [
  {
    id: "1",
    uri: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800",
  },
  {
    id: "2",
    uri: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800",
  },
  {
    id: "3",
    uri: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800",
  },
];

const SlideFotoKendaraan = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // State untuk mengontrol skeleton secara global (Simulasi Fetching)
  const [isDataLoading, setIsDataLoading] = useState(true);
  // Tracking status loading real tiap gambar
  const [imageLoaded, setImageLoaded] = useState({});

  // Simulasi delay saat pertama kali layar dibuka
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 2000); // Tampilkan skeleton selama 2 detik
    return () => clearTimeout(timer);
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const renderItem = ({ item }) => (
    <View style={{ width: containerWidth, height: 250 }}>
      {/* SKELETON: Muncul jika data global masih loading ATAU image spesifik belum loaded */}
      {(isDataLoading || !imageLoaded[item.id]) && (
        <MotiView
          from={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "timing",
            duration: 800,
            loop: true,
          }}
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "#E5E7EB", zIndex: 1 },
          ]}
        />
      )}

      <Image
        source={{ uri: item.uri }}
        style={styles.image}
        resizeMode="cover"
        onLoad={() => handleImageLoad(item.id)}
      />
    </View>
  );

  return (
    <View
      style={styles.imageContainer}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.imageShadow} />
      <View style={styles.imageBody}>
        {containerWidth > 0 && (
          <FlatList
            data={DUMMY_IMAGES}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            snapToInterval={containerWidth}
            snapToAlignment="start"
            decelerationRate="fast"
            disableIntervalMomentum={true}
            scrollEventThrottle={16}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            bounces={true}
            overScrollMode="never"
          />
        )}

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {DUMMY_IMAGES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default SlideFotoKendaraan;

const styles = StyleSheet.create({
  imageContainer: {
    height: 250,
    marginBottom: 25,
    position: "relative",
    width: "100%",
  },
  imageShadow: {
    position: "absolute",
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    backgroundColor: "black",
    borderRadius: 12,
  },
  imageBody: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    alignSelf: "center",
    gap: 8,
    zIndex: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "black",
  },
  dotActive: {
    backgroundColor: "#dff940",
    width: 25,
  },
  dotInactive: {
    backgroundColor: "white",
  },
});
