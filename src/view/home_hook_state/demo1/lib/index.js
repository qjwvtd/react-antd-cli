'use strict';
import React from 'react';
//combineStores
function combineStores(reducers) {
    const stores = {};
    for (let b in reducers) {
        const state = reducers[b](undefined, { type: null });
        if (state === undefined || state === null) {
            throw 'The return value of reducer cannot be null or undefined';
        }
        stores[b] = state;
    }
    return stores;
}
//combineReducers
function combineReducers(reducers) {
    return function (state, action) {
        const nextState = {};
        for (let c in reducers) {
            const prevState = state[c];
            const currentReducer = reducers[c];
            const currentState = currentReducer(prevState, action);
            if (currentState === undefined) {
                throw 'Reducer must return state,current reducer: ' + currentReducer;
            }
            nextState[c] = currentState;
        }
        return nextState;
    };
}
export default function createLiveStore(reducerMap) {
    if (arguments.length === 0) {
        throw 'Reducer is required';
    }
    if (arguments[0].constructor !== Object) {
        throw 'Parameter exception,The reducer collection must be an object type, ' +
        'For example:: {reducer1,reducer2,...} or {reducer}';
    }
    //绑定到参数
    reducerMap = arguments[0];
    //克隆reducer
    const clonedReducers = {};
    for (let a in reducerMap) {
        if (reducerMap[a].constructor !== Function) {
            throw 'The type of reducer must be a function';
        }
        clonedReducers[a] = reducerMap[a];
    }
    //merge stores
    const stores = combineStores(clonedReducers);
    //merge reducer
    const reducer = combineReducers(clonedReducers);
    //create context
    const Context = React.createContext(stores);
    //Wapper
    function Wapper({ children }) {
        const [state, dispatchAction] = React.useReducer(reducer, stores);
        const dispatch = function () {
            if (arguments[0].constructor === Object) {
                dispatchAction.apply(dispatchAction, [arguments[0]]);
            }
            if (arguments[0].constructor === Function) {
                arguments[0].apply(arguments[0], [dispatchAction, state]);
            }
            return dispatchAction;
        };
        return <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>;
    }
    function useStore() {
        return React.useContext(Context);
    }
    return { useStore, Wapper };
}
