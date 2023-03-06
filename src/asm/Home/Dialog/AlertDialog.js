import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Dialog from "react-native-dialog";
import * as Progress from 'react-native-progress';
import { AppContext } from './../DATA/AppContext';
import { useNavigation } from '@react-navigation/native';



const AlertDialog = (props) => {
    const { numberCase } = props;
    const { getTitleDialog } = props;
    const [visible, setVisible] = useState(false);
    const [clickSuccess, setClickSuccess] = useState(false);
    const { visibleAllScreen, setVisibleAllScreeen } = useContext(AppContext);
    const navigation = useNavigation();

    useEffect(() => {
        if (visibleAllScreen) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [visibleAllScreen])

    const hideDialog = () => {
        visible ? setVisible(false) : setVisible(true);
        visibleAllScreen ? setVisibleAllScreeen(false) : setVisibleAllScreeen(true);
    }

    const SuccessDialog = () => {
        setClickSuccess(true);
        hideDialog();
    }

    if (numberCase == 1) {
        return (
            <Dialog.Container visible={visible} contentStyle={{ borderRadius: 10 }}>
                <Dialog.Title style={[{ textAlign: 'center' }]}  >Please wait...</Dialog.Title>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <Progress.Circle size={30} indeterminate={true} />
                </View>
            </Dialog.Container>
        );
    } else if (numberCase == 2) {
        return (
            <Dialog.Container visible={visible} contentStyle={{ borderRadius: 10 }}>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../../assets/trash/progress-success.png')} />
                </View>
                <Text style={[{ fontSize: 24, fontWeight: '800', width: '100%', textAlign: 'center', marginBottom: 40, marginTop: 30 }]} >Success!</Text>
                <Pressable android_ripple={{ color: 'while' }} style={{ borderRadius: 7, backgroundColor: '#29d789', marginBottom: 30, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', height: 40 }} onPress={SuccessDialog}>
                    <Text style={[{ fontSize: 16, fontWeight: '800', color: '#ffffff' }]} >Done</Text>
                </Pressable>
            </Dialog.Container>
        );
    } else if (numberCase == 3) {
        return (
            <Dialog.Container visible={visible} contentStyle={{ borderRadius: 10 }}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../../assets/trash/progress-failed.png')} />
                </View>
                <Text style={[{ fontSize: 24, fontWeight: '800', width: '100%', textAlign: 'center', marginTop: 10 }]} >Failed</Text>
                <Text style={[{ fontSize: 16, fontWeight: '600', width: '100%', textAlign: 'center' }]} >Username or password not correct!</Text>
                <Pressable android_ripple={{ color: 'while' }} style={{ borderRadius: 7, backgroundColor: '#F44336', marginTop: 20, marginBottom: 30, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', height: 40 }} onPress={hideDialog}>
                    <Text style={[{ fontSize: 16, fontWeight: '800', color: '#ffffff' }]} >Done</Text>
                </Pressable>
            </Dialog.Container>
        );
    } else if (numberCase == 4) {
        return (
            <Dialog.Container visible={visible} contentStyle={{ borderRadius: 10 }}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../../assets/trash/progress-failed.png')} />
                </View>
                <Text style={[{ fontSize: 24, fontWeight: '800', width: '100%', textAlign: 'center', marginTop: 20 }]} >Failed!</Text>
                <Text style={[{ fontSize: 14, fontWeight: '600', width: '100%', textAlign: 'center', marginTop: 10 }]} >Username or password</Text>
                <Text style={[{ fontSize: 14, fontWeight: '600', width: '100%', textAlign: 'center', marginBottom: 20 }]} >can't be blank</Text>
                <Pressable android_ripple={{ color: 'while' }} style={{ borderRadius: 7, backgroundColor: '#F44336', marginBottom: 30, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', height: 40 }} onPress={hideDialog}>
                    <Text style={[{ fontSize: 16, fontWeight: '800', color: '#ffffff' }]} >Done</Text>
                </Pressable>
            </Dialog.Container>
        );
    } else if (numberCase == 5) {
        return (
            <Dialog.Container visible={visible} contentStyle={{ borderRadius: 10 }}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../../assets/trash/progress-failed.png')} />
                </View>
                <Text style={[{ fontSize: 24, fontWeight: '800', width: '100%', textAlign: 'center', marginTop: 0 }]} >Failed!</Text>
                <Text style={[{ fontSize: 16, fontWeight: '600', width: '100%', textAlign: 'center', marginTop: 1, marginBottom: 20 }]} >Unknow error</Text>
                <Pressable android_ripple={{ color: 'while' }} style={{ borderRadius: 7, backgroundColor: '#F44336', marginBottom: 30, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', height: 40 }} onPress={hideDialog}>
                    <Text style={[{ fontSize: 16, fontWeight: '800', color: '#ffffff' }]} >Done</Text>
                </Pressable>
            </Dialog.Container>
        );
    } else if (numberCase == 6) {
        return (
            <Dialog.Container visible={visible} contentStyle={{ borderRadius: 10 }}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../../assets/trash/progress-failed.png')} />
                </View>
                <Text style={[{ fontSize: 24, fontWeight: '800', width: '100%', textAlign: 'center', marginTop: 0 }]} >Failed!</Text>
                <Text style={[{ fontSize: 16, fontWeight: '600', width: '100%', textAlign: 'center', marginTop: 1, marginBottom: 20 }]} >{getTitleDialog}</Text>
                <Pressable android_ripple={{ color: 'while' }} style={{ borderRadius: 7, backgroundColor: '#F44336', marginBottom: 30, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', height: 40 }} onPress={hideDialog}>
                    <Text style={[{ fontSize: 16, fontWeight: '800', color: '#ffffff' }]} >Done</Text>
                </Pressable>
            </Dialog.Container>
        );
    } else if (numberCase == 0) {
        return null;
    }
}

export default AlertDialog

const styles = StyleSheet.create({})