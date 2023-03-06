import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from './DATA/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-switch';



const Setting = () => {
  const { setLogin, setUserData } = useContext(AppContext);
  const navigation = useNavigation();
  const [isEnable, setEnble] = useState(false);

  const logout = async () => {
    setLogin(false);
    setUserData('');
    await AsyncStorage.setItem("token", "");
  }

  const changepassword = () => {
    navigation.navigate('Security');
  }
  const toggleSwitch = () => {
    isEnable ? setEnble(false) : setEnble(true);
    console.log(!isEnable);
  }
  return (
    <View style={[{ flex: 1, backgroundColor: '#FFF' }]} >
      <View style={[styles.container]} >
        <TouchableOpacity>
          <View style={[styles.optionContainer]} >
            <View style={[styles.leftContainer]}>
              <Image style={[styles.image]} source={require('../assets/trash/notification.png')} />
              <Text style={[styles.text]}>Notification</Text>
            </View>
            <Image style={[styles.next]} source={require('../assets/trash/next.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={changepassword}>
          <View style={[styles.optionContainer]}>
            <View style={[styles.leftContainer]}>
              <Image style={[styles.image]} source={require('../assets/trash/security.png')} />
              <Text style={[styles.text]}>Security</Text>
            </View>
            <Image style={[styles.next]} source={require('../assets/trash/next.png')} />
          </View >
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.optionContainer]} >
            <View style={[styles.leftContainer]}>
              <Image style={[styles.image]} source={require('../assets/trash/help.png')} />
              <Text style={[styles.text]}>Help</Text>
            </View>
            <Image style={[styles.next]} source={require('../assets/trash/next.png')} />
          </View>
        </TouchableOpacity>
        <View>
          <View style={[styles.optionContainer]} >
            <View style={[styles.leftContainer]} >
              <Image style={[styles.image]} source={require('../assets/trash/dark-mode.png')} />
              <Text style={[styles.text]}>Dark Mode</Text>
            </View>
            <Switch
              circleActiveColor='#fff'
              backgroundActive='#6670806b'
              backgroundInactive='#6670804d'
              circleBorderWidth={2}
              circleBorderActiveColor='#66708012'
              circleBorderInactiveColor='#66708012'
              circleInActiveColor='#fff'
              activeText={''}
              inActiveText={''}
              switchLeftPx={2.6}
              switchRightPx={2.6}
              circleSize={18}
              onValueChange={toggleSwitch}
              containerStyle={{ marginEnd: 14 }}
              value={isEnable}
            />
          </View>
        </View>
        <TouchableOpacity onPress={logout}>
          <View style={[styles.optionContainer]} >
            <View style={[styles.leftContainer]}>
              <Image style={[styles.image]} source={require('../assets/trash/logout.png')} />
              <Text style={[styles.text]} >Logout</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View >
    </View >
  )
}

export default Setting

const styles = StyleSheet.create({
  next: {
    end: 0,
    margin: 10,
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#000',
    marginHorizontal: 6
  },
  image: {

  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 20,
  },
  container: {

  }
})