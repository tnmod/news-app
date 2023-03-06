import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

const Xoso = () => {
  const [yourNumber, setYournumber] = useState(0);
  const [yourMoney, setYourmoney] = useState(100000);
  const [result, setResult] = useState('');
  const [RandomNumber, setRandomNumber] = useState('');
  const random = (_isTai) => {
    if (yourNumber > 0) {
      if (yourMoney >= yourNumber) {
        let randomNumber = Math.round(Math.random() * 16) + 1;
        setYourmoney(yourMoney - yourNumber);
        if (!_isTai) {
          if (randomNumber > 3 && randomNumber < 11) {
            setRandomNumber('Kết quả: Xỉu ' + randomNumber);
            setResult('Chúc mừng bạn x2 tiền!');
            setYourmoney(yourMoney + (yourNumber * 1));
          } else {
            setRandomNumber('Kết quả: Tài ' + randomNumber);
            setResult('Lần sau chắc chắn sẽ trúng!');
          }
        } else {
          if (randomNumber > 10 && randomNumber < 18) {
            setRandomNumber('Kết quả: Tài ' + randomNumber);
            setResult('Chúc mừng bạn x2 tiền!');
            setYourmoney(yourMoney + (yourNumber * 1));
          } else {
            setRandomNumber('Kết quả: Xỉu ' + randomNumber);
            setResult('Lần sau chắc chắn sẽ trúng!');
          }
        }
      }
      else{
        setResult('Số tiền của bạn nhỏ hơn tiền cược, vui lòng liên hệ "Hội vô gia cư!" để cầm cố sổ đỏ nhận tiền sau 5 phút');
      }
    }

  }
  return (
    <View>
      <Text style={{ fontSize: 40, color: 'blue', textAlign: 'center', margin: 10, }}>Cơ hội làm giàu!!!</Text>
      <Text style={{ fontSize: 20, color: 'green', textAlign: 'center', }}>Tiền của bạn: {yourMoney}</Text>
      <TextInput keyboardType='numeric' numeric style={{ borderWidth: 2, textAlign: 'center', padding: 7, margin: 20, height: 50, }} placeholder='Nhập vào số tiền bạn muốn nè' onChangeText={Number => setYournumber(Number)}></TextInput>
      <Pressable style={{ borderWidth: 2, backgroundColor: 'red', textAlign: 'center', padding: 7, margin: 10, height: 50 }}
        onPress={() => random(false)}>
        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', }}>Xỉu</Text>
      </Pressable>
      <Pressable style={{ borderWidth: 2, backgroundColor: 'blue', textAlign: 'center', padding: 7, margin: 10, height: 50 }}
        onPress={() => random(true)}>
        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white', }}>Tài</Text>
      </Pressable>
      <Text style={{ fontSize: 20, color: 'green', textAlign: 'center', }}>{RandomNumber}</Text>
      <Text style={{ fontSize: 20, color: 'green', textAlign: 'center', }}>{result}</Text>
    </View>
  )
}

export default Xoso