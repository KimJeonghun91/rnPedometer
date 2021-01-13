import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
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

setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms


const Canvas = () => {
    const navigation = useNavigation();
    const { rxLoginInfo } = useSelector((state: RootState) => state.rxLoginInfo, (prev, next) => { return prev.rxLoginInfo === next.rxLoginInfo; })
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
        //     console.log({ x, y, z, timestamp })
        // );
        const subscription = accelerometer
            .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > 15))
            .subscribe(
                speed => console.log(`You moved your phone with ${speed}`),
                error => {
                    console.log("The sensor is not available");
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

                    </ScrollView>
                )
            }
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
});

export default Canvas;