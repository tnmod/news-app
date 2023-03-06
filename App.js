/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Login from './src/asm/Login/Login';
import SignUp from './src/asm/Login/SignUp';
import { StatusBar, View } from 'react-native';
import Tinhtoan from './src/lab/Tinhtoan';
import Xoso from './src/lab/Xoso';
import AppContext, { AppContextProvider } from './src/asm/Home/DATA/AppContext';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/asm/Home/DATA/AppNavigator';
import Search from './src/asm/Home/Search';
import Security from './src/asm/Home/Security';

const App = () => {

  return (
    <AppContextProvider>
      <View style={[{ flex: 1, backgroundColor: '#fff' }]}>
        <StatusBar animated={true}
          backgroundColor="#fff"
          barStyle={'dark-content'}
          hidden={false} />
        <NavigationContainer>
          {/* <Security /> */}
        <AppNavigator />
        </NavigationContainer>
      </View>
    </AppContextProvider>

  );
};

export default App;


// <View style={[{ flex: 1 }]} >
//   <NavigationContainer> 
//      <BottomTabNavigator />
//   </NavigationContainer>
// </View>
//<NewDetail/>
//<EditProfile/>
//<Xoso/>
//<Tinhtoan/>
// <DataHome/>
