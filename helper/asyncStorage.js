import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage"; 
import { useEffect, useState } from "react";

const { getItem, setItem } = useAsyncStorage('@favorite');

async function checkIsFavorite(id) {
    const favoriteArray = await getFavorites();
    return favoriteArray.some(item => item.id == id);
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
  console.log(await favoriteArray);
  await setItem(
    JSON.stringify(filterFavorites)
  );
}

async function addToFavorites(item) {
    try {
        const favoriteArray = await getFavorites();
        await setItem(
          JSON.stringify([...favoriteArray, item])
        );
      } catch (e) { 
        console.log(e);
      }
  }


function useFavorite(_item) {
  const [isFavorite, setisFavorite] = useState(false);
  const [item, setItem] = useState(_item);
  useEffect(() => {
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

  useEffect(() => {
    async function helper() {
      await setisFavorite(await checkIsFavorite(item.id));
    }
    helper();
  }, []);

  return [isFavorite, setisFavorite]
}

export { useFavorite }