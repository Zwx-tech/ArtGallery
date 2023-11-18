import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import CustomImage from './CustomImage';

const ArtworkPreview = ({ item, id }) => {
    let w, h;
    if(item.height && item.width) {
        [w, h] = [parseInt(item.width), parseInt(item.height)]
    } else {
        [w, h] = [2, 1] 
    }
    return (
        <View key={id}>
          <Pressable onPress={() => router.push(`/image/${item.id}`)}>
            <CustomImage image_id={item.image_id} style={styles.img}></CustomImage>
            <Text>{item.title}</Text>
          </Pressable>
      </View>
    )
}

const styles = StyleSheet.create({
    img: {
      marginHorizontal: "auto",
      maxHeight: 600,
      width: "100%",
      objectFit: "cover"
    }
  });

export default ArtworkPreview