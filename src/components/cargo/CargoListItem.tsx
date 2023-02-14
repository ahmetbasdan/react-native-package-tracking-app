import React from "react";
import { View, StyleSheet, Image } from "react-native";
import moment, { Moment } from "moment";
import {
  IconButton,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import * as images from "../../constans/images";

interface IProps {
  cargoCompanyName: cargoCompanyNameType;
  cargoName?: string;
  cargoNumber?: string;
  cargoDate: Moment;
  onPress?: () => void;
  onLongPress?: () => void;
}

const CargoListItem: React.FC<IProps> = ({
  cargoCompanyName,
  cargoName,
  cargoNumber,
  cargoDate,
  onPress,
  onLongPress,
}) => {
  const { colors, dark } = useTheme();
  return (
    <TouchableRipple
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ ...styles.card, backgroundColor: dark ? "#1c1c1c" : "#ffffff" }}
    >
      <View style={styles.content}>
        <View style={styles.lefContent}>
          <Image
            source={images.companyLogo[cargoCompanyName]}
            style={styles.logo}
          />
        </View>
        <View style={styles.centerContent}>
          <Text style={styles.title}>{cargoName}</Text>
          <Text style={{ ...styles.subTitle, color: colors.placeholder }}>
            {cargoNumber}
          </Text>
          <Text style={{ ...styles.subTitle, color: colors.placeholder }}>
            {moment(cargoDate).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={styles.rightContent}>
          <IconButton icon={"chevron-right"} color={colors.placeholder} />
        </View>
      </View>
    </TouchableRipple>
  );
};

export default CargoListItem;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: 8,
    marginTop: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  content: {
    flexDirection: "row",
  },
  lefContent: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 55,
    height: 55,
    marginLeft: 12,
  },
  centerContent: {
    flex: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
  subTitle: {
    fontSize: 12,
  },
  rightContent: {
    flex: 1,
  },
});
