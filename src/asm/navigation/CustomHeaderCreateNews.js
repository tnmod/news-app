import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const CustomHeaderCreateNews = () => {
    return (
        <View style={[styles.container]} >
            <Image style={[{ width: 24, height: 24 }]} source={require('../assets/trash/more-verti.png')} />
        </View>

    )
}

export default CustomHeaderCreateNews

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginHorizontal: 16,
    },
})