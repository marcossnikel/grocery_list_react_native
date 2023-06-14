import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { fontsVariant } from "./theme";
import React from "react";

interface TextProps extends RNTextProps {}

export function Text({ ...props }: TextProps) {
  return <RNText {...props} style={[fontsVariant.body, props.style]} />;
}
