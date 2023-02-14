import React from "react";
import { StyleSheet } from "react-native";
import { Colors, FAB, useTheme } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../components/home";
import { Container } from "../components/toolbox";

import ContinuesList from "./ContinuesList";
import ComplatedList from "./ComplatedList";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Container>
      <Header />
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.primary },
          tabBarLabelStyle: { color: Colors.white },
          tabBarIndicatorStyle: { backgroundColor: Colors.white },
        }}
      >
        <Tab.Screen
          name="continuesList"
          options={{ title: "Devam Ediyor" }}
          component={ContinuesList}
        />
        <Tab.Screen
          name="complatedList"
          options={{ title: "Tamamlandı" }}
          component={ComplatedList}
        />
      </Tab.Navigator>
      <FAB
        icon={"plus"}
        style={styles.fab}
        onPress={() => navigation.navigate("cargoAddFirstStep")}
      />
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 64,
    right: 16,
  },
});
