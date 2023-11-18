import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage"; 
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
const { getItem, setItem } = useAsyncStorage('@favorite');

async function checkIsFavorite(id) {
    const favoriteArray = await getFavorites();
    const result = await favoriteArray.some(item => item.id == id);
    // await console.log(`${id}: ${result}`);
    return result
}

async function getFavorites() {
    try{
        const favoriteArrayUnparsed = await getItem();
        if (!favoriteArrayUnparsed) {
          return [];
        }
        let favoriteArray = favoriteArrayUnparsed
          ? JSON.parse(favoriteArrayUnparsed)
          : [];
        return favoriteArray;
    } 
    catch {
        return []
    }
}

async function removefromFavorites(id) {
  if (!await checkIsFavorite(id)) {
    return;
  } 
  const favoriteArray = await getFavorites();
  const filterFavorites = await favoriteArray.filter(item => item.id != id);
  await setItem(
    JSON.stringify(filterFavorites)
  );
}

async function addToFavorites(item) {
    try {
        const favoriteArray = await getFavorites();
        favoriteArray.push(item)
        await setItem(
          JSON.stringify(favoriteArray)
        );
      } catch (e) { 
        console.log(e);
      }
  }


function useFavorite(item) {
  const [isFavorite, setisFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(loading)
      return;
    async function helper() {
      if(isFavorite && !await checkIsFavorite(item.id)) {
        await addToFavorites(item);
      }
      if(!isFavorite && await checkIsFavorite(item.id)) {
        await removefromFavorites(item.id);
      }
    }
    helper();
  }, [isFavorite]);

  useFocusEffect(
    useCallback(() => {
      async function helper() {
        await setisFavorite(await checkIsFavorite(item.id));
      }
      helper();
      setLoading(false);
    }, [])
  );
  return [isFavorite, setisFavorite];
}

export { useFavorite, getFavorites }