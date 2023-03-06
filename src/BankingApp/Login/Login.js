import { Image, StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Fonts, Poppins } from './../../asm/assets/fonts/Fonts';
import { useNavigation } from '@react-navigation/native';



const Login = () => {
    const navigation = useNavigation();
    const [focus, setFucus] = useState(0);
    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCf, setPasswordCf] = useState();
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        if (fullname == null || fullname == "" || password == null || password == "") {
            setDisable(true);
        } else {
            setDisable(false);
        }

    }, [password, fullname])
    const MoveScreen = () => {
        if (disable) {

        } else {
            ToastAndroid.show("Success!", ToastAndroid.SHORT);
            navigation.navigate("Home");
        }

    }

    useEffect(() => {
        navigation.addListener('beforeRemove', () => {
            return;
        });
    }, [])

    return (
        <View style={[styles.container]} >
            <View style={{ width: '100%', alignItems: 'flex-start' }} >
                <Text style={{ marginHorizontal: 12, fontFamily: Poppins[500], color: '#0C1A30', fontSize: 28, letterSpacing: 0.5 }} >Welcome back to Mega Mall</Text>
                <Text style={{ marginHorizontal: 12, fontFamily: Poppins[400], color: '#838589', fontSize: 12, lineHeight: 21.6, letterSpacing: 0.5, fontWeight: '400' }} >Silahkan masukan data untuk login</Text>
            </View>
            <View style={[styles.InputContainer, { marginTop: 50 }]} >
                <View style={[styles.InputText]} >
                    <Text style={[styles.texttag]}>Email/ Phone</Text>
                    <TextInput onChangeText={(Text) => setFullname(Text)} style={[styles.textdef, { width: '100%', paddingHorizontal: 20 }]} textAlignVertical='center' placeholderTextColor='#C4C5C4' placeholder='Masukan Alamat Email/ No Telepon Anda' />
                </View>
                <View style={[styles.InputText, { marginTop: 30 }]}>
                    <Text style={[styles.texttag]} >Password</Text>
                    <TextInput onChangeText={(Text) => setPassword(Text)} style={[styles.textdef, { width: '100%', paddingHorizontal: 20 }]} textAlignVertical='center' placeholderTextColor='#C4C5C4' placeholder='Password Again' />
                </View>
            </View>
            <TouchableOpacity disabled={disable} onPress={MoveScreen} style={disable ? styles.btndis : styles.btn} >
                <Text style={{ fontFamily: Poppins[700], color: "#ffffff", }}>
                    Sign Up
                </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60, marginHorizontal: 10 }}>
                <Text style={{ fontFamily: Poppins[400], fontSize: 12, color: '#9098B1', letterSpacing: 0.5, marginEnd: 4 }}>
                    Forgot Password
                </Text>
                <Text style={{ fontFamily: Poppins[700], fontSize: 12, color: '#40BFFF', letterSpacing: 0.5 }}>
                    Sing In
                </Text>
            </View>

        </View >
    )
}

export default Login

const styles = StyleSheet.create({
    btndis: {
        backgroundColor: 'grey',
        height: 57,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    btn: {
        backgroundColor: '#40BFFF',
        height: 57,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    texttag: {
        marginHorizontal: 12,
        fontFamily: Poppins[400],
        color: '#0C1A30',
        fontSize: 12,
        letterSpacing: 0.5,
        width: '100%',
    },
    textdef: {
        fontFamily: Poppins[400],
        fontSize: 12,
        lineHeight: 21.6,
        letterSpacing: 0.5,
        textAlignVertical: 'center',
        backgroundColor: '#FAFAFA',
    },
    imgInput: {
        width: 24,
        height: 24,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    InputText: {

        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 7,
        gap: 10,

    },
    InputContainer: {
        marginTop: 18,
        borderRadius: 7,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        justifyContent: 'center',
    }
})