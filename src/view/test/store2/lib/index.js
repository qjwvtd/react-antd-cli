import React, { useReducer, useContext, useEffect } from 'react';

//检查参数
function checkParamsHasErr(params) {
    if (!params[0]) {
        throw 'Reducer is required';
    }
    if ([Object, Function].indexOf(params[0].constructor) === -1) {
        throw 'Parameter exception,The reducer collection must be an object type, ' +
        'If there is only one reducer, use the reducer as the parameter directly' +
        'For example:: {reducer1,reducer2,...} or reducer';
    }
    if (params[0].constructor === Function) {
        const reducer = params[0];
        params[0] = { reducer };
    }
    for (let key in params[0]) {
        if (params[0][key].constructor !== Function) {
            throw 'Reducer must be of function type';
        }
    }
    return params[0];
}

export default function createThink(reducerMap) {
    reducerMap = checkParamsHasErr(arguments);
    //reducer is dispatching
    let isDispatching = false;
    //combineReducers
    function combineReducers(reducers) {
        const clonedReducers = {};
        for (let key in reducers) {
            clonedReducers[key] = reducers[key];
        }
        const stores = {};
        const clonedReducerKeys = Object.keys(clonedReducers);
        function reducer(state, action) {
            isDispatching = false;
            const nextState = {};
            for (let i = 0; i < clonedReducerKeys.length; i++) {
                const key = clonedReducerKeys[i];
                const currentReducer = clonedReducers[key];
                const prevState = state[key];
                const currentState = currentReducer(prevState, action);
                if (currentState === undefined) {
                    throw 'Reducer must return state,current reducer: ' + currentReducer;
                }
                nextState[key] = currentState;
                isDispatching = isDispatching || currentState !== prevState;
            }
            const complatedState = { ...(isDispatching ? nextState : state) };
            for (let key in complatedState) {
                stores[key] = complatedState[key];
            }
            return isDispatching ? nextState : state;
        }
        return { stores, reducer };
    }
    //merge reducer
    const { stores, reducer } = combineReducers(reducerMap);
    //create context
    const Context = React.createContext(stores);
    //async store
    const applyStore = { state: {}, dispatch: null };
    //Provider
    function Provider({ children }) {
        const [state, dispatch] = useReducer(reducer, stores);
        useEffect(() => {
            applyStore.state = isDispatching && state || {};
            applyStore.dispatch = isDispatching && dispatch || null;
        }, [isDispatching]);
        return <Context.Provider
            value={[state, dispatch]}
        >
            {children}
        </Context.Provider>;
    }
    //get async store
    function getAsyncStore() {
        if (!isDispatching) {
            throw 'You cannot get state or dispatch before the dispatch execution is completed.' +
            'Please try to execute the async request in useEffect';
        }
        const state = applyStore.state;
        const dispatch = applyStore.dispatch;
        return [state, dispatch];
    }
    const Think = {
        useStore: () => useContext(Context),
        useProvider: () => Provider,
        getAsyncStore: () => getAsyncStore()
    };
    return Think;
}
