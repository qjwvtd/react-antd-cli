'use strict';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
/**
 * main function
 * @param {*} reducersMap
 * 如: {reducer1,reducer2,...}
 * 关于return []和return {}的区别,返回数组在命名时可以别名,map对象则不能
 */
export function createLiveStore(reducersMap) {
    if (!reducersMap) {
        throw 'Reducer and Action is required';
    }
    if (reducersMap.constructor !== Object) {
        throw 'Parameter exception,The reducer collection must be an object type, ' +
        'For example:: {reducer1,reducer2,...} or {reducer}';
    }
    //combine reducer
    const reducer = combineReducers(reducersMap);
    //create store
    const store = createStore(reducer, {}, applyMiddleware(thunk));
    //Wapper
    function Wapper({ children }) {
        return <Provider store={store}>
            {children}
        </Provider>;
    }
    //use store
    function useStore() {
        const [state, setState] = React.useState(store.getState());
        //listener
        store.subscribe(() => {
            setState(store.getState());
        });
        return [state, store.dispatch];
    }
    //Observer
    function observer(FC) {
        return function () {
            const Element = /*#__PURE__*/React.createElement(FC, {
                state: store.getState(),
                dispatch: store.dispatch
            }, FC);
            return Element;
        };
    }
    return { Wapper, useStore, observer };
}
export function createActionMap(actionsMap) {
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
