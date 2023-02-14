import { DarkTheme, DefaultTheme, configureFonts } from "react-native-paper";
import { Theme, Fonts } from "react-native-paper/lib/typescript/types";

const fontConfig: { web: Fonts; ios: Fonts; android: Fonts } = {
  web:DefaultTheme.fonts,
  ios: DefaultTheme.fonts,
  android: {
    regular: {
      fontFamily: "Montserrat-Regular",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "Montserrat-Medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "Montserrat-Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "Montserrat-Thin",
      fontWeight: "normal",
    },
  },
};
export const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0277bd",
    background:"#e8e8eb"
  },
  fonts: configureFonts(fontConfig),
};

export const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#03649e",
    // accent: "#0277bd",
  },
  fonts: configureFonts(fontConfig),
};
