import { ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AxiosIntance from './DATA/AxiosIntance';
import * as Progress from 'react-native-progress';
import { AppContext } from './DATA/AppContext';

const NewDetail = (props) => {
    const { route } = props;
    const { idNewsDetail } = route.params;
    const { infoUserCreate } = route.params;
    const [adapterNews, setAdapterNews] = useState({ "_id": "" });
    const [visible, setVisible] = useState(true);
    const [getDataNews, setDataNews] = useState();
    const [adapterDate, setAdapterDate] = useState();
    const [uriAvatar, setUriAvatar] = useState();
    const [userName, setUserName] = useState();
    const [checkImage, setCheckImage] = useState(false);
    const [uriImage, setUriImage] = useState();
    const [getFailed, setFailed] = useState(false);




    useEffect(() => {
        const getNews = async () => {
            const respont = await AxiosIntance().get('/articles/' + idNewsDetail + '/detail');
            if (respont.error == false) {
                setAdapterNews(respont.data);
                setAdapterDate(Date(respont.data.createdAt));
            }
        }
        getNews();
        if (adapterNews._id != "") {
            setDataNews(adapterNews[0]);
            setVisible(false);
        }
        if (infoUserCreate.avatar == '') {
            setUriAvatar(require('../assets/default/avatar.png'));
        } else {
            setUriAvatar({ uri: infoUserCreate.avatar });
        }
        if (infoUserCreate.name == '') {
            setUserName('Anonymous');
        } else {
            setUserName(infoUserCreate.name);
        }
    }, [adapterNews._id])

    useEffect(() => {
        if (getDataNews != null) {
            if (checkImage) {
                setUriImage(require('../assets/trash/error.png'));
            } else {
                setUriImage({ uri: getDataNews.image });
            }
        }
    }, [getDataNews, checkImage])

    if (visible) {
        return (
            <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }]} >
                <Progress.Circle size={30} indeterminate={true} />
            </View>
        )
    } else if (getDataNews == undefined) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', paddingBottom: 80 }]}>
                <Image source={require('../assets/trash/nothing-found.png')} style={{ marginBottom: 10 }} />
                <Text style={[styles.txtuser, { fontSize: 16, color: 'grey' }]}>Opp! Something went wrong.</Text>
                <Text style={[styles.txtuser, { fontSize: 16, color: 'grey' }]}>Please try again or refresh the page</Text>
            </View>
        )
    } else {
        return (
            <View style={[styles.container]}>
                <ScrollView style={[styles.scrollview, { height: '100%' }]}>
                    <View style={[styles.viewlogo, { flex: 0 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.imgavatar} source={uriAvatar} />
                            <View style={styles.info}>
                                <Text style={styles.txtuser}>{userName}</Text>
                                <Text style={styles.txttime}>{getDataNews.createdAt}</Text>
                            </View>
                        </View>
                        <Pressable style={styles.pressfollow}>
                            <Text style={styles.txtfollow}>Following</Text>
                        </Pressable>
                    </View>
                    <View style={[{ flex: 1 }]} >
                        <View style={styles.imgdetail}>
                            <Image style={checkImage ? styles.imgError : styles.imgdetail} onError={() => setCheckImage(true)} source={uriImage} />
                        </View>
                        <View style={[styles.contentContainer]} >
                            <Text style={styles.loai}>Tin tức</Text>
                            <Text style={styles.txttitle}>{getDataNews.title}</Text>
                            <Text style={[styles.txtcontent]}>{getDataNews.content}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: '#f6f6f6', width: '200%', left: -200, height: 1 }}></View>
                <View style={[styles.viewemoji, { flex: 0 }]}>
                    <View style={styles.emojiContainer}>
                        <View style={styles.emoji} >
                            <Image style={styles.emo} source={require('../assets/trash/heart-red.png')} />
                            <Text style={styles.txtcmt}>24k</Text>
                        </View>
                        <View style={styles.emoji}>
                            <Image style={styles.emo} source={require('../assets/trash/chat.png')} />
                            <Text style={styles.txtcmt}>1k</Text>
                        </View>
                    </View>
                    <Image style={styles.bookmark} source={require('../assets/trash/bookmark-blue.png')} />
                </View>
            </View>
        )
    }
}

export default NewDetail

const styles = StyleSheet.create({
    emoji: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        marginVertical: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imgdetail: {
        width: '100%',
        height: 248,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgError: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    scrollview: {
        paddingHorizontal: 20
    },
    loai: {
        fontSize: 14,
        letterSpacing: 0.12,
    },
    txttitle: {
        fontSize: 24,
        color: '#000000',
        fontWeight: '500',
        marginVertical: 6,
        lineHeight: 36,
    },
    txtcontent: {
        fontSize: 16,
        color: '#4E4B66',
        fontWeight: '420',
        letterSpacing: 0.12,
        lineHeight: 24,
        marginTop: 10,
    },
    viewlogo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    pressfollow: {
        width: 100,
        height: 34,
        borderRadius: 6,
        backgroundColor: '#1877F2',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtfollow: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600'
    },
    imgavatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    txtuser: {
        fontSize: 14,
        fontWeight: '800',
        color: 'black'
    },
    txttime: {
        color: 'gray',
        fontSize: 12,
        fontWeight: '400',
    },
    info: {
        flexDirection: 'column',
        marginLeft: 5,

    },
    viewemoji: {
        height: 68,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingStart: 24,
        paddingEnd: 24,
        //    shadowColor:'#f6f6f6',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1,
        elevation: 2,
        margin: -2,

    },
    emojiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 120,
    },
    emo: {
        width: 20,
        height: 18,
    },
    txtcmt: {
        fontSize: 16,
        color: '#050505',
        marginHorizontal: 2
    },
    txtnews: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 10
    },
    bookmark: {
        width: 24,
    }
})
