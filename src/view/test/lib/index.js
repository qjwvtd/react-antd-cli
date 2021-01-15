'use strict';
import React from 'react';

export default function createLiveStore(reducerMap, actionsMap) {
    if (arguments.length === 0) {
        throw 'Reducer is required';
    }
    if (arguments[0].constructor !== Object) {
        throw 'Parameter exception,The reducer collection must be an object type, ' +
        'For example:: {reducer1,reducer2,...} or {reducer}';
    }
    //绑定到第一个参数上
    reducerMap = arguments[0];
    //克隆reducer
    const clonedReducers = {};
    for (let a in reducerMap) {
        if (reducerMap[a].constructor !== Function) {
            throw 'The type of reducer must be a function';
        }
        clonedReducers[a] = reducerMap[a];
    }
    //combineStores
    function combineStores() {
        const stores = {};
        for (let b in clonedReducers) {
            const state = clonedReducers[b](undefined, { type: null });
            if (state === undefined || state === null) {
                throw 'The return value of reducer cannot be null or undefined';
            }
            stores[b] = state;
        }
        return stores;
    }
    //combineReducers
    function combineReducers() {
        return function (state, action) {
            const nextState = {};
            for (let c in clonedReducers) {
                const prevState = state[c];
                const currentReducer = clonedReducers[c];
                const currentState = currentReducer(prevState, action);
                if (currentState === undefined) {
                    throw 'Reducer must return state,current reducer: ' + currentReducer;
                }
                nextState[c] = currentState;
            }
            return nextState;
        };
    }
    //combineActions
    function combineActions() {
        if (!actionsMap) {
            throw 'Missing required parameter actionsMap';
        }
        const errorText = 'There is already an action with the same name. ' +
            'Please make sure that the name of each action is unique';
        const actions = {};
        for (let key in actionsMap) {
            if (actionsMap[key].constructor === Function) {
                if (actions[key]) {
                    throw errorText;
                }
                actions[key] = actionsMap[key];
            }
            if (actionsMap[key].constructor === Object) {
                for (let i in actionsMap[key]) {
                    if (actionsMap[key][i].constructor === Function) {
                        if (actions[i]) {
                            throw errorText;
                        }
                        actions[i] = actionsMap[key][i];
                    }
                }
            }
        }
        return actions;
    }
    //merge stores
    const stores = combineStores();
    //merge reducer
    const reducer = combineReducers();
    //actions
    const actions = combineActions();
    //create context
    const Context = React.createContext(stores);
    //Wapper
    function Wapper({ children }) {
        const [state, dispatch] = React.useReducer(reducer, stores);
        //async of dispatch
        dispatch.async = function () {
            if (arguments[0].constructor !== Function) {
                throw 'param of asyncDispatch must is function.';
            }
            arguments[0].apply(arguments[0], [dispatch]);
            return arguments[0];
        };
        return /*#__PURE__*/React.createElement(Context.Provider, {
            value: { state, dispatch, actions }
        }, children);
    }
    function useStore() {
        let store = null;
        try {
            store = React.useContext(Context);
        } catch (e) {
            throw e.name + ', ' + e.message;
        }
        return store;
    }
    return { useStore, Wapper };
}


