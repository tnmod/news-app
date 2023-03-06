import { StyleSheet, Text, View, Image, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import AxiosIntance from './DATA/AxiosIntance';
import { AppContext } from './DATA/AppContext';
import AlertDialog from './Dialog/AlertDialog';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Dialog from "react-native-dialog";
import { useNavigation } from '@react-navigation/native';



const EditProfile = (props) => {
    const { setUserInfo, UserInfo, setVisibleAllScreeen } = useContext(AppContext);
    const [getId, setId] = useState();
    const [getName, setName] = useState();
    const [getAddress, setAddress] = useState();
    const [getPhone, setPhone] = useState();
    const [getEmail, setEmail] = useState();
    const [getAvatar, setAvatar] = useState();
    const [getUriAvatar, setUriAvatar] = useState();
    const [visible, setVisible] = useState(false);
    const [alertDialog, setAlertDialog] = useState(100);
    const [point, setPoint] = useState(-10);
    const navigation = useNavigation();
    const [visibleChoose, setVisibleChoose] = useState(false);


    const editProfile = () => {
        setVisibleAllScreeen(true);
        setAlertDialog(0);
        setAlertDialog(1);
        editAsync();
    }
    const avatarUser = () => {
        if (UserInfo.avatar == null || UserInfo.avatar == undefined || UserInfo.avatar == '') {
            setAvatar(require('../assets/default/avatar.png'));
        } else {
            setAvatar({ uri: UserInfo.avatar });
        }
    }

    const applyAvatar = (getImage) => {
        setAvatar({ uri: getImage })
    }

    const getProfile = () => {
        setId(UserInfo._id);
        setName(UserInfo.name);
        setAddress(UserInfo.address);
        setPhone(UserInfo.phone);
        setEmail(UserInfo.email);
    }
    useEffect(() => {
        getProfile();
        avatarUser();
    }, [])

    useEffect(() => {
        getProfile();
        setPoint(point - 1);
    }, [point >= 0])

    const editAsync = async () => {
        if (getName != '' || getAddress != '' || getPhone != '') {
            try {
                const reponse = await AxiosIntance().post('/users/update-profile', { name: getName, address: getAddress, phone: getPhone, avatar: UserInfo.avatar, email: UserInfo.email });
                if (!reponse.error) {
                    setAlertDialog(0);
                    navigation.goBack();
                    setUserInfo({ ...UserInfo, name: reponse.data.name, address: reponse.data.address, phone: reponse.data.phone });
                    setPoint(3);
                }
            } catch (error) {
                setAlertDialog(0);
                setAlertDialog(5);
            }
        }
    }
  
    const cameraChoose = async () => {
        dialogChooseImage();
        const result = await launchCamera();
        if (!result.didCancel) {
            const fromData = new FormData();
            fromData.append('image', {
                uri: result.assets[0].uri,
                type: 'image/jpeg',
                name: result.assets[0].fileName
            });
            setVisibleAllScreeen(true);
            setAlertDialog(0);
            setAlertDialog(1);
            const upload = await AxiosIntance("multipart/form-data").post("/media/upload", fromData);
            if (!upload.error) {
                setUriAvatar(upload.data.path);
                applyAvatar(upload.data.path);
                const reponse = await AxiosIntance().post('/users/update-profile', { name: UserInfo.name, address: UserInfo.address, phone: UserInfo.phone, email: UserInfo.email, avatar: upload.data.path });
                if (!reponse.error) {
                    setUserInfo({ ...UserInfo, avatar: reponse.data.avatar });
                    applyAvatar(reponse.data.avatar);
                    setVisibleAllScreeen(false);
                    setAlertDialog(0);
                }
            }
        } else {

        }

    };
    const libraryChoose = async () => {
        dialogChooseImage();
        const result = await launchImageLibrary();
        if (!result.didCancel) {
            const fromData = new FormData();
            fromData.append('image', {
                uri: result.assets[0].uri,
                type: 'image/jpeg',
                name: result.assets[0].fileName
            });
            setVisibleAllScreeen(true);
            setAlertDialog(0);
            setAlertDialog(1);
            const upload = await AxiosIntance("multipart/form-data").post("/media/upload", fromData);
            if (!upload.error) {
                setUriAvatar(upload.data.path);
                applyAvatar(upload.data.path);
                const reponse = await AxiosIntance().post('/users/update-profile', { name: UserInfo.name, address: UserInfo.address, phone: UserInfo.phone, email: UserInfo.email, avatar: upload.data.path });
                if (!reponse.error) {
                    setUserInfo({ ...UserInfo, avatar: reponse.data.avatar });
                    applyAvatar(reponse.data.avatar);
                    setVisibleAllScreeen(false);
                    setAlertDialog(0);
                }
            }
        } else {

        }

    };

    const dialogChooseImage = () => {
        visibleChoose ? setVisibleChoose(false) : setVisibleChoose(true);
    }

    return (
        <View style={[{ height: '100%', backgroundColor: '#fff' }]} >
            <AlertDialog numberCase={alertDialog} />
            <Dialog.Container visible={visibleChoose} onBackdropPress={dialogChooseImage} onRequestClose={dialogChooseImage}>
                <Dialog.Title style={{ textAlign: 'center' }}>Choose an action</Dialog.Title>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Pressable style={[styles.choosefile]} android_ripple={{ color: 'while' }} onPress={libraryChoose}>
                        <Image style={styles.imgchoose} source={require('../assets/trash/library.png')} />
                        <Text>Library</Text>
                    </Pressable>
                    <Pressable style={[styles.choosefile]} android_ripple={{ color: 'while' }} onPress={cameraChoose}>
                        <Image style={styles.imgchoose} source={require('../assets/trash/camera.png')} />
                        <Text>Camera</Text>
                    </Pressable>
                </View>
            </Dialog.Container>

            <AlertDialog numberCase={alertDialog} setVisibleMore={visible} />
            <View style={[styles.container]}>
                <View style={styles.viewimg}>
                    <View style={[styles.imgContainer]} >
                        <Image style={styles.img} source={getAvatar} />
                        <TouchableOpacity onPress={dialogChooseImage}>
                            <Image style={styles.imgcamera} source={require('../assets/trash/camera-choose.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.viewContainer]} >
                    <Text style={styles.text}>User ID</Text>
                    <TextInput style={[styles.textinput, { color: '#6c7b8b' }]} value={getId} editable={false} selectTextOnFocus={false} />
                    <Text style={styles.text}>Email Address{<Text style={{ color: 'red' }} ></Text>}</Text>
                    <TextInput style={[styles.textinput, { color: '#6c7b8b' }]} value={getEmail} editable={false} selectTextOnFocus={false} />
                    <Text style={styles.text}>Full Name</Text>
                    <TextInput style={styles.textinput} value={getName} onChangeText={Text => setName(Text)} />
                    <Text style={styles.text}>Address{<Text style={{ color: 'red' }}></Text>}</Text>
                    <TextInput style={styles.textinput} value={getAddress} onChangeText={Text => setAddress(Text)} />
                    <Text style={styles.text}>Phone Number{<Text style={{ color: 'red' }} >*</Text>}</Text>
                    <TextInput style={styles.textinput} value={getPhone} onChangeText={Text => setPhone(Text)} />
                    <View style={styles.viewpress}>
                        <Pressable style={styles.press} onPress={editProfile}>
                            <Text style={styles.presstext}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    choosefile: {
        // backgroundColor: '#1877F2',
        width: 100,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    imgchoose: {
        width: 36,
        height: 36,
        marginBottom: 4,
    },
    viewContainer: {
        marginStart: 24,
        marginEnd: 24,
    },
    container: {
        flexDirection: 'column',
        flex: 1,
    },
    viewFill: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 50
    },
    viewarrow: {
        left: 5
    },
    viewtextfill: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16
    },
    viewimg: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 100
    },
    imgContainer: {
        width: 120,
        height: 120,
    },
    imgcamera: {
        position: 'absolute',
        bottom: 0,
        end: 0,
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 2,
        letterSpacing: 0.12,
        lineHeight: 21,
        fontWeight: '600',
    },
    textinput: {
        paddingHorizontal: 10,
        height: 48,
        borderRadius: 6,
        borderWidth: 1,
    },
    viewpress: {
        marginVertical: 40,
        width: '100%',
        justifyContent: 'center'
    },
    press: {
        backgroundColor: '#1877F2',
        height: 50,
        width: 350,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    presstext: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    }
})