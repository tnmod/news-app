import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Poppins } from './../asm/assets/fonts/Fonts';
import { event } from 'react-native-reanimated';
import { Pippins } from './../../android/app/build/intermediates/assets/debug/mergeDebugAssets/custom/Fonts';

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        numColumns={2}
        data={DATA}
        extraData={DATA}
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={(item, index) => index}
        ListFooterComponent={()=>(
         <View style={{marginBottom:12,borderWidth:1,borderColor:'#0C1A30', height:50, justifyContent:'center', alignItems:'center', borderRadius:7, marginHorizontal:12}}>
          <Text style={{color:'#0C1A30', fontFamily:Poppins[400]}}>Filter & Sorting</Text>
         </View>
        )}
      />
    </View>
  )
}

const Item = ({ data }) => {
  const [image, setImage] = useState();
  const [width, setWidth] = useState();

  const find_dimesions = (layout) => {
    const { x, y, width, height } = layout;
    // console.warn(x);
    // console.warn(y);
    // console.warn(width);
    // console.warn(height);
    setWidth(width);
  }


  useEffect(() => {
    setImage(data.image);
  }, [])

  return (
    <TouchableOpacity style={{ padding: 16, width: '46%', borderRadius: 7, marginBottom: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#EBF0FF' }}>
      <Image onLayout={(event) => {
        find_dimesions(event.nativeEvent.layout);
      }} style={{ width: '100%', height: width, borderRadius: 7 }} source={data.image} />
      <View style={{ width: '100%' }}>
        <Text style={{ fontFamily: Poppins[700], letterSpacing: 0.5, lineHeight: 18, fontSize: 14, color: '#223263', marginTop: 8 }}>{data.Name}</Text>

        <Text style={{ fontFamily: Poppins[700], fontSize: 14, color: '#FE3A30', marginTop: 10 }}>{data.price}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ width: 14, height:14, marginRight: 2, backgroundColor:'grey' }} source={require('../asm/assets/trash/star.png')} />
            <Text style={{ fontFamily: Poppins[400], height: '100%', backgroundColor:'violet', textAlignVertical: 'center', fontSize: 12,  marginEnd: 8 }}>{data.oldprice}</Text>
            <Text style={{ fontFamily: Poppins[400], height: '100%', textAlignVertical: 'center', fontSize: 12 }}>{data.safeoff}</Text>
            
          </View>
          <Image source={require('../asm/assets/trash/more-verti.png')} />
        </View>
      </View>
    </ TouchableOpacity>
  )
};

const styles = StyleSheet.create({

})

const DATA = [
  {

    "image": require('../asm/assets/trash/air-force.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/jordan.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/air-jordan.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/waffle.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/air-force.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/jordan.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/air-jordan.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/waffle.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/air-force.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/jordan.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/air-jordan.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/waffle.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/air-force.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/jordan.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/air-jordan.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/waffle.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/air-force.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/jordan.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {

    "image": require('../asm/assets/trash/air-jordan.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
  {
    "image": require('../asm/assets/trash/waffle.png'),
    "Name": "Nike Air Max 270 REACT ENG",
    "price": "Rp. 1.500.000",
    "oldprice": "4.6",
    "safeoff": "86 Reviews",
  },
]


export default Home

