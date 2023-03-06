import { ActivityIndicator, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { useNavigation } from '@react-navigation/native';
import { AppContext } from './AppContext';
import Dialog from "react-native-dialog";
import AxiosIntance from './AxiosIntance';



const ListUser = (props) => {
    const { ListData } = props;
    const [uriAvatar, setUriAvatar] = useState();
    const [userName, setUserName] = useState();
    const navigation = useNavigation();
    const { UserInfo } = useContext(AppContext);
    const [visible, setVisible] = useState(false);


    const detailNews = () => {
        navigation.navigate('NewDetail', {
            idNewsDetail: ListData._id,
            infoUserCreate: UserInfo
        });
    }

    const hideDialog = () => {
        visible ? setVisible(false) : setVisible(true);
    }

    const editAPI = () => {
        visible ? setVisible(false) : setVisible(true);
        navigation.navigate('EditNews', {
            dataNews: ListData,
        });
    }

    const deleteAPI = async () => {
        visible ? setVisible(false) : setVisible(true);
        const respont = await AxiosIntance().delete('/articles/' + ListData._id + '/delete');
        if (!respont.error) {
            console.log(respont.data);
        }
    }

    useEffect(() => {
        if (UserInfo.avatar == '' || UserInfo.avatar == undefined || UserInfo.avatar == null) {
            setUriAvatar(require('../../assets/default/avatar.png'));

        } else {
            setUriAvatar({ uri: UserInfo.avatar });
            console.log("done");
        }
        if (UserInfo.name == '' || UserInfo.name == undefined || UserInfo.name == null) {
            setUserName('Anonymous');
        } else {
            setUserName(UserInfo.name);
        }
    }, [UserInfo])

    return (
        <View>
            <TouchableOpacity onPress={detailNews}>
                <View style={[styles.container]} >
                    <Image style={[styles.image]} source={{ uri: ListData.image }} />
                    <View style={[styles.containerContent]} >
                        <Text style={[styles.text]}>Tin tức</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={[styles.content]}>{ListData.title}</Text>
                        <View style={[styles.containerAvatar]} >
                            <View style={[styles.containerAvatar]} >
                                <Image style={[styles.avatar, {
                                    width: 20,
                                    height: 20,
                                    borderRadius: 100
                                }]} source={uriAvatar} />
                                <Text style={[styles.text, { top: -0.4, marginHorizontal: 3 }]} >{userName}</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={hideDialog}>
                                    <View style={[{ width: 30, height: 20, alignItems: 'flex-end', justifyContent: 'flex-end' }]} >
                                        <Image style={[styles.avatar, {
                                            width: 16,
                                            height: 16,
                                            end: 8,
                                        }]} source={require('../../assets/trash/more-64.png')} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <Dialog.Container onBackdropPress={hideDialog} onRequestClose={hideDialog} visible={visible} contentStyle={{ borderRadius: 10 }}>
                <Text style={[{ fontSize: 24, fontWeight: '800', width: '100%', textAlign: 'center', marginTop: 10 }]} >Option</Text>
                <Pressable android_ripple={{ color: 'while' }} style={{
                    borderRadius: 7, backgroundColor: '#41CC80',
                    marginTop: 20, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', height: 40
                }} onPress={editAPI}>
                    <Text style={[{ fontSize: 16, fontWeight: '800', color: '#fff' }]} >Edit</Text>
                </Pressable>
                <Pressable android_ripple={{ color: 'while' }} style={{
                    borderRadius: 7, backgroundColor: '#FF6C5E',
                    marginTop: 10, marginBottom: 30, marginHorizontal: 40, justifyContent: 'center', alignItems: 'center', height: 40
                }} onPress={deleteAPI}>
                    <Text style={[{ fontSize: 16, fontWeight: '800', color: '#fff' }]} >Delete</Text>
                </Pressable>
            </Dialog.Container>
        </View>



    )
}


const styles = StyleSheet.create({
    avatar: {
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    containerAvatar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        width: '100%',
        marginVertical: 2,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        letterSpacing: 0.12,
        color: '#000000',
        justifyContent: 'center',
        top: -2,

    },
    text: {
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 20,
        alignContent: 'center',
        color: '#4E4B66',
        height: 20,
    },
    containerContent: {
        justifyContent: 'space-around',
        flex: 1,
        height: '100%',
        marginHorizontal: 6,
        marginVertical: 2,
        letterSpacing: 0.12,
    },
    image: {

    },
    image: {
        width: 96,
        height: 96,
        borderRadius: 6,

    },
    container: {
        marginBottom: 16,
        flexDirection: 'row',
        height: 96,
        alignItems: 'center',
        marginHorizontal: 20
    },
})
export default ListUser