
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';


// **** 어싱크 스토리지에서 데이터 가져옴 **** //
export async function _getAsyncStorage(key) {
    console.log(`#### >>>>>> _getAsyncStorage () 요청 - key : ` + key);

    let item = null;
    try {
        const itemStr = await AsyncStorage.getItem(key);
        console.log(`#### <<<<<< _getAsyncStorage () 요청 - itemStr : ` + itemStr);

        if (itemStr !== null) {
            item = JSON.parse(itemStr);
        }

    } catch (e) {
        // error reading value
        console.log(`#### <<<<<< _getAsyncStorage () 요청 - error : ` + e);
    }

    return item;
}


// **** 어싱크 스토리지에서 데이터 저장 **** //
export async function _writeAsyncStorage(key, data) {
    console.log(`#### >>>>>> _writeAsyncStorage () 요청 - key : ` + key);

    let result = null;
    try {
        result = await AsyncStorage.setItem(key, JSON.stringify(data));
        console.log(`#### <<<<<< _writeAsyncStorage () 요청 - data : ` + JSON.stringify(data));

    } catch (e) {
        Alert.alert("",
        `어싱크 스토리지 에러!`, [{
          text: '확인', onPress: () => { }
        },],
        { cancelable: false },
      );

        // error reading value
        console.log(`#### <<<<<< _writeAsyncStorage () 요청 - error : ` + e);
    }

    return result;
}



