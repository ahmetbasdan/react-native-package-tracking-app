import { View, ViewProps, ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

interface IProps extends ViewProps {
  style?: ViewStyle;
}

const Container: React.FC<IProps> = ({ children, style, ...rest }) => {
  const theme = useTheme();

  return (
    <View
      {...rest}
      style={{ ...style, flex: 1, backgroundColor: theme.colors.background }}
    >
      {children}
    </View>
  );
};

export default Container;
