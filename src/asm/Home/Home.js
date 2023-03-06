import { ActivityIndicator, StyleSheet, Text, View, FlatList, Image, TextInput, ScrollView, NativeEventEmitter, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import DataHome from './DATA/DataHome'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import AxiosIntance from './DATA/AxiosIntance';
import DataRecoment from './DATA/DataRecoment';
import ListData from './DATA/ListData';
import * as Progress from 'react-native-progress';

const Tab = createMaterialTopTabNavigator();
const Home = () => {
    const navigation = useNavigation();
    const [isLatest, setLatest] = useState(true);
    const [getTextSearch, setTextSearch] = useState('');
    const [getDataSearch, setDataSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [getData, setData] = useState([]);
    const [numberAlert, setNumberAlert] = useState(100);
    const [adapter, setAdapter] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);
    const [visibleData, setVisibleData] = useState(true);

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
    const search = async () => {
        setVisible(true);
        const respont = await AxiosIntance().get('/articles');
        if (!respont.error) {
            setDataSearch(respont.data);
            setVisible(false);
        }
    }
    useEffect(() => {
        search();
    }, [])

    const onRefresh = async () => {
        setVisible(true);
        const respont = await AxiosIntance().get('/articles');
        if (!respont.error) {
            setDataSearch(respont.data);
            setVisible(false);
        }
    }

    useEffect(() => {
        setVisibleData(visible);
    }, [visible])

    const goSearch = () => {
        navigation.navigate('Search', {
            nameNews: getTextSearch
        });
    }
    if (visibleData) {
        return (
            <View style={[{ backgroundColor: '#fff', height: '100%' }]} >
                <View style={[styles.container, { flex: 0 }]} >
                    <View style={[styles.toolbarContainer]} >
                        <View style={[styles.toolbar]} >
                            <Image style={{
                                width: 99,
                                height: 30,
                            }} source={require('../assets/logo/logo.png')} />
                            <View style={styles.notification1}>
                                <Pressable style={styles.notification2}>
                                    <View style={styles.notification3}>
                                        <Image style={{ width: 21, height: 21, justifyContent: 'center', alignItems: 'center' }} source={require('../assets/trash/notif.png')} />
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        <View style={[styles.searchContainer]}>
                            <View style={[styles.searchInput]}>
                                <Image style={[{
                                    width: 18,
                                    height: 18,
                                    marginEnd: 6,
                                    top: 2,
                                }]} source={require('../assets/trash/search.png')} />
                                <TextInput style={styles.input} placeholder="Search" keyboardType="default" onSubmitEditing={goSearch} onChangeText={Text => setTextSearch(Text)}
                                />
                            </View>
                            <Pressable>
                                <Image style={[styles.searchImage]} source={require('../assets/trash/fill.png')} />
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Progress.Circle size={30} indeterminate={true} />
                </View>
            </View>
        )
    } else {
        return (
            <View style={{ backgroundColor: '#fff', height: '100%' }} >
                <View style={[styles.container, { flex: 0 }]} >
                    <View style={[styles.toolbarContainer]} >
                        <View style={[styles.toolbar]} >
                            <Image style={{
                                width: 99,
                                height: 30,
                            }} source={require('../assets/logo/logo.png')} />
                            <View style={styles.notification1}>
                                <Pressable style={styles.notification2}>
                                    <View style={styles.notification3}>
                                        <Image style={{ width: 21, height: 21, justifyContent: 'center', alignItems: 'center' }} source={require('../assets/trash/notif.png')} />
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        <View style={[styles.searchContainer]}>
                            <View style={[styles.searchInput]}>
                                <Image style={[{
                                    width: 18,
                                    height: 18,
                                    marginEnd: 6,
                                    top: 2,
                                }]} source={require('../assets/trash/search.png')} />
                                <TextInput style={styles.input} placeholder="Search" keyboardType="default" onSubmitEditing={goSearch} onChangeText={Text => setTextSearch(Text)}
                                />
                            </View>
                            <Pressable>
                                <Image style={[styles.searchImage]} source={require('../assets/trash/fill.png')} />
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={[{ flex: 1 }]} >
                    < FlatList
                        style={{ marginTop: 10 }}
                        extraData={getDataSearch}
                        data={getDataSearch}
                        renderItem={({ item }) => <ListData ListData={item} />}
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator={false}
                        onRefresh={onRefresh}
                        refreshing={isRefresh}
                        ListHeaderComponent={() => (
                            <SafeAreaView style={[styles.recommendContainer]} >
                                <View style={{}}>
                                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <Pressable >
                                            <Text style={[styles.textEnable]} >Trending</Text>
                                        </Pressable>
                                        <Pressable >
                                            <Text style={[styles.textDisable]} >See all</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <DataRecoment getDataSearch={getDataSearch} visible={visible} />
                                </View>
                                <View style={{}}>
                                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <Pressable onPress={chooseLatest}>
                                            <Text style={[isLatest ? styles.textEnable : styles.textDisable]} >Latest</Text>
                                        </Pressable>
                                        <Pressable onPress={chooseSeeAll}>
                                            <Text style={[isLatest ? styles.textDisable : styles.textEnable]} >See all</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={[styles.recommendSecond]} >
                                    <Pressable onPress={chooseLatest} style={[styles.recommendItem]} >
                                        <Text style={[isLatest ? styles.textEnable : styles.textDisable]} >All</Text>
                                    </Pressable>
                                    <Pressable style={[styles.recommendItem]} >
                                        <Text style={[isLatest ? styles.textDisable : styles.textEnable]} >Sport</Text>
                                    </Pressable>
                                    <Pressable style={[styles.recommendItem]} >
                                        <Text style={[isLatest ? styles.textDisable : styles.textEnable]} >Politics</Text>
                                    </Pressable>
                                    <Pressable style={[styles.recommendItem]} >
                                        <Text style={[isLatest ? styles.textDisable : styles.textEnable]} >Bussness</Text>
                                    </Pressable>
                                    <Pressable style={[styles.recommendItem]} >
                                        <Text style={[isLatest ? styles.textDisable : styles.textEnable]} >Health</Text>
                                    </Pressable>
                                    <Pressable style={[styles.recommendItem]} >
                                        <Text style={[isLatest ? styles.textDisable : styles.textEnable]} >Travel</Text>
                                    </Pressable>
                                    <Pressable style={[styles.recommendItem]} >
                                        <Text style={[isLatest ? styles.textDisable : styles.textEnable]} >Science</Text>
                                    </Pressable>
                                    <Pressable style={[styles.recommendItem]} >
                                        <Text style={[isLatest ? styles.textDisable : styles.textEnable]} >Fashion</Text>
                                    </Pressable>
                                </ScrollView>
                            </SafeAreaView>
                        )}
                        ListHeaderComponentStyle={{ marginHorizontal: 24 }}
                    />
                </View>
            </View >
        )
    }


}



const styles = StyleSheet.create({
    recommendSecond: {
        marginVertical: 5
    },
    recommendItem: {
        marginRight: 20
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
        marginBottom: 10,
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
        marginVertical: 10,
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

    },
    container: {
        marginHorizontal: 24,
    },

})

export default Home