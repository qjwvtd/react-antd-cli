import { useState, useEffect } from 'react';
import { createStore } from 'redux';
import reducer from './reducer';
//store
const store = createStore(reducer, {});
/**
 * use hook,在组件内调用
 * const { state, dispatch } = useStore();
 */
export function useStore() {
    const [state, updateState] = useState(store.getState());
    //dispatch
    const dispatch = store.dispatch;
    let subscribe = null;
    useEffect(() => {
        subscribe = store.subscribe(() => {
            updateState(store.getState());
        });
        //cancel subscribe
        return () => subscribe();
    }, []);
    return { state, dispatch };
}
/**
 * 外部函数调用,如封装的异步请求等
 * 外部函数不能使用useStore(),因其内部使用了effect和subscribe订阅
 * const { state, dispatch } = applyStore();
 * 用于异步更新数据: dispatch({type: 'xxx',...});
 */
export function applyStore() {
    return {
        state: store.getState(),
        dispatch: store.dispatch
    };
}
