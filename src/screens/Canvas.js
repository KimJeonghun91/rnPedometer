import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, Platform, Alert, Text, TouchableOpacity } from "react-native";
import BackgroundService from 'react-native-background-actions';
import Loader from "../components/Loader"
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
            isSubState: false
        };
    }

    componentDidMount() {
        this._startWalk()
    }

    async componentWillUnmount() {
        this._stopWalk()
    }

    _stopWalk = async () => {
        await BackgroundService.stop();
        this.setState({ isSubState: false })
        if (this.state.subscription !== null) {
            this.state.subscription.unsubscribe();
            this.state.subscription = null
        }
    }


    _startWalk = async () => {
        console.log("_startWalk : BackgroundService.isRunning() : " + BackgroundService.isRunning())
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
            this.setState({ isSubState: true })
        }
    }

    veryIntensiveTask = async (taskDataArguments) => {
        const { delay } = taskDataArguments;

        await new Promise(async (resolve) => {
            console.log("veryIntensiveTask : BackgroundService.isRunning() : " + BackgroundService.isRunning())
            console.log("veryIntensiveTask : this.state.subscription : " + this.state.subscription)

            if (this.state.subscription === null) {
                this.state.subscription = accelerometer
                    .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > -10))
                    .subscribe(
                        speed => {
                            // for (let i = 0; BackgroundService.isRunning(); i++) {
                            //     let asStepData = await MyAsyncStorage._getAsyncStorage("AS_STEP_CNT");
                            //     if (asStepData === null) { asStepData = { mStep: 0, prevSpeed: 0, isActive: true } }
                            //     asStepData.mStep = asStepData.mStep + 1;
                            //     await MyAsyncStorage._writeAsyncStorage("AS_STEP_CNT", asStepData);

                            //     console.log("asStepData.isActive : " + (asStepData.isActive === true))
                            //     if (asStepData.isActive) {
                            //         this._updateScreen(asStepData)
                            //     }

                            //     await new Promise(resolve => setTimeout(() => resolve(), delay));
                            // }

                            if (BackgroundService.isRunning()) {
                                let curSpeed = Math.abs(this.state.prevSpeed - Number(speed));
                                this.state.prevSpeed = Number(speed)

                                if (parseInt(String(curSpeed)) > 0) {
                                    this.state.mStep = this.state.mStep + 1
                                    this.setState({ stepCnt: this.state.mStep, isSubState: true })
                                    // console.log(`You moved your phone with speed: ${curSpeed} / ${stepCnt}`)
                                }

                                BackgroundService.updateNotification({ taskDesc: `step : ${this.state.mStep}` });

                            } else {
                                this._stopWalk()
                            }
                        },
                        error => {
                            Alert.alert('', "The sensor is not available")
                        }
                    );
            }
        });
    };








    render() {
        const { loading, stepCnt, isSubState } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                {
                    loading ? (<Loader />) : (

                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
                            keyboardShouldPersistTaps='handled'>
                            <Text style={{ fontSize: 36, color: '#000000', }}>{stepCnt}</Text>

                            <TouchableOpacity style={{ width: 200, height: 50, backgroundColor: '#6e37e6', borderRadius: 25, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => {
                                    if (isSubState) {
                                        this._stopWalk()
                                    } else {
                                        this._startWalk()
                                    }
                                }}>
                                <Text style={{ color: '#ffffff', fontSize: 26 }}>{isSubState ? '중지' : '시작'}</Text>
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