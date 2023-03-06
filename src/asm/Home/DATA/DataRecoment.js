import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListData from './ListData';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AxiosIntance from './AxiosIntance';
import AlertDialog from './../Dialog/AlertDialog';
import * as Progress from 'react-native-progress';
import { useFocusEffect } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import ListRecoment from './ListRecoment';
import SwiperFlatList from 'react-native-swiper-flatlist';

const DataRecoment = (props) => {
    const [getData, setData] = useState([]);
    const [numberAlert, setNumberAlert] = useState(100);
    const { visible, getDataSearch, onRefresh } = props;
    const [adapter, setAdapter] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);
    const [visibleData, setVisibleData] = useState(false);

    useEffect(() => {
        setData(getDataSearch);
    }, [getDataSearch]);

    useEffect(() => {
        setVisibleData(visible);
    }, [visible])


    if (visibleData) {
        return (
            <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                <Progress.Circle size={30} indeterminate={true} />
            </View>
        )
    } else if (getData == '') {
        return (
            <View style={[{ flex: 1, alignItems: 'center', marginTop: 58 }]} >
                <Image source={require('../../assets/trash/not-found.png')} />
                <Text style={{ fontSize: 16, fontWeight: '600', marginVertical: 20 }}>No matching results were found</Text>
            </View>
        )
    } else {
        return (
            <View>
                < SwiperFlatList
                    autoplay
                    autoplayDelay={3}
                    autoplayLoop
                    auto
                    extraData={getData}
                    data={getData}
                    renderItem={({ item }) => <ListRecoment ListData={item} withf={width} />}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}
const { width } = Dimensions.get('window');

export default DataRecoment


const styles = StyleSheet.create({})