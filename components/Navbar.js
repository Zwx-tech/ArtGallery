import { View } from 'react-native';
import { StyleSheet } from "react-native"
import { Tabs } from 'expo-router/tabs';


export default function Navbar() {
  return (
    <View style={styles.navWrapper}>
        <View style={styles.navLinks}>
            <Tabs>
                <Tabs.Screen name="index" href="/" />
                <Tabs.Screen name="search" href="/search" />
                <Tabs.Screen name="favorite" href="/favorite" />
            </Tabs>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    navWrapper: {
      position: "absolute",
      bottom: 0,
      padding: 15,
      justifyContent: "center",
      flex: 1,
      flexDirection: "row",
    },
    navLinks: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    }
  });