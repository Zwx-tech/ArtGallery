import { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList, TextInput } from "react-native";
import ArtworkPreview from "../../components/ArtworkPreview";

const paginationLenght = 12;

export default function ExplorePage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [endReached, setEndReached] = useState(false);

  function handlePagination() {
    if (loading) {
      return;
    }
    setLoading(true);
    setPage(page + 1);
  }

  function handleTextInput(value) {
    setQuery(value)
  }

  function fetchData() {
    if (!loading || endReached) {
      return;
    }
    
    const requestBody = {
      q: query,
      limit: paginationLenght,
      page: page,
      fields: ["id", "title", "image_id", "artist_id"]
    }
    console.log(123);
    fetch(
      `https://api.artic.edu/api/v1/artworks/search`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        const formatedData = response.data.map((element) => {
          return {
            id: element.id,
            title: element.title,
            image_id: element.image_id,
            width: 300,
            height: 300
          };
        });
        setData([...data, ...formatedData]);
        setEndReached(response.pagination.page <= page)
      })
      .then(() => {
        setLoading(false);
      }).catch(e => console.log(e));
  }

  useEffect(() => {
    fetchData();
  }, [page]);
  
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setEndReached(false)
      setData([])
      setPage(1)
      fetchData();
    })
    return () => {
      clearTimeout(timeoutID);
    }
  }, [query]);

  return (
    <View style={{ width: "100%", minHeight: "100%" }}>
      <TextInput
        style={styles.search}
        placeholder="Press enter a query"
        onChangeText={handleTextInput}
        value={query}
      />
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
  search: {
    height: 40,
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    width: '90%', 
  },
});
