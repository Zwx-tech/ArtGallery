import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet, Button } from "react-native";
export default function SearchPage() {
  return (
    <View style={styles.wrapper}>
      <Button
        title="Clear Favorties"
        onPress={() => AsyncStorage.clear()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
