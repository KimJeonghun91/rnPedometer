import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Navigation from './Navigation';

// ##### 리덕스 관련 ######
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducer from "./components/redux/rootReducer";

let store = createStore(rootReducer); // Render the app container component with the provider around it
// ##### 리덕스 관련 END

import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";
import { map, filter } from "rxjs/operators";

setUpdateIntervalForType(SensorTypes.gyroscope, 400); // defaults to 100ms

// const subscription = accelerometer
//   .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > 20))
//   .subscribe(
//     speed => console.log(`You moved your phone with ${speed}`),
//     error => {
//       console.log("The sensor is not available");
//     }
//   );

// setTimeout(() => {
//   // If it's the last subscription to accelerometer it will stop polling in the native API
//   subscription.unsubscribe();
// }, 1000);

const App = () => {

  useEffect(() => {
    const subscription = gyroscope
      .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > 20))
      .subscribe(
        speed => console.log(`You moved your phone with ${speed}`),
        error => {
          console.log("The sensor is not available");
        }
      );

    return () => { subscription.unsubscribe(); }
  }, []);



  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </Provider>
    </>
  );
};

export default App;
