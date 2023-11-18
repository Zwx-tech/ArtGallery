import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import CustomImage from "./CustomImage";
import { Ionicons } from "@expo/vector-icons";
import { TapGestureHandler } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from "react-native-reanimated";

import { useFavorite } from "../helper/asyncStorage";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const { width } = Dimensions.get("window");

const ArtworkPreview = ({ item, id }) => {
  const doubleTapRef = useRef();
  const scale = useSharedValue(0);
  const [isFavorite, setIsFavorite] = useFavorite(item);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: Math.min(Math.max(scale.value, 0), 1) }],
  }));

  const handleDoubleTap = useCallback(() => {
    if (!isFavorite) {
      setIsFavorite(true);
    }
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(100, withSpring(0));
      }
    });
  }, []);

  let w, h;
  if (item.height && item.width) {
    [w, h] = [parseInt(item.width), parseInt(item.height)];
  } else {
    [w, h] = [2, 1];
  }

  return (
    <View key={id}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => router.push(`/image/${item.id}`)}
      >
        <TapGestureHandler
          maxDelay={350}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={() => {
            handleDoubleTap();
          }}
        >
          <Animated.View>
            <View style={styles.artworkInnerWrapper}>
              <CustomImage
                image_id={item.image_id}
                style={styles.img}
              ></CustomImage>
              <AnimatedIcon
                style={[styles.biggHeartIcon, animatedStyles]}
                name="heart"
                size={100}
                color="#fff"
              />
            </View>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
      <View style={styles.artworkTitleWrapper}>
        <TapGestureHandler onActivated={() => setIsFavorite(!isFavorite)}>
          <AnimatedIcon
            name={isFavorite ? "heart" : "heart-outline"}
            color="#000"
            size={30}
          />
        </TapGestureHandler>
        <Text style={styles.artworkTitle}>{item.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    marginHorizontal: "auto",
    maxHeight: 600,
    width: "100%",
    objectFit: "cover",
  },
  artworkInnerWrapper: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  biggHeartIcon: {
    position: "absolute",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 35,
  },
  artworkTitleWrapper: {
    flex: 1,
    gap: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    maxWidth: "100%",
  },
  artworkTitle: {
    fontSize: 16,
    width: width - 45,
  },
});

export default ArtworkPreview;
