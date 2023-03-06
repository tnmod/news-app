import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const GetStarted = () => {
    return (
        <View style={[styles.container]}>
            <View style={[styles.containerText]}>
                <Image style={[{ margin: 18 }]} source={require('../assets/logo/logo.png')} />
                <View style={[styles.text]} >
                    <Text style={{ textAlign: 'center', fontSize: 32, fontWeight: '700', lineHeight: 37, fontStyle: 'normal', letterSpacing: -0.3, }}>Congratulations!</Text>
                    <Text style={{ marginTop: 6, textAlign: 'center', fontSize: 16, fontWeight: '400', lineHeight: 18, fontStyle: 'normal', letterSpacing: -0.3, }}>Your account is ready to use</Text>
                </View>
            </View>
            <View style={[styles.containerButton]}>
                <Pressable android_ripple={{ color: 'while' }} style={[styles.GetStarted]}>
                    <Text style={{ color: '#ffffff', fontSize: 16, lineHeight: 24, fontWeight: '600' }}>Go to Homepage</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    text: {
        marginTop: 30,
    },
    containerText: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerButton: {
        width: '100%',
        'display': 'flex',
        'position': 'absolute',
        'bottom': 10,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    container: {
        alignItems: 'center',
        flex: 1,
    },
    GetStarted: {
        backgroundColor: '#1877F2',
        width: '100%',
        height: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
})