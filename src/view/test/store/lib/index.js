import React, { useReducer, useContext } from 'react';

function checkParamsHasErr(params) {
    if ([Object, Array].indexOf(params.constructor) === -1) {
        throw 'The Parameter type must be Array or Object, ' +
        'Example: [{state1,reducer1}, {state2,reducer2}, ...] or {state,reducer}';
    }
}
export default function createStore(connect) {
    checkParamsHasErr(connect);
    if (connect.constructor === Object) {
        connect = [connect];
    }
    const stores = {};
    const reducerList = [];
    for (let i = 0; i < connect.length; i++) {
        checkParamsHasErr(connect[i]);
        const option = { ...connect[i] };
        const reducerItem = {};
        for (let key in option) {
            //生成stores和reducer
            if (option[key].constructor === Object) {
                stores[key] = option[key];
                reducerItem.key = key;
                reducerItem.state = option[key];
            }
            if (option[key].constructor === Function) {
                reducerItem.reducer = option[key];
            }
        }
        reducerList.push(reducerItem);
    }
    //reducer
    function combineReducer(state, action) {
        try {
            const keys = Object.keys(state);
            const current = reducerList.filter((item) => {
                return keys.indexOf(item.key) >= 0;
            });
            for (let i in current) {
                const item = current[i];
                item.reducer(item.state, action);
            }
        } catch (e) {
            throw e.name + ', ' + e.message;
        }
        return Object.assign({}, state);
    }
    //创建context
    const Context = React.createContext(stores);
    //apply store
    let applyStore = [];
    //Provider
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(combineReducer, stores);
        applyStore = [state, dispatch];
        return <Context.Provider
            value={[state, dispatch]}
        >
            {children}
        </Context.Provider>;
    };
    //使用context
    const useStore = () => useContext(Context);
    return { useStore, Provider, applyStore: () => applyStore };
}
