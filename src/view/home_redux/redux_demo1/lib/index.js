'use strict';
import React from 'react';
import { createStore, combineReducers } from 'redux';
//uuid
// function getUUid() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         let r = Math.random() * 16 | 0,
//             v = c === 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }
// const storeKey = getUUid();
// window[storeKey] = {};
/**
 * main function
 * @param {*} reducersMap
 * 如: {reducer1,reducer2,...}
 * 关于return []和return {}的区别,返回数组在命名时可以别名,map对象则不能
 */
export default function createLiveStore(reducersMap) {
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
    function useStore() {
        /**
        * use hook,在组件内调用
        * const [state, dispatch] = useStore();
        */
        const [state, setState] = React.useState(store.getState());
        //async of dispatch
        store.dispatch.async = function () {
            if (arguments[0].constructor !== Function) {
                throw 'param of asyncDispatch must is function.';
            }
            arguments[0].apply(arguments[0], [store.dispatch]);
            return arguments[0];
        };
        //dispatch
        const dispatch = store.dispatch;
        let unsubscribe = null;
        React.useEffect(() => {
            unsubscribe = store.subscribe(() => {
                setState(store.getState());
            });
            //cancel subscribe
            return () => unsubscribe();
        }, []);
        return [state, dispatch];
    }
    return [useStore];
}
