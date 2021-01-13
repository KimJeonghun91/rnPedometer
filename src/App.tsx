import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Navigation from './Navigation';

// ##### 리덕스 관련 ######
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootReducer from "./components/redux/rootReducer";

let store = createStore(rootReducer); // Render the app container component with the provider around it
// ##### 리덕스 관련 END

const App = () => {
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
