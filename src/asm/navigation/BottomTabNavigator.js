import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import HomeScreen from '../Screen/HomeScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import Bookmark from '../Screen/Bookmark';
import ExporeScreen from '../Screen/ExporeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppContext } from './../Home/DATA/AppContext';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  // const { UserName, PassWord } = useContext(AppContext);
  //console.log(UserName + PassWord);
  return (
    <Tab.Navigator tabBarOption={[{ showLabel: false },]}  screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        switch (route.name) {
          case 'Home':
            return iconName = focused
              ? <Image style={[styles.iconBar]} source={require('../assets/trash/home-active.png')} />
              : <Image style={[styles.iconBar]} source={require('../assets/trash/home-default.png')} />;
            { }
          case 'Explore':
            return iconName = focused
              ? <Image style={[styles.iconBar]} source={require('../assets/trash/explore-active.png')} />
              : <Image style={[styles.iconBar]} source={require('../assets/trash/explore-default.png')} />;

          case 'Bookmark':
            return iconName = focused
              ? <Image style={[styles.iconBar]} source={require('../assets/trash/bookmark-active.png')} />
              : <Image style={[styles.iconBar]} source={require('../assets/trash/bookmark-default.png')} />;

          case 'Profile':
            return iconName = focused
              ? <Image style={[styles.iconBar]} source={require('../assets/trash/profile-active.png')} />
              : <Image style={[styles.iconBar]} source={require('../assets/trash/profile-default.png')} />;
        }
      },
      headerShown: false,
      tabBarActiveTintColor: '#1877F2',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExporeScreen} />
      <Tab.Screen name="Bookmark" component={Bookmark} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

// screenOptions={({ route }) => ({
//       tabBarStyle: {
//         height: 60,
//         backgroundColor: '#fff'
//       },
//       headerShown: false, tabBarStyle: {
//         position: 'absolute'
//       },
//       tabBarButton: props => <CustomBottomTab {...props} route={route} />
//     })}

export default BottomTabNavigator

const styles = StyleSheet.create({
  iconBar: {
    width: 24,
    height: 24
  },
})