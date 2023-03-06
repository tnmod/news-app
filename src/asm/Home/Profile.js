import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import DataHome from './DATA/DataHome';
import { useNavigation } from '@react-navigation/native';

import { ScrollView } from 'react-native-gesture-handler';
import { AppContext } from './DATA/AppContext';
import DataUser from './DATA/DataUser';
const Profile = (props) => {
  const { UserInfo } = useContext(AppContext);
  const navigation = useNavigation();
  const [isNews, setIsNews] = useState(false);
  const [getAvatar, setAvatar] = useState();
  const [ReAvatar, reSetAvatar] = useState(false);

  const setRecoment = (_isnew) => {
    _isnew ? setIsNews(false) : setIsNews(true);
  }
  const moveScreen = () => {
    navigation.navigate('EditProfile');
  }
  const moveAddNews = () => {
    navigation.navigate('CreateNews');
  }
  const moveSetting = () => {
    navigation.navigate('Setting');
  }
  useEffect(() => {
    if (UserInfo.avatar == null || UserInfo.avatar == undefined || UserInfo.avatar == '') {
      setAvatar(require('../assets/default/avatar.png'));
    } else {
      setAvatar({ uri: UserInfo.avatar });
    }
  }, [UserInfo.avatar])
  console.log(UserInfo);
  return (
    <View style={[{ height: '100%', backgroundColor: '#fff', }]}>
      <View style={[styles.container]} >
        <View style={[styles.header]} >
          <View style={[styles.imageHeader]}></View>
          <Text style={[styles.textHeader]} >Profile</Text>
          <TouchableOpacity onPress={moveSetting}>
            <Image style={[styles.imageHeader]} source={require('../assets/trash/setting.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={[styles.infoContainer]} >
          <Image style={[styles.imgAvatar]} source={getAvatar}></Image>
          <View style={[styles.detail]}>
            <View style={[styles.boxDetail]} >
              <Text style={[styles.textMedium]} >2003</Text>
              <Text style={[styles.textDetail]}>Followers</Text>
            </View>
            <View style={[styles.boxDetail]} >
              <Text style={[styles.textMedium]}>07</Text>
              <Text style={[styles.textDetail]}>Following</Text>
            </View>
            <View style={[styles.boxDetail]} >
              <Text style={[styles.textMedium]}>02</Text>
              <Text style={[styles.textDetail]}>News</Text>
            </View>
          </View>
        </View>
        <View style={[styles.storyContainer]} >
          <View>
            <Text style={[styles.textMedium]} >{UserInfo.name}</Text>
            <Text style={[styles.textDetail]} >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
          </View>
          <View style={[styles.editContainer]} >
            <Pressable android_ripple={{ color: 'while' }} style={[styles.button]} onPress={moveScreen}>
              <Text style={[styles.textButton]}>Edit profile</Text>
            </Pressable>
            <Pressable android_ripple={{ color: 'while' }} style={[styles.button]} >
              <Text style={[styles.textButton]} >Website</Text>
            </Pressable>
          </View>
        </View>
        <View style={[styles.recommentContainer]} >
          <View style={[styles.recommentHeader]} >
            <Pressable style={[styles.recommentButton]} onPress={() => setRecoment(true)}>
              <Text style={isNews ? [styles.textDetail] : [styles.textDetail, { color: '#000', fontWeight: '600' }]} >News</Text>
            </Pressable>
            <Pressable style={[styles.recommentButton]} onPress={() => setRecoment(false)}>
              <Text style={isNews ? [styles.textDetail, { color: '#000', fontWeight: '600' }] : [styles.textDetail]} >Recent</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.addButton]} onPress={moveAddNews}>
        <Image style={[styles.textButton]} source={require('../assets/trash/plus.png')} />
      </TouchableOpacity>
      <View style={{ flex: 1 }} >
        <DataUser />
      </View>
    </View>

  )
}

export default Profile

const styles = StyleSheet.create({
  addButton: {
    width: 50,
    height: 50,
    bottom: 30,
    end: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    borderRadius: 100,
    gap: 10,
    position: 'absolute'
  },
  recommentButton: {
    height: 32,
    marginHorizontal: 5
  },
  recommentHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2,
  },
  recommentContainer: {

  },
  textButton: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 14,
  },
  button: {
    width: 172,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    borderRadius: 6,
    gap: 10,
  },
  textDetail: {
    color: '#4E4B66',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
  },
  textMedium: {
    color: '#000',
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
  },
  boxDetail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginStart: 30,
  },
  imgAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12
  },
  imageHeader: {
    width: 19,
    height: 21,
  },
  textHeader: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    fontWeight: '400',
    color: '#000',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    alignItems: 'flex-end',
  },
  container: {
    marginHorizontal: 24
  },
})