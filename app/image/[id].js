import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import React from 'react'

const Modal = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  return (
    <View>
      <Text>Modal</Text>
    </View>
  )
}

export default Modal