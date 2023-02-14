import React from 'react'
import { View, ViewProps, ViewStyle } from 'react-native'

type h =
  | '2'
  | '4'
  | '6'
  | '8'
  | '12'
  | '16'
  | '24'
  | '28'
  | '32'
  | '48'
  | '64'
  | '72'
  | '100'

interface IProps extends ViewProps {
  h?: h
  style?: ViewStyle
}

const Space: React.FC<IProps> = ({ h = '16', style, ...rest }) => {
  return <View style={{ height: parseInt(h), ...style }} {...rest}></View>
}

export default Space