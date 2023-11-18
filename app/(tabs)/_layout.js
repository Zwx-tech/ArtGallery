import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createSheet } from "react-native-web/dist/cjs/exports/StyleSheet/dom";

export default function layout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      sceneContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
