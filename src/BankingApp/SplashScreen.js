import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#40BFFF', justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../asm/assets/trash/logotest1.png')} />

    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})