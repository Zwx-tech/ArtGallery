import { Image } from "expo-image";
import React from "react";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const CustomImage = ({ image_id, style, is_zoomable = false }) => {
  const [imageData, setImageData] = useState({});
  function fetchImage() {
    fetch(`https://www.artic.edu/iiif/2/${image_id}/info.json`)
      .then((response) => response.json())
      .then((response) => {
        setImageData({ ...response });
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    fetchImage();
  }, []);
  const image_size = imageData.sizes
    ? imageData.sizes[0]
    : { width: 1, height: 1 };
  return !is_zoomable ? (
    <Image
      style={{
        ...style,
        aspectRatio: `${image_size.width} / ${image_size.height}`,
      }}
      contentFit="cover"
      source={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
      placeholder={blurhash}
    />
  ) : (
    <ScrollView
      maximumZoomScale={3.0}
      minimumZoomScale={1.0}
      pinchGestureEnabled={true}
      style={{
        ...style,
        aspectRatio: `${image_size.width} / ${image_size.height}`,
      }}
    >
      <Image
        style={{
          aspectRatio: `${image_size.width} / ${image_size.height}`,
        }}
        contentFit="cover"
        source={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
        placeholder={blurhash}
      />
    </ScrollView>
  );
};

export default CustomImage;
