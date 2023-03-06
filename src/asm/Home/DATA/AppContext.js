import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'

export const AppContext = createContext();
export const AppContextProvider = (props) => {
    const { children } = props;
    const [isLogin, setLogin] = useState(false);
    const [UserData, setUserData] = useState('');
    const [UserInfo, setUserInfo] = useState('');
    const [UserName, setUserName] = useState('');
    const [PassWord, setPassWord] = useState('');
    const [mainSuccess, setMainSuccess] = useState(false);
    const [mainFailed, setMainFailed] = useState(false);
    const [mainUnknowError, setMainUnknowError] = useState(false);
    const [visibleAllScreen, setVisibleAllScreeen] = useState(false);

    return (
        <AppContext.Provider value={{
            isLogin, setLogin,
            UserData, setUserData,
            mainSuccess, setMainSuccess,
            mainFailed, setMainFailed,
            mainUnknowError, setMainUnknowError,
            UserName, setUserName,
            PassWord, setPassWord,
            UserInfo, setUserInfo,
            visibleAllScreen, setVisibleAllScreeen,
        }}>
            {children}
        </AppContext.Provider>
    )
}

const styles = StyleSheet.create({})