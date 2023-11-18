import { Image } from "expo-image";
import React from "react";
import { useState, useEffect } from "react";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const CustomImage = ({ image_id, style }) => {
  const [imageData, setImageData] = useState({});
  function fetchImage() {
    fetch(`https://www.artic.edu/iiif/2/${image_id}/info.json`).then((response) => response.json()).then((response) => {
      setImageData({...response});
    });
  }
  useEffect(() => {
      fetchImage();
    }, []);
  return !!imageData.sizes ? (
    <Image
      style={{
        ...style,
        aspectRatio: `${imageData.sizes[0].width} / ${imageData.sizes[0].height}`
      }}
      contentFit="cover"
      source={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
      placeholder={blurhash}
      />
      ) : (
          <Image
          style={{ ...style, aspectRatio: "1 / 1" }}
          contentFit="cover"
          source={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
          placeholder={blurhash}
    />
  );
};

export default CustomImage;
