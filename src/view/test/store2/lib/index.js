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

export default function createThinkStore(reducerMap) {
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
    const asyncStore = {
        state: stores,
        dispatch: null
    };
    //get async state
    function getAsyncState() {
        if (!isDispatching) {
            throw 'You cannot get a state before the dispatch execution is completed.';
        }
        return asyncStore.state;
    }
    //get async dispatch
    function getAsyncDispatch() {
        if (!isDispatching) {
            throw 'You cannot get a dispatch before the dispatch execution is completed.';
        }
        return asyncStore.dispatch;
    }
    //get async store
    function asyncThinkStore() {
        return isDispatching && [getAsyncState(), getAsyncDispatch()];
    }
    //使用context
    const useThinkStore = () => useContext(Context);
    //使用provider
    const useThinkProvider = () => {
        //Provider
        function Provider({ children }) {
            const [state, dispatch] = useReducer(reducer, stores);
            useEffect(() => {
                asyncStore.state = isDispatching && state || null;
                asyncStore.dispatch = isDispatching && dispatch || null;
            }, [isDispatching]);
            return <Context.Provider
                value={[state, dispatch]}
            >
                {children}
            </Context.Provider>;
        }
        return Provider;
    };
    return { useThinkStore, useThinkProvider, asyncThinkStore };
}
