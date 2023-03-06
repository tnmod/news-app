import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'


const Tinhtoan = () => {
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 5));
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 5));
  const [result, setResult] = useState(Math.floor(Math.random() * 10));
  const [highestScore, sethighestScore] = useState(0);
  const [score, setscore] = useState(0);
  const random = (ischoose) => {
    let sum = number1 + number2;
    setNumber1(Math.floor(Math.random() * 5))
    setNumber2(Math.floor(Math.random() * 5))
    setResult(Math.floor(Math.random() * 10))
    if ((ischoose == true && sum == result) || (ischoose == false && sum != result)) {
      alert('Chúc mừng bạn!');
      setscore(score + 1);
      if (score >= highestScore) {
        sethighestScore(highestScore + 1);
      }
    } else {
      alert('Câu trả lời không chính xác');
      setscore(0);
    }

  }

  return (
    <View>
      <Text style={{ fontSize: 30, color: 'red', textAlign: 'center', margin: 10, }}>BẠN CÓ GIỎI TOÁN ?</Text>
      <Text style={{ fontSize: 50, color: 'blue', textAlign: 'center', }}>{number1}+{number2} </Text>
      <Text style={{ fontSize: 50, color: 'blue', textAlign: 'center', }}> = </Text>
      <Text style={{ fontSize: 50, color: 'blue', textAlign: 'center', }}> {result} </Text>
      <Pressable style={{ borderWidth: 2, backgroundColor: 'green', textAlign: 'center', padding: 7, margin: 30, height: 50 }}
        onPress={() => random(true)}>
        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>Đúng</Text>
      </Pressable>
      <Pressable style={{ borderWidth: 2, backgroundColor: 'red', textAlign: 'center', padding: 7, margin: 30, marginTop: 10, height: 50 }}
        onPress={() => random(false)}>
        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>Sai</Text>
      </Pressable>
      <Text style={{ fontSize: 20, textAlign: 'center', color: 'black' }}>Điểm: {score}</Text>
      <Text style={{ fontSize: 20, textAlign: 'center', color: 'black' }}>Điểm cao nhất: {highestScore}</Text>
    </View>
  )
}

export default Tinhtoan