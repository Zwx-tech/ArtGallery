import React from 'react'
import { Tabs } from 'expo-router'

export default function layout() {
  return (
    <Tabs screenOptions={{headerShown:false}}>
        <Tabs.Screen name="explore"/>
        <Tabs.Screen name="search" />
        <Tabs.Screen name="favorite" />
    </Tabs>
  )
}