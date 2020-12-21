import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
//import reducer
import { good } from './good';
//merge reducer
const reducer = combineReducers({ good });
const store = createStore(reducer, {});
export default function GlobalProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
