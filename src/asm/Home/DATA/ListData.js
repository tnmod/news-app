import { ActivityIndicator, StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { useNavigation } from '@react-navigation/native';
import AxiosIntance from './AxiosIntance';
import { Menu, MenuOption, MenuProvider, MenuTrigger } from 'react-native-popup-menu';



const ListData = (props) => {
    const { ListData } = props;
    const [uriAvatar, setUriAvatar] = useState();
    const [userName, setUserName] = useState();
    const navigation = useNavigation();

    const detailNews = () => {
        navigation.navigate('NewDetail', {
            idNewsDetail: ListData._id,
            infoUserCreate: ListData.createdBy
        });

    }
    console.log(ListData);

    useEffect(() => {
        if (ListData.createdBy.avatar == '' || ListData.createdBy.avatar == undefined || ListData.createdBy.avatar == '') {
            setUriAvatar(require('../../assets/default/avatar.png'));
        } else {
            setUriAvatar({ uri: ListData.createdBy.avatar });
        }
        if (ListData.createdBy.name == '') {
            setUserName('Anonymous');
        } else {
            setUserName(ListData.createdBy.name);
        }
    }, [])

    return (

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
                        <Pressable >
                            <Image style={[styles.avatar, {
                                width: 16,
                                height: 16,
                                end: 8,
                            }]} source={require('../../assets/trash/more-64.png')} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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
export default ListData