import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Appbar, Colors, Title, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as images from "../../constans/images";
import { setDarkTheme, setLightTheme } from "../../redux/actions/themeAction";

const Header = () => {
  const themeReducer = useSelector<any>((state) => state.themeReducer);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const toggleTheme = () => {
    themeReducer == "light"
      ? dispatch(setDarkTheme())
      : dispatch(setLightTheme());
  };

  return (
    <Appbar
      style={{
        ...styles.container,
        backgroundColor: colors.primary,
        elevation: 0,
      }}
    >
      <View style={styles.titleContainer}>
        <Image source={images.logo} style={styles.logo} />
        <Title style={styles.title}>KargoTakip</Title>
      </View>
      <Appbar.Action
        icon={"brightness-6"}
        style={styles.themeIcon}
        onPress={toggleTheme}
      />
    </Appbar>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 12,
  },
  title: {
    color: Colors.white,
    marginLeft: 12,
  },
  themeIcon: {
    position: "absolute",
    right: 0,
  },
});
