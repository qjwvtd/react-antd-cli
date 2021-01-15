'use strict';
import React from 'react';
import { createStore, combineReducers } from 'redux';

/**
 * main function
 * @param {*} reducersMap
 * 如: {reducer1,reducer2,...}
 * 关于return []和return {}的区别,返回数组在命名时可以别名,map对象则不能
 */
export default function createHookStore(reducersMap) {
    if (arguments.length === 0) {
        throw 'Reducer is required';
    }
    if (arguments[0].constructor !== Object) {
        throw 'Parameter exception,The reducer collection must be an object type, ' +
        'For example:: {reducer1,reducer2,...} or {reducer}';
    }
    //create reducer
    const reducer = combineReducers(reducersMap);
    const store = createStore(reducer, {});
    //async of dispatch
    store.dispatch.async = function () {
        if (arguments[0].constructor !== Function) {
            throw 'param of async dispatch must is function.';
        }
        arguments[0].apply(arguments[0], [store.dispatch]);
        return arguments[0];
    };
    //dispatch
    const dispatch = store.dispatch;
    return function () {
        /**
        * use hook,在组件内调用
        * const [state, dispatch] = useStore();
        */
        const [state, setState] = React.useState(store.getState());
        store.subscribe(() => {
            setState(store.getState());
        });
        return [state, dispatch];
    };
}
