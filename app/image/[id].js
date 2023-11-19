import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import CustomImage from '../../components/CustomImage';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get("window");

const Modal = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({});
  function fetchData() {
    fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
    .then((response) => response.json())
    .then((response) => {
      const startDate = response.data.date_start ? response.data.date_start : "Unknown";
      const endDate = response.data.date_end ? response.data.date_end : "Unknown";
      setData({
        id: response.data.id,
        image_id: response.data.image_id,
        artist_title: response.data.artist_title,
        title: response.data.title,
        date: startDate == endDate ? startDate : `${startDate}-${endDate}`,
        dimensions: response.data.dimensions ? response.data.dimensions : "unknown",
        place_of_origin: response.data.place_of_origin,
        medium: response.data.medium_display,
        is_zoomable: response.data.is_zoomable
      });
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return !!data.image_id ? (
    <ScrollView contentContainerStyle={styles.wrapper} style={{flex: 1}}>
        <CustomImage image_id={data.image_id} style={styles.img} is_zoomable={data.is_zoomable}></CustomImage>
        <View style={styles.propertyWrapper}>
          <Text style={styles.propertyTitle}>Title: </Text>
          <Text style={styles.propertText}>{data.title}</Text>
        </View>
        <View style={styles.horizontalSepartor}></View>
        <View style={styles.propertyWrapper}>
          <Text style={styles.propertyTitle}>Artist: </Text>
          <Text style={styles.propertText}>{data.artist_title}</Text>
        </View>
        <View style={styles.horizontalSepartor}></View>
        <View style={styles.propertyWrapper}>
          <Text style={styles.propertyTitle}>Date: </Text>
          <Text style={styles.propertText}>{data.date}</Text>
        </View>
        <View style={styles.horizontalSepartor}></View>
        <View style={styles.propertyWrapper}>
          <Text style={styles.propertyTitle}>is_zoomable: </Text>
          <Text style={styles.propertText}>{"" + data.is_zoomable}</Text>
        </View>
        <View style={styles.horizontalSepartor}></View>
        <View style={styles.propertyWrapper}>
          <Text style={styles.propertyTitle}>Medium: </Text>
          <Text style={{width: width * .9 - 44}}>{data.medium}</Text>
        </View>
        <View style={styles.horizontalSepartor}></View>
        <View style={styles.propertyWrapper}>
          <Text style={styles.propertyTitle}>Dimensions: </Text>
          <Text style={styles.propertText}>{data.dimensions}</Text>
        </View>
        <View style={styles.horizontalSepartor}></View>
    </ScrollView>
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
    alignItems: "center",
    justifyContent: "flex-start",
    // minHeight: "120%"
  },
  img: {
    width: "90%",
    marginBottom: 15
  },
  horizontalSepartor: {
    width: "90%",
    marginVertical: 15,
    height: 1,
    backgroundColor: "#ddd"
  },
  propertyTitle: {
    fontWeight: "bold",
  },
  propertyWrapper: {
    width: "90%",
    maxWidth: "90%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  propertText: {
    width: width * .9 - 30
  }
});


export default Modal