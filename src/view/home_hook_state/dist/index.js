'use strict';
import React, { useReducer, useContext } from 'react';

export default function createThinkStore(reducerMap) {
    if (arguments.length === 0) {
        throw 'Reducer is required';
    }
    if ([Object, Function].indexOf(arguments[0].constructor) === -1) {
        throw 'Parameter exception,The reducer collection must be an object type, ' +
        'If there is only one reducer, use the reducer as the parameter directly' +
        'For example:: {reducer1,reducer2,...} or reducer';
    }
    if (arguments[0].constructor === Function) {
        const reducer = arguments[0];
        arguments[0] = { reducer };
    }
    //绑定到第一个参数上
    reducerMap = arguments[0];
    //克隆reducer
    const clonedReducers = {};
    //async store
    let asyncStore = [];
    for (let key in reducerMap) {
        if (reducerMap[key].constructor !== Function) {
            throw 'The type of reducer must be a function';
        }
        clonedReducers[key] = reducerMap[key];
    }
    //combineStores
    function combineStores() {
        const stores = {};
        for (let key in clonedReducers) {
            const state = clonedReducers[key](undefined, { type: null });
            if (state === undefined || state === null) {
                throw 'The return value of reducer cannot be null or undefined';
            }
            stores[key] = state;
        }
        return stores;
    }
    //combineReducers
    function combineReducers() {
        function reducer(state, action) {
            const nextState = {};
            for (let key in clonedReducers) {
                const prevState = state[key];
                const currentReducer = clonedReducers[key];
                const currentState = currentReducer(prevState, action);
                if (currentState === undefined) {
                    throw 'Reducer must return state,current reducer: ' + currentReducer;
                }
                nextState[key] = currentState;
            }
            asyncStore[0] = nextState;
            return nextState;
        }
        return reducer;
    }
    //merge stores
    const stores = combineStores();
    //merge reducer
    const reducer = combineReducers();
    //create context
    const Context = React.createContext(stores);
    //Provider
    function Provider({ children }) {
        const [state, dispatch] = useReducer(reducer, stores);
        asyncStore = [state, dispatch];
        return <Context.Provider
            value={[state, dispatch]}
        >
            {children}
        </Context.Provider>;
    }
    function useStore() {
        return useContext(Context);
    }
    function useProvider(FC) {
        try {
            const current = typeof FC === 'function' ? <FC /> : FC;
            return <Provider>{current}</Provider>;
        } catch (e) {
            throw e.name + ', ' + e.message;
        }
    }
    function getAsyncStore() {
        return asyncStore;
    }
    return { useStore, useProvider, getAsyncStore };
}
