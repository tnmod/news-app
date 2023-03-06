import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Login from '../Login/Login'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from './../Home';
import SplashScreen from './../SplashScreen';
import { useNavigation } from '@react-navigation/native';
import { Poppins } from './../../asm/assets/fonts/Fonts';

const Stack = createStackNavigator();


const LoadLogin = () => {
    return (
        <Stack.Navigator initialRouteName='SplashScreen'>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} options={{
                headerShown: true, title: ''
            }} />
            <Stack.Screen name="Home" component={Home} options={{
                headerShown: true, title: 'Category', headerTitleAlign: 'center', headerTitleStyle: { textAlign: 'center', fontFamily: Poppins[700], fontSize: 16, letterSpacing: 0.5, lineHeight: 24, color: '#223263' }, CardStyleInterpolators: CardStyleInterpolators.forRevealFromBottomAndroid
                , headerRight: ((props) => {
                    return (
                        <View style={{ marginEnd: 24 }}>
                            <Image source={require('../../asm/assets/trash/baoveshop.png')} />
                        </View>
                    )
                }),
            }} />
        </Stack.Navigator>
    )
}

const BankingNavigator = () => {
    const navigator = useNavigation();

    const [flag, setFlag] = useState(false);
    const [color, setColor] = useState("#40BFFF");

    const SpflashScreen = async () => {
        setTimeout(() => {
            setFlag(true);
        }, 0);
    }

    useEffect(() => {
        SpflashScreen();
    }, [])

    useEffect(() => {
        if (flag) {
            navigator.navigate('Login');
            setColor("#FFF");
        }
    }, [flag])

    return (
        <View style={{ flex: 1 }}>
            <StatusBar animated={true}
                backgroundColor={color}
                barStyle={'dark-content'}
                hidden={false} />
            <LoadLogin />
        </View >
    )
}

export default BankingNavigator

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    }

})