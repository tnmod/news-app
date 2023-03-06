import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import ListData from './ListData';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import AxiosIntance from './AxiosIntance';
import AlertDialog from './../Dialog/AlertDialog';
import * as Progress from 'react-native-progress';
import ListUser from './ListUser';

const DataUser = () => {
    const [getData, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [getAPI, setAPI] = useState();
    const [callGetData, setCall] = useState(false);

    useEffect(() => {
        const getNews = async () => {
            const reponse = await AxiosIntance().get("/articles/my-articles");
            if (reponse.error == false) {
                setAPI(reponse.data);
            }
        }
        getNews();
    })

    if (visible) {
        return (
            <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                <Progress.Circle size={30} indeterminate={true} />
            </View>
        )
    } else if (getAPI == '') {
        return (
            <View style={[{ flex: 1, alignItems: 'center', marginTop: 58 }]} >
                <Image source={require('../../assets/trash/not-found.png')} />
                <Text style={{ fontSize: 16, fontWeight: '600', marginVertical: 20 }}>No posts available</Text>
            </View>
        )

    } else {
        return (
            <View>
                < FlatList style={{ zIndex: 10 }}
                    extraData={getAPI}
                    data={getAPI}
                    renderItem={({ item }) => <ListUser ListData={item} />}
                    keyExtractor={item => item._id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}


export default DataUser


const styles = StyleSheet.create({})