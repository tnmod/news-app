import { StyleSheet, Text, View, TextInput, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './DATA/AppContext';
import AxiosIntance from './DATA/AxiosIntance';
import { useNavigation } from '@react-navigation/native';
import AlertDialog from './Dialog/AlertDialog';

const Security = () => {
  const [getOldPassword, setOldPassword] = useState('');
  const [getNewPassword, setNewPassword] = useState('');
  const [getConfirmPassword, setConfirmPassword] = useState('');
  const [numberCase, setNumberCase] = useState(100);
  const [visible, setVisible] = useState(false);
  const { PassWord, setPassWord, } = useContext(AppContext);
  const [isSecure, setSecure] = useState(true);
  const [isEqual, setEqual] = useState(false)
  const navigation = useNavigation();
  const [isNull, setIsNull] = useState(true);
  const [isSecureOld, setSecureOld] = useState(true);

  const hideDialog = () => {

  }

  useEffect(() => {
    if (getNewPassword != '' && getNewPassword != undefined && getNewPassword == getConfirmPassword) {
      setEqual(true);
    } else {
      setEqual(false);
    }
  }, [getConfirmPassword]);

  useEffect(() => {
    if (getNewPassword == '' || getNewPassword == undefined || getConfirmPassword == '' || getConfirmPassword == undefined || getOldPassword == '' || getOldPassword == undefined) {
      setIsNull(true);
    } else {
      setIsNull(false);
    }
  }, [getConfirmPassword || getNewPassword || getOldPassword])

  const ChangePassword = async () => {
    setVisible(true);
    setNumberCase(1);
    visible ? setVisible(false) : setVisible(true);
    if (getOldPassword == PassWord) {
      if (getNewPassword != '' && getNewPassword != undefined) {
        if (getNewPassword == getConfirmPassword) {
          setEqual(true);
          const respont = await AxiosIntance().post('/users/change-password', { password: getNewPassword })
          if (!respont.error) {
            setVisible(false);
            navigation.goBack();
            setNumberCase(0);
          } else {
            setNumberCase(0);
            setNumberCase(5);
          }
        } else {
          setEqual(false);
        }
      } else {

      }
    }
    else {
      setNumberCase(0);
      setNumberCase(5);
    }
  }


  return (
    <View style={[{ flex: 1, backgroundColor: '#fff' }]} >
      <View style={[styles.container]} >
        <AlertDialog setVisibleMore={visible} numberCase={numberCase} />
        <View>
          <Text style={styles.titleInput}>{"Current password"}</Text>
          <View style={[styles.inputText]} >
            <TextInput secureTextEntry={isSecureOld} style={[{ flex: 1, height: 40, marginHorizontal: 10, marginRight: 36 }]} accessibilityLabel='inputText' accessibilityLabelBy="" onChangeText={Text => setOldPassword(Text)} />
            <TouchableOpacity onPress={() => { setSecureOld(isSecureOld ? false : true) }}>
              <Image style={[{ width: 18, height: 18, marginHorizontal: 10, }]} source={isSecureOld ? require('../assets/trash/eye-close.png') : require('../assets/trash/eye.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[{ marginTop: 40 }]} >
          <View>
            <Text style={styles.titleInput}>{"New password"}</Text>
            <View style={[styles.inputText]} >
              <TextInput secureTextEntry={isSecure} style={[{ flex: 1, height: 40, marginHorizontal: 10, marginRight: 36 }]} accessibilityLabel='inputText' accessibilityLabelBy="" onChangeText={Text => setNewPassword(Text)} />
              <TouchableOpacity onPress={() => { setSecure(isSecure ? false : true) }}>
                <Image style={[{ width: 18, height: 18, marginHorizontal: 10, }]} source={isSecure ? require('../assets/trash/eye-close.png') : require('../assets/trash/eye.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[{ marginTop: 8 }]}>
            <Text style={styles.titleInput}>{"Confirm new password"}</Text>
            <View style={[styles.inputText]} >
              <TextInput secureTextEntry={isSecure} style={[{ flex: 1, height: 40, marginHorizontal: 10, marginRight: 36 }]} accessibilityLabel='inputText' accessibilityLabelBy="" onChangeText={Text => setConfirmPassword(Text)} />
              <Image style={getConfirmPassword == '' || getConfirmPassword == undefined ? { display: 'none' } : { width: 18, height: 18, marginHorizontal: 10, }} source={isEqual ? require('../assets/trash/done.png') : require('../assets/trash/failed.png')} />
            </View>
          </View>
        </View>
        <Pressable disabled={isNull} onPress={ChangePassword} android_ripple={{ color: 'while' }} style={isNull ? styles.buttonLoginDisable : styles.buttonLogin} >
          <Text style={isNull ? { color: '#667080', fontSize: 16, lineHeight: 24, fontWeight: '600' } : { color: '#ffffff', fontSize: 16, lineHeight: 24, fontWeight: '600' }}>Update</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Security

const styles = StyleSheet.create({
  buttonLogin: {
    backgroundColor: '#1877F2',
    width: '100%',
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonLoginDisable: {
    backgroundColor: '#EEF1F4',
    width: '100%',
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  titleInput: {
    //  fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    letterSpacinge: 0.12,
    color: '#4E4B66',
    marginBottom: 5,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#4E4B66',
    borderRadius: 6,
    width: '100%',
    height: 50,
    gap: 18,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexGrow: 0,
  },
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  }
})