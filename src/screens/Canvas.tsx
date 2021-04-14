import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, Platform, Alert, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { RootState } from '../components/redux/rootReducer'
import * as ITF from '../constants/Interface'
import Loader from "../components/Loader"
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

import {
    accelerometer,
    gyroscope,
    setUpdateIntervalForType,
    SensorTypes
} from "react-native-sensors";
import { map, filter } from "rxjs/operators";

// 업데이트 간격 조절
setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // defaults to 100ms


const Canvas = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);
    const [stepCnt, setStepCnt] = useState(0);
    let prevSpeed = 0;
    let mStep = 0;


    useEffect(() => {
        // const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
        //     console.log({ x, y, z, timestamp })
        // );

        // ** IOS는 0에서 시작함 , AOS는 디폴트가 9.5 정도값이 계속 구독됨 ** //
        // IOS는 값이 크게 안변함, AOS 는 많이 변함
        const subscription = accelerometer
            .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > -10))
            .subscribe(
                speed => {
                    // if (Platform.OS === 'android') {
                    //     setStepCnt(stepCnt + 1)
                    // } else {
                    //     setStepCnt(stepCnt + 1)
                    // }

                    let curSpeed: number = Math.abs(prevSpeed - Number(speed));
                    prevSpeed = Number(speed)

                    if (parseInt(String(curSpeed)) > 0) {
                        mStep = mStep + 1
                        setStepCnt(mStep)
                        // console.log(`You moved your phone with speed: ${curSpeed} / ${stepCnt}`)
                    }
                },
                error => {
                    Alert.alert('', "The sensor is not available")
                }
            );

        return () => { subscription.unsubscribe(); }
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ff00ff' }}>
            {
                loading ? (<Loader />) : (

                    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                        keyboardShouldPersistTaps='handled'>
                        <Text style={{ fontSize: 30, color: '#000000', marginTop: 30 }}>{stepCnt}</Text>
                    </ScrollView>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
});

export default Canvas;