import { ScrollView } from "moti";
import { Skeleton } from "moti/skeleton";
import { StyleSheet, View } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

const ChatSkeleton = () => {
  const inset = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header Skeleton */}
      <View style={[styles.header, { borderColor: "#EEE" }]}>
        <View style={{ marginRight: 12 }}>
          <Skeleton colorMode="light" radius={10} width={40} height={40} />
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton colorMode="light" width={150} height={18} />
          <Skeleton colorMode="light" width={100} height={12} />
        </View>
      </View>

      {/* Chat List Skeleton */}
      <ScrollView
        contentContainerStyle={styles.chatListContent}
        scrollEnabled={false}
      >
        <View style={[styles.msgWrapper, styles.msgUser]}>
          <Skeleton colorMode="light" radius={15} width={220} height={60} />
        </View>
        <View style={[styles.msgWrapper, styles.msgDealer]}>
          <Skeleton colorMode="light" radius={15} width={180} height={50} />
        </View>
        <View style={[styles.msgWrapper, styles.msgUser]}>
          <Skeleton colorMode="light" radius={15} width={140} height={50} />
        </View>
        <View style={[styles.msgWrapper, styles.msgDealer]}>
          <Skeleton colorMode="light" radius={15} width={250} height={80} />
        </View>
      </ScrollView>

      {/* Input Skeleton */}
      <View
        style={[
          styles.inputWrapper,
          { paddingBottom: inset.bottom + 20, borderColor: "#EEE" },
        ]}
      >
        <View style={styles.actionHeader}>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <Skeleton colorMode="light" radius={4} width={25} height={25} />
            <Skeleton colorMode="light" radius={4} width={25} height={25} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={{ flex: 1 }}>
            <Skeleton colorMode="light" radius={12} width="100%" height={50} />
          </View>
          <Skeleton colorMode="light" radius={12} width={50} height={50} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatSkeleton;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFDFD" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 3,
    backgroundColor: "white",
  },
  chatListContent: { padding: 20 },
  msgWrapper: { marginBottom: 18, maxWidth: "80%" },
  msgUser: { alignSelf: "flex-end", alignItems: "flex-end" },
  msgDealer: { alignSelf: "flex-start", alignItems: "flex-start" },
  inputWrapper: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: "white",
    borderTopWidth: 3,
  },
  actionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  inputContainer: { flexDirection: "row", alignItems: "flex-end", gap: 12 },
});
