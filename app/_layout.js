import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="image/[id]"
        options={{
          title: "Image",
          presentation: "modal"
        }}
      />
    </Stack>
  );
}
