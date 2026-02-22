import { Dimensions, View } from "react-native";
import BackButton from "./back-button";
import ProgressBar from "./progress-bar";

const { height, width } = Dimensions.get("screen");

const HeaderOnBoarding = () => {
  return (
    <View
      style={{
        width: width,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
        paddingHorizontal: 16,
      }}
    >
      <BackButton />
      <View style={{ flex: 1 }}>
        <ProgressBar totalStep={3} />
      </View>
      <View style={{ height: 42, width: 42 }} />
    </View>
  );
};

export default HeaderOnBoarding;
