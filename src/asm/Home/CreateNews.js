import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Dialog from "react-native-dialog";
import AxiosIntance from './DATA/AxiosIntance';
import { useNavigation } from '@react-navigation/native';
import AlertDialog from './Dialog/AlertDialog';
import { AppContext } from './DATA/AppContext';

const CreateNews = () => {
  const navigation = useNavigation();
  const [getImage, setImage] = useState();
  const [getUriImage, setUriImage] = useState();
  const [visibleChoose, setVisibleChoose] = useState(false);
  const [getTitle, setTitle] = useState();
  const [getContent, setContent] = useState();
  const [checkUpload, setCheckUpload] = useState(true);
  const [visible, setVisible] = useState(false);
  const [alertDialog, setAlertDialog] = useState(100);
  const [titleDialog, setTitleDialog] = useState('');
  const { setVisibleAllScreeen } = useContext(AppContext);


  const cameraChoose = async () => {
    const result = await launchCamera();
    dialogChooseImage();
    if (!result.didCancel) {
      setUriImage(result.assets[0].uri);
      const fromData = new FormData();
      fromData.append('image', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: result.assets[0].fileName
      });
      setImage(fromData);
    }

  };
  const libraryChoose = async () => {
    const result = await launchImageLibrary();
    dialogChooseImage();
    if (!result.didCancel) {
      setUriImage(result.assets[0].uri);
      const fromData = new FormData();
      fromData.append('image', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: result.assets[0].fileName
      });
      setImage(fromData);
    }

  };

  useEffect(() => {
    if (getImage != undefined) {

    } else {

    }
  }, [getImage])
  const dialogChooseImage = () => {
    visibleChoose ? setVisibleChoose(false) : setVisibleChoose(true);
  }

  const uploadNews = async () => {
    setVisibleAllScreeen(true);
    setAlertDialog(0);
    setAlertDialog(1);
    if (getImage != undefined) {
      const upload = await AxiosIntance("multipart/form-data").post("/media/upload", getImage);
      if (!upload.error) {
        const reponse = await AxiosIntance().post('/articles', { title: getTitle, content: getContent, image: upload.data.path });
        if (!reponse.error) {
          navigation.goBack();
          setVisibleAllScreeen(false);
          setAlertDialog(0);
        } else {
          setAlertDialog(0);
          setAlertDialog(5);
        }
      }
    }
    else {
      setTitleDialog("Image can't be blank");
      setAlertDialog(0);
      setAlertDialog(6);
    }
  }
  useEffect(() => {
    if (getContent == undefined || getTitle == undefined || getContent == '' || getTitle == '') {
      setCheckUpload(true);
    } else {
      setCheckUpload(false);
    }
  })

  const ApplyImages = () => {
    if (getUriImage != undefined) {
      return (
        <View style={[styles.containerAddImgdone]} >
          <View style={[styles.addimgdone]}>
            <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} source={{ uri: getUriImage }}></Image>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.containerAddImg]} >
          <View style={[styles.addimg]}>
            <Image source={require('../assets/trash/plus-dark.png')}></Image>
            <Text style={[styles.textimg]} >Add Cover Photo</Text>
          </View>
        </View>
      );
    }
  }

  return (
    <View style={[{ backgroundColor: '#fff', flex: 1 }]} >
      <AlertDialog numberCase={alertDialog} getTitleDialog={titleDialog} />
      <Dialog.Container visible={visibleChoose} onBackdropPress={dialogChooseImage} onRequestClose={dialogChooseImage}>
        <Dialog.Title style={{ textAlign: 'center' }}>Choose an action</Dialog.Title>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Pressable style={[styles.choosefile]} android_ripple={{ color: 'while' }} onPress={libraryChoose}>
            <Image style={styles.imgchoose} source={require('../assets/trash/library.png')} />
            <Text>Library</Text>
          </Pressable>
          <Pressable style={[styles.choosefile]} android_ripple={{ color: 'while' }} onPress={cameraChoose}>
            <Image style={styles.imgchoose} source={require('../assets/trash/camera.png')} />
            <Text>Camera</Text>
          </Pressable>
        </View>
      </Dialog.Container>
      <View style={[styles.container]} >
        <TouchableOpacity onPressOut={dialogChooseImage}>
          <ApplyImages />
        </TouchableOpacity>
        <View style={[styles.containerTitle, { marginTop: 16, marginBottom: 4 }]} >
          <TextInput placeholderTextColor='#A0A3BD' onChangeText={Text => setTitle(Text)} multiline style={[styles.textimg, { color: '#050505', fontSize: 24, lineHeight: 36, minHeight: 36, padding: 0 }]} placeholder='News title' />
        </View>
        <View style={[{ width: '100%', height: 1.2, backgroundColor: '#C4C4C4' }]} ></View>
        <View style={[styles.containerTitle, { flex: 1, }]} >
          <TextInput placeholderTextColor='#A0A3BD' onChangeText={Text => setContent(Text)} multiline style={[styles.textimg, { color: '#4E4B66', fontSize: 16 }]} placeholder='Add News/Article' />
        </View>
        <View style={{ backgroundColor: '#f6f6f6', width: '200%', left: -200, height: 1 }}></View>
        <View style={[styles.containerBottomBar]} >
          <View style={[styles.containerTool]} >
            <Image style={{ marginEnd: 12 }} source={require('../assets/trash/caplock.png')} />
            <Image style={{ marginEnd: 12 }} source={require('../assets/trash/text-left.png')} />
            <Image style={{ marginEnd: 12 }} source={require('../assets/trash/choose-image.png')} />
            <Image style={{ marginEnd: 12 }} source={require('../assets/trash/more-hori.png')} />
          </View>
          <Pressable disabled={checkUpload} onPress={uploadNews} android_ripple={{ color: 'while' }} style={checkUpload ? styles.buttonUploadDisable : styles.buttonUpload} >
            <Text style={checkUpload ? styles.textUploadDisable : styles.textUpload} >Publish</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default CreateNews

const styles = StyleSheet.create({
  textUpload: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
  },
  textUploadDisable: {
    color: '#667080',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
  },
  buttonUpload: {
    width: 109,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    borderRadius: 6,
    gap: 10,
  },
  buttonUploadDisable: {
    width: 109,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF1F4',
    borderRadius: 6,
    gap: 10,
  },
  choosefile: {
    width: 100,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imgchoose: {
    width: 36,
    height: 36,
    marginBottom: 4,
  },
  containerTool: {
    flexDirection: 'row',
    height: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  containerBottomBar: {
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textimg: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
  },
  addimg: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addimgdone: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  containerAddImg: {
    width: '100%',
    backgroundColor: '#EEF1F4',
    height: 183,
    borderColor: '#4E4B66',
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAddImgdone: {
    width: '100%',
    backgroundColor: '#EEF1F4',
    height: 248,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 20,
    height: '100%'
  },
})