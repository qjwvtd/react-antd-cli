'use strict';
import React from 'react';

//combineActions
function combineActions(actionMap) {
    const actions = {};
    for (let key in actionMap) {
        if (typeof actionMap[key] !== 'function') {
            throw 'action must be an Function type,The error occurred in ' + key;
        }
        if (actions[key]) {
            throw 'There is already a same action,The error occurred in ' + key;
        }
        actions[key] = actionMap[key];
    }
    return actions;
}
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
//combinehookAction
function combineHookAction(dispatchAction, state, actions) {
    const dispatch = dispatchAction;
    const action = {};
    for (let key in actions) {
        if (typeof actions[key] !== 'function') {
            throw 'action must be an function type,The error occurred in ' + key;
        }
        const newAction = function (params) {
            return actions[key](params)(dispatch, state);
        };
        action[key] = newAction;
    }
    return action;
}
export default function createLiveStore(reducerMap, actionMap) {
    if (arguments.length === 0) {
        throw 'Reducer and action is required';
    }
    if (arguments[0].constructor !== Object) {
        throw 'Parameter exception,The reducer collection must be an object type, ' +
        'For example:: {reducer1,reducer2,...} or {reducer}';
    }
    if (arguments[1].constructor !== Object) {
        throw 'Parameter exception,The action collection must be an object type, ' +
        'For example:: {action1,action2,...} or {action}';
    }
    //绑定到参数上
    reducerMap = arguments[0];
    actionMap = arguments[1];
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
    //actions
    const actions = combineActions(actionMap);
    //create context
    const Context = React.createContext(stores);
    //Wapper
    function Wapper({ children }) {
        const [state, dispatchAction] = React.useReducer(reducer, stores);
        const action = combineHookAction(dispatchAction, state, actions);
        return <Context.Provider value={{ state, action }}>
            {children}
        </Context.Provider>;
    }
    function useStore() {
        return React.useContext(Context);
    }
    return { useStore, Wapper };
}
