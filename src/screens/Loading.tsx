import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Container } from "../components/toolbox";
import dbUpgrade from "../database/dbUpgrade";

const Loading = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    getDbUpgrade();
  }, []);

  const getDbUpgrade = async () => {
    await dbUpgrade();
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "home" }],
      });
    }, 1000);
  };

  return (
    <Container style={styles.container}>
      <ActivityIndicator size={"large"} color={colors.primary} />
    </Container>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
