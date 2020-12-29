import React, { useReducer, useContext, useEffect } from 'react';

function checkParamsHasErr(params) {
    if ([Object, Array].indexOf(params.constructor) === -1) {
        throw 'The Parameter type must be Array or Object, ' +
        'Example: [{state1,reducer1}, {state2,reducer2}, ...] or {state,reducer}';
    }
}
//处理参数,生成reducer和stores
function handleReducerAndStores(connect) {
    const stores = {};
    const reducers = [];
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
        reducers.push(reducerItem);
    }
    return { stores, reducers };
}
//根据state的key值,匹配到当前reducer并执行
function handleCurrentReducer(state, action, reducers) {
    try {
        const keys = Object.keys(state);
        const current = reducers.filter((item) => {
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

export default function createHookStore(connect) {
    checkParamsHasErr(connect);
    if (connect.constructor === Object) {
        connect = [connect];
    }
    const { stores, reducers } = handleReducerAndStores(connect);
    //reducer
    function combineReducer(state, action) {
        return handleCurrentReducer(state, action, reducers);
    }
    //创建context
    const Context = React.createContext(stores);
    //apply store
    let asyncStore = new Promise((resove) => resove);
    //Provider
    function Provider({ children }) {
        const [state, dispatch] = useReducer(combineReducer, stores);
        useEffect(() => {
            asyncStore = new Promise((resove) => {
                resove([state, dispatch]);
            });
        }, []);
        return <Context.Provider
            value={[state, dispatch]}
        >
            {children}
        </Context.Provider>;
    }
    //使用context
    const HookStore = () => useContext(Context);
    return {
        HookStore,
        Provider,
        AsyncStore: async function () {
            return await asyncStore;
        }
    };
}
