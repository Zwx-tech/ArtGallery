import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image"
export default function SearchPage() {
  return (
    <View>
      <Image
        style={styles.img}
        source={{
          uri: `https://www.artic.edu/iiif/2/78c80988-6524-cec7-c661-a4c0a706d06f/full/843,/0/default.jpg`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100
  }
})
