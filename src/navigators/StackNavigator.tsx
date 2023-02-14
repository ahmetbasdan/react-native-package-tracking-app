import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";

import Home from "../screens/Home";
import CargoAddFirstStep from "../screens/CargoAddFirstStep";
import CargoAddSecondStep from "../screens/CargoAddSecondStep";
import CargoUpdate from "../screens/CargoUpdate";
import Loading from "../screens/Loading";
import CargoDetail from "../screens/CargoDetail";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../constans/theme";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();

const Router = () => {
  const themeReducer = useSelector<any>((state) => state.themeReducer);
  const defaultOptions = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    cardStyle: {
      backgroundColor:
        themeReducer == "light"
          ? lightTheme.colors.background
          : darkTheme.colors.background,
    },
  };

  return (
    <PaperProvider theme={themeReducer == "light" ? lightTheme : darkTheme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={darkTheme.colors.primary}
      />
      <NavigationContainer
     
      >
        <Stack.Navigator initialRouteName="Loading">
          <Stack.Screen
            name="loading"
            component={Loading}
            options={{ ...defaultOptions }}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{ ...defaultOptions }}
          />
          <Stack.Screen
            name="cargoAddFirstStep"
            component={CargoAddFirstStep}
            options={{ ...defaultOptions }}
          />
          <Stack.Screen
            name="cargoAddSecondStep"
            component={CargoAddSecondStep}
            options={{ ...defaultOptions }}
          />
          <Stack.Screen
            name="cargoUpdate"
            component={CargoUpdate}
            options={{ ...defaultOptions }}
          />
          <Stack.Screen
            name="cargoDetail"
            component={CargoDetail}
            options={{ ...defaultOptions }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Router;
