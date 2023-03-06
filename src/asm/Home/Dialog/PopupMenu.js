import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'

const PopupMenu = () => {
    return (
        <View style={[styles.container]} >
            <TouchableOpacity style={[styles.button]} >
                <Text style={[styles.text]} >Cập nhật</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button]}>
                <Text style={[styles.text]}>Xóa</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PopupMenu

const styles = StyleSheet.create({
    text:{
        textAlign:'center'
    },
    button: {
        paddingHorizontal:40,
        paddingVertical:5,
        backgroundColor:'grey',
        marginTop:4
    
    },
    container: {
        position: 'absolute',
        backgroundColor: 'violet',
        bottom: 0,
        right: 0,
        zIndex: 100,
        justifyContent:'space-around',
    }
})