import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './../../navigation/BottomTabNavigator';
import { AppContext } from './AppContext';
import Login from '../../Login/Login';
import SignUp from '../../Login/SignUp';
import NewDetail from './../NewDetail';
import EditProfile from './../EditProfile';
import Search from './../Search';
import CustomHeaderNewsDetail from './../../navigation/CustomHeaderNewsDetail';
import CustomHeaderCreateNews from './../../navigation/CustomHeaderCreateNews';
import CreateNews from './../CreateNews';
import EditNews from './../EditNews';
import Setting from './../Setting';
import Security from './../Security';
import Test from './../Dialog/Test';

const Stack = createStackNavigator()
const LoadLogin = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}
const LoadMain = () => {
    return (
        <Stack.Navigator initialRouteName='BottomTabNavigator' screenOptions={{ headerShown: false, headerStyle: { backgroundColor: '#fff', shadowColor: '#fff' } }}>
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name='Setting' component={Setting} options={{ headerShown: true, title: 'Setting', headerTitleAlign: 'center', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} />
            <Stack.Screen name='Security' component={Security} options={{ headerShown: true, title: 'Security', headerTitleAlign: 'center', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} />
            <Stack.Screen name='NewDetail' component={NewDetail} options={{ headerShown: true, title: '', headerTitleAlign: 'center', headerRight: ((props) => <CustomHeaderNewsDetail {...props} />) }} />
            <Stack.Screen name='EditProfile' component={EditProfile} options={{ headerShown: true, title: 'Fill your Profile', headerTitleAlign: 'center', cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid }} />
            <Stack.Screen name='EditNews' component={EditNews} options={{ headerShown: true, title: 'Edit News', headerTitleAlign: 'center', headerRight: ((props) => <CustomHeaderCreateNews {...props} />) }} />
            <Stack.Screen name='CreateNews' component={CreateNews} options={{ headerShown: true, title: 'Create News', headerTitleAlign: 'center', cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid, headerRight: ((props) => <CustomHeaderCreateNews {...props} />) }} />
        </Stack.Navigator>
    )
}

const AppNavigator = () => {
    const { isLogin } = useContext(AppContext);
    return (
        <>
            {
                isLogin ? <LoadMain /> : <LoadLogin/>
            }
        </>
    )
}
export default AppNavigator