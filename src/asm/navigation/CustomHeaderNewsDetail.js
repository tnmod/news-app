import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const CustomHeaderNewsDetail = () => {
    return (
        <View style={[{ flexDirection: 'row', marginHorizontal: 12 }]} >
            <View style={[styles.imageContainer, { marginHorizontal: 10 }]} >
                <Image style={[{ width: 20, height: 19 }]} source={require('../assets/trash/share.png')} />
            </View>
            <View style={[styles.imageContainer]}>
                <Image style={[{ width: 20, height: 19 }]} source={require('../assets/trash/more-verti.png')} />
            </View>
        </View>
    )
}

export default CustomHeaderNewsDetail

const styles = StyleSheet.create({
    imageContainer: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
})