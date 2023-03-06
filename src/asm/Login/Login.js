import Checkbox from 'expo-checkbox';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import * as React from 'react';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Dialog from "react-native-dialog";
import * as Progress from 'react-native-progress';
import AxiosIntance from './../Home/DATA/AxiosIntance';
import { AppContext } from './../Home/DATA/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = (props) => {
    const { navigation } = props;
    const [isChecked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [numberCase, setNumberCase] = useState(100);
    const [getUserDataLogin, setUserDataLogin] = useState([]);
    const [getSuccess, setSuccess] = useState(false);
    const [getUsername, setUsername] = useState('testv2@gmail.com');
    const [getPassword, setPassword] = useState('1234');
    const [isSecure, setSecure] = useState(true);
    const { setLogin, setUserData, setUserName, setPassWord, UserInfo, setUserInfo } = useContext(AppContext);
    const hideDialog = () => {
        visible ? setVisible(false) : setVisible(true);
    }
    const loginSuccess = () => {
        setLogin(true);
        setUserName(getUsername);
        setPassWord(getPassword);
    }

    const ProgressDialog = () => {
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
                        <Image source={require('../assets/trash/progress-success.png')} />
                    </View>
                    <Text style={[{ fontSize: 24, fontWeight: '800', width: '100%', textAlign: 'center', marginBottom: 40, marginTop: 30 }]} >Success!</Text>
                    <Pressable android_ripple={{ color: 'while' }} style={{ borderRadius: 7, backgroundColor: '#29d789', marginBottom: 30, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', height: 40 }} onPress={hideDialog}>
                        <Text style={[{ fontSize: 16, fontWeight: '800', color: '#ffffff' }]} >Done</Text>
                    </Pressable>
                </Dialog.Container>
            );
        } else if (numberCase == 3) {
            return (
                <Dialog.Container visible={visible} contentStyle={{ borderRadius: 10 }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                        <Image source={require('../assets/trash/progress-failed.png')} />
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
                        <Image source={require('../assets/trash/progress-failed.png')} />
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
                        <Image source={require('../assets/trash/progress-failed.png')} />
                    </View>
                    <Text style={[{ fontSize: 24, fontWeight: '800', width: '100%', textAlign: 'center', marginTop: 0 }]} >Failed!</Text>
                    <Text style={[{ fontSize: 16, fontWeight: '600', width: '100%', textAlign: 'center', marginTop: 1, marginBottom: 20 }]} >Unknow error</Text>
                    <Pressable android_ripple={{ color: 'while' }} style={{ borderRadius: 7, backgroundColor: '#F44336', marginBottom: 30, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', height: 40 }} onPress={hideDialog}>
                        <Text style={[{ fontSize: 16, fontWeight: '800', color: '#ffffff' }]} >Done</Text>
                    </Pressable>
                </Dialog.Container>
            );
        } else if (numberCase == 0) {
            return null;
        }
    }
    const tickCheckBox = () => {
        isChecked ? setChecked(false) : setChecked(true);
    }
    const moveScreen = (options) => {
        switch (options) {
            case 1:
                visible ? setVisible(false) : setVisible(true);
                navigation.navigate('BottomTabNavigator');
                break;
            case 2:
                navigation.navigate('SignUp');
                break;
        }
    }



    const clearInput = () => {
        setUsername('');
    }
    const hideInput = () => {
        isSecure ? setSecure(false) : setSecure(true);
    }

    const loginMain = async () => {
        setVisible(true);
        if (getUsername == '' || getPassword == '') {
            setNumberCase(0);
            setNumberCase(4);
        } else {
            setNumberCase(0);
            setNumberCase(1);
            try {
                const reponse = await AxiosIntance().post('/auth/login', { email: getUsername, password: getPassword });
                if (!reponse.error) {
                    setNumberCase(0);
                    setUserDataLogin(reponse.data);
                    await AsyncStorage.setItem("token", reponse.data.token);
                    setUserData(reponse.data);
                    setUserInfo(reponse.data.user)
                    loginSuccess();
                }
            } catch (error) {
                setSuccess(false);
                if (error == 'AxiosError: Request failed with status code 422') {
                    setNumberCase(0);
                    setNumberCase(3);
                } else {
                    setNumberCase(0);
                    setNumberCase(5);
                    console.log(error);
                }
            }
        }
    }

    return (
        <View style={(styles.container)}>
            <ProgressDialog />
            <View style={[{ marginTop: 32, }]} >
                <Text style={[styles.textTitle, { color: '#050505' }]}>Hello</Text>
                <Text style={[styles.textTitle, { color: '#1877F2' }]}>Again!</Text>
                <Text style={[styles.text, { color: '#4E4B66' }]}>Welcome back you've
                    {"\n"}been missed</Text>
            </View>
            <View>
                <Text style={styles.titleInput}>{"Username" + ""}</Text>
                <View style={[styles.inputText]} >
                    <TextInput style={[{ flex: 1, height: 40, marginHorizontal: 10, marginRight: 36 }]} accessibilityLabel='inputText' value={getUsername} accessibilityLabelBy="" onChangeText={Text => setUsername(Text)} />
                    <Pressable style={getUsername == '' ? { 'display': 'none' } : { position: 'absolute', end: 0, width: 24, height: 24, margin: 10 }} onPress={clearInput}>
                        <Image source={require('../assets/trash/close.png')} />
                    </Pressable>
                </View>
            </View>
            <View>
                <Text style={[styles.titleInput, { marginTop: 14 }]}>{"Password" + ""}</Text>
                <View style={[styles.inputText]} >
                    <TextInput secureTextEntry={isSecure} style={[{ flex: 1, height: 40, marginHorizontal: 10, marginRight: 36 }]} accessibilityLabel='inputText' accessibilityLabelBy="" onChangeText={Text => setPassword(Text)} />
                    <Pressable style={getPassword == '' ? { 'display': 'none' } : { position: 'absolute', end: 0, width: 24, height: 24, margin: 10, justifyContent: 'center', alignItems: 'center' }} onPress={hideInput}>
                        <Image style={isSecure ? { width: 18.64, height: 16 } : { width: 16.64, height: 16.21 }} source={isSecure ? require('../assets/trash/eye.png') : require('../assets/trash/eyeclose.png')} />
                    </Pressable>
                </View>
            </View>
            <View style={[styles.checkboxContainer, { paddingVertical: 12 }, { justifyContent: 'space-between' }]}>
                <View style={[styles.checkboxContainer]}>
                    <Checkbox
                        style={styles.checkbox} value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#1877F2' : undefined}
                    />
                    <Pressable onPress={tickCheckBox}>
                        <Text style={[styles.textButtonBackroundNone, , { color: '#4E4B66' }]} >Remember me</Text>
                    </Pressable>
                </View>
                <Pressable >
                    <Text style={[styles.textButtonBackroundNone, { color: '#5890FF' }]}>Forgot the password ?</Text>
                </Pressable>
            </View>
            <Pressable android_ripple={{ color: 'while' }} style={[styles.buttonLogin]} onPress={loginMain}>
                <Text style={{ color: '#ffffff', fontSize: 16, lineHeight: 24, fontWeight: '600' }}>Login</Text>
            </Pressable>
            <Text style={[styles.textButtonBackroundNone, { width: '100%', textAlign: 'center', color: '#4E4B66', letterSpacing: 0.12, marginVertical: 18, fontSize: 16, fontWeight: '500' }]}>or continue with</Text>
            <View style={[styles.buttonLoginWithContainer]}>
                <Pressable android_ripple={{ color: 'while' }} style={[styles.buttonLoginWith]}>
                    <Image style={styles.imageButton} source={require('../assets/facebook/facebook-72.png')} />
                    <Text style={styles.textButtonLoginWith}>Facebook</Text>
                </Pressable>
                <Pressable android_ripple={{ color: 'while' }} style={[styles.buttonLoginWith]}>
                    <Image style={styles.imageButton} source={require('../assets/googles/google-72.png')} />
                    <Text style={styles.textButtonLoginWith}>Google</Text>
                </Pressable>
            </View>
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} >
                <Text style={[styles.textButtonBackroundNone, { color: '#4E4B66', letterSpacing: 0.12, marginVertical: 10, fontSize: 16, fontWeight: '500' }]} onPress={() => moveScreen(2)}>don't have an account ? </Text>
                <Text style={[styles.textButtonBackroundNone, { color: '#1877F2', fontWeight: '800' }]} onPress={() => moveScreen(2)}>Sign Up</Text>
            </View>
        </View >
    );
};


const styles = StyleSheet.create({
    imageButton: {
        width: 26,
        height: 26,
        marginEnd: 10,
        color: '#667080',
    },
    textButtonLoginWith: {
        color: '#667080',
        fontSize: 17,
        lineHeight: 24,
        marginEnd: 6,
        fontWeight: '600',
    },
    buttonLoginWith: {
        width: 174,
        height: 48,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEF1F4',
        flexDirection: 'row',
    },
    buttonLoginWithContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonLogin: {
        backgroundColor: '#1877F2',
        width: '100%',
        height: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButtonBackroundNone: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '400',
        fontStyle: 'normal',
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        alignItems: 'center',
        marginEnd: 6,
        width: 20,
        height: 20,
    },
    textTitle: {

        fontFamily: 'poppins_b',
        fontSize: 48,
        lineHeight: 68,
    },
    text: {

        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 30,
        letterSpacinge: 0.12,
        marginBottom: 38,
    },
    titleInput: {
        //  fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 21,
        letterSpacinge: 0.12,
        color: '#4E4B66',
        marginBottom: 5,
    },
    inputText: {
        borderWidth: 1,
        borderColor: '#4E4B66',
        borderRadius: 6,
        width: '100%',
        height: 50,
        gap: 18,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        flexGrow: 0,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 18,
        backgroundColor: '#fff'
    },
});
export default Login;