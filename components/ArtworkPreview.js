import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import { Link } from 'expo-router';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const ArtworkPreview = ({ item, id }) => {
    let w, h;
    if(item.height && item.width) {
        [w, h] = [parseInt(item.width), parseInt(item.height)]
    } else {
        [w, h] = [2, 1] 
    }
    return (
        <View key={id}>
          <Link
            href={`image/${item.id}`}
          >
            <Image
              style={{aspectRatio: `${w} / ${h}`, ...styles.img}}
              source={{uri: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}}
              contentFit='cover'
              placeholder={blurhash}
              />
            <Text>{item.title}</Text>
          </Link>
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