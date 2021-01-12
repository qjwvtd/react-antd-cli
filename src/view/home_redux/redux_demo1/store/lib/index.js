'use strict';
import React from 'react';
import { createStore, combineReducers } from 'redux';
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
        const [state, updateState] = React.useState(store.getState());
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
                updateState(store.getState());
            });
            //cancel subscribe
            return () => unsubscribe();
        }, []);
        return [state, dispatch];
    }
    function applyStore() {
        /**
         * 外部函数调用,如封装的异步请求等
         * 外部函数不能使用useStore(),因其内部使用了effect和subscribe订阅
         * const [state, dispatch] = applyStore();
         * 用于异步更新数据: dispatch({type: 'xxx',...});
         */
        return [store.getState(), store.dispatch];
    }
    return [useStore, applyStore];
}
