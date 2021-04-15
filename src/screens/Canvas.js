import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, Platform, Alert, Text, TouchableOpacity } from "react-native";
import BackgroundService from 'react-native-background-actions';
import Loader from "../components/Loader"
import * as MyAsyncStorage from "../constants/MyAsyncStorage";
import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { map, filter } from "rxjs/operators";


// 업데이트 간격 조절
setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // defaults to 100ms


class Canvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            stepCnt: 0,
            prevSpeed: 0,
            mStep: 0,
            subscription: null,
        };
    }

    componentDidMount() {
        // this._startWalk()
    }

    // async componentWillUnmount() {
    //     this._stopWalk()
    // }

    _stopWalk = async () => {
        await MyAsyncStorage._writeAsyncStorage("AS_STEP_CNT", { mStep: 0, prevSpeed: 0 });
        await BackgroundService.stop();
        // if (this.state.subscription !== null) {
        //     this.state.subscription.unsubscribe();
        //     this.state.subscription = null
        // }
    }


    _startWalk = async () => {
        if (!BackgroundService.isRunning()) {
            // activateKeepAwake();
            await BackgroundService.start(this.veryIntensiveTask, {
                taskName: 'step',
                taskTitle: 'step title',
                taskDesc: 'step count',
                taskIcon: {
                    name: 'ic_launcher',
                    type: 'mipmap',
                },
                color: '#ffffff',
                // linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
                parameters: { delay: 1000 },
            });
            await BackgroundService.updateNotification({ taskDesc: `step : loading...` });
        }
    }

    veryIntensiveTask = async (taskDataArguments) => {
        const { delay } = taskDataArguments;

        await new Promise(async (resolve) => {

            for (let i = 0; BackgroundService.isRunning(); i++) {
                let asStepData = await MyAsyncStorage._getAsyncStorage("AS_STEP_CNT");
                if (asStepData === null) { asStepData = { mStep: 0, prevSpeed: 0 } }
                asStepData.mStep = asStepData.mStep + 1;
                await MyAsyncStorage._writeAsyncStorage("AS_STEP_CNT", asStepData);
                BackgroundService.updateNotification({ taskDesc: `step : ${asStepData.mStep}` });
                
                await new Promise(resolve => setTimeout(() => resolve(), delay));
            }

            // if (this.state.subscription === null) {
            //     this.state.subscription = accelerometer
            //         .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > -10))
            //         .subscribe(
            //             async (speed) => {
            //                 if (BackgroundService.isRunning()) {
            //                     let asStepData = await MyAsyncStorage._getAsyncStorage("AS_STEP_CNT");
            //                     if (asStepData === null) { asStepData = { mStep: 0, prevSpeed: 0 } }

            //                     let curSpeed = Math.abs(asStepData.prevSpeed - Number(speed));
            //                     asStepData.prevSpeed = Number(speed)

            //                     if (parseInt(String(curSpeed)) > 0) {
            //                         asStepData.mStep = asStepData.mStep + 1;
            //                         await MyAsyncStorage._writeAsyncStorage("AS_STEP_CNT", asStepData);
            //                         // this.setState({ stepCnt: this.state.mStep, isSubState: true })
            //                         // console.log(`You moved your phone with speed: ${curSpeed} / ${stepCnt}`)
            //                     }

            //                     BackgroundService.updateNotification({ taskDesc: `step : ${asStepData.mStep}` });

            //                 } else {
            //                     this._stopWalk()
            //                 }
            //             },
            //             error => {
            //                 Alert.alert('', "The sensor is not available")
            //             }
            //         );
            // }
        });
    };








    render() {
        const { loading } = this.state;
        // const { loading, stepCnt } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                {
                    loading ? (<Loader />) : (

                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
                            keyboardShouldPersistTaps='handled'>
                            {/* <Text style={{ fontSize: 36, color: '#000000', }}>{stepCnt}</Text> */}

                            <TouchableOpacity style={{ width: 200, height: 50, backgroundColor: '#6e37e6', borderRadius: 25, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    if (BackgroundService.isRunning()) {
                                        this._stopWalk()
                                    } else {
                                        this._startWalk()
                                    }
                                }}>
                                <Text style={{ color: '#ffffff', fontSize: 26 }}>{BackgroundService.isRunning() ? '중지' : '시작'}</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    )
                }
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
});

export default Canvas;