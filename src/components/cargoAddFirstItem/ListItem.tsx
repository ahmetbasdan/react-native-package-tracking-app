import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Divider, IconButton, Text, useTheme } from "react-native-paper";
import * as images from "../../constans/images";

interface IProps {
  companyName: cargoCompanyNameType;
  title: string;
  onPress: () => void;
}

const ListItem: React.FC<IProps> = ({ companyName, title, onPress }) => {
  const { colors } = useTheme();

  return (
    <>
      <Card style={styles.card} onPress={onPress}>
        <View style={styles.container}>
          <Image source={images.companyLogo[companyName]} style={styles.logo} />
          <Text style={styles.title}>{title}</Text>
          <IconButton
            icon={"chevron-right"}
            color={colors.placeholder}
            style={styles.chevron}
          />
        </View>
      </Card>
      <Divider />
    </>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  container: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 45,
    height: 45,
    marginLeft: 8,
  },
  title: {
    fontSize: 14.5,
    marginLeft: 24,
  },
  chevron: {
    position: "absolute",
    right: 8,
  },
});
