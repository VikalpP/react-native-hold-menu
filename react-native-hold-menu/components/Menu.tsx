import * as React from "react";
import { StyleSheet, View } from "react-native";

import Animated, {
  runOnUI,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import StyleGuide from "../components/StyleGuide";
import { MenuProps } from "../types";
import {
  CalculateMenuHeight,
  MenuAnimationAnchor,
} from "../utils/Calculations";
import { MenuItems } from "../variables";
import { MenuItem } from "./MenuItem";

export const MENU_WIDTH = (StyleGuide.dimensionWidth * 60) / 100;

export const Menu = ({
  itemHeight,
  toggle,
  anchorPoint = "top-center",
}: MenuProps) => {
  const MenuHeight = CalculateMenuHeight(MenuItems.length);
  const leftOrRight =
    anchorPoint && anchorPoint.includes("right") ? { right: 0 } : { left: 0 };

  const Translate = MenuAnimationAnchor(anchorPoint || "top-right");
  const messageStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: Translate.begginingTransformations.translateX },
        { translateY: Translate.begginingTransformations.translateY },
        {
          scale: withTiming(toggle ? 1 : 0, { duration: 150 }),
        },
        { translateX: Translate.endingTransformations.translateX },
        { translateY: Translate.endingTransformations.translateY },
      ],
    };
  });

  return (
    <View
      style={[
        styles.wrapper,
        {
          ...leftOrRight,
          zIndex: toggle ? 5 : 10,
          top: (itemHeight || 0) + StyleGuide.spacing,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.container,
          { height: MenuHeight, ...leftOrRight },
          { ...messageStyles },
        ]}
      >
        {MenuItems.map((item, index) => {
          return <MenuItem key={index} item={item} />;
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: StyleGuide.dimensionWidth - StyleGuide.spacing * 4,
    zIndex: 150,
  },
  container: {
    position: "absolute",
    width: MENU_WIDTH,
    borderRadius: StyleGuide.spacing * 1.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: StyleGuide.palette.common.white,
    overflow: "hidden",
  },
});
