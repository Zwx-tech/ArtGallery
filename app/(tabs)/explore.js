import { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import ArtworkPreview from "../../components/ArtworkPreview";

const paginationLenght = 12;

export default function ExplorePage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  function handlePagination() {
    if (loading) {
      return;
    }
    setLoading(true);
    setPage(page + 1);
  }

  function fetchData() {
    if (!loading) {
      return;
    }
    fetch(
      `https://api.artic.edu/api/v1/artworks?page=${page}&llimit=${paginationLenght}`
    )
      .then((response) => response.json())
      .then((response) => {
        const formatedData = response.data.map((element) => {
          return {
            id: element.id,
            title: element.title,
            image_id: element.image_id,
            width: element.dimensions_detail[0]?.width_in,
            height: element.dimensions_detail[0]?.height_in,
          };
        });
        setData([...data, ...formatedData]);
      })
      .then(() => {
        setLoading(false);
      }).catch(e => console.log(e));
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <View style={{ width: "100%", minHeight: "100%" }}>
      <FlatList
        data={data}
        onEndReachedThreshold={0.5}
        onEndReached={handlePagination}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ArtworkPreview item={item} id={index}> </ArtworkPreview>
        )}
        ListEmptyComponent={
          <View style={styles.spinnerWrapper}>  
            <ActivityIndicator />
          </View>
        }
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
