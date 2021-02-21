/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import NavigationContainer from './src/navigation/NavigationContainer';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger'
import searchReducer from './src/store/reducers/search';

const rootReducer = combineReducers({
  search: searchReducer
});

const logger = createLogger({ collapsed: true });
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, promise, logger)));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;
