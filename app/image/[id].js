import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import CustomImage from '../../components/CustomImage';

const Modal = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({});
  function fetchData() {
    fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
    .then((response) => response.json())
    .then((response) => {
      setData(response.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return !!data.image_id ? (
    <View style={styles.wrapper}>
      <CustomImage image_id={data.image_id} style={styles.img}></CustomImage>
      <Text>{data.title}</Text>
      <Text>{data.id}</Text>
    </View>
  ): (
    <View style={styles.spinnerWrapper}>
      <ActivityIndicator></ActivityIndicator>
    </View>
  )
}

const styles = StyleSheet.create({
  spinnerWrapper: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {

  },
  img: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});


export default Modal