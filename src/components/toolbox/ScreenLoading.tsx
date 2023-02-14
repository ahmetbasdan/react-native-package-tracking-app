import { View, StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

interface IProps {
  loading: boolean;
}
const ScreenLoading: React.FC<IProps> = ({ loading = false }) => {
  if (!loading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} animating />
    </View>
  );
};

export default ScreenLoading;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 99999,
  },
});
