import { ActivityIndicator, StyleSheet, Text, View, FlatList, Image, TextInput, ScrollView, NativeEventEmitter } from 'react-native'
import React, { useState, useEffect } from 'react'
import DataHome from './DATA/DataHome'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import AxiosIntance from './DATA/AxiosIntance';


const Search = (props) => {
    const { route } = props;
    const { nameNews } = route.params;
    const [isLatest, setLatest] = useState(true);
    const [getSearch, setSearch] = useState(nameNews);
    const [getDataSearch, setDataSearch] = useState('');
    const [visible, setVisible] = useState(false);

    const chooseLatest = () => {
        if (!isLatest) {
            isLatest ? setLatest(false) : setLatest(true);
        }
    }
    const chooseSeeAll = () => {
        if (isLatest) {
            isLatest ? setLatest(false) : setLatest(true);
        }
    }
    useEffect(() => {
        if (nameNews != '') {
            setSearch(nameNews);
            search();
        }
    }, [])

    const search = async () => {
        setVisible(true);
        if (getSearch != '') {
            const respont = await AxiosIntance().get('/articles/search?title=' + getSearch);
            if (!respont.error) {
                setDataSearch(respont.data);
                setVisible(false);

            }
        } else {
            const respont = await AxiosIntance().get('/articles');
            if (!respont.error) {
                setDataSearch(respont.data);
                setVisible(false);
            }
        }
    }
    const onRefresh = async () => {
        if (getSearch != '') {
            const respont = await AxiosIntance().get('/articles/search?title=' + getSearch);
            if (!respont.error) {
                setDataSearch(respont.data);
            }
        } else {
            const respont = await AxiosIntance().get('/articles');
            if (!respont.error) {
                setDataSearch(respont.data);
            }
        }
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }} >
            <View style={[styles.container, { flex: 1 }]} >
                <View style={[styles.toolbarContainer]} >
                    <View style={[styles.searchContainer]}>
                        <View style={[styles.searchInput]}>
                            <Image style={[{
                                width: 18,
                                height: 18,
                                marginEnd: 6,
                                top: 2,
                            }]} source={require('../assets/trash/search.png')} />
                            <TextInput defaultValue={nameNews} style={styles.input} placeholder="Search" keyboardType="default" onChangeText={Text => setSearch(Text)} onSubmitEditing={search}
                            />
                        </View>
                        <Pressable>
                            <Image style={[styles.searchImage]} source={require('../assets/trash/fill.png')} />
                        </Pressable>
                    </View>
                </View>
                <View style={[styles.recommendContainer]} >
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <Pressable onPress={chooseLatest}>
                            <Text style={[isLatest ? styles.textEnable : styles.textDisable]} >Latest</Text>
                        </Pressable>
                        <Pressable onPress={chooseSeeAll}>
                            <Text style={[isLatest ? styles.textDisable : styles.textEnable]} >See all</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.recommend]}>
                    </View>
                </View>
                <View style={{ flex: 2 }}>
                    <DataHome getDataSearch={getDataSearch} visible={visible} onRefresh={onRefresh} />
                </View>
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    recommend: {

    },
    textDisable: {
        color: '#4E4B66',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0.12,
    },
    textEnable: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: 0.12,

    },
    recommendContainer: {
        marginVertical: 10,
        marginHorizontal: 24,
    },
    input: {
        height: 21,
        fontSize: 14,
        alignItems: 'center',
        padding: 0,
        fontWeight: '500',
        letterSpacing: 0.52,
        flex: 1,
        color: '#000',
    },
    searchImage: {
        width: 24,
        height: 24,
    },
    searchInput: {
        flexDirection: 'row',
        flex: 1,
    },
    searchContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#4E4B66',
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    notification1: {
        width: 32,
        height: 32,
        shadowColor: "#0000009a",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 111.84,
        elevation: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification2: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notification3: {
        width: 30,
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 24,


    },
    toolbarContainer: {
        marginHorizontal: 24
    },
    container: {

    },

})