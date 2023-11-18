import { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import ArtworkPreview from "../../components/ArtworkPreview";
import { getFavorites } from "../../helper/asyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
const paginationLenght = 12;

export default function ExplorePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getItem } = useAsyncStorage("@favorite");
  function fetchData() {
    if (!loading) {
      return;
    }
    async function helper() {
      await setData(await getFavorites());
      await setLoading(false);
      // await console.log([...(await getFavorites())].length);
      // await console.log([...(await getFavorites())].map((item) => item.id));
      console.log("Zmiana ekranu");
    }
    helper();
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  return loading ? (
    <View style={styles.spinnerWrapper}>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={{ width: "100%", minHeight: "100%" }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ArtworkPreview item={item} id={index}></ArtworkPreview>
        )}
        estimatedItemSize={700}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
  },
  img: {
    marginHorizontal: "auto",
    width: "100%",
  },
  spinnerWrapper: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
