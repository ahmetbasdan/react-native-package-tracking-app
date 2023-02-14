import React from "react";
import { Image, StyleSheet } from "react-native";
import { Container } from "../toolbox";
import * as gifs from "../../constans/gifs";

export default function LoadingScreen() {
  return (
    <Container style={styles.container}>
      <Image source={gifs.truckProggress} style={styles.gif} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  gif: {
    width: 250,
    height: 117,
    marginBottom: 177 / 2,
  },
});
